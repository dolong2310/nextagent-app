import { Card } from "@/components/ui/card";
import { Fragment, MessageRole, MessageType } from "@/generated/prisma";
import { cn } from "@/lib/utils";
import React from "react";
import { format } from "date-fns";
import Image from "next/image";
import { ChevronRightIcon, Code2Icon } from "lucide-react";

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

type FragmentCardProps = {
  fragment: Fragment;
  isActiveFragment: boolean;
  onFragmentClick: (fragment: Fragment) => void;
};

const FragmentCard = ({
  fragment,
  isActiveFragment,
  onFragmentClick,
}: FragmentCardProps) => {
  return (
    <button
      className={cn(
        "flex items-start text-start gap-2 border rounded-lg bg-muted w-fit p-3 hover:bg-secondary transition-colors",
        isActiveFragment &&
          "bg-primary text-primary-foreground border-primary hover:bg-primary"
      )}
      onClick={() => onFragmentClick(fragment)}
    >
      <Code2Icon />
      <div className="flex flex-col flex-1">
        <span className="text-sm font-medium line-clamp-1">
          {fragment.title}
        </span>
        <span className="text-sm">Preview</span>
      </div>
      <div className="flex items-center justify-center mt-0.5">
        <ChevronRightIcon className="size-4" />
      </div>
    </button>
  );
};

type AssistantMessageProps = {
  content: string;
  type: MessageType;
  createdAt: Date;
  fragment: Fragment | null;
  isActiveFragment: boolean;
  onFragmentClick: (fragment: Fragment) => void;
};

const AssistantMessage = ({
  content,
  type,
  createdAt,
  fragment,
  isActiveFragment,
  onFragmentClick,
}: AssistantMessageProps) => {
  return (
    <div
      className={cn(
        "flex flex-col group px-2 pb-4",
        type === "ERROR" && "text-red-700 dark:text-red-500"
      )}
    >
      <div className="flex items-center gap-2 pl-2 mb-2">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={18}
          height={18}
          className="shrink-0"
        />
        <span className="text-sm font-medium">Vibe</span>
        <span className="text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
          {format(createdAt, "HH:mm 'on' dd MMM, yyyy")}
        </span>
      </div>

      <div className="pl-8 flex flex-col gap-y-4">
        <span>{content}</span>
        {fragment && type === "RESULT" && (
          <FragmentCard
            fragment={fragment}
            isActiveFragment={isActiveFragment}
            onFragmentClick={onFragmentClick}
          />
        )}
      </div>
    </div>
  );
};

type UserMessageProps = {
  content: string;
};

const UserMessage = ({ content }: UserMessageProps) => {
  return (
    <div className="flex justify-end pb-4 pr-2 pl-10">
      <Card className="rounded-lg bg-muted p-3 shadow-none border-none max-w-[80%] break-words">
        {content}
      </Card>
    </div>
  );
};

export default MessageCard;
