import {
  Award,
  BarChart2,
  Briefcase,
  GraduationCap,
  Home,
  Mail,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import type { SectionId } from '@/types/os'

export interface SectionMeta {
  id: SectionId
  label: string
  description: string
  icon: LucideIcon
}

export const SECTIONS: SectionMeta[] = [
  { id: 'home', label: 'Home', description: 'Profile overview', icon: Home },
  { id: 'experience', label: 'Experience', description: 'Work and leadership', icon: Briefcase },
  { id: 'skills', label: 'Skills', description: 'Tools and strengths', icon: Zap },
  { id: 'portfolio', label: 'Portfolio', description: 'Projects and outcomes', icon: BarChart2 },
  { id: 'certifications', label: 'Certifications', description: 'Credentials and training', icon: Award },
  { id: 'education', label: 'Education', description: 'Academic background', icon: GraduationCap },
  { id: 'contact', label: 'Contact', description: 'Send a message', icon: Mail },
]
