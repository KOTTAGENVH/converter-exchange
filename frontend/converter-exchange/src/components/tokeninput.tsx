import React, { ChangeEvent, useRef } from "react";

interface TokenInputProps {
  value: string;
  handleChange: (value: string) => void;
}

const TokenInput: React.FC<TokenInputProps> = ({ value, handleChange }) => {
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = value.split("");
    newValue[index] = e.target.value;
    handleChange(newValue.join(""));

    // Move focus to the next input field
    if (e.target.value !== "" && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    // Move focus to the previous input field
    if (e.target.value === "" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && index > 0 && value[index] === "") {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex space-x-2">
      {Array(4)
        .fill("")
        .map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            inputMode="numeric"
            className="w-11/12 h-12 p-4 border-b-2 text-black border-gray-200 focus:outline-none focus:border-b-2 focus:border-blue-500 text-center"
            value={value[index] || ""}
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(input) => {
              if (input) {
                inputsRef.current[index] = input;
              }
            }}
          />
        ))}
    </div>
  );
};

export default TokenInput;
