import { COLORS } from '@/themes/colors';
import { PropsWithChildren, useCallback } from 'react';
import styled from 'styled-components';
import QuestionUI from '../../components/Question/Question';
import { Question } from '@/types/stage';
import useStageForm from '@/hooks/useStageForm';
import ChipTypeInput from '../../components/Question/ChipTypeInput';
import CheckBoxTypeInput from '../../components/Question/CheckBoxTypeInput';
import OXButtonGroup from '../../components/OXButtonGroup';
import RadioTypeInput from '../../components/Question/RadioTypeInput';
import Validator from '@/utils/Validator';
import TextArea from '@/components/TextArea';
import TextField from '@/components/TextField';

interface StageFormProps extends PropsWithChildren {
  custom?: boolean;
  questions: Question[];
  useStageForm: ReturnType<typeof useStageForm>;
  startNumber: number;
}

const Container = styled.ol`
  background: ${COLORS.white};
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  padding: 0 31px 0 24px;
`;

const StageForm = ({
  custom,
  questions,
  useStageForm,
  startNumber,
}: StageFormProps) => {
  const { inputs, onInput } = useStageForm;
  const renderAnswerInput = useCallback(
    (question: Question) => {
      switch (question.questionType) {
        case 'CHIP':
          return (
            <ChipTypeInput
              options={question.multipleChoiceList}
              onInput={onInput}
              name={question.questionId.toString()}
              value={inputs[question.questionId] as number}
            />
          );
        case 'CHECK_BOX':
          if (Array.isArray(inputs[question.questionId]))
            return (
              <CheckBoxTypeInput
                options={question.multipleChoiceList}
                onInput={onInput}
                name={question.questionId.toString()}
                value={inputs[question.questionId] as number[]}
              />
            );
          break;
        case 'OX':
          return (
            <OXButtonGroup
              onInput={onInput}
              name={question.questionId.toString()}
              value={inputs[question.questionId] as string}
            />
          );
        case 'RADIO':
          return (
            <RadioTypeInput
              options={question.multipleChoiceList}
              onInput={onInput}
              name={question.questionId.toString()}
              value={inputs[question.questionId] as number}
            />
          );
        case 'SUBJECTIVE':
          return !custom ? (
            <TextField
              name={question.questionId.toString()}
              onInput={e =>
                onInput(e.currentTarget.name, e.currentTarget.value)
              }
              validator={new Validator().required()}
              placeholder="답변을 입력해주세요"
              defaultValue={inputs[question.questionId].toString()}
            />
          ) : (
            <TextArea
              name={question.questionId.toString()}
              onInput={e =>
                onInput(e.currentTarget.name, e.currentTarget.value)
              }
              validator={new Validator().max(100).required()}
              maxLength={100}
              placeholder="1~100자까지 작성할 수 있습니다."
              height={45}
              defaultValue={inputs[question.questionId].toString()}
            />
          );
      }
    },
    [custom, inputs, onInput],
  );
  return (
    <Container>
      {questions.map((q, idx) => (
        <QuestionUI
          key={q.questionId}
          number={startNumber + idx}
          title={q.questionTitle}
          subTitle={
            q.questionType === 'CHECK_BOX' ? '(중복 체크 가능)' : undefined
          }
        >
          {renderAnswerInput(q)}
        </QuestionUI>
      ))}
    </Container>
  );
};

export default StageForm;
