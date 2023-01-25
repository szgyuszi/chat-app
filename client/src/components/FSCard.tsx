import { ReactNode } from "react";

type FSCardProps = {
  children: ReactNode;
};

export function FSCard({ children }: FSCardProps) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full">{children}</div>
    </div>
  );
}

FSCard.Body = function ({ children }: FSCardProps) {
  return <div className="shadow bg-white p-6 rounded-lg">{children}</div>;
};

FSCard.BelowCard = function ({ children }: FSCardProps) {
  return <div className="mt-2 justify-center flex gap-3">{children}</div>;
};
