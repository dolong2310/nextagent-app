import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { TreeItem } from "@/types";
import { ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

type Props = {
  data: TreeItem[];
  value?: string | null;
  onSelect?: (filePath: string) => void;
};

const TreeView = ({ data, value, onSelect }: Props) => {
  return (
    <SidebarProvider>
      <Sidebar collapsible="none" className="w-full">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {data.map((item, index) => (
                  <Tree
                    key={index}
                    item={item}
                    parentPath=""
                    selectedValue={value}
                    onSelect={onSelect}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  );
};

type TreeProps = {
  item: TreeItem;
  parentPath: string;
  selectedValue?: string | null;
  onSelect?: (filePath: string) => void;
};

const Tree = ({ item, parentPath, selectedValue, onSelect }: TreeProps) => {
  const [name, ...items] = Array.isArray(item) ? item : [item];
  const currentPath = parentPath ? `${parentPath}/${name}` : name;

  if (!items.length) {
    // It's a file
    const isSelected = selectedValue === currentPath;
    return (
      <SidebarMenuButton
        // className="data-[active=true]:bg-transparent"
        isActive={isSelected}
        onClick={() => onSelect?.(currentPath)}
      >
        <FileIcon />
        <span className={cn("truncate", isSelected && "font-bold")}>
          {name}
        </span>
      </SidebarMenuButton>
    );
  }

  // It's a folder
  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
        defaultOpen
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <ChevronRightIcon className="transition-transform" />
            <FolderIcon />
            <span className="truncate">{name}</span>
          </SidebarMenuButton>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <SidebarMenuSub>
            {items.map((subItem, index) => (
              <Tree
                key={`${currentPath}-${index}`}
                item={subItem}
                parentPath={currentPath}
                selectedValue={selectedValue}
                onSelect={onSelect}
              />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
};

export default TreeView;
