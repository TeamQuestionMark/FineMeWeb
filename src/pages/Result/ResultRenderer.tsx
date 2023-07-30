import { LoaderData } from '@/router/types';
import { useMemo } from 'react';
import { useLoaderData } from 'react-router-dom';
import renderResult from './renderResult';

interface ResultRendererProps {}
const ResultRenderer: React.FC<ResultRendererProps> = () => {
  const {
    questionData: {
      stageQuestionPage: { content: questions },
    },
    answerData: { stageQuestionAnswerList: answers },
  } = useLoaderData() as LoaderData['ResultPage'];
  const results = useMemo(() => {
    return answers.map(answer => {
      const matchedQuestion = questions.find(
        q => q.questionId === answer.questionId,
      );
      return { question: matchedQuestion, answer };
    });
  }, [answers, questions]);

  return (
    <>
      {results.map(({ question, answer }) => {
        if (question) return renderResult(question, answer);
        return <></>;
      })}
    </>
  );
};

export default ResultRenderer;
