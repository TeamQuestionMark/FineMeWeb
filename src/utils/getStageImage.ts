import ImgStageHome from '@/assets/images/Stage/stage-home@3x.png';
import ImgStageCafe from '@/assets/images/Stage/stage-cafe@3x.png';
import ImgStageWork from '@/assets/images/Stage/stage-work@3x.png';

export default function getStageImage(stageId: number) {
  switch (stageId) {
    case 3:
      return ImgStageHome;
    case 2:
      return ImgStageCafe;
    case 1:
      return ImgStageWork;
  }
}
