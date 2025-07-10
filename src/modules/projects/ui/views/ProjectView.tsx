"use client";

import FileExplorer from "@/components/FileExplorer";
import SlideContainer from "@/components/SlideContainer";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserControl from "@/components/UserControl";
import { Fragment } from "@/generated/prisma";
import { useBreakpoint } from "@/hooks/useBreakPoint";
import { FileCollection } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { CodeIcon, CrownIcon, EyeIcon, MessageSquareIcon } from "lucide-react";
import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import FragmentWeb from "../components/FragmentWeb";
import MessagesContainer from "../components/MessagesContainer";
import ProjectHeader from "../components/ProjectHeader";

type Props = {
  projectId: string;
};

type MobileTab = "messages" | "preview" | "code";
type DesktopTab = "preview" | "code";

const ProjectView = ({ projectId }: Props) => {
  const { isPhone } = useBreakpoint();
  const { has } = useAuth();
  const isFreeTier = has?.({ plan: "free_user" }) || false;

  const [activeFragment, setActiveFragment] = useState<Fragment | null>(null);
  const [tabState, setTabState] = useState<DesktopTab>("preview");

  // Memoized tab indices
  const tabIndex = useMemo(() => {
    return { preview: 0, code: 1 }[tabState];
  }, [tabState]);

  // Memoized content components
  const previewContent = useMemo(
    () => (activeFragment ? <FragmentWeb data={activeFragment} /> : null),
    [activeFragment]
  );

  const codeContent = useMemo(
    () =>
      activeFragment?.files ? (
        <FileExplorer files={activeFragment.files as FileCollection} />
      ) : null,
    [activeFragment?.files]
  );

  const messagesContent = useMemo(
    () => (
      <ReactErrorBoundary fallback={<div>Error messages</div>}>
        <Suspense fallback={<div>Loading messages...</div>}>
          <MessagesContainer
            projectId={projectId}
            activeFragment={activeFragment}
            setActiveFragment={setActiveFragment}
          />
        </Suspense>
      </ReactErrorBoundary>
    ),
    [projectId, activeFragment, setActiveFragment]
  );

  const headerContent = useMemo(
    () => (
      <ReactErrorBoundary fallback={<div>Error header</div>}>
        <Suspense fallback={<div>Loading header...</div>}>
          <ProjectHeader projectId={projectId} />
        </Suspense>
      </ReactErrorBoundary>
    ),
    [projectId]
  );

  if (isPhone) {
    return (
      <MobileLayout
        isFreeTier={isFreeTier}
        previewContent={previewContent}
        codeContent={codeContent}
        messagesContent={messagesContent}
        headerContent={headerContent}
      />
    );
  }

  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={35}
          minSize={20}
          className="flex flex-col min-h-0"
        >
          {headerContent}
          {messagesContent}
        </ResizablePanel>

        <ResizableHandle className="hover:bg-primary transition-colors" />

        <ResizablePanel defaultSize={65} minSize={50}>
          <Tabs
            className="h-full gap-y-0"
            defaultValue="preview"
            value={tabState}
            onValueChange={(value) => setTabState(value as DesktopTab)}
          >
            <div className="w-full flex items-center p-2 border-b gap-x-2">
              <TabsList className="h-8 p-0 border rounded-md">
                <TabsTrigger value="preview" className="rounded-md">
                  <EyeIcon className="w-4 h-4" />
                  <span className="ml-1">Demo</span>
                </TabsTrigger>
                <TabsTrigger value="code" className="rounded-md">
                  <CodeIcon className="w-4 h-4" />
                  <span className="ml-1">Code</span>
                </TabsTrigger>
              </TabsList>

              <div className="ml-auto flex items-center gap-x-2">
                {isFreeTier && (
                  <Button asChild size="sm" variant="tertiary">
                    <Link href="/pricing">
                      <CrownIcon className="w-4 h-4" />
                      <span className="ml-1">Upgrade</span>
                    </Link>
                  </Button>
                )}
                <UserControl />
              </div>
            </div>

            <SlideContainer activeIndex={tabIndex}>
              {[previewContent, codeContent]}
            </SlideContainer>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

// Mobile Layout Component
const MobileLayout = ({
  isFreeTier,
  previewContent,
  codeContent,
  messagesContent,
  headerContent,
}: {
  isFreeTier: boolean;
  previewContent: React.ReactNode;
  codeContent: React.ReactNode;
  messagesContent: React.ReactNode;
  headerContent: React.ReactNode;
}) => {
  const [mobileTab, setMobileTab] = useState<MobileTab>("messages");

  const tabIndex = useMemo(() => {
    return { messages: 0, preview: 1, code: 2 }[mobileTab];
  }, [mobileTab]);

  return (
    <div className="h-screen flex flex-col">
      {headerContent}

      <SlideContainer activeIndex={tabIndex}>
        {[messagesContent, previewContent, codeContent]}
      </SlideContainer>

      {/* Bottom Navigation */}
      <div className="border-t bg-background p-2">
        <div className="flex items-center justify-between">
          <Tabs
            value={mobileTab}
            onValueChange={(value) => setMobileTab(value as MobileTab)}
            className="flex-1"
          >
            <TabsList className="h-10 p-0 border rounded-md w-full">
              <TabsTrigger value="messages" className="rounded-md flex-1">
                <MessageSquareIcon className="w-4 h-4" />
                <span className="ml-1">Chat</span>
              </TabsTrigger>
              <TabsTrigger value="preview" className="rounded-md flex-1">
                <EyeIcon className="w-4 h-4" />
                <span className="ml-1">Demo</span>
              </TabsTrigger>
              <TabsTrigger value="code" className="rounded-md flex-1">
                <CodeIcon className="w-4 h-4" />
                <span className="ml-1">Code</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="ml-2 flex items-center gap-x-2">
            {isFreeTier && (
              <Button asChild size="sm" variant="tertiary">
                <Link href="/pricing">
                  <CrownIcon className="w-4 h-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectView;
