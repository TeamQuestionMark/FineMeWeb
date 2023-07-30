import MultipleChoiceResult from '@/components/StageResult/MultipleChoiceResult';
import SubjectiveResult from '@/components/StageResult/SubjectiveResult';
import { AnswerResult } from '@/types/answer';
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
  else
    return (
      <MultipleChoiceResult
        key={question.questionId}
        questionTitle={question.questionTitle}
        answerResults={answer.multipleChoiceAnswerResult}
      />
    );
}
