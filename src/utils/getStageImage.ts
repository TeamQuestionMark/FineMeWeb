import ImgStageHome from '@/assets/images/Stage/stage-home@3x.png';
import ImgStageCafe from '@/assets/images/Stage/stage-cafe@3x.png';
import ImgStageWork from '@/assets/images/Stage/stage-work@3x.png';
import ImgStageCustom from '@/assets/images/Stage/stage-custom@3x.png';
import { BASIC_STAGE_ID } from '@/constants/stage';

export default function getStageImage(stageId: number) {
  switch (stageId) {
    case BASIC_STAGE_ID.home:
      return ImgStageHome;
    case BASIC_STAGE_ID.cafe:
      return ImgStageCafe;
    case BASIC_STAGE_ID.work:
      return ImgStageWork;
    default:
      return ImgStageCustom;
  }
}
