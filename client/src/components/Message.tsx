type MessagePropsType = {
  message: string;
  author: string;
  time: string;
  isCurrentUser: boolean;
};

const Message = ({
  message,
  author,
  time,
  isCurrentUser,
}: MessagePropsType) => {
  console.table({
    message,
    author,
    time,
    isCurrentUser,
  });

  return (
    <div
      className={`flex flex-col mb-4 ${
        isCurrentUser ? "items-end" : "items-start"
      }`}
    >
      <div
        className={` ${
          isCurrentUser ? "bg-blue-500" : "bg-gray-500"
        } text-white text-3xl min-w-fit max-w-[20%] rounded-lg px-4 py-2`}
      >
        {message}
      </div>
      <div className="flex flex-row justify-even items-center">
        <p className="mr-2 text-gray-500">{author}</p>
        <p className="text-gray-500">{time}</p>
      </div>
    </div>
  );
};

export default Message;
