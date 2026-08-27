"use client"

import { useState } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  LineChart,
  Building2,
  RefreshCw,
  TrendingUp,
  Loader2,
  CheckCircle2,
  Circle,
  ArrowUpRight,
  ArrowRight,
  Rocket,
  Clock,
  Target,
} from "lucide-react"

type ScanState = "idle" | "loading" | "done"
type Section = "dashboard" | "skills" | "pipelines" | "projects"

const SIDEBAR_LINKS: { label: string; icon: typeof LayoutDashboard; section: Section }[] = [
  { label: "Dashboard", icon: LayoutDashboard, section: "dashboard" },
  { label: "Skill Tracker", icon: LineChart, section: "skills" },
  { label: "Recommended Projects", icon: Rocket, section: "projects" },
  { label: "Company Pipelines", icon: Building2, section: "pipelines" },
]

const SKILLS = [
  { name: "FinTech AI Risk Management", level: 82, status: "in-progress", trend: "+118%" },
  { name: "Autonomous SaaS Deployments", level: 74, status: "in-progress", trend: "+94%" },
  { name: "Data Risk Modeling", level: 100, status: "mastered", trend: "+67%" },
  { name: "Agentic Workflow Design", level: 45, status: "in-progress", trend: "+49%" },
  { name: "Product Scaling Strategy", level: 100, status: "mastered", trend: "+58%" },
]

const PIPELINES = [
  { company: "Meridian Capital", role: "AI Risk Lead", stage: "Interview", match: 94, color: "var(--chart-3)" },
  { company: "Nimbus SaaS", role: "Autonomous Deploy Eng.", stage: "Screening", match: 88, color: "var(--chart-1)" },
  { company: "Vertex Data", role: "Risk Modeling PM", stage: "Applied", match: 81, color: "var(--chart-2)" },
  { company: "Apex Product Labs", role: "Scaling Strategist", stage: "Offer", match: 91, color: "var(--chart-3)" },
]

const PROJECTS = [
  {
    title: "AI Credit Risk Scoring Engine",
    skill: "FinTech AI Risk Management",
    match: 96,
    difficulty: "Advanced",
    duration: "3–4 weeks",
    demand: "+118%",
    summary:
      "Build a model-backed dashboard that scores loan applicants in real time and flags portfolio-level risk exposure.",
    tags: ["Risk Modeling", "Python", "Dashboards"],
  },
  {
    title: "Autonomous SaaS Deployment Pipeline",
    skill: "Autonomous SaaS Deployments",
    match: 91,
    difficulty: "Advanced",
    duration: "2–3 weeks",
    demand: "+94%",
    summary:
      "Design a self-healing CI/CD pipeline that provisions, tests, and rolls back multi-tenant SaaS releases without human gates.",
    tags: ["CI/CD", "Infra as Code", "Agents"],
  },
  {
    title: "Fraud Signal Data Risk Model",
    skill: "Data Risk Modeling",
    match: 88,
    difficulty: "Intermediate",
    duration: "2 weeks",
    demand: "+67%",
    summary:
      "Cluster transaction anomalies and produce an explainable risk report suitable for a compliance review.",
    tags: ["Data Modeling", "Analytics", "Compliance"],
  },
  {
    title: "Agentic Onboarding Workflow",
    skill: "Agentic Workflow Design",
    match: 79,
    difficulty: "Intermediate",
    duration: "1–2 weeks",
    demand: "+49%",
    summary:
      "Orchestrate a multi-step agent that handles customer onboarding, escalations, and audit logging end to end.",
    tags: ["Agents", "Workflow", "Automation"],
  },
]

const TREND_SERIES = [
  { week: "W1", fintech: 42, saas: 30 },
  { week: "W2", fintech: 51, saas: 38 },
  { week: "W3", fintech: 63, saas: 44 },
  { week: "W4", fintech: 72, saas: 55 },
  { week: "W5", fintech: 85, saas: 61 },
  { week: "W6", fintech: 94, saas: 73 },
]

const KEYWORD_BARS = [
  { keyword: "FinTech AI Risk Mgmt", value: 94 },
  { keyword: "Autonomous SaaS", value: 81 },
  { keyword: "Data Risk Modeling", value: 67 },
  { keyword: "Product Scaling", value: 58 },
  { keyword: "Agentic Workflows", value: 49 },
]

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-md border border-border bg-card px-3 py-2 text-xs shadow-lg">
      <p className="mb-1 font-semibold text-card-foreground">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} className="flex items-center gap-2 text-muted-foreground">
          <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
          {p.name}: <span className="font-medium text-card-foreground">{p.value}</span>
        </p>
      ))}
    </div>
  )
}

