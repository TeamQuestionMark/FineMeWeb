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
import TextField from '../../components/TextField';
import Validator from '@/utils/Validator';

interface StageFormProps extends PropsWithChildren {
  questions: Question[];
  useStageForm: ReturnType<typeof useStageForm>;
  startNumber: number;
}

const Container = styled.ol`
  border-radius: 15px;
  border: 2px solid ${COLORS.gray900};
  background: ${COLORS.white};

  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  padding: 44px 24px 31px 20px;
`;

const StageForm = ({
  questions,
  useStageForm,
  startNumber,
}: StageFormProps) => {
  const { inputs, onInput } = useStageForm;
  const renderAnswerInput = useCallback(
    (question: Question) => {
      switch (question.questionType) {
        case 'chip':
          return (
            <ChipTypeInput
              options={question.multipleChoiceList}
              onInput={onInput}
              name={question.questionId.toString()}
              value={inputs[question.questionId] as number}
            />
          );
        case 'MULTIPLE':
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
        case 'radio':
          return (
            <RadioTypeInput
              options={question.multipleChoiceList}
              onInput={onInput}
              name={question.questionId.toString()}
              value={inputs[question.questionId] as number}
            />
          );
        case 'SUBJECTIVE':
          return (
            <TextField
              name={question.questionId.toString()}
              onInput={e =>
                onInput(e.currentTarget.name, e.currentTarget.value)
              }
              validator={new Validator().required()}
              placeholder="답변을 입력해주세요"
            />
          );
      }
    },
    [inputs, onInput],
  );
  return (
    <Container>
      {questions.map((q, idx) => (
        <QuestionUI
          key={q.questionId}
          number={startNumber + idx}
          title={q.questionTitle}
          subTitle={
            q.questionType === 'MULTIPLE' ? '(중복 체크 가능)' : undefined
          }
        >
          {renderAnswerInput(q)}
        </QuestionUI>
      ))}
    </Container>
  );
};

export default StageForm;
