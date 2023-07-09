import { InputBaseProps } from '@/types';
import { useCallback } from 'react';
import styled from 'styled-components';
import RadioOption from '../Radio/RadioOption';
import { ChoiceOption } from '@/types/stage';

interface RadioTypeInputProps extends InputBaseProps {
  options: ChoiceOption[];
  value: number;
}

const StyledRadioTypeInput = styled.ol`
  display: flex;
  flex-direction: column;
  row-gap: 14px;
`;

const RadioTypeInput = ({
  name,
  value,
  options,
  onInput,
}: RadioTypeInputProps) => {
  const handleClickRadio = useCallback(
    (value: number) => {
      onInput(name, value);
    },
    [name, onInput],
  );

  return (
    <StyledRadioTypeInput>
      {options.map((option, idx) => (
        <RadioOption
          key={idx}
          label={option.content}
          isClicked={value === option.multipleChoiceId}
          onInput={() => handleClickRadio(option.multipleChoiceId)}
        />
      ))}
    </StyledRadioTypeInput>
  );
};

export default RadioTypeInput;
