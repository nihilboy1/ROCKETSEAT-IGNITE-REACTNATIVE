import { VStack, Image, Center, Text, Heading, ScrollView } from "native-base";
import BackgroundImage from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";

export function SignUp() {
  const navigation = useNavigation();

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
          <Input placeholder="Nome" />
          <Input
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input placeholder="Senha" secureTextEntry />
          <Button title="Criar e entrar" />
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
