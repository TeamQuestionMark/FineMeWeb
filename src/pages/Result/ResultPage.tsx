import PageLayout from '@/components/Layout/PageLayout';
import MultipleAnswerBox from '@/components/StageResult/MultipleAnswerBox';
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

        <QuestionBox
          questionTitle={`지각이 예상되는 출근길..!
아침 회의가 잡힐 분위기다!`}
        />
        <MultipleAnswerBox />
      </StyledResultWrapper>
    </PageLayout>
  );
};

export default ResultPage;
