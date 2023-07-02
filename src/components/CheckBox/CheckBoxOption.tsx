import { COLORS } from '@/themes/colors';
import { inputTransitionCss } from '@/themes/transition';
import styled from 'styled-components';
import CheckBox, { CheckBoxProps } from './CheckBox';
import renderMultiLineText from '@/utils/renderMultiLineText';
import { Body1 } from '../Typography';

interface CheckBoxOptionProps extends Pick<CheckBoxProps, 'isClicked'> {
  label: string;
  onInput: (value: string) => void;
}

const StyledCheckBoxOption = styled.li`
  display: flex;
  padding: 10px 13px 10px 8px;
  column-gap: 9px;
  border-radius: 10px;
  background-color: ${COLORS.gray50};
  cursor: pointer;
  ${inputTransitionCss}
`;

const CheckBoxOption = ({ label, onInput, isClicked }: CheckBoxOptionProps) => {
  return (
    <StyledCheckBoxOption onClick={() => onInput(label)}>
      <CheckBox isClicked={isClicked} />
      <Body1>{renderMultiLineText(label)}</Body1>
    </StyledCheckBoxOption>
  );
};

export default CheckBoxOption;
