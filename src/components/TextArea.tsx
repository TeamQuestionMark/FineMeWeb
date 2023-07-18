import { COLORS } from '@/themes/colors';
import Validator from '@/utils/Validator';
import React, {
  ChangeEventHandler,
  Dispatch,
  HTMLInputTypeAttribute,
  SetStateAction,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { Body2, Body4 } from './Typography';
import { typographyCss } from './Typography/styles';

export type TextAreaRef = HTMLTextAreaElement & {
  isValid: boolean;
  setIsValid: Dispatch<SetStateAction<boolean>>;
  validate: (text?: string) => Promise<boolean>;
};

interface TextAreaProps extends React.HTMLProps<HTMLTextAreaElement> {
  validator?: Validator;
  label?: string;
  type?: HTMLInputTypeAttribute;
  noSpaces?: boolean;
}

const TextArea = React.forwardRef<TextAreaRef, TextAreaProps>(
  (
    { onInput, validator, label, noSpaces, maxLength = 100, ...textInputProps },
    ref,
  ) => {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [touched, setTouched] = useState(false);
    const [isValid, setIsValid] = useState<boolean>(true);
    const [length, setLength] = useState(0);

    useImperativeHandle(ref, () => ({
      ...(inputRef.current as HTMLTextAreaElement),
      isValid,
      setIsValid,
      validate,
    }));

    /** validator prop이 있을 경우 onChangeText, onBlur, onFocus 시 유효성 검증 및 status 업데이트 */
    const validate = useCallback(
      async (text?: string) => {
        const target = text !== undefined ? text : inputRef.current?.value;
        if (validator && target !== undefined) {
          const isValid = await validator.validate(target);
          setIsValid(isValid);
          return isValid;
        }
        setIsValid(true);
        return true;
      },
      [validator],
    );

    const handleChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
      async e => {
        if (noSpaces) e.target.value = e.target.value.replace(/\s/g, '');
        const text = e.target.value;
        validate(text);
        setLength(text.length);
        onInput && onInput(e);
      },
      [noSpaces, validate, onInput],
    );

    const handleBlur = useCallback<
      React.FocusEventHandler<HTMLTextAreaElement>
    >(
      async e => {
        const text = e.target.value;
        validate(text);
      },
      [validate],
    );

    const handleFocus = useCallback<
      React.FocusEventHandler<HTMLTextAreaElement>
    >(
      async e => {
        if (touched) {
          const text = e.target.value;
          validate(text);
        } else {
          setIsValid(true);
          setTouched(true);
        }
      },
      [validate, touched],
    );

    return (
      <div>
        {label && (
          <Body4
            style={{ marginBottom: '6px', marginLeft: '10px' }}
            element={'label'}
            htmlFor={textInputProps.id || textInputProps.name}
          >
            {label}
          </Body4>
        )}
        <StyledTextarea error={!isValid} inputType={textInputProps.type}>
          <textarea
            ref={inputRef}
            aria-label={label || textInputProps.name || textInputProps.id}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            id={textInputProps.name}
            name={textInputProps.id}
            {...textInputProps}
          />
          {maxLength && (
            <Body2 color="gray200" style={{ textAlign: 'right' }}>
              {length} / {maxLength}
            </Body2>
          )}
        </StyledTextarea>
      </div>
    );
  },
);

TextArea.displayName = 'TextArea';
export default TextArea;

const StyledTextarea = styled.div<{
  error: boolean;
  inputType?: React.HTMLInputTypeAttribute;
}>`
  padding: 14px;
  border-radius: 10px;
  border: 2px solid ${COLORS.gray900};
  background-color: ${COLORS.white};

  ${({ error }) => error && `border-color: ${COLORS.error100}`};
  :has(textarea:disabled) {
    background-color: ${COLORS.gray200};
  }
  :has(textarea:focus),
  :has(textarea:focus-within) {
    ${({ error }) => !error && `border-color: ${COLORS.active100}`};
  }

  textarea {
    ${typographyCss.body1}
    color: ${COLORS.gray900};
    overflow-wrap: break-word;
    width: -webkit-fill-available;
    height: 45px;

    ${({ inputType }) =>
      inputType === 'date' &&
      `
    border: none;
    border-radius: 0;
    border-bottom: 2px #D9D9D9 solid;
  `};

    ::placeholder {
      ${typographyCss.body1}
      color: ${COLORS.textPlaceholder};
    }
  }
`;
