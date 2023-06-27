import { useMemo } from 'react';
import styled, { CSSProperties } from 'styled-components';
import SwitchDeselectedDisabled from '@/assets/icons/Switch/icon-switch-deselected-disabled@3x.png';
import SwitchDeselectedEnabled from '@/assets/icons/Switch/icon-switch-deselected-enabled@3x.png';
import SwitchSelectedDisabled from '@/assets/icons/Switch/icon-switch-selected-disabled@3x.png';
import SwitchSelectedEnabled from '@/assets/icons/Switch/icon-switch-selected-enabled@3x.png';

interface SwitchProps {
  style?: CSSProperties;
  disabled?: boolean;
  isClicked: boolean;
  onClick?: () => void;
}

const StyledSwitch = styled.button<{ imageSrc: string }>`
  width: 41px;
  height: 24px;
  background-image: ${({ imageSrc }) => `url(${imageSrc})`};
  background-size: contain;

  :disabled {
    cursor: not-allowed;
  }
`;

const Switch = ({ onClick, isClicked, disabled, style }: SwitchProps) => {
  const switchImage = useMemo(() => {
    if (disabled) {
      if (isClicked) {
        return SwitchSelectedDisabled;
      } else {
        return SwitchDeselectedDisabled;
      }
    } else {
      if (isClicked) {
        return SwitchSelectedEnabled;
      } else {
        return SwitchDeselectedEnabled;
      }
    }
  }, [disabled, isClicked]);

  return (
    <StyledSwitch
      imageSrc={switchImage}
      disabled={disabled}
      style={style}
      onClick={!disabled ? onClick : undefined}
    />
  );
};

export default Switch;
