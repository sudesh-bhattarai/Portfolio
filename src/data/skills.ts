import { Blocks, Braces, Code2, Database, GitBranch, Layers3, Waypoints } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type SkillItem = {
  name: string
  logo?: string
  icon?: LucideIcon
}

type SkillGroup = {
  title: string
  icon: LucideIcon
  items: SkillItem[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Programming Languages',
    icon: Braces,
    items: [
      { name: 'Python', logo: 'python/python-original.svg' },
      { name: 'JavaScript', logo: 'javascript/javascript-original.svg' },
      { name: 'C', logo: 'c/c-original.svg' },
      { name: 'C++', logo: 'cplusplus/cplusplus-original.svg' },
      { name: 'Java', logo: 'java/java-original.svg' },
    ],
  },
  {
    title: 'Frontend Development',
    icon: Layers3,
    items: [
      { name: 'HTML', logo: 'html5/html5-original.svg' },
      { name: 'CSS', logo: 'css3/css3-original.svg' },
      { name: 'React', logo: 'react/react-original.svg' },
      { name: 'Next.js', logo: 'nextjs/nextjs-original-wordmark.svg' },
      { name: 'Tailwind CSS', logo: 'tailwindcss/tailwindcss-original.svg' },
    ],
  },
  {
    title: 'Backend Development',
    icon: Code2,
    items: [{ name: 'FastAPI', logo: 'fastapi/fastapi-original.svg' }],
  },
  {
    title: 'Databases',
    icon: Database,
    items: [
      { name: 'PostgreSQL', logo: 'postgresql/postgresql-original.svg' },
      { name: 'MySQL', logo: 'mysql/mysql-original.svg' },
    ],
  },
  {
    title: 'Tools & Platforms',
    icon: GitBranch,
    items: [
      { name: 'Git', logo: 'git/git-original.svg' },
      { name: 'GitHub', logo: 'github/github-original.svg' },
      { name: 'VS Code', logo: 'vscode/vscode-original.svg' },
      { name: 'Ubuntu Linux', logo: 'ubuntu/ubuntu-original.svg' },
    ],
  },
  {
    title: 'Computer Science Fundamentals',
    icon: Braces,
    items: [
      { name: 'DSA', icon: Waypoints },
      { name: 'OOP', icon: Blocks },
    ],
  },
]
