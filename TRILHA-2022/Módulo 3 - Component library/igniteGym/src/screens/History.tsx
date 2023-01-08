import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { Heading, SectionList, VStack, Text } from "native-base";
import { useState } from "react";

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: "26/10/2022",
      data: ["Puxada frontal", "Rosca marreta"],
    },
    {
      title: "28/10/2022",
      data: ["Puxada lateral", "Rosca martelo"],
    },
    {
      title: "30/10/2022",
      data: ["Puxada vertical", "Rosca chave de fenda"],
    },
  ]);
  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercicios" />
      <SectionList
        px="6"
        showsVerticalScrollIndicator={false}
        sections={exercises}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <HistoryCard />}
        renderSectionHeader={({ section }) => (
          <Heading color="gray.200" fontSize="md" mt="10" mb="3">
            {section.title}
          </Heading>
        )}
        contentContainerStyle={
          exercises.length === 0
            ? { flex: 1, justifyContent: "center" }
            : { paddingBottom: 100 }
        }
        ListEmptyComponent={() => (
          <Text color="gray.100" textAlign="center">
            Não há exercicios registrados ainda.{"\n"} Vai treinar o que hoje?
          </Text>
        )}
      />
    </VStack>
  );
}
