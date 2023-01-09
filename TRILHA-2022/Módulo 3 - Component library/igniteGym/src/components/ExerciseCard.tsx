import { HStack, Heading, Image, Text, VStack, Icon } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Entypo } from "@expo/vector-icons";

type Props = TouchableOpacityProps & {};

export function ExerciseCard({ ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg="gray.500"
        alignItems="center"
        p="2"
        pr="4"
        rounded="md"
        mb="3"
      >
        <Image
          resizeMode="contain"
          w="16"
          h="16"
          mr="4"
          rounded="md"
          alt="Imagem do exercício"
          source={{
            uri: "https://files.passeidireto.com/7dceacb9-8013-4e9c-b30b-dd174f2e525d/7dceacb9-8013-4e9c-b30b-dd174f2e525d.jpeg",
          }}
        />
        <VStack flex="1">
          <Heading fontSize="lg" color="white">
            Remada unilateral
          </Heading>
          <Text fontSize="sm" color="gray.200" mt="1" numberOfLines={2}>
            3 séries x 12 repetições
          </Text>
        </VStack>
        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  );
}
