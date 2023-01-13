import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { useNavigation } from "@react-navigation/native";
import { FlatList, HStack, Heading, VStack, Text } from "native-base";
import { useState } from "react";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function Home() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();
  const [groups, setGroups] = useState([
    "costas",
    "bíceps",
    "tríceps",
    "ombro",
  ]);
  const [exercises, setExercises] = useState([
    "Puxada frontal",
    "Remada baixa",
    "Rosca direta",
    "Levantamento terra",
  ]);
  const [selectedGroup, setSelectedGroup] = useState("costas");

  function moveToExerciseDetails() {
    navigate("exercise");
  }

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
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <ExerciseCard onPress={moveToExerciseDetails} />
          )}
        />
      </VStack>
    </VStack>
  );
}
