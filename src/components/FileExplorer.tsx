import { useBreakpoint } from "@/hooks/useBreakPoint";
import { convertFilesToTreeItems } from "@/lib/utils";
import { FileCollection, TreeItem } from "@/types";
import { CopyCheckIcon, CopyIcon } from "lucide-react";
import { Fragment, useCallback, useMemo, useState } from "react";
import CodeView from "./CodeView";
import Hint from "./hint";
import TreeView from "./TreeView";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Button } from "./ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import SlideContainer from "./SlideContainer";

const getLanguageFromExtension = (filename: string): string => {
  const extension = filename.split(".").pop()?.toLowerCase();
  return extension || "text";
};

type Props = {
  files: FileCollection;
};

type MobileTab = "tree" | "code";

const FileExplorer = ({ files }: Props) => {
  const { isPhone } = useBreakpoint();

  const [copied, setCopied] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(() => {
    const fileKeys = Object.keys(files);
    return fileKeys.length > 0 ? fileKeys[0] : null;
  });

  const treeData = useMemo(() => {
    return convertFilesToTreeItems(files);
  }, [files]);

  const handleFileSelect = useCallback(
    (filePath: string) => {
      if (files[filePath]) {
        setSelectedFile(filePath);
      }
    },
    [files]
  );

  const handleCopy = useCallback(() => {
    if (selectedFile) {
      navigator.clipboard.writeText(files[selectedFile] || "");
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [selectedFile, files]);

  if (isPhone) {
    return (
      <MobileLayout
        treeData={treeData}
        selectedFile={selectedFile}
        handleFileSelect={handleFileSelect}
        files={files}
        copied={copied}
        handleCopy={handleCopy}
      />
    );
  }

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={30} minSize={30} className="bg-sidebar">
        <TreeView
          data={treeData}
          value={selectedFile}
          onSelect={handleFileSelect}
        />
      </ResizablePanel>

      <ResizableHandle className="hover:bg-primary transition-colors" />

      <ResizablePanel defaultSize={70} minSize={50}>
        {selectedFile && files[selectedFile] ? (
          <div className="h-full w-full flex flex-col">
            <div className="border-b bg-sidebar px-4 py-2 flex justify-between items-center gap-x-2">
              <FileBreadcrumbs filePath={selectedFile} />

              <Hint text="Copy to clipboard" side="bottom">
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-auto"
                  disabled={copied}
                  onClick={handleCopy}
                >
                  {copied ? <CopyCheckIcon /> : <CopyIcon />}
                </Button>
              </Hint>
            </div>
            <div className="flex-1 overflow-auto">
              <CodeView
                lang={getLanguageFromExtension(selectedFile)}
                code={files[selectedFile]}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Select a file to view it&apos;s content
          </div>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

const MobileLayout = ({
  treeData,
  selectedFile,
  handleFileSelect,
  files,
  copied,
  handleCopy,
}: {
  treeData: TreeItem[];
  selectedFile: string | null;
  handleFileSelect: (filePath: string) => void;
  files: FileCollection;
  copied: boolean;
  handleCopy: () => void;
}) => {
  const [tabState, setTabState] = useState<MobileTab>("code");

  const tabIndex = useMemo(() => {
    return { tree: 0, code: 1 }[tabState];
  }, [tabState]);

  const treeContent = useMemo(() => {
    return (
      <div className="bg-sidebar">
        <TreeView
          data={treeData}
          value={selectedFile}
          onSelect={handleFileSelect}
        />
      </div>
    );
  }, [treeData, selectedFile, handleFileSelect]);

  const codeContent = useMemo(() => {
    if (selectedFile && files[selectedFile]) {
      return (
        <div className="h-full w-full flex flex-col">
          <div className="border-b bg-sidebar px-4 py-2 flex justify-between items-center gap-x-2">
            <FileBreadcrumbs filePath={selectedFile} />

            <Hint text="Copy to clipboard" side="bottom">
              <Button
                variant="outline"
                size="icon"
                className="ml-auto"
                disabled={copied}
                onClick={handleCopy}
              >
                {copied ? <CopyCheckIcon /> : <CopyIcon />}
              </Button>
            </Hint>
          </div>
          <div className="flex-1 overflow-auto">
            <CodeView
              lang={getLanguageFromExtension(selectedFile)}
              code={files[selectedFile]}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Select a file to view it&apos;s content
      </div>
    );
  }, [selectedFile, files, copied, handleCopy]);

  return (
    <div className="h-full flex flex-col">
      {/* Content Area with sliding animation */}
      <SlideContainer activeIndex={tabIndex}>
        {[treeContent, codeContent]}
      </SlideContainer>

      {/* Bottom Navigation */}
      <div className="border-t bg-background p-2">
        <div className="flex items-center justify-between">
          <Tabs
            value={tabState}
            onValueChange={(value) => setTabState(value as MobileTab)}
            className="flex-1"
          >
            <TabsList className="h-10 p-0 border rounded-md w-full">
              <TabsTrigger value="tree" className="rounded-md flex-1">
                <span className="ml-1">Tree</span>
              </TabsTrigger>
              <TabsTrigger value="code" className="rounded-md flex-1">
                <span className="ml-1">Code</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const FileBreadcrumbs = ({ filePath }: { filePath: string }) => {
  const pathSegments = filePath.split("/").filter(Boolean);
  const maxSegments = 4;

  const renderBreadcrumbItems = () => {
    if (pathSegments.length <= maxSegments) {
      // show all segments if 4 or less
      return pathSegments.map((segment, index) => {
        const isLast = index === pathSegments.length - 1;

        return (
          <Fragment key={index}>
            <BreadcrumbItem>
              {isLast ? (
                <BreadcrumbPage className="font-medium">
                  {segment}
                </BreadcrumbPage>
              ) : (
                <span className="text-muted-foreground">{segment}</span>
              )}
            </BreadcrumbItem>

            {!isLast && <BreadcrumbSeparator />}
          </Fragment>
        );
      });
    } else {
      const firstSegment = pathSegments[0];
      const lastSegment = pathSegments[pathSegments.length - 1];

      return (
        <BreadcrumbItem>
          <span className="text-muted-foreground">{firstSegment}</span>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium">
              {lastSegment}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbItem>
      );
    }
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>{renderBreadcrumbItems()}</BreadcrumbList>
    </Breadcrumb>
  );
};

export default FileExplorer;
