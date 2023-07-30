import MultipleChoiceResult from '@/components/StageResult/MultipleChoiceResult';
import SubjectiveResult from '@/components/StageResult/SubjectiveResult';
import { AnswerResult, MultipleChoiceAnswerResult } from '@/types/answer';
import { Question } from '@/types/stage';

export default function renderResult(question: Question, answer: AnswerResult) {
  if (question.questionType === 'SUBJECTIVE')
    return (
      <SubjectiveResult
        key={question.questionId}
        questionTitle={question.questionTitle}
        answerResults={answer.subjectiveAnswerResult}
      />
    );
  else if (question.questionType === 'OX')
    return (
      <MultipleChoiceResult
        key={question.questionId}
        questionTitle={question.questionTitle}
        answerResults={answer.oxAnswerResult}
      />
    );

  const answerResults: MultipleChoiceAnswerResult = {};
  question.multipleChoiceList.forEach(choice => {
    const nicknames =
      answer.multipleChoiceAnswerResult[choice.multipleChoiceId] || [];
    answerResults[choice.content] = nicknames;
  });

  return (
    <MultipleChoiceResult
      key={question.questionId}
      questionTitle={question.questionTitle}
      answerResults={answerResults}
    />
  );
}
