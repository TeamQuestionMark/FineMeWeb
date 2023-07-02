import { COLORS } from '@/themes/colors';
import { useCallback } from 'react';
import IconOX from '@/assets/icons/OXButton/IconOX';
import styled, { CSSProperties } from 'styled-components';
import { inputTransitionCss } from '@/themes/transition';
import { InputBaseProps } from '@/types';

interface OXButtonGroupProps extends InputBaseProps {
  style?: CSSProperties;
}

const Wrapper = styled.div`
  display: flex;
  column-gap: 10px;
`;

const StyledButton = styled.button<{ checked: boolean }>`
  border-radius: 10px;
  border: 1px solid ${COLORS.gray200};
  background-color: ${COLORS.gray50};
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  cursor: pointer;
  ${inputTransitionCss}

  ${({ checked }) =>
    checked &&
    `
    border-color: ${COLORS.brandColor500};
    background-color: ${COLORS.brandColor300};
  `};
`;

const OXButtonGroup = ({ name, value, onInput, style }: OXButtonGroupProps) => {
  const handleInput = useCallback(
    (value: 'o' | 'x') => {
      onInput(name, value);
    },
    [name, onInput],
  );

  return (
    <Wrapper style={style}>
      <StyledButton checked={value === 'o'} onClick={() => handleInput('o')}>
        <IconOX ox="o" checked={value === 'o'} />
      </StyledButton>
      <StyledButton checked={value === 'x'} onClick={() => handleInput('x')}>
        <IconOX ox="x" checked={value === 'x'} />
      </StyledButton>
    </Wrapper>
  );
};

export default OXButtonGroup;
