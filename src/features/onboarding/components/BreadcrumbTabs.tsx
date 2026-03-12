import { Check } from "lucide-react";
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
  const activeIndex = tabs.findIndex((t) => t.key === activeTab);

  return (
    <nav aria-label="Onboarding steps" className="w-full">
      <ol className="flex items-center w-full">
        {tabs.map((tab, index) => {
          const isCompleted = index < activeIndex;
          const isActive = index === activeIndex;
          const isPending = index > activeIndex;

          return (
            <React.Fragment key={tab.key}>
              <li className="flex flex-col items-center gap-1.5 flex-0">
                <button
                  type="button"
                  onClick={() => {
                    if (isCompleted) setActiveTab(tab.key);
                  }}
                  aria-current={isActive ? "step" : undefined}
                  aria-label={`Step ${index + 1}: ${tab.label}`}
                  disabled={isPending}
                  className={`
                    h-8 w-8 rounded-full flex items-center justify-center
                    text-xs font-bold transition-all ring-2
                    ${
                      isCompleted
                        ? "bg-primary ring-primary text-white cursor-pointer hover:brightness-110"
                        : isActive
                          ? "bg-primary ring-primary ring-offset-2 ring-offset-background text-white shadow-md shadow-primary/30"
                          : "bg-muted ring-border text-muted-foreground cursor-default"
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </button>
                <span
                  className={`text-[10px] font-medium text-center leading-tight max-w-14 ${
                    isActive
                      ? "text-primary"
                      : isCompleted
                        ? "text-foreground"
                        : "text-muted-foreground"
                  }`}
                >
                  {tab.label}
                </span>
              </li>

              {index < tabs.length - 1 && (
                <div className="flex-1 mx-1 mb-5">
                  <div
                    className={`h-0.5 w-full rounded-full transition-colors ${
                      index < activeIndex ? "bg-primary" : "bg-border"
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
