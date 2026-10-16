'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowRight, ArrowUpRight, AtSign, Award, BookOpen, Blocks, Check, ExternalLink, Facebook, Github, FileBadge2, GraduationCap, Instagram, Linkedin, Menu, MapPin, Phone, Send, UserRound, Waypoints, X } from 'lucide-react'
import { personalInfo } from '@/data/personalInfo'
import { projects } from '@/data/projects'
import { skillGroups } from '@/data/skills'
import { achievements, experiences } from '@/data/achievements'
import ThemeToggle from '@/components/ThemeToggle'

const nav = [{ label: 'Home', href: '#home' }, { label: 'About', href: '#about' }, { label: 'Skills', href: '#skills' }, { label: 'Projects', href: '#projects' }, { label: 'Experience', href: '#experience' }, { label: 'Certificates', href: '/certificates' }, { label: 'Contact', href: '#contact' }]
const emailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(personalInfo.email)}`
function isHttpUrl(value?: string): value is string {
  if (!value) return false
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}
function isAchievementImage(value?: string): value is string {
  return Boolean(value && !value.includes('..') && /^\/(?:achievements|certificates)\/[^?#]+\.(?:jpe?g|png)$/i.test(value))
}
function isCertificatePdf(value?: string): value is string {
  return Boolean(value && !value.includes('..') && /^\/certificates\/[^?#]+\.pdf$/i.test(value))
}

function SectionTitle({ title, id }: { title: string; id?: string }) {
  return <div className="section-title"><h2 id={id}>{title}</h2></div>
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

    const hashSection = window.location.hash.slice(1)
    if (sections.some(section => section.id === hashSection)) {
      setActiveSection(hashSection)
    }

    const updateActiveSection = () => {
      const readingLine = Math.max(84, window.innerHeight * 0.3)
      const currentSection = sections.find(section => {
        const bounds = section.getBoundingClientRect()
        return bounds.top <= readingLine && bounds.bottom > readingLine
      })

      if (currentSection) setActiveSection(currentSection.id)
    }

    const observer = new IntersectionObserver(() => {
      updateActiveSection()
    }, {
      rootMargin: '-84px 0px -60% 0px',
      threshold: 0,
    })

    sections.forEach(section => observer.observe(section))

    const syncHashSection = () => {
      const id = window.location.hash.slice(1)
      if (sections.some(section => section.id === id)) setActiveSection(id)
    }
    window.addEventListener('hashchange', syncHashSection)

    return () => {
      observer.disconnect()
      window.removeEventListener('hashchange', syncHashSection)
    }
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
      <nav className="desktop-nav" aria-label="Main navigation">{nav.map(item => {const id = item.href.startsWith('#') ? item.href.slice(1) : 'certificates'; return <a key={item.href} className={activeSection === id ? 'active' : undefined} aria-current={activeSection === id ? 'location' : undefined} href={item.href} onClick={() => setActiveSection(id)}>{item.label}</a>})}</nav>
      <ThemeToggle />
      <button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
    </div><AnimatePresence>{menuOpen && <motion.nav className="mobile-nav" initial={reduced ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: reduced ? 0 : 0.18 }} aria-label="Mobile navigation">{nav.map(item => {const id = item.href.startsWith('#') ? item.href.slice(1) : 'certificates'; return <a key={item.href} className={activeSection === id ? 'active' : undefined} aria-current={activeSection === id ? 'location' : undefined} href={item.href} onClick={() => {setActiveSection(id); setMenuOpen(false)}}>{item.label}<ArrowUpRight size={14}/></a>})}</motion.nav>}</AnimatePresence></header>

    <main className="min-h-screen">
      <section id="home" className="hero wrap">
        <motion.div className="hero-copy" initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.35 }}>
          <h1>Building thoughtful<br/><span>digital experiences.</span></h1>
          <p className="hero-role">{personalInfo.role}</p><p className="hero-description">{personalInfo.description}</p>
          <div className="hero-actions"><a className="button button-primary" href="#projects">View projects <ArrowRight size={16}/></a><a className="button button-quiet" href={personalInfo.resume} target="_blank" rel="noreferrer">Download resume <ArrowDown size={15}/></a></div>
          <div className="social-row"><a href={personalInfo.github} target="_blank" rel="noreferrer"><Github size={18}/> GitHub</a><a href={personalInfo.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18}/> LinkedIn</a><a href={emailComposeUrl} target="_blank" rel="noreferrer"><AtSign size={18}/> Email</a></div>
        </motion.div>
        <div className="hero-art"><div className="portrait-orbit"><div className="portrait-frame">{personalInfo.photo ? <Image src={personalInfo.photo} alt={`Portrait of ${personalInfo.name}`} fill priority sizes="(max-width: 700px) 72vw, 340px" className="portrait-image" /> : <div className="portrait-placeholder"><UserRound size={58} strokeWidth={1.1}/><span>Add your photo</span></div>}</div><span className="portrait-accent portrait-accent-one"/><span className="portrait-accent portrait-accent-two"/></div></div>
      </section>

      <section id="about" className="section section-about"><div className="wrap about-layout"><div className="about-intro"><SectionTitle title="About Me"/><div className="about-copy-list"><p className="body-copy about-copy">I’m Sudesh Bhattarai, an aspiring software developer who enjoys learning how technology can solve everyday problems.</p><p className="body-copy about-copy">I’m especially interested in backend development and building useful applications that turn ideas into practical solutions.</p><p className="body-copy about-copy">I keep improving through practice, exploring new technologies, and taking on projects that help me grow as a developer.</p></div></div><aside className="about-education" aria-labelledby="about-education-title"><div className="about-education-heading"><span className="about-education-icon" aria-hidden="true"><GraduationCap size={21}/></span><h3 id="about-education-title">Education</h3></div><div className="about-education-list"><article className="about-education-item"><h4>{personalInfo.education}</h4><p>{personalInfo.institution}</p><div className="about-education-meta"><span>{personalInfo.educationPeriod}</span><span className="about-current-label">Current</span></div></article><article className="about-education-item"><h4>{personalInfo.previousEducation.qualification}</h4><p>{personalInfo.previousEducation.institution}</p><div className="about-education-meta"><span>{personalInfo.previousEducation.stream}</span><span>GPA {personalInfo.previousEducation.gpa}</span></div></article></div></aside></div></section>

      <section id="skills" className="section section-alt"><div className="wrap"><div className="skills-intro"><SectionTitle title="Skills & tools"/><p>Technologies and fundamentals I use to build and learn.</p></div><div className="skills-grid">{skillGroups.map(group => {const Icon = group.icon; return <article className="skill-card" key={group.title}><div className="skill-head"><Icon size={20} aria-hidden="true"/><h3>{group.title}</h3></div><div className="skill-tiles">{group.items.map(({ name, logo }: { name: string; logo?: string }) => <div className="skill-tile" key={name}>{logo ? <img className={`skill-logo skill-logo-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} src={`https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/${logo}`} alt="" aria-hidden="true" loading="lazy"/> : <Waypoints className="skill-logo skill-logo-concept" aria-hidden="true"/>}<span className="skill-label">{name}</span></div>)}</div></article>})}</div></div></section>

      <section id="projects" className="section section-projects"><div className="wrap"><SectionTitle title="Projects"/><div className="projects-grid">{projects.map(project => <article className="project-card" key={project.number}>
        <div className="project-image" aria-label={`${project.name} project preview`}>
          {project.image ? <img className="project-screenshot" src={project.image} alt={`${project.name} application screenshot`} loading="lazy"/> : <div className="project-preview-placeholder"><span className="preview-mark" aria-hidden="true"><Blocks size={28}/></span><span>Project screenshot</span><small>Add your image in the project configuration</small></div>}
          {project.logo && <img className="project-logo" src={project.logo} alt={`${project.name} logo`} loading="lazy"/>}
        </div>
        <div className="project-info"><h3>{project.name}</h3><p>{project.description}</p><div className="project-tags">{project.technologies.map(t => <span key={t}>{t}</span>)}</div>
          <div className="project-links">
            {project.name === 'Company Assets Tracker' && (project.demo ? <a className="project-link-primary" href={project.demo} target="_blank" rel="noreferrer">Live Demo <ExternalLink size={16}/></a> : <span className="project-link-primary project-link-pending" aria-disabled="true">Live Demo <small>URL needed</small></span>)}
            {project.github ? <a href={project.github} target="_blank" rel="noreferrer"><Github size={17}/> GitHub</a> : <span className="project-link-pending" aria-disabled="true"><Github size={17}/> GitHub <small>URL needed</small></span>}
          </div>
        </div>
      </article>)}</div></div></section>

      <section id="experience" className="section section-alt education-portfolio-section" aria-labelledby="experience-title"><div className="wrap experience-achievement-grid">
        <section className="experience-column" aria-labelledby="experience-title"><SectionTitle title="Experience" id="experience-title"/><div className="experience-timeline">{experiences.map(experience => <article className="experience-entry" key={experience.id}><div className="timeline-rail"><span className="experience-icon" aria-hidden="true"><BookOpen size={19}/></span><span className="timeline-line" aria-hidden="true"/></div><div className="experience-content"><span className="experience-role">MENTORSHIP</span><h3>{experience.role}</h3><p className="experience-organization">{experience.organization}</p><p className="experience-description">{experience.description}</p>{experience.year && <span className="experience-year">{experience.year}</span>}</div></article>)}</div></section>
        <section id="achievements" className="recognition-section" aria-labelledby="achievements-title"><SectionTitle title="Achievements & Recognition" id="achievements-title"/><div className="achievement-list">{achievements.map(achievement => <article className="achievement-card" key={`${achievement.title}-${achievement.year}`}>
          {isAchievementImage(achievement.image) ? <img className="achievement-icon achievement-image" src={achievement.image} alt={achievement.imageAlt || `${achievement.title} image`} loading="lazy"/> : <span className="achievement-icon" aria-hidden="true"><Award size={25}/></span>}<div className="achievement-content"><span className="achievement-kind">{achievement.result.toLowerCase().includes('winner') ? 'WINNER' : 'FINALIST'}</span><h3 className="achievement-event">{achievement.result}</h3><p className="achievement-result">{achievement.title}</p><div className="achievement-meta"><span>{achievement.year}</span><span className="achievement-meta-divider" aria-hidden="true"/><span>{achievement.team}</span></div>
            {(isCertificatePdf(achievement.certificateFile) || isHttpUrl(achievement.verificationUrl)) && <div className="achievement-links">{isCertificatePdf(achievement.certificateFile) && <a href={achievement.certificateFile} target="_blank" rel="noreferrer">View certificate <ExternalLink size={14}/></a>}{isHttpUrl(achievement.verificationUrl) && <a href={achievement.verificationUrl} target="_blank" rel="noreferrer">Verify achievement <ExternalLink size={14}/></a>}</div>}
          </div></article>)}</div></section>
      </div></section>
      <section id="certificates" className="section certificate-preview-section" aria-labelledby="certificate-preview-title"><div className="wrap"><div className="certificate-preview-card"><span className="certificate-preview-icon" aria-hidden="true"><FileBadge2 size={22}/></span><div className="certificate-preview-copy"><h2 id="certificate-preview-title">Certificates &amp; Recognition</h2><p>Learning, building, competing, and growing as a developer.</p></div><Link className="certificate-preview-link" href="/certificates">Explore Certificates <ArrowRight size={16}/></Link></div></div></section>

      <section id="contact" className="section contact-section" aria-labelledby="contact-title">
        <div className="wrap">
          <SectionTitle title="Let&apos;s connect" id="contact-title"/>
          <div className="contact-grid">
            <div className="contact-copy">
              <p className="contact-intro">Every good project starts with a conversation. Whether you have an idea to build, a challenge to solve, or simply want to connect, I’d love to hear from you.</p>
              <div className="contact-links" aria-label="Contact information">
                <a href={emailComposeUrl} target="_blank" rel="noreferrer">
                  <span className="contact-icon" aria-hidden="true"><AtSign size={19}/></span>
                  <span><small>EMAIL</small><span className="contact-value">{personalInfo.email}</span></span>
                  <ArrowRight className="contact-link-arrow" size={18} aria-hidden="true"/>
                </a>
                <a href={`tel:${personalInfo.phone.replace(/[^\d+]/g, "")}`} aria-label={`Call ${personalInfo.phone}`}>
                  <span className="contact-icon" aria-hidden="true"><Phone size={19}/></span>
                  <span><small>PHONE</small><span className="contact-value">{personalInfo.phone}</span></span>
                  <ArrowRight className="contact-link-arrow" size={18} aria-hidden="true"/>
                </a>
                <a href="https://www.google.com/maps/search/?api=1&amp;query=Kathmandu%2C%20Nepal" target="_blank" rel="noreferrer" aria-label="View Kathmandu, Nepal on a map">
                  <span className="contact-icon" aria-hidden="true"><MapPin size={19}/></span>
                  <span><small>LOCATION</small><span className="contact-value">Kathmandu, Nepal</span></span>
                  <ArrowRight className="contact-link-arrow" size={18} aria-hidden="true"/>
                </a>
              </div>
              <div className="contact-social-card">
                <h3>Socials</h3>
                <div className="contact-social-links" aria-label="Social links">
                  <a href={personalInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={20} aria-hidden="true"/></a>
                  <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={20} aria-hidden="true"/></a>
                  <a href={personalInfo.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={20} aria-hidden="true"/></a>
                  <a href={personalInfo.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={20} aria-hidden="true"/></a>
                </div>
              </div>
            </div>
            <div className="contact-form-wrap">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-heading"><h3>Send me a message</h3></div>
                <label>Your name<input suppressHydrationWarning type="text" name="name" placeholder="Jane Smith" required minLength={2}/></label>
                <label>Email address<input suppressHydrationWarning type="email" name="email" placeholder="jane@example.com" required/></label>
                <label>Subject<input suppressHydrationWarning type="text" name="subject" placeholder="What would you like to talk about?" required minLength={3}/></label>
                <label>Message<textarea suppressHydrationWarning name="message" placeholder="Tell me a little about it..." required minLength={10} rows={4}/></label>
                <button className="button button-primary form-submit" type="submit" disabled={formStatus === 'loading'}>{formStatus === 'loading' ? 'Sending…' : 'Send message'}{formStatus === 'loading' ? <span className="spinner"/> : <Send size={17}/>}</button>
                {formStatus === 'success' && <p className="form-feedback success" aria-live="polite"><Check size={17}/> Thanks! Your message has been sent successfully. I’ll get back to you soon.</p>}
                {formStatus === 'error' && <p className="form-feedback error" aria-live="polite">Something went wrong. Please try again or email me directly.</p>}
                {formStatus === 'unconfigured' && <p className="form-feedback error" aria-live="polite">The form isn’t connected yet. Set <code>NEXT_PUBLIC_FORMSPREE_ENDPOINT</code> in <code>.env.local</code>, or <a href={emailComposeUrl} target="_blank" rel="noreferrer">send me an email</a>.</p>}
                <p className="form-fallback">Prefer email? <a href={emailComposeUrl} target="_blank" rel="noreferrer">Send me an email</a></p>
              </form>
            </div>
          </div>
          <p className="contact-closing">Looking forward to hearing from you!</p>
        </div>
      </section>
    </main>

    <footer className="footer"><div className="wrap footer-inner">
      <a className="brand footer-brand" href="#home" aria-label={`${personalInfo.name}, back to top`}><span className="brand-mark">s<span>.</span></span><span className="brand-name">{personalInfo.name}</span></a>
      <p>Thoughtfully building, learning, and growing.</p>
      <div className="footer-social" aria-label="Social links"><a href={personalInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18}/></a><a href={personalInfo.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18}/></a><a href={emailComposeUrl} target="_blank" rel="noreferrer" aria-label="Email"><AtSign size={18}/></a></div>
      <span className="copyright">© {new Date().getFullYear()} {personalInfo.name}</span>
    </div></footer>

  </>
}
