import { useMemo } from 'react';
import styled, { CSSProperties } from 'styled-components';
import CheckBoxDeselectedDisabled from '@/assets/icons/CheckBox/icon-checkbox-deselected-disabled@3x.png';
import CheckBoxDeselectedEnabled from '@/assets/icons/CheckBox/icon-checkbox-deselected-enabled@3x.png';
import CheckBoxSelectedDisabled from '@/assets/icons/CheckBox/icon-checkbox-selected-disabled@3x.png';
import CheckBoxSelectedEnabled from '@/assets/icons/CheckBox/icon-checkbox-selected-enabled@3x.png';

export interface CheckBoxProps {
  style?: CSSProperties;
  disabled?: boolean;
  isClicked: boolean;
  onClick?: () => void;
}

const StyledCheckBox = styled.button<{ imageSrc: string }>`
  min-width: 20px;
  min-height: 20px;
  background-image: ${({ imageSrc }) => `url(${imageSrc})`};
  background-size: contain;
  background-repeat: no-repeat;

  :disabled {
    cursor: not-allowed;
  }
`;

const CheckBox = ({ onClick, isClicked, disabled, style }: CheckBoxProps) => {
  const checkBoxImage = useMemo(() => {
    if (disabled) {
      if (isClicked) {
        return CheckBoxSelectedDisabled;
      } else {
        return CheckBoxDeselectedDisabled;
      }
    } else {
      if (isClicked) {
        return CheckBoxSelectedEnabled;
      } else {
        return CheckBoxDeselectedEnabled;
      }
    }
  }, [disabled, isClicked]);

  return (
    <StyledCheckBox
      imageSrc={checkBoxImage}
      disabled={disabled}
      style={style}
      onClick={!disabled ? onClick : undefined}
    />
  );
};

export default CheckBox;
