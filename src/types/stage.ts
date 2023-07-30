export type Question = {
  questionId: number;
  questionTitle: string;
  questionType: QuestionType;
  multipleChoiceList: ChoiceOption[];
};

export type QuestionType = 'OX' | 'CHECK_BOX' | 'SUBJECTIVE' | 'RADIO' | 'CHIP';
export type ChoiceOption = {
  multipleChoiceId: number;
  content: string;
};
