import { TOAST_DURATION, useToastStore } from '@/store/toast';
import { COLORS } from '@/themes/colors';
import styled from 'styled-components';
import { Caption } from './Typography';

interface ToastProps {}

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 52px;
  width: 100%;
  max-width: 600px;
  z-index: 1000;
`;
const StyledToast = styled.div<{ isVisible: boolean }>`
  padding: 10px 20px;
  border-radius: 5px;
  background-color: ${COLORS.error30};
  box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.16);

  width: 90%;
  text-align: center;

  @keyframes fade {
    0% {
      opacity: 0;
    }

    20% {
      opacity: 1;
    }

    80% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }
  animation-duration: ${TOAST_DURATION}ms;
  animation-name: fade;
`;

const Toast: React.FC<ToastProps> = () => {
  const { isVisible, message } = useToastStore();
  return (
    <Container>
      {isVisible && (
        <StyledToast isVisible={isVisible}>
          <Caption>{message}</Caption>
        </StyledToast>
      )}
    </Container>
  );
};

export default Toast;
