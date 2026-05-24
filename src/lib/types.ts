export type UserRole = 'admin' | 'client'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  role: UserRole
  company: string | null
  phone: string | null
  avatar_url: string | null
  created_at: string
}

export interface Inquiry {
  id: string
  name: string
  company: string | null
  email: string
  whatsapp: string | null
  link: string | null
  services: string | null
  stage: string | null
  about: string | null
  goal: string | null
  budget: string | null
  timeline: string | null
  deadline: string | null
  source: string | null
  notes: string | null
  status: 'new' | 'contacted' | 'proposal_sent' | 'won' | 'lost'
  created_at: string
}

export interface Client {
  id: string
  user_id: string | null
  company: string
  contact_name: string | null
  contact_email: string | null
  contact_phone: string | null
  industry: string | null
  website: string | null
  status: 'active' | 'paused' | 'completed'
  total_billed: number
  notes: string | null
  created_at: string
  profiles?: Profile
}

export interface Project {
  id: string
  client_id: string
  title: string
  description: string | null
  status: 'planning' | 'active' | 'review' | 'completed'
  progress: number
  start_date: string | null
  due_date: string | null
  created_at: string
  clients?: Client
  milestones?: Milestone[]
}

export interface Milestone {
  id: string
  project_id: string
  title: string
  completed: boolean
  due_date: string | null
  created_at: string
}

export interface Deliverable {
  id: string
  client_id: string
  project_id: string | null
  name: string
  file_url: string
  file_type: string | null
  size_kb: number | null
  uploaded_by: string | null
  created_at: string
  projects?: Project
}

export interface Invoice {
  id: string
  client_id: string
  invoice_number: string
  amount: number
  currency: string
  status: 'pending' | 'paid' | 'overdue' | 'cancelled'
  description: string | null
  due_date: string | null
  paid_at: string | null
  created_at: string
  clients?: Client
}

export interface Message {
  id: string
  client_id: string
  sender_id: string
  content: string
  is_admin: boolean
  read_at: string | null
  created_at: string
  profiles?: Profile
}
