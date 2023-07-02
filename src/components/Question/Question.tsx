import { COLORS } from '@/themes/colors';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { Body2, Subhead1 } from '../Typography';
import renderMultiLineText from '@/utils/renderMultiLineText';

interface QuestionProps extends PropsWithChildren {
  number: number;
  title: string;
}

const StyledQuestion = styled.div`
  display: flex;
  column-gap: 8px;
  margin-bottom: 17px;
`;

const StyledNumber = styled.div`
  width: 22px;
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

const Question = ({ number, title, children }: QuestionProps) => {
  return (
    <div>
      <StyledQuestion>
        <StyledNumber>
          <Body2 color="white">{number}</Body2>
        </StyledNumber>
        <Subhead1>{renderMultiLineText(title)}</Subhead1>
      </StyledQuestion>
      <StyledInputWrapper>{children}</StyledInputWrapper>
    </div>
  );
};

export default Question;
