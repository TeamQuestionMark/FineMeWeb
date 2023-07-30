import { QuestionType } from './stage';

type Nickname = string;

export type Answer = {
  questionId: number;
  type: QuestionType;
  multipleChoiceIdList: number[];
  answerText: string;
  answerChoice: string;
};

export type SubjectiveAnswerResult = {
  nickname: string;
  answerText: string;
};

export type OxAnswerResult = {
  O: Nickname[];
  X: Nickname[];
};

export type MultipleChoiceAnswerResult = {
  [choiceContent: string]: Nickname[];
};
export interface AnswerResult {
  questionId: number;
  subjectiveAnswerResult: SubjectiveAnswerResult[];
  multipleChoiceAnswerResult: MultipleChoiceAnswerResult;
  oxAnswerResult: OxAnswerResult;
}
