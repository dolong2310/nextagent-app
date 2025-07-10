import { Fragment, MessageType } from "@/generated/prisma";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Image from "next/image";
import FragmentCard from "./FragmentCard";

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
        <span className="text-sm font-medium">NextAgent</span>
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

export default AssistantMessage;
