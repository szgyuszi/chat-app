import { ReactNode } from "react";

type FullscreenCardProps = {
  children: ReactNode;
};

export function FullscreenCard({ children }: FullscreenCardProps) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-700 to-gray-900 ">
      <div className="w-[28%]">{children}</div>
    </div>
  );
}

FullscreenCard.Body = function ({ children }: FullscreenCardProps) {
  return (
    <div className="shadow bg-white p-6 rounded-lg w-full">{children}</div>
  );
};
