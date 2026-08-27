export type StartedProject = {
  title: string
  skill: string
  difficulty: string
  duration: string
  summary: string
  tags: string[]
  progress: number
  startedAt: string
}

export const SEED_PROJECTS: StartedProject[] = [
  {
    title: "Autonomous Product Launch Strategy",
    skill: "Autonomous SaaS Deployments",
    difficulty: "Advanced",
    duration: "2–3 weeks",
    summary:
      "Go-to-market strategy doc with an attached coding sandbox to prototype the risk-scoring model before submitting.",
    tags: ["Strategy", "CI/CD", "Agents"],
    progress: 64,
    startedAt: "2 days ago",
  },
]
