"use client"

import {
  BadgeCheck,
  ArrowRight,
  Fingerprint,
  Brain,
  GitBranch,
  TrendingUp,
  ShieldCheck,
  Send,
} from "lucide-react"

const PIPELINE = [
  { label: "Keystroke Telemetry Dynamic Check", icon: Fingerprint },
  { label: "Cognitive Pause Analysis", icon: Brain },
  { label: "Logic-Consistency Mapping", icon: GitBranch },
]

const BADGES = [
  {
    title: "Tech Product Scaling",
    desc: "Demonstrated end-to-end launch strategy for autonomous SaaS.",
    icon: TrendingUp,
  },
  {
    title: "Data-Driven Risk Modeling",
    desc: "Applied live FinTech volatility data to strategic positioning.",
    icon: ShieldCheck,
  },
]

export function PortfolioVerification() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10 lg:px-10">
      {/* Status badge */}
      <div className="flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-chart-3/40 bg-chart-3/15 px-5 py-2.5 text-sm font-semibold text-foreground">
          <BadgeCheck className="h-5 w-5 text-chart-3" />
          Project Assessment Complete: 100% Authentic Human Logic Verified
        </div>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-balance text-foreground">
          Your verified portfolio is ready
        </h1>
        <p className="mt-2 max-w-xl text-pretty text-sm text-muted-foreground">
          Every section passed Chameleon&apos;s integrity pipeline. This credential proves the work reflects your own
          reasoning—not a template.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-5">
        {/* Verification pipeline */}
        <section className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm lg:col-span-3">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground/70">
            Verification Algorithm Pipeline
          </p>
          <h2 className="mt-1 text-lg font-semibold">How authenticity was confirmed</h2>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-stretch">
            {PIPELINE.map((stage, i) => (
              <div key={stage.label} className="flex flex-1 items-center gap-3 sm:flex-col sm:gap-0">
                <div className="flex flex-1 flex-col items-center gap-3 rounded-lg border border-border bg-muted/40 p-4 text-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <stage.icon className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-semibold leading-snug text-card-foreground">{stage.label}</span>
                  <span className="rounded-full bg-chart-3/15 px-2 py-0.5 text-[10px] font-medium text-card-foreground">
                    Passed
                  </span>
                </div>
                {i < PIPELINE.length - 1 && (
                  <ArrowRight className="h-5 w-5 shrink-0 rotate-90 text-muted-foreground sm:rotate-0 sm:self-center" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-5">
            {[
              { k: "Integrity Score", v: "100%" },
              { k: "Cognitive Pauses", v: "37" },
              { k: "Original Edits", v: "214" },
            ].map((stat) => (
              <div key={stat.k}>
                <p className="font-mono text-2xl font-semibold text-card-foreground">{stat.v}</p>
                <p className="text-xs text-muted-foreground">{stat.k}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Portfolio card */}
        <section className="lg:col-span-2">
          <div className="overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm">
            <div className="flex items-center gap-3 bg-sidebar p-5 text-sidebar-foreground">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/25 text-lg font-semibold">
                JD
              </span>
              <div>
                <p className="text-base font-semibold">Jordan Dupont</p>
                <p className="text-xs text-sidebar-foreground/60">Business Strategy · MBA Bootcamp</p>
              </div>
              <BadgeCheck className="ml-auto h-5 w-5 text-chart-3" />
            </div>

            <div className="p-5">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground/70">
                Unlocked Skill Badges
              </p>
              <div className="mt-3 space-y-3">
                {BADGES.map((b) => (
                  <div key={b.title} className="flex items-start gap-3 rounded-lg border border-border p-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <b.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-card-foreground">{b.title}</p>
                      <p className="text-xs leading-snug text-muted-foreground">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* CTA */}
      <div className="mt-10 flex justify-center">
        <button
          type="button"
          className="inline-flex items-center gap-2.5 rounded-lg bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:brightness-110"
        >
          <Send className="h-4 w-4" />
          Export Verified Portfolio directly to Tech &amp; Business Recruiter Network
        </button>
      </div>
    </div>
  )
}
