import StageForm from '@/pages/Stage/StageForm';
import useStageForm from '@/hooks/useStageForm';
import styled from 'styled-components';
import Button from '@/components/Button';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { Question } from '@/types/stage';
import usePagination from '@/hooks/usePagination';
import { useLoaderData } from 'react-router-dom';
import { StageQuestionData } from '@/api/stages/questions';
import getStageImage from '@/utils/getStageImage';
import { COLORS } from '@/themes/colors';
import { Body2 } from '@/components/Typography';

const Container = styled.div`
  padding-bottom: 63px;
`;
const StageImage = styled.img<{}>`
  width: 100%;
`;
const CustomStageImage = styled.div`
  border-radius: 5px;
  background-color: ${COLORS.brandColor100};
  padding: 10px;
`;

const StageFormWrapper = styled.div`
  transform: translateY(-44px);
`;

const PAGE_SIZE = 5;
const StagePage = () => {
  const methods = useStageForm();
  const { initForm, isFormReady, inputs } = methods;

  const { stageName, stageQuestionPage, userId } =
    useLoaderData() as StageQuestionData;
  const [questions, setQuestions] = useState<Question[]>();
  const { page, setTotalPage, hasNext, next } = usePagination();

  const questionStartIdx: number = useMemo(() => {
    return PAGE_SIZE * (page - 1);
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

  const isValid = useMemo(() => {
    const questionsIds = Object.keys(inputs).slice(
      questionStartIdx,
      questionStartIdx + PAGE_SIZE,
    );

    for (let i = 0; i < questionsIds.length; i++) {
      const id = questionsIds[i];
      const value = inputs[id];
      if (value === undefined) return false;
      if (typeof value !== 'number') {
        if (value.length === 0) {
          return false;
        }
      }
    }
    return true;
  }, [inputs, questionStartIdx]);

  return (
    <Container>
      {userId && <StageImage src={getStageImage(stageName)} />}
      {!userId && (
        <CustomStageImage>
          <Body2 color="brandColor800">{stageName}</Body2>
        </CustomStageImage>
      )}
      <StageFormWrapper>
        {isFormReady && questions && (
          <StageForm
            startNumber={questionStartIdx + 1}
            useStageForm={methods}
            questions={questions}
          />
        )}
      </StageFormWrapper>
      <Button
        style={{ margin: '0 20px' }}
        disabled={!isValid}
        onClick={handleClickNext}
      >
        {hasNext ? '다음으로' : '응답 완료'}
      </Button>
    </Container>
  );
};

export default StagePage;
