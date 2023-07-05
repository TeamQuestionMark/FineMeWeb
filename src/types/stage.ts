export type Question = {
  questionId: number;
  questionTitle: string;
  questionType: QuestionType;
  multipleChoiceList: ChoiceOption[];
};

export type QuestionType = 'OX' | 'checkbox' | 'SUBJECTIVE' | 'radio' | 'chip';
export type ChoiceOption = {
  multipleChoiceId: number;
  content: string;
};
