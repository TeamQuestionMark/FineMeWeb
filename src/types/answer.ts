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

export interface AnswerResult {
  questionId: number;
  subjectiveAnswerResult: SubjectiveAnswerResult[];
  multipleChoiceAnswerResult: { [answer: string]: Nickname[] };
  oxAnswerResult: {
    o: Nickname[];
    x: Nickname[];
  };
}
