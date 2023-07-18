import { COLORS } from '@/themes/colors';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { Body2, Caption, Subhead1 } from '../Typography';
import renderMultiLineText from '@/utils/renderMultiLineText';

interface QuestionProps extends PropsWithChildren {
  number: number;
  title: string;
  subTitle?: string;
}

const StyledQuestion = styled.div`
  display: flex;
  column-gap: 8px;
  margin-bottom: 17px;
`;

const StyledNumber = styled.div`
  min-width: 22px;
  height: 22px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  border-radius: 22px;
  background-color: ${COLORS.gray900};
`;

const StyledInputWrapper = styled.div`
  padding: 0 10px 0 21px;
`;

const QuestionUI = ({ number, title, subTitle, children }: QuestionProps) => {
  return (
    <li>
      <StyledQuestion>
        <StyledNumber>
          <Body2 color="white">{number}</Body2>
        </StyledNumber>
        <div>
          <Subhead1>{renderMultiLineText(title)}</Subhead1>
          {subTitle && <Caption color="gray400">{subTitle}</Caption>}
        </div>
      </StyledQuestion>
      <StyledInputWrapper>{children}</StyledInputWrapper>
    </li>
  );
};

export default QuestionUI;
