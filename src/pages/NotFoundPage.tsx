import { Body1, Headline2 } from '@/components/Typography';
import styled from 'styled-components';
import ImgNotFound from '@/assets/images/error-not-found@3x.png';
import Button from '@/components/Button';
import { GLOBAL_PADDING_X } from '@/themes/layout';
const Container = styled.div`
  padding: 70px ${GLOBAL_PADDING_X}px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NotFoundPage = () => {
  return (
    <Container>
      <Headline2
        color="brandColor400"
        style={{ fontSize: '101px', lineHeight: '100%', marginBottom: '20px' }}
      >
        404
      </Headline2>
      <Body1 style={{ marginBottom: '30px' }}>
        방문하시려는 페이지의 주소가 잘못 입력되었거나,
        <br />
        삭제되어 사용하실 수 없습니다.
        <br />
        입력하신 주소가 정확한지 다시 한번 확인해 주세요.
      </Body1>
      <img src={ImgNotFound} width={'100%'} height="100%" alt="" />
      {/* <Button style={{ marginTop: '120px' }}>홈으로 가기</Button> */}
    </Container>
  );
};

export default NotFoundPage;
