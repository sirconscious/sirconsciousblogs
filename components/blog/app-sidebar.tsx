"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArticleMetadata } from "@/lib/articles";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  articles: ArticleMetadata[];
}

export function AppSidebar({ articles, ...props }: AppSidebarProps) {
  const pathname = usePathname();
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b h-14 justify-center px-4">
        <div className="flex items-center justify-between overflow-hidden">
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-bold truncate">Notes</span>
              <span className="text-[10px] text-muted-foreground truncate">Cybersecurity</span>
            </div>
          )}
          <div className={cn("flex items-center gap-1", isCollapsed && "w-full justify-center")}>
            <ModeToggle />
            {!isCollapsed && (
              <SidebarMenuButton
                onClick={toggleSidebar}
                className="size-9 p-0 justify-center"
                tooltip="Collapse Sidebar"
              >
                <PanelLeftClose className="size-5" />
              </SidebarMenuButton>
            )}
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {!isCollapsed && <SidebarGroupLabel>Articles</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {articles.map((article) => {
                const isActive = pathname === `/blog/${article.slug}` || (pathname === "/" && article.slug === "welcome");
                return (
                  <SidebarMenuItem key={article.slug}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={cn("h-auto py-2", isCollapsed && "justify-center")}
                      tooltip={isCollapsed ? article.title : undefined}
                    >
                      <Link href={`/blog/${article.slug}`}>
                        {isCollapsed ? (
                          <div className="flex size-4 items-center justify-center font-bold text-[10px]">
                            {article.title[0]}
                          </div>
                        ) : (
                          <div className="flex flex-col gap-1 overflow-hidden">
                            <span className="font-medium truncate">{article.title}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-muted-foreground">{article.date}</span>
                              <div className="flex gap-1">
                                {article.tags.slice(0, 1).map((tag) => (
                                  <Badge key={tag} variant="secondary" className="px-1 text-[8px] h-3">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
