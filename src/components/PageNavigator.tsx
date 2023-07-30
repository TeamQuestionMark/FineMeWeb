import IconNextEnabled from '@/assets/icons/PageNavigator/icon-next-enabled@3x.png';
import IconNextDisabled from '@/assets/icons/PageNavigator/icon-next-disabled@3x.png';
import IconPrevEnabled from '@/assets/icons/PageNavigator/icon-prev-enabled@3x.png';
import IconPrevDisabled from '@/assets/icons/PageNavigator/icon-prev-disabled@3x.png';
import styled, { css } from 'styled-components';
import usePagination from '@/hooks/usePagination';
import { Body4 } from './Typography';

interface PageNavigatorProps
  extends Omit<
    ReturnType<typeof usePagination>,
    'setTotalPages' | 'navigatorProps'
  > {
  style?: React.CSSProperties;
}

const StyledPageNavigator = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledNavigatorWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 30px;
`;

const iconCss = css`
  width: 30px;
  height: 30px;
  background-size: contain;
  background-repeat: no-repeat;
`;
const PreviousIcon = styled.div<{ disabled: boolean }>`
  ${iconCss}
  background-image: url(${({ disabled }) =>
    disabled ? IconPrevDisabled : IconPrevEnabled});
`;
const NextIcon = styled.div<{ disabled: boolean }>`
  ${iconCss}
  background-image: url(${({ disabled }) =>
    disabled ? IconNextDisabled : IconNextEnabled});
`;

const PageNavigator: React.FC<PageNavigatorProps> = ({
  totalPages,
  page,
  hasNext,
  hasPrevious,
  back,
  next,
  style,
}) => {
  return (
    <StyledPageNavigator style={style}>
      <StyledNavigatorWrapper>
        <PreviousIcon onClick={back} disabled={!hasPrevious} />
        <Body4>
          {page} / {totalPages}
        </Body4>
        <NextIcon onClick={next} disabled={!hasNext} />
      </StyledNavigatorWrapper>
    </StyledPageNavigator>
  );
};

export default PageNavigator;
