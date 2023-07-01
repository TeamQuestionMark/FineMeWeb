import { InputBaseProps } from '@/types';
import { useCallback } from 'react';
import styled from 'styled-components';
import RadioOption from '../Radio/RadioOption';

interface RadioTypeInputProps extends InputBaseProps {
  options: string[];
}

const StyledRadioTypeInput = styled.ol`
  display: flex;
  padding: 0px 18px 0px 20px;
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
    (value: string) => {
      onInput(name, value);
    },
    [name, onInput],
  );

  return (
    <StyledRadioTypeInput>
      {options.map((option, idx) => (
        <RadioOption
          key={idx}
          label={option}
          isClicked={value === option}
          onInput={handleClickRadio}
        />
      ))}
    </StyledRadioTypeInput>
  );
};

export default RadioTypeInput;
