"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import {
  ShieldCheck,
  Lock,
  Bold,
  Italic,
  List,
  Heading,
  Sparkles,
  Send,
  Activity,
  Rocket,
  Terminal,
  FileCode2,
  FolderTree,
  Play,
  Wrench,
  Database,
  GitBranch,
  Cloud,
  CheckCircle2,
  Loader2,
  ArrowLeft,
  Cpu,
} from "lucide-react"

type Message = {
  id: number
  from: "ai" | "student"
  text: string
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    from: "ai",
    text: "I've reviewed your draft. Strong opening, but the strategy leans on boilerplate. Let's sharpen it.",
  },
  {
    id: 2,
    from: "ai",
    text: "Your current operational plan depends too heavily on generic templates. I have locked your submission button. To unlock it, manually rewrite Section 3 to address the specific market volatility data shown above. You are capable of a sharper analysis—do it now.",
  },
]

type SandboxState = "idle" | "provisioning" | "ready"

const PROVISION_STEPS = [
  { label: "Allocating isolated container", icon: Cloud },
  { label: "Installing project toolchain (Node 20, Python 3.12)", icon: Wrench },
  { label: "Cloning starter repository & datasets", icon: GitBranch },
  { label: "Connecting FinTech Risk API integration", icon: Database },
  { label: "Booting live workspace", icon: Cpu },
]

