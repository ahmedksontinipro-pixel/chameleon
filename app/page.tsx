"use client"

import { useState } from "react"
import { TopNav, type TabId } from "@/components/chameleon/top-nav"
import { MarketPulse } from "@/components/chameleon/market-pulse"
import { ProjectWorkspace } from "@/components/chameleon/project-workspace"
import { PortfolioVerification } from "@/components/chameleon/portfolio-verification"
import { SEED_PROJECTS, type StartedProject } from "@/lib/chameleon"

export default function Page() {
  const [activeTab, setActiveTab] = useState<TabId>("market")
  const [projects, setProjects] = useState<StartedProject[]>(SEED_PROJECTS)
  const [openProjectTitle, setOpenProjectTitle] = useState<string | null>(null)

  function startProject(project: StartedProject) {
    setProjects((prev) => (prev.some((p) => p.title === project.title) ? prev : [project, ...prev]))
    setOpenProjectTitle(project.title)
    setActiveTab("workspace")
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <TopNav activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1">
        {activeTab === "market" && <MarketPulse onStartProject={startProject} />}
        {activeTab === "workspace" && (
          <ProjectWorkspace
            projects={projects}
            openProjectTitle={openProjectTitle}
            onOpenProject={setOpenProjectTitle}
          />
        )}
        {activeTab === "portfolio" && <PortfolioVerification />}
      </main>
    </div>
  )
}
