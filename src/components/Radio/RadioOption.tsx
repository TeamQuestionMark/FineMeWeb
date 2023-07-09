import styled from 'styled-components';
import Radio, { RadioProps } from './Radio';
import { COLORS } from '@/themes/colors';
import { Body1 } from '../Typography';
import renderMultiLineText from '@/utils/renderMultiLineText';
import { inputTransitionCss } from '@/themes/transition';

interface RadioOptionProps extends Pick<RadioProps, 'isClicked'> {
  label: string;
  onInput: (value: string) => void;
}

const StyledRadioOption = styled.li`
  display: flex;
  padding: 10px 13px 10px 8px;
  column-gap: 9px;
  border-radius: 10px;
  background-color: ${COLORS.gray50};
  cursor: pointer;
  ${inputTransitionCss}
`;

const RadioOption: React.FC<RadioOptionProps> = ({
  label,
  onInput,
  isClicked,
}) => {
  return (
    <StyledRadioOption onClick={() => onInput(label)}>
      <Radio isClicked={isClicked} />
      <Body1>{renderMultiLineText(label)}</Body1>
    </StyledRadioOption>
  );
};

export default RadioOption;
