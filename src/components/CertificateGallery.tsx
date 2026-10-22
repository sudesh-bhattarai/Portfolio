'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  ExternalLink,
  FileText,
  Trophy,
  UsersRound,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { StaticImageData } from 'next/image'
import type { Certificate, CertificateCategory } from '@/data/achievements'
import { relativeStaticImage } from '@/lib/relativeImage'

type CertificateGalleryProps = {
  certificates: Certificate[]
}

const categories: CertificateCategory[] = [
  'Technical & Programs',
  'Hackathons & Competitions',
  'Leadership & Mentorship',
]

const categoryIcons: Record<CertificateCategory, LucideIcon> = {
  'Technical & Programs': Code2,
  'Hackathons & Competitions': Trophy,
  'Leadership & Mentorship': UsersRound,
}

const initialVisibleCount = 3
const revealBatchSize = 3

function isSupportedPublicFile(path?: string | StaticImageData): path is string | StaticImageData {
  if (path && typeof path !== 'string') return true
  return Boolean(path && /^\.\/certificates\/[^?#]+\.(?:pdf|jpe?g|png|webp)$/i.test(path))
}

function isImagePath(path?: string | StaticImageData): path is string | StaticImageData {
  if (path && typeof path !== 'string') return true
  return Boolean(path && /^\.\/certificates\/[^?#]+\.(?:jpe?g|png|webp)$/i.test(path))
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

function validCertificateUrl(value?: string | StaticImageData): value is string | StaticImageData {
  return isSupportedPublicFile(value) || (typeof value === 'string' && isHttpUrl(value))
}

function certificatePageAssetPath(path: string | StaticImageData): string | StaticImageData {
  return typeof path === 'string'
    ? path.replace(/^\.\//, './../')
    : relativeStaticImage(path, 1)
}

function certificatePageHref(path: string | StaticImageData): string {
  return typeof path === 'string'
    ? path.replace(/^\.\//, './../')
    : relativeStaticImage(path, 1).src
}

export default function CertificateGallery({ certificates }: CertificateGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<CertificateCategory | null>(null)
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount)

  const categoryCertificates = useMemo(() => {
    if (!selectedCategory) return []

    const categoryItems = certificates.filter(
      certificate => certificate.category === selectedCategory,
    )
    const firstRowOrder =
      selectedCategory === 'Hackathons & Competitions'
        ? [
            'national-ai-hackathon-2026',
            'hult-prize-nepal-nationals-finalist',
            'hult-prize-campus-round-winner',
          ]
        : selectedCategory === 'Leadership & Mentorship'
          ? ['cosmos-hackathon-mentorship']
          : []

    return [...categoryItems].sort((first, second) => {
      const firstPriority = firstRowOrder.indexOf(first.id)
      const secondPriority = firstRowOrder.indexOf(second.id)
      if (firstPriority !== -1 || secondPriority !== -1) {
        return (
          (firstPriority === -1 ? Number.MAX_SAFE_INTEGER : firstPriority) -
          (secondPriority === -1 ? Number.MAX_SAFE_INTEGER : secondPriority)
        )
      }
      return Number(Boolean(second.featured)) - Number(Boolean(first.featured))
    })
  }, [certificates, selectedCategory])

  function selectCategory(category: CertificateCategory) {
    setSelectedCategory(category)
    setVisibleCount(initialVisibleCount)
  }

  function returnToCategories() {
    setSelectedCategory(null)
    setVisibleCount(initialVisibleCount)
  }

  return (
    <section
      id="certificates"
      className="section certificate-section"
      aria-labelledby="certificates-heading"
    >
      <div className="wrap certificate-page-content">
        <nav className="certificate-category-navigation" aria-label="Certificate navigation">
          {selectedCategory && (
            <button
              className="certificate-back-categories"
              type="button"
              onClick={returnToCategories}
            >
              <ArrowLeft size={15} /> All Categories
            </button>
          )}
          <Link
            className="certificate-back-link"
            href="/#certificates"
            aria-label="Back to the portfolio home page"
          >
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>
        </nav>

        {!selectedCategory && (
          <header className="certificate-page-heading">
            <h1 id="certificates-heading">Certificates &amp; Recognition</h1>
            <p>Explore certificates from technical learning, competitions, and mentorship.</p>
          </header>
        )}

        {!selectedCategory ? (
          <div
            className="certificate-category-grid"
            role="group"
            aria-label="Choose a certificate category"
          >
            {categories.map(category => {
              const Icon = categoryIcons[category]
              const count = certificates.filter(
                certificate => certificate.category === category,
              ).length

              return (
                <button
                  className="certificate-category-card"
                  type="button"
                  key={category}
                  onClick={() => selectCategory(category)}
                >
                  <span className="certificate-category-icon" aria-hidden="true">
                    <Icon size={21} />
                  </span>
                  <span className="certificate-category-name">{category}</span>
                  <span className="certificate-category-count">
                    {count} {count === 1 ? 'certificate' : 'certificates'}
                  </span>
                  <ArrowRight
                    className="certificate-category-arrow"
                    size={17}
                    aria-hidden="true"
                  />
                </button>
              )
            })}
          </div>
        ) : (
          <div className="certificate-category-view">
            <div className="certificate-selected-heading">
              <h2 id="certificates-heading">{selectedCategory}</h2>
              <p>
                {categoryCertificates.length}{' '}
                {categoryCertificates.length === 1 ? 'certificate' : 'certificates'}
              </p>
            </div>

            {categoryCertificates.length === 0 ? (
              <p className="certificate-empty">No certificates in this category yet.</p>
            ) : (
              <>
                <div className="certificate-grid">
                  {categoryCertificates.slice(0, visibleCount).map(certificate => {
                    const viewUrl = validCertificateUrl(certificate.file)
                      ? certificatePageHref(certificate.file)
                      : undefined
                    const previewPath = isImagePath(certificate.previewImage)
                      ? certificatePageAssetPath(certificate.previewImage)
                      : isImagePath(certificate.file)
                        ? certificatePageAssetPath(certificate.file)
                        : undefined
                    const context =
                      certificate.event && certificate.event !== certificate.title
                        ? certificate.event
                        : undefined

                    return (
                      <article className="certificate-card" key={certificate.id}>
                        <div className="certificate-preview">
                          {previewPath ? (
                            <Image
                              src={previewPath}
                              alt={
                                certificate.imageAlt ||
                                `${certificate.title} certificate preview`
                              }
                              width={480}
                              height={320}
                              sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw"
                              loading="lazy"
                            />
                          ) : (
                            <span className="certificate-pdf-icon" aria-hidden="true">
                              <FileText size={32} />
                              <small>{viewUrl ? 'CERTIFICATE' : 'FILE NEEDED'}</small>
                            </span>
                          )}
                        </div>
                        <div className="certificate-info">
                          <div className="certificate-labels">
                            <span className="certificate-type">
                              {certificate.type || 'Certificate'}
                            </span>
                          </div>
                          <h3>{certificate.title}</h3>
                          {context && <p className="certificate-context">{context}</p>}
                          {(certificate.organization || certificate.year) && (
                            <p className="certificate-meta">
                              {certificate.organization}
                              {certificate.organization && certificate.year && (
                                <span aria-hidden="true"> · </span>
                              )}
                              {certificate.year}
                            </p>
                          )}
                          <div className="certificate-actions">
                            {viewUrl ? (
                              <a
                                className="view-certificate"
                                href={viewUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`View ${certificate.title} certificate`}
                              >
                                View Certificate <ExternalLink size={14} />
                              </a>
                            ) : (
                              <span className="certificate-missing-file">
                                Certificate file not available
                              </span>
                            )}
                            {isHttpUrl(certificate.verificationUrl) && (
                              <a
                                className="verify-certificate"
                                href={certificate.verificationUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Verify ${certificate.title}`}
                              >
                                Verify <ExternalLink size={14} />
                              </a>
                            )}
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>

                {categoryCertificates.length > initialVisibleCount && (
                  <div className="certificate-more-wrap">
                    {visibleCount < categoryCertificates.length ? (
                      <button
                        className="certificate-more"
                        type="button"
                        onClick={() =>
                          setVisibleCount(count =>
                            Math.min(count + revealBatchSize, categoryCertificates.length),
                          )
                        }
                      >
                        Show More Certificates
                      </button>
                    ) : (
                      <button
                        className="certificate-more"
                        type="button"
                        onClick={() => setVisibleCount(initialVisibleCount)}
                      >
                        Show Less
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
