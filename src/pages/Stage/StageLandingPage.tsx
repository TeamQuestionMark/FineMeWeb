import { AnswerApi } from '@/api/stages';
import Button from '@/components/Button';
import PageLayout from '@/components/Layout/PageLayout';
import TextField, { TextFieldRef } from '@/components/TextField';
import { Headline2 } from '@/components/Typography';
import { SESSION_STORAGE_KEY } from '@/constants/storage';
import { LoaderData } from '@/router/types';
import { useToastStore } from '@/store/toast';
import Validator from '@/utils/Validator';
import { useRef, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [isValid, setIsValid] = useState(false);
  const inputRef = useRef<TextFieldRef>(null);
  const { userId, stageId } = useLoaderData() as LoaderData['StageLandingPage'];
  const { setToast } = useToastStore();

  const handleInput: React.FormEventHandler<HTMLInputElement> = async e => {
    setNickname(e.currentTarget.value);
    const isValid =
      (await inputRef.current?.validate(e.currentTarget.value)) || false;
    setIsValid(isValid);
  };

  const handleSubmit = async () => {
    const isDuplicated = await AnswerApi.checkNickname({
      stageId,
      userId,
      nickname,
    });

    if (isDuplicated) {
      setToast('중복된 닉네임입니다. 다른 닉네임을 사용해주세요.');
      return;
    }

    sessionStorage.setItem(
      SESSION_STORAGE_KEY.nickname(stageId, userId),
      nickname,
    );
    navigate('./questions' + window.location.search);
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
          maxLength={8}
          validator={validator}
          onInput={handleInput}
        />
      </div>
      <Button
        disabled={!isValid}
        style={{ boxShadow: '5px 5px 0px 0px #000' }}
        onClick={handleSubmit}
      >
        그럼, 지금 시작하시겠어요?
      </Button>
    </Container>
  );
};

export default StageLandingPage;
