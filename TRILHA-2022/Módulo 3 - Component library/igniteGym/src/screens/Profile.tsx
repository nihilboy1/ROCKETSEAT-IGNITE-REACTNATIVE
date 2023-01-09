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
} from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
const PHOTO_SIZE = 32;

export function Profile() {
  const [avatarIsLoading, setAvatarIsLoading] = useState(false);
  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView>
        <Center mt="6" px="10">
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
              source={{ uri: "https://github.com/nihilboy1.png" }}
              alt="Foto so usuário"
              size={PHOTO_SIZE}
            />
          )}
          <TouchableOpacity>
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
          <Heading color="gray.200" fontSize="md" mb="2">
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
