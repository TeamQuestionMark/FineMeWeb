import Button from '@/components/Button';
import PageLayout from '@/components/Layout/PageLayout';
import TextField, { TextFieldRef } from '@/components/TextField';
import { Headline2 } from '@/components/Typography';
import Validator from '@/utils/Validator';
import { useRef, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  padding-top: 50px;
  padding-bottom: 70px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const validator = new Validator().min(2).max(8);
const StageLandingPage = () => {
  const [nickname, setNickname] = useState('');
  const [isValid, setIsValid] = useState(false);
  const inputRef = useRef<TextFieldRef>(null)
  const handleInput: React.FormEventHandler<HTMLInputElement> = async e => {
    setNickname(e.currentTarget.value);
    const isValid = await inputRef.current?.validate(e.currentTarget.value) || false
    setIsValid(isValid)
  };

  return (
    <Container as={PageLayout}>
      <div>
        <Headline2 style={{ marginBottom: '40px' }}>
          괜찮은 나를 발견하기 위해
          <br />
          닉네임 입력이 필요합니다.
        </Headline2>
        <TextField
          ref={inputRef}
          name="nickname"
          label="닉네임"
          placeholder="최소2~8자의 닉네임을 입력해주세요"
          noSpaces
          validator={validator}
          onInput={handleInput}
        />
      </div>
      <Button disabled={!isValid} style={{ boxShadow: '5px 5px 0px 0px #000' }}>
        그럼, 지금 시작하시겠어요?
      </Button>
    </Container>
  );
};

export default StageLandingPage;