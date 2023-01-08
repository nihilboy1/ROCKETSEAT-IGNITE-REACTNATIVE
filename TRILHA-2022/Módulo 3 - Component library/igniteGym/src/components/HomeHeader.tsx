import { HStack, Heading, Text, VStack, Icon } from "native-base";
import { Avatar } from "./Avatar";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export function HomeHeader() {
  return (
    <HStack bg="gray.600" pt="12" pb="5" px="8" alignItems="center">
      <Avatar
        source={{ uri: "https://github.com/nihilboy1.png" }}
        mr="4"
        alt="foto do usuário"
        size={16}
      />
      <VStack flex="1">
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>
        <Heading color="gray.100" fontSize="md">
          Samuel
        </Heading>
      </VStack>
      <TouchableOpacity>
        <Icon as={MaterialIcons} name="logout" color="gray.100" size="7" />
      </TouchableOpacity>
    </HStack>
  );
}
