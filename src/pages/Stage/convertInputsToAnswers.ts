import { Answer, Question, QuestionType } from '@/types/stage';

const getAnswerByType = (
  type: QuestionType,
  input: number[] | number | string,
) => {
  switch (type) {
    case 'CHECK_BOX':
      return {
        multipleChoiceIdList: input as number[],
        answerText: '',
        answerChoice: '',
      };
    case 'CHIP':
    case 'RADIO':
      return {
        multipleChoiceIdList: [input] as number[],
        answerText: '',
        answerChoice: '',
      };
    case 'SUBJECTIVE':
      return {
        multipleChoiceIdList: [],
        answerText: input as string,
        answerChoice: '',
      };
    case 'OX':
      return {
        multipleChoiceIdList: [],
        answerText: '',
        answerChoice: input as string,
      };
  }
};

const convertInputsToAnswers = (
  questions: Question[],
  inputs: Record<string, string | number | number[]>,
): Answer[] => {
  const answerList = questions.map((q, idx): Answer => {
    return {
      questionId: q.questionId,
      type: q.questionType,
      ...getAnswerByType(q.questionType, inputs[q.questionId]),
    };
  });

  return answerList;
};

export default convertInputsToAnswers;
