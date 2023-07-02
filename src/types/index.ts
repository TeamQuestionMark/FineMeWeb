export type InputHandler = (name: string, value: string | number) => void;
export interface InputBaseProps {
  name: string;
  value: string | number;
  onInput: InputHandler;
}
