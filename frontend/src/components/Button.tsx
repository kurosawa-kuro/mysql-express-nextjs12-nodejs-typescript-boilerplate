// components/Button.tsx

import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="py-2 px-4 bg-blue-500 text-white rounded"
    >
      {children}
    </button>
  );
};

export default Button;
