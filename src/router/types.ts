import { StageQuestionData } from '@/api/stages/questions';

export interface ReturnLoadStage extends StageQuestionData {
  userId: number;
  stageId: number;
  isCustom: boolean;
}

export interface LoaderData {
  StagePage: ReturnLoadStage;
  StageLandingPage: ReturnLoadStage;
  StageCompletedPage: null;
}
