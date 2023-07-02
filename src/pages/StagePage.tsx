import CheckBoxOption from '@/components/CheckBox/CheckBoxOption';
import StageContainer from '@/components/Layout/StageContainer';
import CheckBoxTypeInput from '@/components/Question/CheckBoxTypeInput';
import ChipTypeInput from '@/components/Question/ChipTypeInput';
import Question from '@/components/Question/Question';
import RadioTypeInput from '@/components/Question/RadioTypeInput';
import { InputHandler } from '@/types';
import { ChoiceOption } from '@/types/stage';
import { useState } from 'react';

const CHIP_OPTIONS: ChoiceOption[] = [
  {
    multipleChoiceId: 0,
    content: '아메리카노',
  },
  {
    multipleChoiceId: 1,
    content: '이어폰',
  },
  {
    multipleChoiceId: 2,
    content: '포스트잇',
  },
  {
    multipleChoiceId: 3,
    content: '달력',
  },
  {
    multipleChoiceId: 4,
    content: '사원증',
  },
];

const RADIO_OPTIONS: ChoiceOption[] = [
  {
    multipleChoiceId: 0,
    content: `지각할 것 같다고 솔직하게 메신저에 고백한다`,
  },
  {
    multipleChoiceId: 1,
    content: `자연스러운 핑계 발견! 
커피 사서 들어가겠다며 주문을 받는다`,
  },
];

interface FormValues {
  chip: number;
  radio: number;
  checkbox: number[];
}

const initialInputs: FormValues = {
  chip: -1,
  radio: -1,
  checkbox: [],
};

const StagePage = () => {
  const [inputs, setInput] = useState(initialInputs);

  const handleInput: InputHandler = (name: string, value: string | number) => {
    setInput({ ...inputs, [name]: value });
  };

  const handleMultipleChoice: InputHandler = (name, value) => {
    const list = [...(inputs[name as keyof FormValues] as number[])];
    const choiceId = value as number;
    const idx = list.indexOf(choiceId);

    if (idx === -1) {
      list.push(choiceId);
    } else {
      list.splice(idx, 1);
    }
    setInput({ ...inputs, [name]: list });
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
        <Question
          number={3}
          title={'내가 가장 좋아하는 간식(커피) 타임은 언제?'}
        >
          <CheckBoxTypeInput
            options={RADIO_OPTIONS}
            value={inputs.checkbox}
            name={'checkbox'}
            onInput={handleMultipleChoice}
          />
        </Question>
      </StageContainer>
    </div>
  );
};

export default StagePage;
