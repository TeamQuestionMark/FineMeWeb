import { InputHandler } from '@/types';
import { Question } from '@/types/stage';
import { useCallback, useMemo, useState } from 'react';

export default function useStageForm(questions: Question[]) {
  const [inputs, setInput] = useState(initFormValues(questions));

  const onInput: InputHandler = useCallback(
    (name: keyof typeof inputs, value: string | number) => {
      if (
        typeof inputs[name] === 'string' ||
        typeof inputs[name] === 'number'
      ) {
        setInput({ ...inputs, [name]: value });
      } else if (typeof value === 'number') {
        const newChoice = makeNewMultipleChoice(inputs, name, value);
        setInput({ ...inputs, [name]: newChoice });
      }
    },
    [inputs],
  );

  /** 모든 inputs 값이 채워지면 true */
  const isCompleted = useMemo(() => {
    for (const value of Object.values(inputs)) {
      if (typeof value === 'string' || Array.isArray(value)) {
        if (value.length === 0) return false;
      }
    }
    return true;
  }, [inputs]);

  return { inputs, isCompleted, onInput };
}

function makeNewMultipleChoice<T>(inputs: T, name: keyof T, value: number) {
  const list = [...(inputs[name] as Array<number>)];
  const choiceId = value as number;
  const idx = list.indexOf(choiceId);

  if (idx === -1) {
    list.push(choiceId);
  } else {
    list.splice(idx, 1);
  }
  return list;
}

function initFormValues(questions: Question[]) {
  const initialValues: Record<string, string | number | Array<number>> = {};

  questions.forEach(q => {
    switch (q.questionType) {
      case 'MULTIPLE':
        initialValues[q.questionId] = [];
        break;
      default:
        initialValues[q.questionId] = '';
    }
  });

  return initialValues;
}
