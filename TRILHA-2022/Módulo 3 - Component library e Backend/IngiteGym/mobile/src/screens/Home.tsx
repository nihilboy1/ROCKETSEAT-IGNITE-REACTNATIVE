import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FlatList, HStack, Heading, VStack, Text, useToast } from "native-base";
import { useCallback, useEffect, useState } from "react";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Loading } from "@components/Loading";

export function Home() {
  const toast = useToast();
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();
  const [groups, setGroups] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
  const [selectedGroup, setSelectedGroup] = useState("antebraço");

  function handleOpenExerciseDetails(exerciseId: string) {
    navigate("exercise", { exerciseId });
  }

  async function fetchGroups() {
    try {
      const res = await api.get("/groups");
      setGroups(res.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os grupos musculares";

      toast.show({ title, placement: "top", bgColor: "red.500" });
    }
  }

  async function fetchExerciseByGroup() {
    try {
      setIsLoading(true);
      const res = await api.get(`/exercises/bygroup/${selectedGroup}`);
      setExercises(res.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os exercicios";

      toast.show({ title, placement: "top", bgColor: "red.500" });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchExerciseByGroup();
    }, [selectedGroup])
  );

  return (
    <VStack flex={1}>
      <HomeHeader />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            onPress={() => setSelectedGroup(item)}
            name={item}
            isActive={selectedGroup.toUpperCase() === item.toUpperCase()}
          />
        )}
        _contentContainerStyle={{ px: 4 }}
        my={6}
        maxH={10}
        minH={10}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <VStack flex="1" px="4">
          <HStack justifyContent="space-between" mb="4">
            <Heading color="gray.200" fontSize="md" fontFamily="heading">
              Exercícios
            </Heading>
            <Text color="gray.200" fontSize="sm">
              {exercises.length}
            </Text>
          </HStack>
          <FlatList
            _contentContainerStyle={{ pb: 16 }}
            data={exercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ExerciseCard
                data={item}
                onPress={() => handleOpenExerciseDetails(item.id)}
              />
            )}
          />
        </VStack>
      )}
    </VStack>
  );
}