export function MarketPulse() {
  const [scan, setScan] = useState<ScanState>("idle")
  const [section, setSection] = useState<Section>("dashboard")

  function runScan() {
    setScan("loading")
    setTimeout(() => setScan("done"), 2200)
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 border-r border-sidebar-border bg-sidebar px-3 py-6 text-sidebar-foreground md:block">
        <p className="px-3 pb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-sidebar-foreground/50">
          Navigation
        </p>
        <nav className="flex flex-col gap-1">
          {SIDEBAR_LINKS.map((link) => {
            const active = section === link.section
            return (
              <button
                key={link.label}
                type="button"
                onClick={() => setSection(link.section)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/15 text-sidebar-foreground"
                    : "text-sidebar-foreground/65 hover:bg-white/5 hover:text-sidebar-foreground",
                )}
              >
                <link.icon className="h-[18px] w-[18px]" />
                {link.label}
                {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />}
              </button>
            )
          })}
        </nav>

        <div className="mt-8 rounded-lg border border-sidebar-border bg-black/20 p-4">
          <p className="text-xs font-semibold text-sidebar-foreground">Signals tracked</p>
          <p className="mt-1 font-mono text-2xl font-semibold text-sidebar-foreground">1,284</p>
          <p className="mt-1 text-[11px] text-sidebar-foreground/55">across 42 markets</p>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 px-6 py-8 lg:px-10">
        {section === "skills" && <SkillTracker />}
        {section === "pipelines" && <CompanyPipelines />}
        {section === "projects" && <ProjectRecommendations />}

        {section === "dashboard" && (
        <>
        <div className="mb-6">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground/70">Dashboard</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">Market Analysis Hub</h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Scan real-time global hiring signals to surface the emerging business and tech skills recruiters are
            actively sourcing.
          </p>
        </div>

        {/* Hub panel */}
        <section className="rounded-xl border border-border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col gap-4 border-b border-border p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Global Job Market Scan</h2>
              <p className="text-sm text-muted-foreground">Pull the latest keyword velocity across live job feeds.</p>
            </div>
            <button
              type="button"
              onClick={runScan}
              disabled={scan === "loading"}
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-80",
              )}
            >
              {scan === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              {scan === "loading" ? "Scanning markets…" : "Scan Global Job Markets Now"}
            </button>
          </div>

          <div className="p-6">
            {scan === "idle" && (
              <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border py-16 text-center">
                <TrendingUp className="h-8 w-8 text-muted-foreground/50" />
                <p className="text-sm font-medium text-card-foreground">No scan run yet</p>
                <p className="max-w-sm text-sm text-muted-foreground">
                  Press{" "}
                  <span className="font-medium text-card-foreground">Scan Global Job Markets Now</span> to populate
                  live trend data.
                </p>
              </div>
            )}

            {scan === "loading" && (
              <div className="flex flex-col items-center justify-center gap-4 py-16">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <div className="w-full max-w-md">
                  <div className="mb-2 flex justify-between text-xs text-muted-foreground">
                    <span>Aggregating 42 global markets…</span>
                    <span className="font-mono">indexing</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-2/3 animate-pulse rounded-full bg-primary" />
                  </div>
                  <div className="mt-4 space-y-2">
                    {["Parsing FinTech postings", "Clustering SaaS roles", "Ranking skill velocity"].map((t) => (
                      <p key={t} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-chart-3" />
                        {t}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {scan === "done" && (
              <div className="space-y-6">
                {/* Highlight badges */}
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: "FinTech AI Risk Management", delta: "+118%" },
                    { label: "Autonomous SaaS Deployments", delta: "+94%" },
                  ].map((k) => (
                    <div
                      key={k.label}
                      className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-card-foreground"
                    >
                      <TrendingUp className="h-4 w-4 text-primary" />
                      {k.label}
                      <span className="font-mono text-xs font-semibold text-chart-3">{k.delta}</span>
                    </div>
                  ))}
                </div>

                <div className="grid gap-6 lg:grid-cols-5">
                  {/* Line/area chart */}
                  <div className="rounded-lg border border-border p-4 lg:col-span-3">
                    <p className="mb-3 text-sm font-semibold text-card-foreground">Emerging keyword velocity</p>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={TREND_SERIES} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                          <defs>
                            <linearGradient id="gFintech" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.4} />
                              <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="gSaas" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.35} />
                              <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                          <XAxis dataKey="week" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                          <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                          <Tooltip content={<ChartTooltip />} />
                          <Area
                            type="monotone"
                            dataKey="fintech"
                            name="FinTech AI Risk"
                            stroke="var(--chart-1)"
                            strokeWidth={2.5}
                            fill="url(#gFintech)"
                          />
                          <Area
                            type="monotone"
                            dataKey="saas"
                            name="Autonomous SaaS"
                            stroke="var(--chart-2)"
                            strokeWidth={2.5}
                            fill="url(#gSaas)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Bar chart */}
                  <div className="rounded-lg border border-border p-4 lg:col-span-2">
                    <p className="mb-3 text-sm font-semibold text-card-foreground">Top trending keywords</p>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={KEYWORD_BARS} layout="vertical" margin={{ top: 0, right: 12, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                          <XAxis type="number" hide />
                          <YAxis
                            type="category"
                            dataKey="keyword"
                            width={120}
                            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                            tickLine={false}
                            axisLine={false}
                          />
                          <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--muted)" }} />
                          <Bar dataKey="value" name="Demand index" fill="var(--chart-1)" radius={[0, 4, 4, 0]} barSize={16} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Directed next step: projects matching the trend */}
                <div className="flex flex-col gap-4 rounded-lg border border-primary/30 bg-primary/10 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-card-foreground">
                      {PROJECTS.length} projects match today&apos;s trending skills
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Start building on FinTech AI Risk Management and Autonomous SaaS Deployments to fast-track your
                      portfolio.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSection("projects")}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-110"
                  >
                    View Recommended Projects
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
        </>
        )}
      </div>
    </div>
  )
}

