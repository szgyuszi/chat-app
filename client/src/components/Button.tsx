import { DetailedHTMLProps, forwardRef, ButtonHTMLAttributes } from "react";

export const Button = forwardRef<
  HTMLButtonElement,
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>(({ className, children, ...rest }, ref) => {
  return (
    <button
      className={`py-2 px-4 text-center text-xl text-bold text-white bg-blue-500 rounded outline-none hover:bg-blue-400 focus:bg-blue-400 focus:border focus:border-black disabled:bg-gray-500 transition-colors ${className}`}
      {...rest}
      ref={ref}
    >
      {children}
    </button>
  );
});
