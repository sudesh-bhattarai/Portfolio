'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { ExternalLink, FileBadge2, FileText } from 'lucide-react'
import type { Certificate, CertificateCategory } from '@/data/achievements'

type CertificateGalleryProps = {
  certificates: Certificate[]
}

const categories: Array<'All' | CertificateCategory> = [
  'All',
  'Technical & Programs',
  'Hackathons & Competitions',
  'Leadership & Mentorship',
]
const initialVisibleCount = 3

function isSupportedPublicFile(path?: string): path is string {
  return Boolean(path && !path.includes('..') && /^\/certificates\/[^?#]+\.(?:pdf|jpe?g|png|webp)$/i.test(path))
}

function isImagePath(path?: string): path is string {
  return Boolean(path && !path.includes('..') && /^\/certificates\/[^?#]+\.(?:jpe?g|png|webp)$/i.test(path))
}

function isHttpUrl(value?: string): value is string {
  if (!value) return false
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function validCertificateUrl(value?: string): value is string {
  return isSupportedPublicFile(value) || isHttpUrl(value)
}

export default function CertificateGallery({ certificates }: CertificateGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | CertificateCategory>('All')
  const [showAll, setShowAll] = useState(false)

  const matchingCertificates = useMemo(() => {
    const filtered = selectedCategory === 'All'
      ? certificates
      : certificates.filter(certificate => certificate.category === selectedCategory)

    const firstRowOrder = [
      'national-ai-hackathon-2026',
      'cosmos-hackathon-mentorship',
      'hult-prize-nepal-nationals-finalist',
    ]

    return [...filtered].sort((first, second) => {
      const firstPriority = firstRowOrder.indexOf(first.id)
      const secondPriority = firstRowOrder.indexOf(second.id)
      if (firstPriority !== -1 || secondPriority !== -1) {
        return (firstPriority === -1 ? Number.MAX_SAFE_INTEGER : firstPriority)
          - (secondPriority === -1 ? Number.MAX_SAFE_INTEGER : secondPriority)
      }
      return Number(Boolean(second.featured)) - Number(Boolean(first.featured))
    })
  }, [certificates, selectedCategory])

  const visibleCertificates = showAll
    ? matchingCertificates
    : matchingCertificates.slice(0, initialVisibleCount)
  const canExpand = matchingCertificates.length > initialVisibleCount

  function selectCategory(category: 'All' | CertificateCategory) {
    setSelectedCategory(category)
    setShowAll(false)
  }

  return <section id="certificates" className="section certificate-section" aria-labelledby="certificates-heading">
    <div className="wrap">
      <div className="certificate-section-heading">
        <span className="certificate-section-icon" aria-hidden="true"><FileBadge2 size={22}/></span>
        <h2 id="certificates-heading">Certificates</h2>
      </div>

      <div className="certificate-filters" role="group" aria-label="Filter certificates by category">
        {categories.map(category => {
          const count = category === 'All'
            ? certificates.length
            : certificates.filter(certificate => certificate.category === category).length
          return <button
            className="certificate-filter"
            type="button"
            key={category}
            aria-pressed={selectedCategory === category}
            onClick={() => selectCategory(category)}
          >{category}<span>{count}</span></button>
        })}
      </div>

      {certificates.length === 0 ? <p className="certificate-empty">No certificates have been added yet. Add real certificate details in <code>src/data/achievements.ts</code>.</p>
        : matchingCertificates.length === 0 ? <p className="certificate-empty">No certificates in this category yet.</p>
          : <>
            <div className="certificate-grid">
              {visibleCertificates.map(certificate => {
                const viewUrl = validCertificateUrl(certificate.file) ? certificate.file : undefined
                const previewPath = isImagePath(certificate.previewImage)
                  ? certificate.previewImage
                  : isImagePath(certificate.file) ? certificate.file : undefined
                const issuer = certificate.event && certificate.event !== certificate.title
                  ? certificate.event
                  : certificate.organization || certificate.event

                return <article className="certificate-card" key={certificate.id}>
                  <div className="certificate-preview">
                    {previewPath
                      ? <Image src={previewPath} alt={certificate.imageAlt || `${certificate.title} certificate preview`} width={480} height={320} sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw" loading="lazy"/>
                      : <span className="certificate-pdf-icon" aria-hidden="true"><FileText size={32}/><small>{viewUrl ? 'CERTIFICATE' : 'FILE NEEDED'}</small></span>}
                  </div>
                  <div className="certificate-info">
                    <div className="certificate-labels"><span className="certificate-type">{certificate.type || 'Certificate'}</span></div>
                    <h3>{certificate.title}</h3>
                    {(issuer || certificate.year) && <p className="certificate-meta">{issuer}{issuer && certificate.year && <span aria-hidden="true"> · </span>}{certificate.year}</p>}
                    <div className="certificate-actions">
                      {viewUrl
                        ? <a className="view-certificate" href={viewUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${certificate.title} certificate`}>View Certificate <ExternalLink size={14}/></a>
                        : <span className="certificate-missing-file">Add the certificate file to enable viewing</span>}
                      {isHttpUrl(certificate.verificationUrl) && <a className="verify-certificate" href={certificate.verificationUrl} target="_blank" rel="noopener noreferrer" aria-label={`Verify ${certificate.title}`}>Verify <ExternalLink size={14}/></a>}
                    </div>
                  </div>
                </article>
              })}
            </div>
            {canExpand && <div className="certificate-more-wrap"><button className="certificate-more" type="button" onClick={() => setShowAll(value => !value)} aria-expanded={showAll}>{showAll ? 'Show Less' : 'Show More Certificates'}</button></div>}
          </>}
    </div>
  </section>
}
