"use client"

import { useState } from "react"
import { TopNav, type TabId } from "@/components/chameleon/top-nav"
import { MarketPulse } from "@/components/chameleon/market-pulse"
import { ProjectWorkspace } from "@/components/chameleon/project-workspace"
import { PortfolioVerification } from "@/components/chameleon/portfolio-verification"

export default function Page() {
  const [activeTab, setActiveTab] = useState<TabId>("market")

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <TopNav activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1">
        {activeTab === "market" && <MarketPulse />}
        {activeTab === "workspace" && <ProjectWorkspace />}
        {activeTab === "portfolio" && <PortfolioVerification />}
      </main>
    </div>
  )
}
