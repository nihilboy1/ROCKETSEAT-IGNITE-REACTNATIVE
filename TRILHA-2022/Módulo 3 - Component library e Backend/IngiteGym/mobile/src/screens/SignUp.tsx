import {
  VStack,
  Image,
  Center,
  Text,
  Heading,
  ScrollView,
  useToast,
} from "native-base";
import BackgroundImage from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = yup.object({
  name: yup.string().required('O campo "Nome" é obrigatório'),
  email: yup
    .string()
    .required('O campo "E-mail" é obrigatório')
    .email("E-mail inválido"),
  password: yup
    .string()
    .required("Informe uma senha")
    .min(6, "A senha deve ter ao menos 6 digitos"),
  password_confirm: yup
    .string()
    .required("Confirme a senha")
    .oneOf([yup.ref("password"), null], "As senhas precisam ser iguais"),
});

export function SignUp() {
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({ resolver: yupResolver(signUpSchema) });

  const navigation = useNavigation();

  async function handleSignUp({ email, name, password }: FormDataProps) {
    try {
      const res = await api.post("/users", { email, name, password });
      console.log(res.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possivel criar a sua conta, tente novamente mais tarde!";
      toast.show({ title, placement: "top", bgColor: "red.500" });
    }
  }

  function moveToSignIn() {
    navigation.goBack();
  }
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator
    >
      <VStack flex="1" px="10" pb="12">
        <Image
          source={BackgroundImage}
          defaultSource={BackgroundImage}
          alt="Mulheres praticando spinning"
          resizeMode="contain"
          position="absolute"
        />
        <Center mt="16" mb="12">
          <LogoSvg />
          <Text color="gray.100" fontSize="sm" fontFamily="body">
            Treinando mente e corpo
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb="6" fontFamily="heading">
            Cadastro
          </Heading>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{ required: "O campo 'Nome' não pode estar em branco" }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password_confirm"
            rules={{ required: "O campo 'Nome' não pode estar em branco" }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirmar senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password_confirm?.message}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
              />
            )}
          />
          <Button title="Criar e entrar" onPress={handleSubmit(handleSignUp)} />
          <Button
            mt={12}
            title="Voltar para o login"
            variant="outline"
            onPress={moveToSignIn}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
