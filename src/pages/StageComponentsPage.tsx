import Chip from '@/components/Chip/Chip';
import ChipGroup from '@/components/Chip/ChipGroup';
import OXButtonGroup from '@/components/OXButtonGroup';
import { useState } from 'react';

const CHIP_INPUTS = {
  아메리카노: false,
  이어폰: false,
  포스트잇: false,
  달력: false,
  사원증: false,
};

const StageComponentsPage = () => {
  const [chipInputs, setChipInputs] = useState(CHIP_INPUTS);
  const [OX, setOX] = useState<Boolean>();

  const handleChangeOX = (value: boolean) => {
    setOX(value);
  };

  const handleClickChip = (value: string) => {
    setChipInputs(prev => ({
      ...prev,
      [value]: !prev[value as keyof typeof CHIP_INPUTS],
    }));
  };
  return (
    <div>
      <ChipGroup>
        {Object.entries(chipInputs).map(([label, isChecked]) => (
          <Chip
            key={label}
            onClick={handleClickChip}
            isChecked={isChecked}
            disabled={label === '사원증'}
          >
            {label}
          </Chip>
        ))}
      </ChipGroup>
      <OXButtonGroup onChange={handleChangeOX} />
    </div>
  );
};

export default StageComponentsPage;
