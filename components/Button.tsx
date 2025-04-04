import { twMerge } from "tailwind-merge";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export default function Button({
  children,
  className,
  onClick,
  isLoading,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={twMerge(
        "scale-100 cursor-pointer rounded-xl bg-blue-500 px-2.5 py-2 transition duration-200 ease-in-out hover:scale-105 hover:bg-blue-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
