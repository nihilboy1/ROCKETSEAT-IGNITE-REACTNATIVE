import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { FlatList, HStack, Heading, VStack, Text } from "native-base";
import { useState } from "react";

export function Home() {
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
      />
      <VStack flex="1" px="4">
        <HStack justifyContent="space-between" mb="4">
          <Heading color="gray.200" fontSize="md">
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
          renderItem={({ item }) => <ExerciseCard />}
        />
      </VStack>
    </VStack>
  );
}
