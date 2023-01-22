import { Avatar } from "@components/Avatar";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import {
  Center,
  ScrollView,
  VStack,
  Skeleton,
  Text,
  Heading,
  useToast,
} from "native-base";
import defaultUserAvatarImg from "@assets/userPhotoDefault.png";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useAuthContext } from "@hooks/useAuthContext";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";

const PHOTO_SIZE = 32;

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  old_password: string;
  confirm_password: string;
};

const profileSchema = yup.object({
  name: yup.string().required("O campo nome não pode estar vazio."),
  password: yup
    .string()
    .min(6, "A senha deve ter no mínimo 6 dígitos.")
    .nullable()
    .transform((value) => (!!value ? value : null)),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => (!!value ? value : null))
    .oneOf([yup.ref("password"), null], "A confirmação de senhas não confere.")
    .when("password", {
      is: (Field: any) => Field,
      then: yup
        .string()
        .nullable()
        .required("A confirmação de senha não pode estar vazia.")
        .transform((value) => (!!value ? value : null)),
    }),
});

export function Profile() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [avatarIsLoading, setAvatarIsLoading] = useState(false);

  const { user, updateUserProfile } = useAuthContext();
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver(profileSchema),
  });

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsUpdating(true);
      const userUpdated = user;
      userUpdated.name = data.name;
      await api.put("/users", data);

      await updateUserProfile(userUpdated);

      toast.show({
        title: "Perfil atualizado com sucesso",
        placement: "top",
        bgColor: "green.700",
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possivel atualizar os dados do perfil";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleUserPhotoSelect() {
    setAvatarIsLoading(true);
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.canceled && result.assets[0].uri) {
        const uri = result.assets[0].uri;
        const photoInfo = await FileSystem.getInfoAsync(uri);
        const photoInMB = photoInfo.size && photoInfo.size / 1024 / 1024;
        if (photoInMB && photoInMB > 3) {
          return toast.show({
            title: "Essa imagem é muito grande, escolha uma de até 3MB",
            placement: "top",
            bgColor: "red.500",
            width: "85%",
            alignSelf: "center",
            _title: { textAlign: "center" },
          });
        }
        const fileExtension = uri.split(".").pop();
        const photoFile = {
          name: `${user.name}.${fileExtension}`.toLowerCase(),
          uri: uri,
          type: `${result.assets[0].type}/${fileExtension}`,
        } as any;

        const userPhotoUploadForm = new FormData();
        userPhotoUploadForm.append("avatar", photoFile);

        const avatarUpdateResponse = await api.patch(
          "/users/avatar",
          userPhotoUploadForm,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const userUpdated = user;
        userUpdated.avatar = avatarUpdateResponse.data.avatar;

        await updateUserProfile(userUpdated);
        console.log(userUpdated);

        toast.show({
          title: "Foto atualizada com sucesso",
          placement: "top",
          bgColor: "green.500",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAvatarIsLoading(false);
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView>
        <Center mt="6" px="10">
          <TouchableOpacity onPress={handleUserPhotoSelect}>
            {avatarIsLoading ? (
              <Skeleton
                w={PHOTO_SIZE}
                h={PHOTO_SIZE}
                rounded="full"
                startColor="gray.400"
                endColor="gray.600"
              />
            ) : (
              <Avatar
                source={
                  user.avatar
                    ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
                    : defaultUserAvatarImg
                }
                alt="Foto so usuário"
                size={PHOTO_SIZE}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text color="white" fontWeight="bold" fontSize="md" mt="2" mb="8">
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Nome"
                bg="gray.600"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Email"
                bg="gray.600"
                value="samuelseve1@gmail.com"
                isDisabled
              />
            )}
          />
        </Center>
        <VStack px="10" mt="12" mb="9">
          <Heading color="gray.200" fontSize="md" mb="2" fontFamily="heading">
            Alterar senha
          </Heading>
          <Controller
            control={control}
            name="old_password"
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Senha atual"
                secureTextEntry
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirm_password"
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Confirmar nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />

          <Button
            title="Atualizar"
            mt="4"
            isLoading={isUpdating}
            onPress={handleSubmit(handleProfileUpdate)}
          />
        </VStack>
      </ScrollView>
    </VStack>
  );
}
