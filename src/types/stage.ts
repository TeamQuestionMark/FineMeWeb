export type Question = {
  questionId: number;
  questionTitle: string;
  questionType: string;
  multipleChoiceList: ChoiceOption[];
};

export type ChoiceOption = {
  multipleChoiceId: number;
  content: string;
};
