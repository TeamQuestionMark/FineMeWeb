export default function checkDeviceType() {
  const userAgent = navigator.userAgent;

  if (userAgent.match(/Android/i)) {
    // 안드로이드 기기
    return 'ANDROID';
  } else if (userAgent.match(/iPhone|iPad|iPod/i)) {
    // 아이폰, 아이패드, 아이팟 기기
    return 'IOS';
  } else {
    // 기타 PC 웹 브라우저
    return 'PC';
  }
}
