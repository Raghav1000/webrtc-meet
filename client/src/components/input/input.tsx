import { ChangeEvent } from "react";
import "./input.css";

interface Props {
  type: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const Input = (p: Props) => {
  return (
    <input
      value={p?.value}
      className="input"
      onChange={p?.onChange}
      type={p?.type}
      placeholder={p?.placeholder}
    />
  );
};

export default Input;
