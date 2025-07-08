import { Fragment, MessageRole, MessageType } from "@/generated/prisma";
import AssistantMessage from "./AssistantMessage";
import UserMessage from "./UserMessage";

type Props = {
  content: string;
  role: MessageRole;
  type: MessageType;
  createdAt: Date;
  fragment: Fragment | null;
  isActiveFragment: boolean;
  onFragmentClick: (fragment: Fragment) => void;
};

const MessageCard = ({
  content,
  role,
  type,
  createdAt,
  fragment,
  isActiveFragment,
  onFragmentClick,
}: Props) => {
  if (role === "ASSISTANT") {
    return (
      <AssistantMessage
        content={content}
        type={type}
        createdAt={createdAt}
        fragment={fragment}
        isActiveFragment={isActiveFragment}
        onFragmentClick={onFragmentClick}
      />
    );
  }

  return <UserMessage content={content} />;
};

export default MessageCard;
