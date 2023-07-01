import { COLORS } from '@/themes/colors';
import styled from 'styled-components';

const StageContainer = styled.ol`
  border-radius: 15px;
  border: 2px solid ${COLORS.gray900};
  background: ${COLORS.white};

  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  padding: 44px 17px 31px;
`;

export default StageContainer;
