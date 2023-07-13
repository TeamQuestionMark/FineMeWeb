export default function useShare() {
  /**
   * @param shareData title, url, text, files가 모두 undefined일 경우 에러를 던집니다.
   * @return navigator.share의 promise를 반환합니다. 사용자의 공유 액션이 끝나면 resolve 됩니다.
   * navigator.share을 지원하지 않는 기기(ex. 데스크탑)면 에러를 던집니다.
   */
  const share = (
    shareData: Exclude<Parameters<typeof navigator.share>[0], undefined>,
  ) => {
    try {
      if (navigator.share) {
        const { title, url, text, files } = shareData;
        if (!title && !url && !text && !files) throw Error();
        return navigator.share({
          title: title,
          url: url,
          text: text,
          files: files,
        });
      }
    } catch (e) {
      if ((e as any)?.name === 'AbortError') return new Promise<void>(() => {});
    }
    throw Error();
  };

  const copyFallback = (text: string) => {
    const target = document.createElement('textarea');
    target.style.position = 'absolute';
    target.style.left = '-9999px';
    target.style.top = '0';
    target.id = '__hiddenCopyText__';
    document.body.appendChild(target);
    target.textContent = text;

    target.focus();
    target.setSelectionRange(0, target.value.length);
    let succeed;
    try {
      succeed = document.execCommand('copy');
    } catch (err) {
      succeed = false;
    }
    target.parentNode?.removeChild(target);
    return succeed;
  };

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return copyFallback(text);
    }
  };

  return { share, copy };
}
