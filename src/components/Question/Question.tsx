import { COLORS } from '@/themes/colors';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { Body2, Subhead1 } from '../Typography';
import renderMultiLineText from '@/utils/renderMultiLineText';

interface QuestionProps extends PropsWithChildren {
  number: number;
  question: string;
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

const Question = ({ number, question, children }: QuestionProps) => {
  return (
    <div>
      <StyledQuestion>
        <StyledNumber>
          <Body2 color="white">{number}</Body2>
        </StyledNumber>
        <Subhead1>{renderMultiLineText(question)}</Subhead1>
      </StyledQuestion>
      <div style={{ marginLeft: '20px' }}>{children}</div>
    </div>
  );
};

export default Question;
