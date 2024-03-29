interface Props {
  ox: 'O' | 'X';
  checked: boolean;
}
export default function IconOX({ checked, ox }: Props) {
  const fill = checked ? '#FEDE46' : '#F7F7F7';
  const stroke = checked ? '#864B0D' : '#A4A4A4';
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      {(ox === 'O' && (
        <circle
          id="Ellipse 82"
          cx="13"
          cy="13"
          r="12"
          fill={fill}
          stroke={stroke}
          strokeWidth="2"
        />
      )) || (
        <g id="Group 129">
          <path
            id="Vector 152"
            d="M1 1L22 22"
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            id="Vector 153"
            d="M22 1L0.999999 22"
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      )}
    </svg>
  );
}
