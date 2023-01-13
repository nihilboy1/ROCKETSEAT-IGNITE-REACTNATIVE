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
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import * as FileSystem from "expo-file-system";

import * as ImagePicker from "expo-image-picker";

const PHOTO_SIZE = 32;

export function Profile() {
  const [avatarIsLoading, setAvatarIsLoading] = useState(false);
  const [userAvatarURI, setUserAvatarURI] = useState<string>(
    "https://github.com/nihilboy1.png"
  );
  const toast = useToast();

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

        console.log(photoInMB);

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
        setUserAvatarURI(uri);
      }

      return;
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
                source={{ uri: userAvatarURI }}
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

          <Input placeholder="Nome" bg="gray.600" />
          <Input
            placeholder="Email"
            bg="gray.600"
            value="samuelseve1@gmail.com"
            isDisabled
          />
        </Center>
        <VStack px="10" mt="12" mb="9">
          <Heading color="gray.200" fontSize="md" mb="2" fontFamily="heading">
            Alterar senha
          </Heading>
          <Input bg="gray.600" placeholder="Senha atual" secureTextEntry />
          <Input bg="gray.600" placeholder="Nova senha" secureTextEntry />
          <Input
            bg="gray.600"
            placeholder="Confirmar nova senha"
            secureTextEntry
          />
          <Button title="Atualizar" mt="4" />
        </VStack>
      </ScrollView>
    </VStack>
  );
}
