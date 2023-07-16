import StageForm from '@/pages/Stage/StageForm';
import useStageForm from '@/hooks/useStageForm';
import ImgStageWork from '@/assets/images/Stage/stage-work@3x.png';
import styled from 'styled-components';
import Button from '@/components/Button';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { Pagination } from '@/api/instance';
import { Question } from '@/types/stage';
import usePagination from '@/hooks/usePagination';
import { useLoaderData } from 'react-router-dom';
import { StageQuestionData } from '@/api/stages/questions';

const Container = styled.div`
  padding-bottom: 63px;
`;
const StageImage = styled.img<{}>`
  width: 100%;
`;

const StageFormWrapper = styled.div`
  transform: translateY(-44px);
`;

const PAGE_SIZE = 5;
const StagePage = () => {
  const methods = useStageForm();
  const { validate, initForm, isFormReady } = methods;

  const { stageName, stageQuestionPage, userId } =
    useLoaderData() as StageQuestionData;
  const [questions, setQuestions] = useState<Question[]>();
  const { page, setTotalPage, hasNext, next } = usePagination();

  const currentQuestionIndices: number[] = useMemo(() => {
    return Array(PAGE_SIZE)
      .fill(PAGE_SIZE * (page - 1))
      .map((key, idx) => key + idx);
  }, [page]);

  useEffect(() => {
    initForm(stageQuestionPage.content);
  }, [initForm, stageQuestionPage.content]);

  useEffect(() => {
    setTotalPage(Math.ceil(stageQuestionPage.numberOfElements / PAGE_SIZE));
    setQuestions(
      stageQuestionPage.content.slice(PAGE_SIZE * (page - 1), PAGE_SIZE * page),
    );
  }, [
    page,
    setTotalPage,
    stageQuestionPage.content,
    stageQuestionPage.numberOfElements,
  ]);

  useLayoutEffect(() => {
    document.body.style.backgroundColor = '#faf8f0';

    return () => {
      document.body.style.backgroundColor = '';
    };
  });

  const handleClickNext = useCallback(() => {
    if (hasNext) {
      next();
      window.scrollTo(0, 0);
    } else {
      // 제출
    }
  }, [hasNext, next]);

  return (
    <Container>
      <StageImage src={ImgStageWork} />
      <StageFormWrapper>
        {isFormReady && questions && (
          <StageForm
            startNumber={currentQuestionIndices[0] + 1}
            useStageForm={methods}
            questions={questions}
          />
        )}
      </StageFormWrapper>
      <Button
        style={{ margin: '0 20px' }}
        disabled={!validate(currentQuestionIndices)}
        onClick={handleClickNext}
      >
        {hasNext ? '다음으로' : '응답 완료'}
      </Button>
    </Container>
  );
};

export default StagePage;
