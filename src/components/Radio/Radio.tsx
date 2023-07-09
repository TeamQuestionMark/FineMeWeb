import { useMemo } from 'react';
import styled, { CSSProperties } from 'styled-components';
import RadioDeselectedDisabled from '@/assets/icons/Radio/icon-radio-deselected-disabled@3x.png';
import RadioDeselectedEnabled from '@/assets/icons/Radio/icon-radio-deselected-enabled@3x.png';
import RadioSelectedDisabled from '@/assets/icons/Radio/icon-radio-selected-disabled@3x.png';
import RadioSelectedEnabled from '@/assets/icons/Radio/icon-radio-selected-enabled@3x.png';

export interface RadioProps {
  style?: CSSProperties;
  disabled?: boolean;
  isClicked: boolean;
  onClick?: () => void;
}

const StyledRadio = styled.button<{ imageSrc: string }>`
  width: 20px;
  height: 20px;
  background-image: ${({ imageSrc }) => `url(${imageSrc})`};
  background-size: contain;

  :disabled {
    cursor: not-allowed;
  }
`;

const Radio = ({ onClick, isClicked, disabled, style }: RadioProps) => {
  const radioImage = useMemo(() => {
    if (disabled) {
      if (isClicked) {
        return RadioSelectedDisabled;
      } else {
        return RadioDeselectedDisabled;
      }
    } else {
      if (isClicked) {
        return RadioSelectedEnabled;
      } else {
        return RadioDeselectedEnabled;
      }
    }
  }, [disabled, isClicked]);

  return (
    <StyledRadio
      imageSrc={radioImage}
      disabled={disabled}
      style={style}
      onClick={!disabled ? onClick : undefined}
    />
  );
};

export default Radio;
