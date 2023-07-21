import { COLORS } from '@/themes/colors';
import { CSSProperties, MouseEventHandler } from 'react';
import styled, { css } from 'styled-components';
import { Body4 } from './Typography';

type ButtonVariant = 'line' | 'fill';
interface ButtonProps {
  disabled?: boolean;
  variant?: ButtonVariant;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  width?: string;
  children: string;
  style?: CSSProperties;
}

const variants: Record<ButtonVariant, any> = {
  fill: css`
    border-color: ${COLORS.black};
    background-color: ${COLORS.brandColor400};

    :active {
      background-color: ${COLORS.brandColor600};
    }
    :disabled {
      border-color: ${COLORS.gray300};
      background-color: ${COLORS.gray100};
      > label {
        color: ${COLORS.gray300};
      }
    }
  `,
  line: css`
    border-color: ${COLORS.brandColor700};
    background-color: ${COLORS.white};
    > label {
      color: ${COLORS.brandColor700};
    }

    :active {
      background-color: ${COLORS.brandColor50};
    }
    :disabled {
      border-color: ${COLORS.gray300};
      background-color: ${COLORS.gray50};
      > label {
        color: ${COLORS.gray300};
      }
    }
  `,
};

const StyledButton = styled.button<{ variant: ButtonVariant; width: string }>`
  display: flex;
  justify-content: space-evenly;
  width: ${({ width }) => width};
  border: 2px solid;
  border-radius: 6px;
  padding: 13px;

  ${({ variant }) => variants[variant]};

  :disabled {
    cursor: not-allowed;
  }
`;

const Button: React.FC<ButtonProps> = ({
  disabled,
  variant = 'fill',
  width = '-webkit-fill-available',
  onClick,
  children,
  style,
}) => {
  return (
    <StyledButton
      width={width}
      variant={variant}
      style={style}
      disabled={disabled}
      onClick={onClick}
    >
      <Body4 element={'label'}>{children}</Body4>
    </StyledButton>
  );
};

export default Button;
