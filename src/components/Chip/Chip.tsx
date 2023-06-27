import { COLORS } from '@/themes/colors';
import { MouseEventHandler, PropsWithChildren, useCallback } from 'react';
import styled from 'styled-components';
import { Body1 } from '../Typography';
import { transitionCss } from '@/themes/transition';

interface ChipProps extends PropsWithChildren {
  isChecked: boolean;
  children: string;
  onClick: (
    value: string,
    e?: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ) => void;
}

const StyledChip = styled.div<{ checked: boolean }>`
  border-radius: 36px;
  border: 2px ${COLORS.gray300} solid;
  padding: 8px 16px;
  background-color: ${COLORS.gray50};
  width: fit-content;
  cursor: pointer;
  ${transitionCss}

  ${({ checked }) =>
    checked &&
    `
    border-color: ${COLORS.brandColor500};
    background-color: ${COLORS.brandColor300};
  `};
`;

const Chip = ({ onClick, isChecked, children }: ChipProps) => {
  const handleClick = useCallback<MouseEventHandler<HTMLInputElement>>(
    e => {
      onClick(children, e);
    },
    [children, onClick],
  );

  return (
    <StyledChip checked={isChecked} onClick={handleClick}>
      <Body1 color={isChecked ? 'brandColor800' : 'gray600'}>{children}</Body1>
    </StyledChip>
  );
};

export default Chip;
