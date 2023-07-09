export type InputHandler = (name: string, value: string | number) => void;
export interface InputBaseProps {
  name: string;
  value: string | number;
  onInput: InputHandler;
}

export interface MultiInputBaseProps extends Omit<InputBaseProps, 'value'> {
  name: string;
  value: number[];
  onInput: InputHandler;
}
