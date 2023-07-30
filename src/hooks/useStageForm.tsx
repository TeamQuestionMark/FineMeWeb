import { InputHandler } from '@/types';
import { Question } from '@/types/stage';
import { useCallback, useMemo, useState } from 'react';

export default function useStageForm() {
  const [inputs, setInput] = useState<ReturnType<typeof initFormValues>>({});
  const [isFormReady, setIsFormReady] = useState(false);

  const initForm = useCallback((questions: Question[]) => {
    setInput(initFormValues(questions));
    setIsFormReady(true);
  }, []);

  const onInput: InputHandler = useCallback(
    (name: keyof typeof inputs, value: string | number) => {
      if (!isFormReady) return;
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
    [inputs, isFormReady],
  );

  /** 모든 inputs 값이 채워지면 true */
  const isCompleted = useMemo(() => {
    if (!isFormReady) return;
    for (const value of Object.values(inputs)) {
      if (value === undefined) return false;
      if (typeof value !== 'number') {
        if (value.length === 0) return false;
      }
    }
    return true;
  }, [inputs, isFormReady]);

  return { inputs, isCompleted, onInput, initForm, isFormReady };
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
      case 'CHECK_BOX':
        initialValues[q.questionId] = [];
        break;
      default:
        initialValues[q.questionId] = '';
    }
  });

  return initialValues;
}
