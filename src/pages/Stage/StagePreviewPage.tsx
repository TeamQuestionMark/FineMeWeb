import StageForm from '@/pages/Stage/StageForm';
import useStageForm from '@/hooks/useStageForm';
import ImgStageWork from '@/assets/images/Stage/stage-work@3x.png';
import styled from 'styled-components';
import Button from '@/components/Button';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { dummyPagninatedQuetions } from './dummy';
import { Question } from '@/types/stage';
import useShare from '@/hooks/useShare';

const Container = styled.div`
  padding-bottom: 63px;
`;
const StageImage = styled.img<{}>`
  width: 100%;
`;

const StageFormWrapper = styled.div`
  transform: translateY(-44px);
`;

const StagePreviewPage = () => {
  const methods = useStageForm();
  const { initForm, isFormReady } = methods;
  const [questions, setQuestions] = useState<Question[]>();
  const { share, copy } = useShare();

  useEffect(() => {
    setTimeout(() => {
      const data = dummyPagninatedQuetions(1, 15);
      console.log('fetch');
      initForm(data?.contents);
      setQuestions(data.contents);
    }, 500);
  }, [initForm]);

  useLayoutEffect(() => {
    document.body.style.backgroundColor = '#faf8f0';

    return () => {
      document.body.style.backgroundColor = '';
    };
  });

  const handleClickShare = useCallback(async () => {
    const url = 'TODO: url';
    try {
      await share({
        title: '스테이지 공유하기',
        url: '',
        text: '회사에서 일하는 내 모습은?',
      });
    } catch {
      const succeed = await copy(url);
      succeed && window.alert('클립보드에 복사하였습니다');
    }
  }, [copy, share]);

  return (
    <Container>
      <StageImage src={ImgStageWork} />
      <StageFormWrapper>
        {isFormReady && questions && (
          <StageForm
            startNumber={1}
            useStageForm={methods}
            questions={questions}
          />
        )}
      </StageFormWrapper>
      <Button style={{ margin: '0 20px' }} onClick={handleClickShare}>
        공유하기
      </Button>
    </Container>
  );
};

export default StagePreviewPage;