function SkillTracker() {
  return (
    <div>
      <div className="mb-6">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground/70">Skill Tracker</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">Your Skill Progression</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Track mastery across the market-driven skills recruiters are actively sourcing.
        </p>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Skills mastered", value: "2" },
          { label: "In progress", value: "3" },
          { label: "Avg. market demand", value: "+77%" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm">
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <p className="mt-1 font-mono text-2xl font-semibold">{s.value}</p>
          </div>
        ))}
      </div>

      <section className="rounded-xl border border-border bg-card text-card-foreground shadow-sm">
        <div className="border-b border-border p-6">
          <h2 className="text-lg font-semibold">Tracked skills</h2>
          <p className="text-sm text-muted-foreground">Mastery level mapped against live market demand.</p>
        </div>
        <ul className="divide-y divide-border">
          {SKILLS.map((skill) => (
            <li key={skill.name} className="flex items-center gap-4 p-6">
              {skill.status === "mastered" ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-chart-3" />
              ) : (
                <Circle className="h-5 w-5 shrink-0 text-muted-foreground/50" />
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium text-card-foreground">{skill.name}</p>
                  <span className="font-mono text-xs font-semibold text-chart-3">{skill.trend}</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn("h-full rounded-full", skill.status === "mastered" ? "bg-chart-3" : "bg-primary")}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
              <span className="w-16 shrink-0 text-right text-xs font-medium text-muted-foreground">
                {skill.status === "mastered" ? "Mastered" : `${skill.level}%`}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

function ProjectRecommendations() {
  const difficultyColors: Record<string, string> = {
    Intermediate: "bg-chart-2/15 text-card-foreground",
    Advanced: "bg-primary/15 text-card-foreground",
  }
  return (
    <div>
      <div className="mb-6">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground/70">Recommended Projects</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">Projects Matching the Trend</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Curated build challenges mapped to the skills spiking in today&apos;s scan. Complete one to verify the skill
          and unlock it on your portfolio.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {PROJECTS.map((p) => (
          <div
            key={p.title}
            className="group flex flex-col rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm transition-colors hover:border-primary/40"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-card-foreground">
                <TrendingUp className="h-3.5 w-3.5 text-primary" />
                {p.skill}
                <span className="font-mono font-semibold text-chart-3">{p.demand}</span>
              </div>
              <span className={cn("rounded-full px-3 py-1 text-xs font-medium", difficultyColors[p.difficulty])}>
                {p.difficulty}
              </span>
            </div>

            <h2 className="mt-4 text-base font-semibold">{p.title}</h2>
            <p className="mt-1 flex-1 text-sm text-muted-foreground">{p.summary}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Target className="h-3.5 w-3.5 text-primary" />
                <span className="font-mono font-semibold text-card-foreground">{p.match}%</span> match
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {p.duration}
              </span>
              <button
                type="button"
                className="ml-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:brightness-110"
              >
                Start project
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CompanyPipelines() {
  const stageColors: Record<string, string> = {
    Applied: "bg-muted text-muted-foreground",
    Screening: "bg-chart-2/15 text-card-foreground",
    Interview: "bg-primary/15 text-card-foreground",
    Offer: "bg-chart-3/15 text-card-foreground",
  }
  return (
    <div>
      <div className="mb-6">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground/70">Company Pipelines</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">Active Opportunity Pipelines</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Companies sourcing your verified skills, ranked by profile match.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {PIPELINES.map((p) => (
          <div
            key={p.company}
            className="group rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm transition-colors hover:border-primary/40"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-base font-semibold">{p.company}</p>
                <p className="text-sm text-muted-foreground">{p.role}</p>
              </div>
              <span className={cn("rounded-full px-3 py-1 text-xs font-medium", stageColors[p.stage])}>{p.stage}</span>
            </div>

            <div className="mt-5">
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Profile match</span>
                <span className="font-mono font-semibold text-card-foreground">{p.match}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full" style={{ width: `${p.match}%`, background: p.color }} />
              </div>
            </div>

            <button
              type="button"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:brightness-110"
            >
              View pipeline
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
