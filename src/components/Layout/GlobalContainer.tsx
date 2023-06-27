import { BREAK_POINT, GLOBAL_PADDING_BOTTOM } from '@/themes/layout';
import styled from 'styled-components';

export const GlobalContainer = styled.main`
  max-width: ${BREAK_POINT}px;
  margin-right: auto;
  margin-left: auto;
  padding: 0 0 ${GLOBAL_PADDING_BOTTOM};
`;
