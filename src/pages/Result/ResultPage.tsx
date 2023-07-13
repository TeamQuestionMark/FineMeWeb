import PageLayout from '@/components/Layout/PageLayout';
import MultipleChoiceResult from '@/components/StageResult/MultipleChoiceResult';
import SubjectiveResult from '@/components/StageResult/SubjectiveResult';
import { Headline2 } from '@/components/Typography';
import renderMultiLineText from '@/utils/renderMultiLineText';
import styled from 'styled-components';

const StyledResultWrapper = styled.div`
  > div {
    margin-bottom: 40px;
  }
`;
const ResultPage = () => {
  return (
    <PageLayout>
      <Headline2 style={{ marginBottom: '16px' }}>
        {renderMultiLineText(`회사에서
일하는 나의 모습은?`)}
      </Headline2>
      <StyledResultWrapper>
        <SubjectiveResult questionTitle="나는 탕수육을 어떻게 먹을까?" />
        <MultipleChoiceResult
          questionTitle={`지각이 예상되는 출근길..!
아침 회의가 잡힐 분위기다!`}
        />
      </StyledResultWrapper>
    </PageLayout>
  );
};

export default ResultPage;
