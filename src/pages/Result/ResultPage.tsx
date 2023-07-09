import PageLayout from '@/components/Layout/PageLayout';
import QuestionBox from '@/components/StageResult/QuestionBox';
import SubjectiveAnswerBox from '@/components/StageResult/SubjectiveAnswerBox';
import styled from 'styled-components';

const StyledResultWrapper = styled.div`
  > :first-child {
    margin-bottom: 16px;
  }
`;
const ResultPage = () => {
  return (
    <PageLayout>
      <StyledResultWrapper>
        <QuestionBox questionTitle="나는 탕수육을 어떻게 먹을까?" />
        <SubjectiveAnswerBox />
      </StyledResultWrapper>
    </PageLayout>
  );
};

export default ResultPage;
