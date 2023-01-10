import {
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
  Image,
  ScrollView,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepetitionsSvg from "@assets/repetitions.svg";
import { Button } from "@components/Button";

export function Excercise() {
  const { navigate, goBack } = useNavigation<AppNavigatorRoutesProps>();
  function handleGoBack() {
    goBack();
  }

  return (
    <VStack flex="1">
      <HStack
        px="8"
        bg="gray.600"
        pt="12"
        pb="8"
        justifyContent="space-between"
      >
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color="green.500" size="6" />
        </TouchableOpacity>

        <Heading color="gray.100" fontSize="lg" flexShrink="1" fontFamily="heading">
          Puxada frontal
        </Heading>
        <HStack alignItems="center">
          <BodySvg />
          <Text color="gray.200" ml="1" textTransform="capitalize">
            Costas
          </Text>
        </HStack>
      </HStack>
      <ScrollView>
        <VStack px="8" pt="4">
          <Image
            w="full"
            h="72"
            source={{
              uri: "https://files.passeidireto.com/7dceacb9-8013-4e9c-b30b-dd174f2e525d/7dceacb9-8013-4e9c-b30b-dd174f2e525d.jpeg",
            }}
            alt="Nome do exercicio"
            mb="3"
            resizeMode="contain"
            rounded="lg"
            overflow="hidden"
          />
          <VStack bg="gray.600" rounded="md" pb="4" px="4">
            <HStack alignItems="center" justifyContent="space-around" my="4">
              <HStack>
                <SeriesSvg />
                <Text color="gray.200" ml="2">
                  {3} Séries
                </Text>
              </HStack>
              <HStack>
                <RepetitionsSvg />
                <Text color="gray.200" ml="2">
                  {12} Repetições
                </Text>
              </HStack>
            </HStack>
            <Button title="Marcar como realizado" />
          </VStack>
        </VStack>
      </ScrollView>
    </VStack>
  );
}
