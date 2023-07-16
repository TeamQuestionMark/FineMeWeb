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
import { dummyPagninatedQuetions } from './dummy';
import { Pagination } from '@/api/instance';
import { Question } from '@/types/stage';
import usePagination from '@/hooks/usePagination';

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
const DummyStagePage = () => {
  const methods = useStageForm();
  const { validate, initForm, isFormReady } = methods;

  const [data, setData] = useState<Pagination<Question[]>>();
  const [questions, setQuestions] = useState<Question[]>();
  const { page, setTotalPage, hasNext, next } = usePagination();

  const currentQuestionIndices: number[] = useMemo(() => {
    return Array(PAGE_SIZE)
      .fill(PAGE_SIZE * (page - 1))
      .map((key, idx) => key + idx);
  }, [page]);

  useEffect(() => {
    setTimeout(() => {
      const data = dummyPagninatedQuetions(1, 15);
      console.log('fetch');
      initForm(data?.content);
      setData(data);
    }, 500);
  }, [initForm]);

  useEffect(() => {
    if (!data) return;
    setTotalPage(Math.ceil(data.totalElements / PAGE_SIZE));
    setQuestions(data.content.slice(PAGE_SIZE * (page - 1), PAGE_SIZE * page));
  }, [data, page, setTotalPage]);

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

export default DummyStagePage;
