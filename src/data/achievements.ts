/**
 * Add verified recognition in achievements and publishable documents in
 * certificates. Put certificate files under public/certificates/ and use
 * root-relative paths such as '/certificates/event-certificate.pdf'.
 */
export type Achievement = {
  title: string
  result: string
  year: string
  team: string
  recognitionType: 'Finalist recognition' | 'Award'
  image?: string
  imageAlt?: string
  certificateFile?: string
  verificationUrl?: string
}

export type CertificateType =
  | 'Participation'
  | 'Completion'
  | 'Finalist recognition'
  | 'Award'
  | 'Technical certification'
  | 'Training'
  | 'Workshop'
  | 'Seminar'
  | 'Program'
  | 'Recognition'
  | 'Appreciation'

export type CertificateCategory = 'Technical & Programs' | 'Hackathons & Competitions' | 'Leadership & Mentorship'

export type Certificate = {
  id: string
  title: string
  event?: string
  organization?: string
  category: CertificateCategory
  year?: string
  type?: CertificateType
  file?: string
  previewImage?: string
  imageAlt?: string
  verificationUrl?: string
  featured?: boolean
}

export type Experience = {
  id: string
  role: string
  organization: string
  description: string
  year?: string
}

export const experiences: Experience[] = [
  {
    id: 'college-hackathon-mentorship',
    role: 'Hackathon Mentor',
    organization: 'Cosmos College of Management and Technology',
    description: 'Mentored +2-level students during a college hackathon.',
  },
]

export const achievements: Achievement[] = [
  {
    title: 'Hult Prize Nepal Nationals',
    result: 'Top 8 finalist',
    year: '2026',
    team: 'Agri-Volt',
    recognitionType: 'Finalist recognition',
  },
  {
    title: 'Hult Prize Campus Round',
    result: 'Campus round winner',
    year: '2026',
    team: 'Agri-Volt',
    recognitionType: 'Award',
  },
]

export const certificates: Certificate[] = [
  {
    id: 'codestorm-2025-recognition',
    title: 'CodeStorm 2025',
    event: 'CodeStorm 2025',
    organization: 'ICT Club',
    category: 'Hackathons & Competitions',
    year: '2025',
    type: 'Recognition',
    file: '/certificates/hackathons-competitions/codestorm-2025-recognition.png',
    imageAlt: 'CodeStorm 2025 certificate of recognition for Sudesh Bhattarai',
  },
  {
    id: 'hult-prize-nepal-nationals-finalist',
    title: 'Top 8 Finalist',
    event: 'Hult Prize Nepal Nationals',
    organization: 'Hult Prize Foundation',
    category: 'Hackathons & Competitions',
    year: '2026',
    type: 'Finalist recognition',
    file: '/certificates/hackathons-competitions/hult-prize-nepal-nationals-finalist.jpg',
    imageAlt: 'Hult Prize 2026 Nepal National Competition finalist certificate for Sudesh Bhattarai',
    featured: true,
  },
  {
    id: 'hult-prize-campus-round-winner',
    title: 'Campus Round Winner',
    event: 'Hult Prize OnCampus Main Event',
    organization: 'Cosmos College of Management and Technology',
    category: 'Hackathons & Competitions',
    year: '2026',
    type: 'Award',
    file: '/certificates/hackathons-competitions/hult-prize-campus-round-winner.jpeg',
    imageAlt: 'Hult Prize OnCampus Main Event 2026 winner certificate for Sudesh Bhattarai',
    featured: true,
  },
  {
    id: 'national-ai-hackathon-2026',
    title: 'National AI Hackathon 2026',
    event: 'National AI Hackathon 2026',
    organization: 'Kodedristi Software Pvt. Ltd.',
    category: 'Hackathons & Competitions',
    year: '2026',
    type: 'Participation',
    file: '/certificates/hackathons-competitions/national-ai-hackathon-2026-participation.jpeg',
    imageAlt: 'National AI Hackathon 2026 participation certificate for Sudesh Bhattarai',
  },
  {
    id: 'cosmos-hackathon-mentorship',
    title: 'Hackathon Mentorship',
    event: 'Cosmos Hackathon',
    organization: 'Cosmos College of Management and Technology',
    category: 'Leadership & Mentorship',
    year: '2026',
    type: 'Appreciation',
    file: '/certificates/leadership-mentorship/cosmos-hackathon-mentorship.jpeg',
    imageAlt: 'Certificate of appreciation for mentoring during the Cosmos Hackathon in June 2026',
    featured: true,
  },
  {
    id: 'cybersecurity-101-workshop',
    title: 'Cybersecurity 101',
    event: 'Lakshyarambha Cybersecurity 101',
    organization: 'CSIT Association of Nepal',
    category: 'Technical & Programs',
    year: '2026',
    type: 'Participation',
    file: '/certificates/technical-programs/cybersecurity-101-workshop.png',
    imageAlt: 'Certificate of participation in Lakshyarambha Cybersecurity 101 on July 11, 2026',
  },
  {
    id: 'portfolio-website-essentials-workshop',
    title: 'Portfolio Website Essentials',
    event: 'Portfolio Website Essentials',
    organization: 'CSIT Association of Nepal',
    category: 'Technical & Programs',
    type: 'Workshop',
    file: '/certificates/technical-programs/portfolio-website-essentials-workshop.png',
    imageAlt: 'Certificate of participation in the Portfolio Website Essentials virtual workshop',
  },
  {
    id: 'python-git-training',
    title: 'Python and Git Training',
    event: 'Python and Git Training',
    organization: 'ICT Club',
    category: 'Technical & Programs',
    type: 'Training',
    file: '/certificates/technical-programs/python-git-training.jpg',
    imageAlt: 'Certificate for completing Python and Git training organized by the ICT Club',
  },
]
