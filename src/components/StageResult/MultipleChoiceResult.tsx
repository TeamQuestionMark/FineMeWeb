import { MultipleChoiceAnswerResult } from '@/types/answer';
import styled from 'styled-components';
import ChoiceResultAccordion from './ChoiceResultAccordion';
import QuestionBox from './QuestionBox';

const StyledMultipleChoiceResult = styled.ol`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;
interface MultipleChoiceResultProps {
  questionTitle: string;
  answerResults: MultipleChoiceAnswerResult;
}
const MultipleChoiceResult: React.FC<MultipleChoiceResultProps> = ({
  questionTitle,
  answerResults,
}) => {
  return (
    <div>
      <QuestionBox questionTitle={questionTitle} />
      <StyledMultipleChoiceResult>
        {Object.entries(answerResults).map(([answer, nicknames], idx) => (
          <ChoiceResultAccordion
            key={idx}
            content={answer}
            nicknames={nicknames}
          />
        ))}
      </StyledMultipleChoiceResult>
    </div>
  );
};

export default MultipleChoiceResult;
