import { COLORS } from '@/themes/colors';
import styled from 'styled-components';
import { Subhead1 } from '../Typography';
import renderMultiLineText from '@/utils/renderMultiLineText';
import IconQuestion from '@/assets/icons/QuestionBox/icon-question@3x.png';
interface QuestionBoxProps {
  questionTitle: string;
}

const StyledQuestionBox = styled.div`
  display: flex;
  column-gap: 8px;

  padding: 20px;
  border-radius: 15px;
  border: 2px solid ${COLORS.brandColor400};
  background: ${COLORS.brandColor50};
`;

const IconQ = styled.div`
  width: 22px;
  height: 22px;
  background-image: url(${IconQuestion});
  background-size: cover;
`;

const QuestionBox: React.FC<QuestionBoxProps> = ({ questionTitle }) => {
  return (
    <StyledQuestionBox>
      <IconQ />
      <Subhead1>{renderMultiLineText(questionTitle)}</Subhead1>
    </StyledQuestionBox>
  );
};

export default QuestionBox;
