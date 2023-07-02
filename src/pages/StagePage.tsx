import StageContainer from '@/components/Layout/StageContainer';
import ChipTypeInput from '@/components/Question/ChipTypeInput';
import Question from '@/components/Question/Question';
import RadioTypeInput from '@/components/Question/RadioTypeInput';
import { InputHandler } from '@/types';
import { useState } from 'react';

const CHIP_OPTIONS = ['아메리카노', '이어폰', '포스트잇', '달력', '사원증'];
const RADIO_OPTIONS = [
  `지각할 것 같다고 솔직하게 메신저에 고백한다`,
  `자연스러운 핑계 발견! 
커피 사서 들어가겠다며 주문을 받는다`,
];

const initialInputs = {
  chip: '',
  radio: '',
};

const StagePage = () => {
  const [inputs, setInput] = useState(initialInputs);

  const handleInput: InputHandler = (name: string, value: string) => {
    setInput({ ...inputs, [name]: value });
  };

  return (
    <div>
      <StageContainer>
        <Question number={1} title={`나의 업무 필수템은?`}>
          <ChipTypeInput
            options={CHIP_OPTIONS}
            onInput={handleInput}
            name="chip"
            value={inputs.chip}
          />
        </Question>
        <Question
          number={2}
          title={`지각이 예상되는 출근길..!
아침 회의가 잡힐 분위기다!
내가 할 것 같은 선택은?`}
        >
          <RadioTypeInput
            options={RADIO_OPTIONS}
            name="radio"
            onInput={handleInput}
            value={inputs.radio}
          />
        </Question>
      </StageContainer>
    </div>
  );
};

export default StagePage;
