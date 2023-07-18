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
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { StageQuestionData } from '@/api/stages/questions';
import getStageImage from '@/utils/getStageImage';
import { COLORS } from '@/themes/colors';
import { Body2 } from '@/components/Typography';
import { PAGE_SIZE } from '@/constants/stage';
import share from '@/utils/share';
import copy from '@/utils/copy';
import { stringToNumber } from '@/utils/stringToNumber';
import { SESSION_STORAGE_KEY } from '@/constants/storage';
import PageNavigator from '@/components/PageNavigator';
import { GLOBAL_PADDING_X } from '@/themes/layout';

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

type StagePageProps = {
  preview?: boolean;
};
const StagePage = ({ preview }: StagePageProps) => {
  const navigate = useNavigate();
  const methods = useStageForm();
  const params = useParams();
  const stageId = stringToNumber(params.stageId);
  const { initForm, isFormReady, inputs } = methods;

  const { stageName, stageQuestionPage, userId } =
    useLoaderData() as StageQuestionData;
  const [questions, setQuestions] = useState<Question[]>();
  const { page, setTotalPages, hasNext, navigatorProps } = usePagination();

  const questionStartIdx: number = useMemo(() => {
    return PAGE_SIZE * (page - 1);
  }, [page]);

  useEffect(() => {
    initForm(stageQuestionPage.content);
  }, [initForm, stageQuestionPage.content]);

  useEffect(() => {
    setTotalPages(Math.ceil(stageQuestionPage.numberOfElements / PAGE_SIZE));
    setQuestions(
      stageQuestionPage.content.slice(PAGE_SIZE * (page - 1), PAGE_SIZE * page),
    );
  }, [
    page,
    setTotalPages,
    stageQuestionPage.content,
    stageQuestionPage.numberOfElements,
  ]);

  useLayoutEffect(() => {
    document.body.style.backgroundColor = '#faf8f0';

    return () => {
      document.body.style.backgroundColor = '';
    };
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const submit = useCallback(() => {
    const nickname = sessionStorage.getItem(
      SESSION_STORAGE_KEY.nickname(stageId),
    );
    sessionStorage.removeItem(SESSION_STORAGE_KEY.nickname(stageId));
    navigate(`/stages/${stageId}/completed/${nickname}`);
  }, [navigate, stageId]);

  const handleClickShare = useCallback(async () => {
    const url = 'https://TODO.com';
    const result = await share({
      title: '스테이지 공유하기',
      url: url,
      text: stageName,
    });
    if (result !== 'SUCCEED') {
      const succeed = await copy(url);
      succeed && window.alert('클립보드에 복사하였습니다');
    }
  }, [stageName]);

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
      {!userId && <StageImage src={getStageImage(stageId)} />}
      {userId && (
        <CustomStageImage>
          <Body2 color="brandColor800">{stageName}</Body2>
        </CustomStageImage>
      )}
      <StageFormWrapper>
        {isFormReady && questions && (
          <StageForm
            custom={userId !== undefined}
            startNumber={questionStartIdx + 1}
            useStageForm={methods}
            questions={questions}
          />
        )}
      </StageFormWrapper>
      {<PageNavigator {...navigatorProps} />}
      {!preview && !hasNext && (
        <Button
          style={{ margin: `30px ${GLOBAL_PADDING_X}px 0 ` }}
          disabled={!isValid}
          onClick={submit}
        >
          응답 완료
        </Button>
      )}
      {preview && !hasNext && (
        <Button
          style={{ margin: `30px ${GLOBAL_PADDING_X}px 0 ` }}
          onClick={handleClickShare}
        >
          공유 하기
        </Button>
      )}
    </Container>
  );
};

export default StagePage;
