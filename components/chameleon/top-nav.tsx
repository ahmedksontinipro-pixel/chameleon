"use client"

import { cn } from "@/lib/utils"

export type TabId = "market" | "workspace" | "portfolio"

const TABS: { id: TabId; label: string }[] = [
  { id: "market", label: "1. Market Pulse" },
  { id: "workspace", label: "2. Project Workspace" },
  { id: "portfolio", label: "3. Portfolio Verification" },
]

function ChameleonLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2C7 2 3 5.5 3 10c0 3 1.8 5 4 5.5V19a3 3 0 0 0 6 0v-1h2a5 5 0 0 0 5-5V9a7 7 0 0 0-7-7Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="8.5" cy="9" r="1.4" fill="currentColor" />
        </svg>
      </span>
      <div className="flex flex-col leading-none">
        <span className="text-base font-semibold tracking-tight">Chameleon</span>
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
          Skill Intelligence
        </span>
      </div>
    </div>
  )
}

export function TopNav({
  activeTab,
  onTabChange,
}: {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center justify-between gap-6 px-6">
        <ChameleonLogo />

        <nav className="flex items-center gap-1 rounded-lg bg-black/20 p-1" aria-label="Primary">
          {TABS.map((tab) => {
            const isActive = tab.id === activeTab
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-sidebar-foreground/70 hover:bg-white/5 hover:text-sidebar-foreground",
                )}
              >
                {tab.label}
              </button>
            )
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex items-center gap-2 rounded-full border border-sidebar-border bg-black/20 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-chart-3" aria-hidden="true" />
            <span className="text-xs font-medium text-sidebar-foreground/80">Live</span>
          </div>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-sidebar-foreground">
            JD
          </span>
        </div>
      </div>
    </header>
  )
}
