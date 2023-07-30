import { css } from 'styled-components';
import { fontWeight } from '@/themes/typography';

export const typographyCss = {
  display: css`
    font-size: 28px;
    font-family: SUIT Variable;
    font-weight: ${fontWeight.bold};
    line-height: 38px;
  `,
  headline2: css`
    font-size: 24px;
    font-family: SUIT Variable;
    font-weight: ${fontWeight.extraBold};
    line-height: 34px;
  `,
  headline1: css`
    font-size: 24px;
    font-family: SUIT Variable;
    font-weight: ${fontWeight.bold};
    line-height: 34px;
  `,
  subhead2: css`
    font-size: 24px;
    font-weight: ${fontWeight.regular};
    font-family: SUIT Variable;
    line-height: 34px;
  `,
  subhead1: css`
    font-size: 20px;
    font-family: SUIT Variable;
    font-weight: ${fontWeight.bold};
    line-height: 24px;
  `,
  body4: css`
    font-size: 16px;
    font-family: SUIT Variable;
    font-weight: ${fontWeight.bold};
    line-height: 24px;
  `,
  body3: css`
    font-size: 16px;
    font-weight: ${fontWeight.regular};
    font-family: SUIT Variable;
    line-height: 20px;
  `,
  body2: css`
    font-size: 14px;
    font-family: SUIT Variable;
    font-weight: ${fontWeight.bold};
    line-height: 20px;
  `,
  body1: css`
    font-size: 14px;
    font-weight: ${fontWeight.regular};
    font-family: SUIT Variable;
    line-height: 20px;
  `,
  caption: css`
    font-size: 13px;
    font-weight: ${fontWeight.regular};
    font-family: SUIT Variable;
    line-height: 20px;
  `,
};

export type TypographyVariant = keyof typeof typographyCss;
