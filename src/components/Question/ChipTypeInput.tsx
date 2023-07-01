import { InputBaseProps, InputHandler } from '@/types';
import Chip from '../Chip/Chip';
import ChipGroup from '../Chip/ChipGroup';
import { useCallback } from 'react';
import styled from 'styled-components';

interface ChipTypeInputProps extends InputBaseProps {
  name: string;
  options: string[];
  onInput: InputHandler;
}

const StyledChipTypeInput = styled.div`
  padding: 0 17px 0 30px;
`;

const ChipTypeInput = ({
  name,
  value,
  onInput,
  options,
}: ChipTypeInputProps) => {
  const handleClickChip = useCallback(
    (value: string) => {
      onInput(name, value);
    },
    [name, onInput],
  );

  return (
    <StyledChipTypeInput>
      <ChipGroup>
        {options.map((option, idx) => (
          <Chip
            key={idx}
            onClick={handleClickChip}
            isChecked={value === option}
          >
            {option}
          </Chip>
        ))}
      </ChipGroup>
    </StyledChipTypeInput>
  );
};

export default ChipTypeInput;
