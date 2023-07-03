import StageForm from '@/pages/Stage/StageForm';
import useStageForm from '@/hooks/useStageForm';
import { ChoiceOption, Question } from '@/types/stage';
import ImgStageWork from '@/assets/images/Stage/stage-work@3x.png';
import styled from 'styled-components';
import Button from '@/components/Button';

const CHIP_OPTIONS: ChoiceOption[] = [
  {
    multipleChoiceId: 0,
    content: '아메리카노',
  },
  {
    multipleChoiceId: 1,
    content: '이어폰',
  },
  {
    multipleChoiceId: 2,
    content: '포스트잇',
  },
  {
    multipleChoiceId: 3,
    content: '달력',
  },
  {
    multipleChoiceId: 4,
    content: '사원증',
  },
];

const CHOICE_OPTIONS: ChoiceOption[] = [
  {
    multipleChoiceId: 0,
    content: `지각할 것 같다고 솔직하게 메신저에 고백한다`,
  },
  {
    multipleChoiceId: 1,
    content: `자연스러운 핑계 발견! 
커피 사서 들어가겠다며 주문을 받는다`,
  },
  {
    multipleChoiceId: 2,
    content: `자연스러운 핑계 발견! 
커피 사서 들어가겠다며 주문을 받는다`,
  },
];

const dummyQuestions: Question[] = [
  {
    questionId: 0,
    questionTitle: '나의 업무 필수템은?',
    questionType: 'chip',
    multipleChoiceList: CHIP_OPTIONS,
  },
  {
    questionId: 1,
    questionTitle: `지각이 예상되는 출근길..!
    아침 회의가 잡힐 분위기다!
    내가 할 것 같은 선택은?`,
    questionType: 'radio',
    multipleChoiceList: CHOICE_OPTIONS,
  },
  {
    questionId: 2,
    questionTitle: '출근하면 가장 먼저 하는 행동은?',
    questionType: 'subjective',
    multipleChoiceList: [],
  },
  {
    questionId: 3,
    questionTitle: '내가 가장 좋아하는 간식(커피) 타임은 언제?',
    questionType: 'checkbox',
    multipleChoiceList: CHOICE_OPTIONS,
  },
  {
    questionId: 4,
    questionTitle: '나는 혼자서도 잘 논다?',
    questionType: 'ox',
    multipleChoiceList: [],
  },
];

const Container = styled.div`
  background-color: #faf8f0;
  padding-bottom: 63px;
`;
const StageImage = styled.img<{}>`
  width: 100%;
`;

const StageFormWrapper = styled.div`
  transform: translateY(-44px);
`;

const DummyStagePage = () => {
  const methods = useStageForm(dummyQuestions);
  const { isCompleted } = methods;
  return (
    <Container>
      <StageImage src={ImgStageWork} />
      <StageFormWrapper>
        <StageForm useStageForm={methods} questions={dummyQuestions} />
      </StageFormWrapper>
      <Button style={{ margin: '0 20px' }} disabled={!isCompleted}>
        저장 하기
      </Button>
    </Container>
  );
};

export default DummyStagePage;
