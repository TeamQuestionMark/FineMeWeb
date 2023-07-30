import {
  AnswerResult,
  MultipleChoiceAnswerResult,
  SubjectiveAnswerResult,
} from '@/types/answer';
import { dummyQuestions } from '../Stage/dummy';

const dummyNickNames = ['AAA', 'BBB'];
const subjectiveAnswer = (
  text?: string,
  nickname?: string,
): SubjectiveAnswerResult => ({
  answerText: text || '주관식 답변입니다',
  nickname: nickname || 'AAA',
});

export const dummyAnswerResults = dummyQuestions.map(quesiton => {
  let dummyResult: AnswerResult = {
    questionId: quesiton.questionId,
    multipleChoiceAnswerResult: {},
    oxAnswerResult: { O: [], X: [] },
    subjectiveAnswerResult: [],
  };

  dummyResult.questionId = quesiton.questionId;
  if (quesiton.questionType === 'SUBJECTIVE') {
    dummyResult.subjectiveAnswerResult = [
      subjectiveAnswer(),
      subjectiveAnswer('주관식답변22222', 'BBBB'),
    ];
  } else if (quesiton.questionType === 'OX') {
    dummyResult.oxAnswerResult = {
      O: dummyNickNames,
      X: [],
    };
  } else {
    const result: MultipleChoiceAnswerResult = {};
    quesiton.multipleChoiceList.forEach(choice => {
      result[choice.content] = dummyNickNames;
    });
    dummyResult.multipleChoiceAnswerResult = result;
  }

  return dummyResult;
});
