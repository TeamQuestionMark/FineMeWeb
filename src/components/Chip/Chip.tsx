import { COLORS } from '@/themes/colors';
import { MouseEventHandler, PropsWithChildren, useCallback } from 'react';
import styled from 'styled-components';
import { Body1 } from '../Typography';
import { transitionCss } from '@/themes/transition';

interface ChipProps extends PropsWithChildren {
  isChecked: boolean;
  children: string;
  disabled?: boolean;
  onClick: (
    value: string,
    e?: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ) => void;
}

const StyledChip = styled.div<{ checked: boolean; disabled?: boolean }>`
  border-radius: 36px;
  border: 2px ${COLORS.gray300} solid;
  padding: 8px 16px;
  background-color: ${COLORS.white};
  width: fit-content;
  cursor: pointer;
  ${transitionCss}

  ${({ checked }) =>
    checked &&
    `
    border-color: ${COLORS.brandColor500};
    background-color: ${COLORS.brandColor300};
  `};

  ${({ disabled }) =>
    disabled &&
    `
    background-color: ${COLORS.gray50};
    cursor: not-allowed;
  `};
`;

const Chip = ({ onClick, isChecked, children, disabled }: ChipProps) => {
  const handleClick = useCallback<MouseEventHandler<HTMLInputElement>>(
    e => {
      !disabled && onClick(children, e);
    },
    [children, disabled, onClick],
  );

  return (
    <StyledChip disabled={disabled} checked={isChecked} onClick={handleClick}>
      <Body1 color={isChecked ? 'brandColor800' : 'gray600'}>{children}</Body1>
    </StyledChip>
  );
};

export default Chip;
