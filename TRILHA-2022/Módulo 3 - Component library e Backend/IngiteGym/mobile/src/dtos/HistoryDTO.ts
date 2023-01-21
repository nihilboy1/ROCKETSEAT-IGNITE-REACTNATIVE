export type HistoryDTO = {
  id: string;
  name: string;
  group: string;
  hour: string;
  created_at: string;
  exercise_id: {
    name: string;
    group: string;
  };
};
