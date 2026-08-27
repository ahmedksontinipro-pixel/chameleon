"use client"

import { useState } from "react"
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

export function ProjectWorkspace() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState("")

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
