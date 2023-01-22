import { HStack, Heading, Text, VStack, Icon } from "native-base";
import { Avatar } from "./Avatar";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useAuthContext } from "@hooks/useAuthContext";
import defaultUserAvatarImg from "@assets/userPhotoDefault.png";
import { api } from "@services/api";

export function HomeHeader() {
  const { user, signOut } = useAuthContext();
  return (
    <HStack bg="gray.600" pt="12" pb="5" px="8" alignItems="center">
      <Avatar
        source={
          user.avatar
            ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
            : defaultUserAvatarImg
        }
        mr="4"
        alt="foto do usuário"
        size={16}
      />
      <VStack flex="1">
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>
        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          {user.name}
        </Heading>
      </VStack>
      <TouchableOpacity onPress={signOut}>
        <Icon as={MaterialIcons} name="logout" color="gray.100" size="7" />
      </TouchableOpacity>
    </HStack>
  );
}
