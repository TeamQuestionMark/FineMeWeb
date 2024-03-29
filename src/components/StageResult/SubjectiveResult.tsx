import { COLORS } from '@/themes/colors';
import styled from 'styled-components';
import IconAnswer from '@/assets/icons/AnswerBox/icon-answer@3x.png';
import { Body1, Body2 } from '../Typography';
import QuestionBox from './QuestionBox';
import { SubjectiveAnswerResult } from '@/types/answer';

const StyledSubjectiveResult = styled.ol`
  display: flex;
  flex-direction: column;
  row-gap: 25px;
  border-radius: 15px;
  border: 2px solid ${COLORS.gray900};
  padding: 20px;
`;

const StyledAnswer = styled.li`
  display: flex;
  justify-content: flex-end;
  text-align: end;
  column-gap: 8px;
`;

const IconA = styled.div`
  min-width: 22px;
  height: 22px;
  background-image: url(${IconAnswer});
  background-size: cover;
`;

interface AnswerProps {
  answer: string;
  nickname: string;
}
const Answer: React.FC<AnswerProps> = ({ answer, nickname }) => {
  return (
    <StyledAnswer>
      <div>
        <Body2>{answer}</Body2>
        <Body1 color="gray400">{nickname}&nbsp;님의 답변</Body1>
      </div>
      <IconA />
    </StyledAnswer>
  );
};

interface SubjectiveResultProps {
  questionTitle: string;
  answerResults: SubjectiveAnswerResult[];
}
const SubjectiveResult: React.FC<SubjectiveResultProps> = ({
  questionTitle,
  answerResults,
}) => {
  return (
    <div>
      <QuestionBox questionTitle={questionTitle} />
      <StyledSubjectiveResult>
        {answerResults.map((result, idx) => (
          <Answer
            key={idx}
            answer={result.answerText}
            nickname={result.nickname}
          />
        ))}
      </StyledSubjectiveResult>
    </div>
  );
};

export default SubjectiveResult;
