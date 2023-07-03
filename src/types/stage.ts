export type Question = {
  questionId: number;
  questionTitle: string;
  questionType: QuestionType;
  multipleChoiceList: ChoiceOption[];
};

export type QuestionType = 'ox' | 'checkbox' | 'subjective' | 'radio' | 'chip';
export type ChoiceOption = {
  multipleChoiceId: number;
  content: string;
};
