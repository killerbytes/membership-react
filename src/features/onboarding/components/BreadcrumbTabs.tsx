import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

export function BreadcrumbTabs({
  activeTab,
  setActiveTab,
  tabs,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: { key: string; label: string; icon: React.ElementType }[];
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {tabs.map((tab, index) => (
          <React.Fragment key={tab.key}>
            <BreadcrumbItem>
              {activeTab === tab.key ? (
                <BreadcrumbPage className="flex items-center gap-1 font-bold text-primary">
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink onClick={() => setActiveTab(tab.key)}>
                  {tab.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < tabs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
