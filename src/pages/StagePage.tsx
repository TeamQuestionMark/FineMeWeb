import Chip from '@/components/Chip/Chip';
import ChipGroup from '@/components/Chip/ChipGroup';
import StageContainer from '@/components/Layout/StageContainer';
import Question from '@/components/Question/Question';
import { useState } from 'react';

const CHIP_INPUTS = {
  아메리카노: false,
  이어폰: false,
  포스트잇: false,
  달력: false,
  사원증: false,
};

const initialInputs = {
  chip: '',
};

const StagePage = () => {
  const [inputs, setInput] = useState(initialInputs);

  const handleClickChip = (value: string) => {
    setInput({ ...inputs, chip: value });
  };

  return (
    <div>
      <StageContainer>
        <Question number={1} question={`나의 업무 필수템은?`}>
          <ChipGroup>
            {Object.entries(CHIP_INPUTS).map(([label, isChecked]) => (
              <Chip
                key={label}
                onClick={handleClickChip}
                isChecked={label === inputs.chip}
                disabled={label === '사원증'}
              >
                {label}
              </Chip>
            ))}
          </ChipGroup>
        </Question>
      </StageContainer>
    </div>
  );
};

export default StagePage;
