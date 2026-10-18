/**
 * Project content and asset configuration.
 * Place supplied images under public/projects/<project-folder>/ and update the
 * corresponding image/logo paths below. Replace empty URLs with the real links.
 */
type Project = {
  number: string
  name: string
  description: string
  technologies: string[]
  image: string
  logo?: string
  demo?: string
  github: string
}

export const projects: Project[] = [
  {
    number: '01',
    name: 'Company Assets Tracker',
    description:
      'A web-based asset management system that helps companies manage employees, equipment assignments, asset returns, and maintenance records through a centralized dashboard.',
    technologies: ['HTML', 'CSS', 'Bootstrap', 'Vanilla JavaScript', 'Node.js', 'Express', 'PostgreSQL'],
    image: '/projects/company-assets-tracker/screenshot.png',
    logo: '/projects/company-assets-tracker/logo.jpeg',
    demo: 'https://company-assets-tracker.vercel.app/index.html',
    github: 'https://github.com/sudesh-bhattarai/Company_Assets_Tracker',
  },
  {
    number: '02',
    name: 'Online Voting System',
    description: 'A web-based voting application built with a browser-based frontend, Java backend, and PostgreSQL database.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Java', 'PostgreSQL'],
    image: '/projects/online-voting-system/screenshot.png',
    github: 'https://github.com/ghimirebabin07/Online_Voting_Sytem_Java',
  },
]
