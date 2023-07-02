import { InputBaseProps, InputHandler } from '@/types';
import Chip from '../Chip/Chip';
import ChipGroup from '../Chip/ChipGroup';
import { useCallback } from 'react';
import styled from 'styled-components';
import { ChoiceOption } from '@/types/stage';

interface ChipTypeInputProps extends InputBaseProps {
  name: string;
  value: number;
  options: ChoiceOption[];
  onInput: InputHandler;
}

const StyledChipTypeInput = styled.div`
  padding: 0 9px;
`;

const ChipTypeInput = ({
  name,
  value,
  onInput,
  options,
}: ChipTypeInputProps) => {
  const handleClickChip = useCallback(
    (value: number) => {
      onInput(name, value);
    },
    [name, onInput],
  );

  return (
    <StyledChipTypeInput>
      <ChipGroup>
        {options.map((option, idx) => (
          <Chip
            key={option.multipleChoiceId}
            onClick={() => handleClickChip(option.multipleChoiceId)}
            isChecked={value === option.multipleChoiceId}
          >
            {option.content}
          </Chip>
        ))}
      </ChipGroup>
    </StyledChipTypeInput>
  );
};

export default ChipTypeInput;