export function ProjectWorkspace() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState("")
  const [sandbox, setSandbox] = useState<SandboxState>("idle")

  function send() {
    const trimmed = input.trim()
    if (!trimmed) return
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), from: "student", text: trimmed },
      {
        id: Date.now() + 1,
        from: "ai",
        text: "Better. Now tie that revision directly to the FinTech AI Risk Management volatility spike. Show me the reasoning, not the conclusion.",
      },
    ])
    setInput("")
  }

  if (sandbox === "provisioning" || sandbox === "ready") {
    return (
      <div className="h-[calc(100vh-4rem)] overflow-hidden">
        {sandbox === "provisioning" ? (
          <SandboxProvisioning onDone={() => setSandbox("ready")} />
        ) : (
          <SandboxIDE onExit={() => setSandbox("idle")} />
        )}
      </div>
    )
  }

  return (
    <div className="grid h-[calc(100vh-4rem)] grid-cols-1 lg:grid-cols-[1.4fr_1fr]">
      {/* Left: editor */}
      <section className="flex flex-col border-b border-border bg-muted/40 lg:border-b-0 lg:border-r">
        {/* Doc toolbar */}
        <div className="flex items-center gap-1 border-b border-border bg-card px-4 py-2">
          {[Heading, Bold, Italic, List].map((Icon, i) => (
            <button
              key={i}
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-card-foreground"
              aria-label="Formatting control"
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
          <span className="ml-3 text-xs text-muted-foreground">Autosaved · Draft v4</span>

          <button
            type="button"
            onClick={() => setSandbox("provisioning")}
            className="ml-auto flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:brightness-110"
          >
            <Rocket className="h-3.5 w-3.5" />
            Launch Build Sandbox
          </button>
        </div>

        {/* Editor sheet */}
        <div className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-2xl rounded-lg border border-border bg-card p-8 text-card-foreground shadow-sm">
            <h1 className="text-2xl font-semibold tracking-tight">Autonomous Product Launch Strategy</h1>
            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Business Strategy · MBA Bootcamp · Section 3 flagged
            </p>

            <div className="mt-6 space-y-4 text-sm leading-relaxed text-card-foreground/90">
              <div>
                <h2 className="mb-1 font-semibold">1. Executive Summary</h2>
                <p>
                  This strategy outlines the go-to-market motion for an autonomous SaaS deployment platform targeting
                  mid-market financial operations teams.
                </p>
              </div>
              <div>
                <h2 className="mb-1 font-semibold">2. Market Opportunity</h2>
                <p>
                  Demand for autonomous deployment tooling has accelerated as teams shift toward continuous, low-touch
                  release pipelines across regulated industries.
                </p>
              </div>
              <div className="rounded-md border border-destructive/40 bg-destructive/5 p-3">
                <h2 className="mb-1 flex items-center gap-2 font-semibold text-destructive">
                  <Lock className="h-3.5 w-3.5" /> 3. Competitive Positioning — rewrite required
                </h2>
                <p className="text-card-foreground/80">
                  We will differentiate through a standard feature-comparison approach and competitive pricing
                  <span className="ml-1 inline-block h-4 w-px animate-pulse bg-primary align-middle" />
                </p>
              </div>
            </div>

            {/* Build task callout */}
            <div className="mt-6 flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/5 p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary">
                <Rocket className="h-4 w-4" />
              </span>
              <div className="text-sm">
                <p className="font-semibold text-card-foreground">Hands-on build task attached</p>
                <p className="mt-0.5 text-card-foreground/70">
                  This project ships with a live coding sandbox. Launch it to prototype the risk-scoring model with the
                  provided FinTech API before submitting your strategy.
                </p>
                <button
                  type="button"
                  onClick={() => setSandbox("provisioning")}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                >
                  Launch Build Sandbox <Rocket className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Telemetry overlay */}
        <div className="flex items-center gap-3 border-t border-border bg-card px-6 py-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Activity className="h-4 w-4" />
          </span>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-card-foreground">
              Telemetry Security: Actively Analyzing Human Problem-Solving Integrity
            </span>
            <span className="text-[11px] text-muted-foreground">
              Keystroke dynamics + cognitive pause modeling running in background
            </span>
          </div>
          <span className="ml-auto flex items-center gap-1.5 rounded-full bg-chart-3/15 px-2.5 py-1 text-[11px] font-medium text-card-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-chart-3" />
            Monitoring
          </span>
        </div>
      </section>

      {/* Right: AI chat panel */}
      <section className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
        <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold">The Chameleon Guardrail Core</p>
            <p className="text-[11px] text-sidebar-foreground/60">Rigorous · Demanding · Encouraging</p>
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-auto p-5">
          {messages.map((m) => (
            <div key={m.id} className={cn("flex", m.from === "student" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                  m.from === "ai"
                    ? "rounded-tl-sm border border-sidebar-border bg-black/25 text-sidebar-foreground"
                    : "rounded-tr-sm bg-primary text-primary-foreground",
                )}
              >
                {m.from === "ai" && (
                  <span className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
                    <Sparkles className="h-3 w-3" /> Guardrail
                  </span>
                )}
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Submission lock notice */}
        <div className="mx-5 mb-3 flex items-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-sidebar-foreground">
          <Lock className="h-3.5 w-3.5 text-destructive" />
          Submission locked until Section 3 is manually rewritten.
        </div>

        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-end gap-2 rounded-lg border border-sidebar-border bg-black/25 p-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing && e.keyCode !== 229) {
                  e.preventDefault()
                  send()
                }
              }}
              rows={2}
              placeholder="Respond to the Guardrail Core…"
              className="flex-1 resize-none bg-transparent px-2 py-1 text-sm text-sidebar-foreground placeholder:text-sidebar-foreground/40 focus:outline-none"
            />
            <button
              type="button"
              onClick={send}
              className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground transition-colors hover:brightness-110"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

function SandboxProvisioning({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (step >= PROVISION_STEPS.length) {
      const t = setTimeout(onDone, 550)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setStep((s) => s + 1), 750)
    return () => clearTimeout(t)
  }, [step, onDone])

  const pct = Math.round((Math.min(step, PROVISION_STEPS.length) / PROVISION_STEPS.length) * 100)

  return (
    <div className="flex h-full items-center justify-center bg-sidebar p-6 text-sidebar-foreground">
      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Rocket className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold">Provisioning your secure sandbox</p>
            <p className="text-[11px] text-sidebar-foreground/60">
              Spinning up an isolated environment with the project&apos;s tools
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-black/30">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>

        <ul className="space-y-3">
          {PROVISION_STEPS.map((s, i) => {
            const done = i < step
            const active = i === step
            const Icon = s.icon
            return (
              <li
                key={s.label}
                className={cn(
                  "flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition-colors",
                  done
                    ? "border-chart-3/30 bg-chart-3/10"
                    : active
                      ? "border-primary/40 bg-primary/10"
                      : "border-sidebar-border bg-black/15 opacity-50",
                )}
              >
                <span
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-md",
                    done ? "bg-chart-3/20 text-chart-3" : "bg-primary/15 text-primary",
                  )}
                >
                  {done ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : active ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                </span>
                <span className={cn(done ? "text-sidebar-foreground" : "text-sidebar-foreground/80")}>{s.label}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

const FILES = [
  { name: "risk_model.py", active: true },
  { name: "fintech_api.py", active: false },
  { name: "dataset.csv", active: false },
  { name: "README.md", active: false },
]

const CODE_LINES = [
  "import os",
  "from fintech_api import RiskClient",
  "",
  "# API key injected by the Chameleon sandbox integration",
  'client = RiskClient(token=os.environ["FINTECH_RISK_KEY"])',
  "",
  "def score_portfolio(positions):",
  '    """Return a volatility-adjusted risk score."""',
  "    signals = client.market_signals(sector=\"fintech\")",
  "    weighted = sum(p.value * signals.beta for p in positions)",
  "    return round(weighted / len(positions), 2)",
  "",
  "if __name__ == \"__main__\":",
  "    print(score_portfolio(load_positions()))",
]

const TOOLS = [
  { label: "Python 3.12", icon: FileCode2 },
  { label: "FinTech Risk API", icon: Database },
  { label: "Git", icon: GitBranch },
  { label: "Terminal", icon: Terminal },
]

function SandboxIDE({ onExit }: { onExit: () => void }) {
  const [output, setOutput] = useState<string[]>([
    "$ sandbox ready — container fin-risk-8842 attached",
    "$ FinTech Risk API integration connected ✓",
  ])
  const [running, setRunning] = useState(false)
  const termRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    termRef.current?.scrollTo({ top: termRef.current.scrollHeight })
  }, [output])

  function run() {
    if (running) return
    setRunning(true)
    setOutput((p) => [...p, "$ python risk_model.py"])
    const lines = [
      "Fetching market signals (sector=fintech)…",
      "Signals received · beta=1.42 volatility=+18%",
      "Scoring 12 portfolio positions…",
      "Risk score: 74.6 / 100  (elevated)",
      "Done in 1.284s",
    ]
    lines.forEach((l, i) => setTimeout(() => setOutput((p) => [...p, l]), (i + 1) * 420))
    setTimeout(() => setRunning(false), lines.length * 420 + 200)
  }

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      {/* IDE top bar */}
      <div className="flex items-center gap-3 border-b border-sidebar-border px-4 py-2.5">
        <button
          type="button"
          onClick={onExit}
          className="flex items-center gap-1.5 rounded-md border border-sidebar-border px-2.5 py-1.5 text-xs font-medium text-sidebar-foreground/80 transition-colors hover:bg-black/25 hover:text-sidebar-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Workspace
        </button>
        <span className="flex items-center gap-1.5 text-xs text-sidebar-foreground/60">
          <Cloud className="h-3.5 w-3.5 text-chart-3" />
          Sandbox <span className="font-mono text-sidebar-foreground">fin-risk-8842</span>
        </span>
        <span className="ml-2 flex items-center gap-1.5 rounded-full bg-chart-3/15 px-2.5 py-1 text-[11px] font-medium">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-chart-3" />
          Live
        </span>

        <button
          type="button"
          onClick={run}
          disabled={running}
          className="ml-auto flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:brightness-110 disabled:opacity-60"
        >
          {running ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5" />}
          {running ? "Running…" : "Run"}
        </button>
      </div>

      {/* IDE body */}
      <div className="grid min-h-0 flex-1 grid-cols-[180px_1fr] lg:grid-cols-[200px_1fr_190px]">
        {/* File explorer */}
        <div className="flex flex-col border-r border-sidebar-border bg-black/20">
          <div className="flex items-center gap-1.5 px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-sidebar-foreground/50">
            <FolderTree className="h-3.5 w-3.5" /> Explorer
          </div>
          <div className="px-2">
            {FILES.map((f) => (
              <div
                key={f.name}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1.5 text-xs",
                  f.active ? "bg-primary/15 text-sidebar-foreground" : "text-sidebar-foreground/70",
                )}
              >
                <FileCode2 className="h-3.5 w-3.5 shrink-0 text-primary/80" />
                {f.name}
              </div>
            ))}
          </div>
        </div>

        {/* Editor + terminal */}
        <div className="flex min-w-0 flex-col">
          {/* tab */}
          <div className="flex items-center border-b border-sidebar-border bg-black/10 px-3 py-1.5 text-xs">
            <span className="flex items-center gap-1.5 rounded-t-md border-b-2 border-primary px-2 py-1 font-mono text-sidebar-foreground">
              <FileCode2 className="h-3.5 w-3.5 text-primary" /> risk_model.py
            </span>
          </div>
          {/* code */}
          <div className="flex-1 overflow-auto bg-[oklch(0.16_0.02_255)] font-mono text-[13px] leading-6">
            <pre className="p-4">
              {CODE_LINES.map((line, i) => (
                <div key={i} className="flex">
                  <span className="mr-4 w-6 shrink-0 select-none text-right text-sidebar-foreground/30">{i + 1}</span>
                  <code className="text-sidebar-foreground/90">{line || " "}</code>
                </div>
              ))}
            </pre>
          </div>
          {/* terminal */}
          <div className="h-40 shrink-0 border-t border-sidebar-border bg-black/40">
            <div className="flex items-center gap-1.5 border-b border-sidebar-border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-sidebar-foreground/50">
              <Terminal className="h-3.5 w-3.5" /> Terminal
            </div>
            <div ref={termRef} className="h-[calc(100%-2rem)] overflow-auto p-3 font-mono text-xs leading-6">
              {output.map((l, i) => (
                <div
                  key={i}
                  className={cn(
                    l.startsWith("$")
                      ? "text-chart-3"
                      : l.includes("Risk score")
                        ? "font-semibold text-primary"
                        : "text-sidebar-foreground/80",
                  )}
                >
                  {l}
                </div>
              ))}
              {running && <span className="inline-block h-3.5 w-2 animate-pulse bg-primary align-middle" />}
            </div>
          </div>
        </div>

        {/* Tools panel */}
        <div className="hidden flex-col border-l border-sidebar-border bg-black/20 lg:flex">
          <div className="flex items-center gap-1.5 px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-sidebar-foreground/50">
            <Wrench className="h-3.5 w-3.5" /> Provisioned Tools
          </div>
          <div className="space-y-1.5 px-2">
            {TOOLS.map((t) => {
              const Icon = t.icon
              return (
                <div
                  key={t.label}
                  className="flex items-center gap-2 rounded-md border border-sidebar-border bg-black/20 px-2.5 py-2 text-xs"
                >
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  <span className="text-sidebar-foreground/85">{t.label}</span>
                  <CheckCircle2 className="ml-auto h-3.5 w-3.5 text-chart-3" />
                </div>
              )
            })}
          </div>
          <div className="mt-4 mx-2 rounded-lg border border-primary/30 bg-primary/5 p-3 text-[11px] leading-relaxed text-sidebar-foreground/75">
            <span className="mb-1 flex items-center gap-1.5 font-semibold text-primary">
              <Database className="h-3.5 w-3.5" /> API Integration
            </span>
            The FinTech Risk API key is injected securely as an environment variable. No setup required — start building.
          </div>
        </div>
      </div>
    </div>
  )
}
