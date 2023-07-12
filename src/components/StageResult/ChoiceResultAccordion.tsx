import { COLORS } from '@/themes/colors';
import styled from 'styled-components';
import IconAnswer from '@/assets/icons/AnswerBox/icon-answer@3x.png';
import { Body1, Body2, Caption } from '../Typography';
import renderMultiLineText from '@/utils/renderMultiLineText';
import AccordionBtnUp from '@/assets/icons/AnswerBox/icon-accordion-btn-up.png';
import AccordionBtnDown from '@/assets/icons/AnswerBox/icon-accordion-btn-down.png';
import { useState } from 'react';
import { inputTransitionCss } from '@/themes/transition';

const Container = styled.li`
  border-radius: 15px;
  border: 2px solid ${COLORS.gray900};
  padding: 16px 20px 20px;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const StyledHeaderLeft = styled.div`
  display: flex;
  column-gap: 8px;
  align-items: baseline;
`;

const IconA = styled.div`
  width: 22px;
  height: 22px;
  background-image: url(${IconAnswer});
  background-size: cover;
`;

const StyledNumberLabel = styled.span`
  border-radius: 5px;
  background: ${COLORS.brandColor200};
  padding: 2px 5px;
`;

const StyledHeaderRight = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
`;

const AccordionButton = styled.button<{ open: boolean }>`
  width: 30px;
  height: 30px;
  background-image: ${({ open }) =>
    open ? `url(${AccordionBtnUp})` : `url(${AccordionBtnDown})`};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  ${inputTransitionCss}
`;

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  text-align: end;
  margin-top: 16px;
`;

interface ChoiceResultAccordionProps {
  content: string;
  nicknames: string[];
}
const ChoiceResultAccordion: React.FC<ChoiceResultAccordionProps> = ({
  content,
  nicknames,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Container>
      <StyledHeader>
        <StyledHeaderLeft>
          <IconA />
          <Body2>{renderMultiLineText(content)}</Body2>
        </StyledHeaderLeft>
        {nicknames.length > 0 && (
          <StyledHeaderRight>
            <StyledNumberLabel>
              <Caption color="brandColor800">{nicknames.length}건</Caption>
            </StyledNumberLabel>
            <AccordionButton
              open={open}
              onClick={() => setOpen(prev => !prev)}
            />
          </StyledHeaderRight>
        )}
      </StyledHeader>
      {open && (
        <StyledBody>
          {nicknames.map((nickname, idx) => (
            <Body1 key={idx} color="gray400">
              {nickname} 님의 답변
            </Body1>
          ))}
        </StyledBody>
      )}
    </Container>
  );
};

export default ChoiceResultAccordion;
