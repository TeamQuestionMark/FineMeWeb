import { COLORS, Color } from '@/themes/colors';
import React, { ElementType } from 'react';
import { TypographyVariant, typographyCss } from './styles';
import styled from 'styled-components';

export interface TypographyProps
  extends React.PropsWithChildren,
    React.HTMLProps<
      HTMLAnchorElement &
        HTMLParagraphElement &
        HTMLLabelElement &
        HTMLHeadingElement &
        HTMLSpanElement
    > {
  color?: Color;
  element?: ElementType;
}

const StyledTypography = styled.p<{
  variant: TypographyVariant;
  color: string;
}>`
  ${({ variant }) => typographyCss[variant]};
  ${({ color }) => `color: ${color}`};
`;

export function withTypographyBase(
  element: ElementType,
  variant: TypographyVariant,
) {
  function Typography({
    className,
    children,
    color = 'gray900',
    style,
    element: elementProps,
    ...props
  }: TypographyProps) {
    return (
      <StyledTypography
        as={elementProps || element}
        variant={variant}
        color={COLORS[color]}
        style={style}
        {...props}
      >
        {children}
      </StyledTypography>
    );
  }
  return Typography;
}
