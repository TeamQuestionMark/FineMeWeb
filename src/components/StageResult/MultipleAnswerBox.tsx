import styled from 'styled-components';
import ChoiceResultAccordion from './ChoiceResultAccordion';

const StyledMultipleAnswerBox = styled.ol`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;
interface MultipleAnswerBoxProps {}
const MultipleAnswerBox: React.FC<MultipleAnswerBoxProps> = ({}) => {
  return (
    <StyledMultipleAnswerBox>
      <ChoiceResultAccordion
        content={`지각할 것 같다고 솔직하게
메신저에 고백한다`}
        nicknames={['김재현']}
      />
      <ChoiceResultAccordion
        content={`자연스러운 핑계 발견! 커피 사서
들어가겠다며 주문을 받는다`}
        nicknames={['김재현']}
      />
    </StyledMultipleAnswerBox>
  );
};

export default MultipleAnswerBox;
