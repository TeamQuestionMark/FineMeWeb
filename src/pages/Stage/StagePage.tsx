import StageForm from '@/pages/Stage/StageForm';
import useStageForm from '@/hooks/useStageForm';
import styled, { css } from 'styled-components';
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
import { useLoaderData, useNavigate } from 'react-router-dom';
import getStageImage from '@/utils/getStageImage';
import { COLORS } from '@/themes/colors';
import { Body2 } from '@/components/Typography';
import { PAGE_SIZE, SEARCH_PARAM_USER_ID } from '@/constants/stage';
import share from '@/utils/share';
import copy from '@/utils/copy';
import { SESSION_STORAGE_KEY } from '@/constants/storage';
import PageNavigator from '@/components/PageNavigator';
import { GLOBAL_PADDING_X } from '@/themes/layout';
import { LoaderData } from '@/router/types';
import { AnswerApi } from '@/api/stages';
import { StageAnwserPayload } from '@/api/stages/answer';
import convertInputsToAnswers from './convertInputsToAnswers';

const Container = styled.div`
  padding-bottom: 63px;
`;
const StageImage = styled.img<{}>`
  width: 100%;
`;
const CustomStageTitle = styled.div`
  border-radius: 5px;
  background-color: ${COLORS.brandColor100};
  padding: 10px;
  margin: 72px ${GLOBAL_PADDING_X}px 30px;
`;

const StageFormWrapper = styled.div<{ custom?: boolean }>`
  ${({ custom }) => !custom && formBoxCss};
`;

const formBoxCss = css`
  border-radius: 15px;
  border: 2px solid ${COLORS.gray900};
  padding: 40px 0;
  background: ${COLORS.white};
`;

type StagePageProps = {
  preview?: boolean;
};
const StagePage = ({ preview }: StagePageProps) => {
  const navigate = useNavigate();
  const methods = useStageForm();
  const { initForm, isFormReady, inputs } = methods;

  const { stageName, stageQuestionPage, userId, isCustom, stageId } =
    useLoaderData() as LoaderData['StagePage'];
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
    if (!isCustom) {
      document.body.style.backgroundColor = '#faf8f0';
    }

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [isCustom]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const submit = useCallback(async () => {
    const nickname = sessionStorage.getItem(
      SESSION_STORAGE_KEY.nickname(stageId, userId),
    ) as string;

    const answerList = convertInputsToAnswers(
      stageQuestionPage.content,
      inputs,
    );

    const payload: StageAnwserPayload = {
      userId,
      nickname,
      answerList,
    };

    await AnswerApi.post(stageId, payload);
    sessionStorage.removeItem(SESSION_STORAGE_KEY.nickname(stageId, userId));
    navigate(`/stages/${stageId}/completed/${nickname}`);
  }, [inputs, navigate, stageId, stageQuestionPage.content, userId]);

  const handleClickShare = useCallback(async () => {
    const url = `${process.env.REACT_APP_URL}/stages/${stageId}?${SEARCH_PARAM_USER_ID}=${userId}`;
    const result = await share({
      title: `당신이 보는 내 모습은?`,
      text: url,
      url: url,
    });
    if (result !== 'SUCCEED') {
      const succeed = await copy(url);
      succeed && window.alert('클립보드에 복사하였습니다');
    }
  }, []);

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
      {preview || !isCustom ? (
        <StageImage src={getStageImage(stageId)} />
      ) : (
        <CustomStageTitle>
          <Body2 color="brandColor800">{stageName}</Body2>
        </CustomStageTitle>
      )}
      <form
        onSubmit={e => e.preventDefault()}
        style={
          preview || !isCustom ? { transform: 'translateY(-44px)' } : undefined
        }
      >
        <StageFormWrapper custom={!preview && isCustom}>
          {isFormReady && questions && (
            <StageForm
              custom={isCustom}
              startNumber={questionStartIdx + 1}
              useStageForm={methods}
              questions={questions}
            />
          )}
        </StageFormWrapper>

        {<PageNavigator style={{ marginTop: '40px' }} {...navigatorProps} />}
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
      </form>
    </Container>
  );
};

export default StagePage;
