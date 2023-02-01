import { ReactNode } from "react";

type ChatBoxPropsType = {
  children: ReactNode;
};

export function ChatBox({ children }: ChatBoxPropsType) {
  return (
    <div className="w-1/2 h-1/2  bg-gradient-to-r from-gray-700 to-gray-900  rounded-lg shadow-md p-4 flex flex-col justify-center items-center">
      {children}
    </div>
  );
}

ChatBox.Header = function ({ children }: ChatBoxPropsType) {
  return (
    <div className="w-full flex justify-center items-center  text-white text-4xl m-2 rounded p-4 text-center h-16">
      {children}
    </div>
  );
};

ChatBox.Body = function ({ children }: ChatBoxPropsType) {
  return (
    <div className="overflow-auto w-full h-96 my-16 bg-gray-100 border-2 shadow-md rounded p-8 border-gray-300">
      {children}
    </div>
  );
};

ChatBox.Footer = function ({ children }: ChatBoxPropsType) {
  return (
    <div className="w-full bg-gray-100 p-4 m-2 rounded shadow">{children}</div>
  );
};
