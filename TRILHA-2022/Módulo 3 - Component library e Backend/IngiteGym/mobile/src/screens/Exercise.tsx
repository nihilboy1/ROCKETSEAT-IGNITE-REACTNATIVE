import {
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
  Image,
  ScrollView,
  Box,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepetitionsSvg from "@assets/repetitions.svg";
import { Button } from "@components/Button";
import { AppError } from "@utils/AppError";
import { useToast } from "native-base";
import { api } from "@services/api";
import { useEffect, useState } from "react";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Loading } from "@components/Loading";

type routeParams = {
  exerciseId: string;
};

export function Excercise() {
  const [savingExercise, setSavingExercise] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);
  const { goBack, navigate } = useNavigation<AppNavigatorRoutesProps>();
  const route = useRoute();
  const { exerciseId } = route.params as routeParams;
  const toast = useToast();
  function handleGoBack() {
    goBack();
  }

  async function fetchExerciseDetails() {
    try {
      setIsLoading(true);
      const res = await api.get(`/exercises/${exerciseId}`);
      setExercise(res.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os detalhes do exercício";

      toast.show({ title, placement: "top", bgColor: "red.500" });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleExerciseHistoryRegister() {
    try {
      setSavingExercise(true);
      await api.post("/history", { exercise_id: exerciseId });
      toast.show({
        title: "Exercício registrado com sucesso 😃",
        placement: "bottom",
        bgColor: "green.700",
      });

      navigate("history");
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível registar o exercício";

      toast.show({ title, placement: "bottom", bgColor: "red.500" });
    } finally {
      setSavingExercise(false);
    }
  }

  useEffect(() => {
    fetchExerciseDetails();
  }, [exerciseId]);

  return (
    <VStack flex="1">
      {isLoading ? (
        <Loading />
      ) : (
        <>
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

            <Heading
              color="gray.100"
              fontSize="lg"
              flexShrink="1"
              fontFamily="heading"
            >
              {exercise.name}
            </Heading>
            <HStack alignItems="center">
              <BodySvg />
              <Text color="gray.200" ml="1" textTransform="capitalize">
                {exercise.group}
              </Text>
            </HStack>
          </HStack>
          <ScrollView>
            <VStack px="8" pt="4">
              <Box rounded="lg" mb="3" overflow="hidden">
                <Image
                  w="full"
                  h="72"
                  source={{
                    uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
                  }}
                  alt="Nome do exercicio"
                  resizeMode="contain"
                  rounded="lg"
                  overflow="hidden"
                />
              </Box>
              <VStack bg="gray.600" rounded="md" pb="4" px="4">
                <HStack
                  alignItems="center"
                  justifyContent="space-around"
                  my="4"
                >
                  <HStack>
                    <SeriesSvg />
                    <Text color="gray.200" ml="2">
                      {exercise.series} Séries
                    </Text>
                  </HStack>
                  <HStack>
                    <RepetitionsSvg />
                    <Text color="gray.200" ml="2">
                      {exercise.repetitions} Repetições
                    </Text>
                  </HStack>
                </HStack>
                <Button
                  title="Marcar como realizado"
                  isLoading={savingExercise}
                  onPress={handleExerciseHistoryRegister}
                />
              </VStack>
            </VStack>
          </ScrollView>
        </>
      )}
    </VStack>
  );
}
