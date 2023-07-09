import { InputBaseProps, MultiInputBaseProps } from '@/types';
import { useCallback } from 'react';
import styled from 'styled-components';
import CheckBoxOption from '../CheckBox/CheckBoxOption';
import { ChoiceOption } from '@/types/stage';

interface CheckBoxTypeInputProps extends MultiInputBaseProps {
  options: ChoiceOption[];
}

const StyledCheckBoxTypeInput = styled.ol`
  display: flex;
  flex-direction: column;
  row-gap: 14px;
`;

const CheckBoxTypeInput = ({
  name,
  value,
  options,
  onInput,
}: CheckBoxTypeInputProps) => {
  const handleClickCheckBox = useCallback(
    (value: number) => {
      onInput(name, value);
    },
    [name, onInput],
  );

  return (
    <StyledCheckBoxTypeInput>
      {options.map((option, idx) => (
        <CheckBoxOption
          key={idx}
          label={option.content}
          isClicked={value.includes(option.multipleChoiceId)}
          onInput={() => handleClickCheckBox(option.multipleChoiceId)}
        />
      ))}
    </StyledCheckBoxTypeInput>
  );
};

export default CheckBoxTypeInput;
