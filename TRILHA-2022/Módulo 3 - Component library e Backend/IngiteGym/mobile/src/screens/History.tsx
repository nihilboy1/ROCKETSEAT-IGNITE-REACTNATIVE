import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { AppError } from "@utils/AppError";
import { Heading, SectionList, VStack, Text } from "native-base";
import { useCallback, useState } from "react";
import { useToast } from "native-base";
import { api } from "@services/api";
import { useFocusEffect } from "@react-navigation/native";
import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";

export function History() {
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [historyByDay, setHistoryByDay] = useState<HistoryByDayDTO[]>([]);

  useFocusEffect(
    useCallback(() => {
      fetchUserHistory();
    }, [])
  );

  async function fetchUserHistory() {
    try {
      setIsLoading(true);
      const res = await api.get("/history");
      setHistoryByDay(res.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar o histórico de exercícios";

      toast.show({ title, placement: "bottom", bgColor: "red.500" });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercicios" />
      <SectionList
        px="6"
        showsVerticalScrollIndicator={false}
        sections={historyByDay}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HistoryCard data={item} />}
        renderSectionHeader={({ section }) => (
          <Heading
            color="gray.200"
            fontSize="md"
            mt="10"
            mb="3"
            fontFamily="heading"
          >
            {section.title}
          </Heading>
        )}
        contentContainerStyle={
          historyByDay.length === 0
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
