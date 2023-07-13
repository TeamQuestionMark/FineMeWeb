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
import { Body4 } from './Typography';
import { typographyCss } from './Typography/styles';

export type TextFieldRef = HTMLInputElement & {
  isValid: boolean;
  setIsValid: Dispatch<SetStateAction<boolean>>;
  validate: (text?: string) => Promise<boolean>;
};

interface TextFieldProps extends React.HTMLProps<HTMLInputElement> {
  validator?: Validator;
  label?: string;
  type?: HTMLInputTypeAttribute;
}

const TextField = React.forwardRef<TextFieldRef, TextFieldProps>(
  ({ onInput, validator, label, ...textInputProps }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [touched, setTouched] = useState(false);
    const [isValid, setIsValid] = useState<boolean>(true);

    useImperativeHandle(ref, () => ({
      ...(inputRef.current as HTMLInputElement),
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
          console.log('🔸 → isValid:', isValid);
          setIsValid(isValid);
          return isValid;
        }
        setIsValid(true);
        return true;
      },
      [validator],
    );

    const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
      async e => {
        const text = e.target.value;
        validate(text);
        onInput && onInput(e);
      },
      [validate, onInput],
    );

    const handleBlur = useCallback<React.FocusEventHandler<HTMLInputElement>>(
      async e => {
        const text = e.target.value;
        validate(text);
      },
      [validate],
    );

    const handleFocus = useCallback<React.FocusEventHandler<HTMLInputElement>>(
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
        <StyledInput error={!isValid} inputType={textInputProps.type}>
          <input
            ref={inputRef}
            aria-label={label || textInputProps.name || textInputProps.id}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            id={textInputProps.name}
            name={textInputProps.id}
            {...textInputProps}
          />
        </StyledInput>
      </div>
    );
  },
);

TextField.displayName = 'TextField';
export default TextField;

const StyledInput = styled.div<{
  error: boolean;
  inputType?: React.HTMLInputTypeAttribute;
}>`
  input {
    width: -webkit-fill-available;
    padding: 14px 16px;
    border-radius: 10px;
    border: 2px solid ${COLORS.gray900};
    background-color: ${COLORS.white};
    ${typographyCss.body1}
    color: ${COLORS.gray900};

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

    ${({ error }) => error && `border-color: ${COLORS.error100}`};
    :disabled {
      background-color: ${COLORS.gray200};
    }
    :focus,
    :focus-within {
      ${({ error }) => !error && `border-color: ${COLORS.active100}`};
    }
  }
`;
