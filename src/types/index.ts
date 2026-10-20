export type RepoStatus = 'public' | 'private' | 'in_progress' | 'pending_user_verification'

export interface ProjectEvidence {
  metric: string
  value: string
  description: string
}

export interface ProjectDetail {
  slug: string
  title: string
  subtitle: string
  tag: string
  category: 'Computer Vision' | 'Explainable AI' | 'Deterministic Systems' | 'HCI & Vision' | 'Applied ML' | 'Systems & Coursework'
  isFeatured: boolean
  isCertified: boolean
  timeline: string
  role: string
  teamContext?: string
  problemStatement: string
  implementation: string[]
  evidence: ProjectEvidence[]
  limitations: string[]
  nextSteps: string[]
  repoUrl?: string
  repoStatus: RepoStatus
  demoUrl?: string
  techStack: string[]
  verificationStatus: 'verified_fact' | 'pending_user_link' | 'mock_tested_offline'
}

export interface SkillCategory {
  title: string
  description: string
  items: string[]
}

export interface EducationItem {
  institution: string
  degree: string
  timeline: string
  status: string
  location: string
  focus: string
}

export interface HackathonAchievement {
  name: string
  project: string
  role: string
  year: string
  certified: boolean
  description: string
}

export interface ProfileData {
  brandMark: string
  fullName: string
  headline: string
  editorialQuote: string
  location: string
  coordinates: string
  email: string
  phone: {
    number: string
    isPublic: boolean
  }
  githubUrl: string
  linkedinUrl: string
  resumePath: string
  headshotPath: string
  currentYear: number
  domain: string
}
