export type InputHandler = (name: string, value: string) => void;
export interface InputBaseProps {
  name: string;
  value: string;
  onInput: InputHandler;
}
