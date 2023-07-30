import Button from '@/components/Button';
import { Headline2, Subhead1 } from '@/components/Typography';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ImgStageCompleted from '@/assets/images/Stage/stage-completed@3x.png';
import { GLOBAL_PADDING_X } from '@/themes/layout';
import checkDeviceType from '@/utils/checkDeviceType';

const Container = styled.div`
  height: 100vh;
  padding-top: 50px;
  padding-bottom: 112px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TopSection = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const BottomSection = styled.section`
  padding: 0 ${GLOBAL_PADDING_X}px;
`;

const CompletedImage = styled.div`
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(${ImgStageCompleted});
  width: 100%;
  height: 100px;
`;
const StageCompletedPage = () => {
  const params = useParams();
  const nickname = params.nickname;

  const goToApp = () => {
    const device = checkDeviceType();
    switch (device) {
      case 'ANDROID':
        window.open(process.env.REACT_APP_ANDROID_APP_URL);
        break;
      case 'IOS':
        window.open(process.env.REACT_APP_IOS_APP_URL);
        break;
      default:
        window.open(process.env.REACT_APP_ANDROID_APP_URL);
        break;
    }
  };

  return (
    <Container>
      <TopSection>
        <Headline2 style={{ margin: `0 ${GLOBAL_PADDING_X}px 40px` }}>
          {nickname} 님의
          <br />
          응답이 전달되었습니다 :)
        </Headline2>
        <CompletedImage style={{ flexGrow: 1 }} />
      </TopSection>
      <BottomSection>
        <Subhead1>
          {nickname} 님의
          <br />
          스테이지도 만들어 공유해 보세요!
        </Subhead1>
        <Button style={{ marginTop: '36px' }} onClick={goToApp}>
          스테이지 만들러 가기
        </Button>
      </BottomSection>
    </Container>
  );
};

export default StageCompletedPage;
