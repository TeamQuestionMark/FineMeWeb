const copyFallback = (text: string) => {
  const target = document.createElement('textarea');
  target.style.position = 'absolute';
  target.style.left = '-9999px';
  target.style.top = '0';
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

export default async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return copyFallback(text);
  }
}
