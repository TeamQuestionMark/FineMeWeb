type ShareResult = 'SUCCEED' | 'CANCELED' | 'FAILED' | 'NOT_COMPATIBLE';
export default async function share(
  shareData: ShareData,
): Promise<ShareResult> {
  try {
    if (navigator.share) {
      const { title, url, text, files } = shareData;
      if (!title && !url && !text && !files) throw Error();
      await navigator.share({
        title: title,
        url: url,
        text: text,
        files: files,
      });
      return 'SUCCEED';
    } else return 'NOT_COMPATIBLE';
  } catch (e) {
    if ((e as any)?.name === 'AbortError') return 'CANCELED';
    else return 'FAILED';
  }
}
