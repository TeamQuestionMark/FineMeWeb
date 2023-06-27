import Chip from '@/components/Chip/Chip';
import ChipGroup from '@/components/Chip/ChipGroup';
import OXButtonGroup from '@/components/OXButtonGroup';
import TextField, { TextFieldRef } from '@/components/TextField';
import Validator from '@/utils/Validator';
import { useRef, useState } from 'react';

const CHIP_INPUTS = {
  아메리카노: false,
  이어폰: false,
  포스트잇: false,
  달력: false,
  사원증: false,
};

const validator = new Validator().required().max(5);

const StageComponentsPage = () => {
  const [chipInputs, setChipInputs] = useState(CHIP_INPUTS);
  const inputRef = useRef<TextFieldRef>(null);
  const [OX, setOX] = useState<Boolean>();
  const [text, setText] = useState('');

  const handleChangeOX = (value: boolean) => {
    setOX(value);
  };

  const handleClickChip = (value: string) => {
    setChipInputs(prev => ({
      ...prev,
      [value]: !prev[value as keyof typeof CHIP_INPUTS],
    }));
    inputRef.current?.setIsValid(false);
  };

  const handleChangeInput: React.FormEventHandler<HTMLInputElement> = e => {
    setText(e.currentTarget.value);
  };
  return (
    <div>
      <TextField
        ref={inputRef}
        label="이름"
        id="name"
        value={text}
        onInput={handleChangeInput}
        validator={validator}
        placeholder="이름을 입력해주세요"
      />
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