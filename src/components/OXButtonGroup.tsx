import { COLORS } from '@/themes/colors';
import { useCallback, useState } from 'react';
import IconOX from '@/assets/icons/OXButton/IconOX';
import styled, { CSSProperties } from 'styled-components';
import { transitionCss } from '@/themes/transition';

interface OXButtonGroupProps {
  style?: CSSProperties;
  onChange: (value: boolean) => void;
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
  ${transitionCss}

  ${({ checked }) =>
    checked &&
    `
    border-color: ${COLORS.brandColor500};
    background-color: ${COLORS.brandColor300};
  `};
`;

const OXButtonGroup = ({ onChange, style }: OXButtonGroupProps) => {
  const [checkedValue, setCheckedValue] = useState<'o' | 'x'>();
  const handlePress = useCallback(
    (value: 'o' | 'x') => {
      setCheckedValue(value);
      onChange(value === 'o');
    },
    [onChange],
  );

  return (
    <Wrapper style={style}>
      <StyledButton
        checked={checkedValue === 'o'}
        onClick={() => handlePress('o')}
      >
        <IconOX ox="o" checked={checkedValue === 'o'} />
      </StyledButton>
      <StyledButton
        checked={checkedValue === 'x'}
        onClick={() => handlePress('x')}
      >
        <IconOX ox="x" checked={checkedValue === 'x'} />
      </StyledButton>
    </Wrapper>
  );
};

export default OXButtonGroup;
