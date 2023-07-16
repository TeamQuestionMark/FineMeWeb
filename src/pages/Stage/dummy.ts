import { Pagination } from '@/api/instance';
import { ChoiceOption, Question } from '@/types/stage';

export const CHIP_OPTIONS: ChoiceOption[] = [
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

export const CHOICE_OPTIONS: ChoiceOption[] = [
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

export const dummyQuestions: Question[] = [
  {
    questionId: 0,
    questionTitle: '나의 업무 필수템은?',
    questionType: 'CHIP',
    multipleChoiceList: CHIP_OPTIONS,
  },
  {
    questionId: 1,
    questionTitle: `지각이 예상되는 출근길..!
    아침 회의가 잡힐 분위기다!
    내가 할 것 같은 선택은?`,
    questionType: 'RADIO',
    multipleChoiceList: CHOICE_OPTIONS,
  },
  {
    questionId: 2,
    questionTitle: '출근하면 가장 먼저 하는 행동은?',
    questionType: 'SUBJECTIVE',
    multipleChoiceList: [],
  },
  {
    questionId: 3,
    questionTitle: '내가 가장 좋아하는 간식(커피) 타임은 언제?',
    questionType: 'CHECK_BOX',
    multipleChoiceList: CHOICE_OPTIONS,
  },
  {
    questionId: 4,
    questionTitle: '나는 혼자서도 잘 논다?',
    questionType: 'OX',
    multipleChoiceList: [],
  },
  {
    questionId: 5,
    questionTitle: '나의 업무 필수템은?',
    questionType: 'CHIP',
    multipleChoiceList: CHIP_OPTIONS,
  },
  {
    questionId: 6,
    questionTitle: `지각이 예상되는 출근길..!
    아침 회의가 잡힐 분위기다!
    내가 할 것 같은 선택은?`,
    questionType: 'RADIO',
    multipleChoiceList: CHOICE_OPTIONS,
  },
  {
    questionId: 7,
    questionTitle: '출근하면 가장 먼저 하는 행동은?',
    questionType: 'SUBJECTIVE',
    multipleChoiceList: [],
  },
  {
    questionId: 8,
    questionTitle: '내가 가장 좋아하는 간식(커피) 타임은 언제?',
    questionType: 'CHECK_BOX',
    multipleChoiceList: CHOICE_OPTIONS,
  },
  {
    questionId: 9,
    questionTitle: '나는 혼자서도 잘 논다?',
    questionType: 'OX',
    multipleChoiceList: [],
  },
  {
    questionId: 10,
    questionTitle: '나의 업무 필수템은?',
    questionType: 'CHIP',
    multipleChoiceList: CHIP_OPTIONS,
  },
  {
    questionId: 11,
    questionTitle: `지각이 예상되는 출근길..!
    아침 회의가 잡힐 분위기다!
    내가 할 것 같은 선택은?`,
    questionType: 'RADIO',
    multipleChoiceList: CHOICE_OPTIONS,
  },
  {
    questionId: 12,
    questionTitle: '출근하면 가장 먼저 하는 행동은?',
    questionType: 'SUBJECTIVE',
    multipleChoiceList: [],
  },
  {
    questionId: 13,
    questionTitle: '내가 가장 좋아하는 간식(커피) 타임은 언제?',
    questionType: 'CHECK_BOX',
    multipleChoiceList: CHOICE_OPTIONS,
  },
  {
    questionId: 14,
    questionTitle: '나는 혼자서도 잘 논다?',
    questionType: 'OX',
    multipleChoiceList: [],
  },
];

export const dummyPagninatedQuetions = (
  page: number = 1,
  size: number = 5,
): Pagination<Question[]> => ({
  contents: dummyQuestions.slice(size * (page - 1), size * page),
  page: page,
  totalCount: dummyQuestions.length,
  totalPages: 3,
});
