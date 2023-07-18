import ImgStageHome from '@/assets/images/Stage/stage-home@3x.png';
import ImgStageCafe from '@/assets/images/Stage/stage-cafe@3x.png';
import ImgStageWork from '@/assets/images/Stage/stage-work@3x.png';

export default function getStageImage(stageName: string) {
  switch (stageName) {
    case '집':
      return ImgStageHome;
    case '카페':
      return ImgStageCafe;
    case '회사':
      return ImgStageWork;
  }
}
