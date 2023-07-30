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

export type MultipleChoiceAnswerResult = {
  [answer: string]: Nickname[];
};
export interface AnswerResult {
  questionId: number;
  subjectiveAnswerResult: SubjectiveAnswerResult[];
  multipleChoiceAnswerResult: MultipleChoiceAnswerResult;
  oxAnswerResult: MultipleChoiceAnswerResult;
}
