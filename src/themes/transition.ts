import { css } from 'styled-components';

export const transitionCss = css`
  transition: all 0.1s ease-in;
`;

export const inputTransitionCss = css<{ scale?: number }>`
  transition: transform 0.2s ease-in;
  :hover {
    transform: scale(1.05);
  }
  :active {
    transform: scale(1.08);
  }
`;
