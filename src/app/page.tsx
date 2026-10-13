'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Image from 'next/image'
import { ArrowDown, ArrowRight, ArrowUpRight, AtSign, BookOpen, Blocks, Check, Compass, ExternalLink, Github, Linkedin, Menu, Send, UserRound, X } from 'lucide-react'
import { personalInfo } from '@/data/personalInfo'
import { projects } from '@/data/projects'
import { skillGroups } from '@/data/skills'
import { achievements } from '@/data/achievements'

const nav = [{ label: 'Home', href: '#home' }, { label: 'About', href: '#about' }, { label: 'Skills', href: '#skills' }, { label: 'Projects', href: '#projects' }, { label: 'Education', href: '#education' }, { label: 'Contact', href: '#contact' }]
const aboutInterests = [
  { title: 'Building Projects', description: 'Turning ideas into practical applications.', icon: Blocks },
  { title: 'Exploring Technology', description: 'Discovering new tools and solving problems.', icon: Compass },
  { title: 'Continuous Learning', description: 'Improving through practice and experience.', icon: BookOpen },
]

function SectionTitle({ title }: { title: string }) {
  return <div className="section-title"><h2>{title}</h2></div>
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'unconfigured'>('idle')
  const isSubmitting = useRef(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const sections = nav
      .map(({ href }) => document.getElementById(href.slice(1)))
      .filter((section): section is HTMLElement => section instanceof HTMLElement)

    const updateActiveSection = () => {
      const readingLine = window.scrollY + window.innerHeight * 0.35
      let current = sections[0]?.id ?? 'home'
      for (const section of sections) {
        if (section.offsetTop <= readingLine) current = section.id
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', updateActiveSection, { passive: true })
    updateActiveSection()
    return () => window.removeEventListener('scroll', updateActiveSection)
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT
    if (!endpoint || endpoint.includes('your-form-id')) { setFormStatus('unconfigured'); return }
    if (isSubmitting.current) return
    isSubmitting.current = true
    setFormStatus('loading')
    const form = event.currentTarget
    try {
      const response = await fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      if (!response.ok) throw new Error('Message could not be sent')
      form.reset()
      setFormStatus('success')
    } catch { setFormStatus('error') }
    finally { isSubmitting.current = false }
  }

  return <>
    <header className="topbar"><div className="nav-wrap">
      <a className="brand" href="#home" aria-label={`${personalInfo.name}, home`}><span className="brand-mark">s<span>.</span></span><span className="brand-name">{personalInfo.name}</span></a>
      <nav className="desktop-nav" aria-label="Main navigation">{nav.map(item => {const id = item.href.slice(1); return <a key={item.href} className={activeSection === id ? 'active' : undefined} aria-current={activeSection === id ? 'location' : undefined} href={item.href}>{item.label}</a>})}</nav>
      <button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
    </div><AnimatePresence>{menuOpen && <motion.nav className="mobile-nav" initial={reduced ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: reduced ? 0 : 0.18 }} aria-label="Mobile navigation">{nav.map(item => {const id = item.href.slice(1); return <a key={item.href} className={activeSection === id ? 'active' : undefined} aria-current={activeSection === id ? 'location' : undefined} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}<ArrowUpRight size={14}/></a>})}</motion.nav>}</AnimatePresence></header>

    <main className="min-h-screen">
      <section id="home" className="hero wrap">
        <motion.div className="hero-copy" initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.35 }}>
          <h1>Building thoughtful<br/><span>digital experiences.</span></h1>
          <p className="hero-role">{personalInfo.role}</p><p className="hero-description">{personalInfo.description}</p>
          <div className="hero-actions"><a className="button button-primary" href="#projects">View projects <ArrowRight size={16}/></a><a className="button button-quiet" href={personalInfo.resume} target="_blank" rel="noreferrer">Download resume <ArrowDown size={15}/></a></div>
          <div className="social-row"><a href={personalInfo.github} target="_blank" rel="noreferrer"><Github size={18}/> GitHub</a><a href={personalInfo.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18}/> LinkedIn</a><a href={`mailto:${personalInfo.email}`}><AtSign size={18}/> Email</a></div>
        </motion.div>
        <div className="hero-art"><div className="portrait-orbit"><div className="portrait-frame">{personalInfo.photo ? <Image src={personalInfo.photo} alt={`Portrait of ${personalInfo.name}`} fill priority sizes="(max-width: 700px) 72vw, 340px" className="portrait-image" /> : <div className="portrait-placeholder"><UserRound size={58} strokeWidth={1.1}/><span>Add your photo</span></div>}</div><span className="portrait-accent portrait-accent-one"/><span className="portrait-accent portrait-accent-two"/></div></div>
      </section>

      <section id="about" className="section section-about"><div className="wrap about-layout"><div className="about-intro"><SectionTitle title="About Me"/><div className="about-copy-list"><p className="body-copy about-copy">I’m Sudesh Bhattarai, an aspiring software developer who enjoys learning how technology can solve everyday problems.</p><p className="body-copy about-copy">I’m especially interested in backend development and building useful applications that turn ideas into practical solutions.</p><p className="body-copy about-copy">I keep improving through practice, exploring new technologies, and taking on projects that help me grow as a developer.</p></div></div><aside className="about-enjoy" aria-labelledby="about-enjoy-title"><h3 id="about-enjoy-title">What I Enjoy</h3><div className="enjoy-cards">{aboutInterests.map(({ title, description, icon: Icon }) => <article className="enjoy-card" key={title}><span className="enjoy-card-icon"><Icon size={21} aria-hidden="true"/></span><div><h4>{title}</h4><p>{description}</p></div></article>)}</div></aside></div></section>

      <section id="skills" className="section section-alt"><div className="wrap"><SectionTitle title="Skills & tools"/><div className="skills-grid">{skillGroups.map(group => {const Icon = group.icon; return <article className="skill-card" key={group.title}><div className="skill-head"><Icon size={20}/><h3>{group.title}</h3></div><div className="tag-list">{group.items.map(skill => <span key={skill}>{skill}</span>)}</div></article>})}</div></div></section>

      <section id="projects" className="section section-projects"><div className="wrap"><SectionTitle title="Projects"/><div className="projects-grid">{projects.map(project => <article className="project-card" key={project.number}><a className="project-image" href={project.demo || project.github} target="_blank" rel="noreferrer" aria-label={`Explore ${project.name}`} style={{ backgroundImage: `linear-gradient(180deg, rgba(8,10,14,0.02), rgba(8,10,14,0.20)), url("${project.image}")` }}><span className="image-arrow"><ArrowUpRight size={19}/></span></a><div className="project-info"><h3>{project.name}</h3><p>{project.description}</p><div className="project-tags">{project.technologies.map(t => <span key={t}>{t}</span>)}</div><div className="project-links"><a href={project.github} target="_blank" rel="noreferrer"><Github size={17}/> GitHub</a>{project.demo && <a href={project.demo} target="_blank" rel="noreferrer">Live demo <ExternalLink size={16}/></a>}</div></div></article>)}</div></div></section>

      <section id="education" className="section section-alt"><div className="wrap"><SectionTitle title="Education & achievements"/><div className="background-grid"><div><div className="subsection-label">Education</div><div className="timeline-item"><span className="timeline-dot"/><div><span className="detail-label">{personalInfo.educationPeriod}</span><h3>{personalInfo.education}</h3><p>{personalInfo.institution}</p></div></div></div><div><div className="subsection-label">Achievements</div><div className="achievement-list">{achievements.map(a => <div className="achievement" key={a.title}><div><h3>{a.title}</h3><p>{a.detail}</p></div></div>)}</div></div></div></div></section>

      <section id="contact" className="section contact-section"><div className="wrap"><SectionTitle title="Let’s connect"/><div className="contact-grid"><div className="contact-copy"><p>I’m always glad to connect with curious people. Send a note and I’ll get back to you.</p><div className="contact-links"><a href={`mailto:${personalInfo.email}`}><span className="contact-icon"><AtSign size={19}/></span><span>{personalInfo.email}</span></a><a href={personalInfo.github} target="_blank" rel="noreferrer"><span className="contact-icon"><Github size={19}/></span><span>GitHub</span></a><a href={personalInfo.linkedin} target="_blank" rel="noreferrer"><span className="contact-icon"><Linkedin size={19}/></span><span>LinkedIn</span></a></div></div><div className="contact-form-wrap"><form className="contact-form" onSubmit={handleSubmit}><div className="form-heading"><h3>Send me a message</h3></div><label>Your name<input type="text" name="name" placeholder="Jane Smith" required minLength={2}/></label><label>Email address<input type="email" name="email" placeholder="jane@example.com" required/></label><label>Subject<input type="text" name="subject" placeholder="What would you like to talk about?" required minLength={3}/></label><label>Message<textarea name="message" placeholder="Tell me a little about it..." required minLength={10} rows={4}/></label><button className="button button-primary form-submit" type="submit" disabled={formStatus === 'loading'}>{formStatus === 'loading' ? 'Sending…' : 'Send message'}{formStatus === 'loading' ? <span className="spinner"/> : <Send size={17}/>}</button>{formStatus === 'success' && <p className="form-feedback success" aria-live="polite"><Check size={17}/> Thanks! Your message has been sent successfully. I’ll get back to you soon.</p>}{formStatus === 'error' && <p className="form-feedback error" aria-live="polite">Something went wrong. Please try again or email me directly.</p>}{formStatus === 'unconfigured' && <p className="form-feedback error" aria-live="polite">The form isn’t connected yet. Set <code>NEXT_PUBLIC_FORMSPREE_ENDPOINT</code> in <code>.env.local</code>, or <a href={`mailto:${personalInfo.email}`}>send me an email</a>.</p>}<p className="form-fallback">Prefer email? <a href={`mailto:${personalInfo.email}`}>Send me an email</a></p></form></div></div></div></section>
    </main>

  </>
}
