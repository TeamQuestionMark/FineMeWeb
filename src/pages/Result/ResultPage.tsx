import PageLayout from '@/components/Layout/PageLayout';
import { Headline2 } from '@/components/Typography';
import { BASIC_STAGE_ID } from '@/constants/stage';
import { LoaderData } from '@/router/types';
import renderMultiLineText from '@/utils/renderMultiLineText';
import { useMemo } from 'react';
import { useLoaderData } from 'react-router-dom';
import styled from 'styled-components';
import ResultRenderer from './ResultRenderer';

const StyledResultWrapper = styled.div`
  > div {
    margin-bottom: 40px;
  }
`;
const ResultPage = () => {
  // const { questionData, answerData } =
  //   useLoaderData() as LoaderData['ResultPage'];

  // const isCustom = useMemo(
  //   () => !Object.values(BASIC_STAGE_ID).includes(answerData.stageId as any),
  //   [answerData.stageId],
  // );
  return (
    <PageLayout>
      {/* <Headline2 style={{ marginBottom: '16px' }}>
        {(!isCustom &&
          renderMultiLineText(`${questionData.stageName}에서
일하는 나의 모습은?`)) ||
          renderMultiLineText(questionData.stageName)}
      </Headline2> */}
      <StyledResultWrapper>
        <ResultRenderer />
      </StyledResultWrapper>
    </PageLayout>
  );
};

export default ResultPage;
