import Image from 'next/image'
import { Award, ExternalLink, FileText } from 'lucide-react'
import type { Certificate } from '@/data/achievements'

type CertificateGalleryProps = {
  certificates: Certificate[]
}

function isSupportedPublicFile(path: string | undefined): path is string {
  return Boolean(path && !path.includes('..') && /^\/certificates\/[^?#]+\.(?:pdf|jpe?g|png)$/i.test(path))
}

function isImagePath(path: string | undefined): path is string {
  return Boolean(path && !path.includes('..') && /^\/certificates\/[^?#]+\.(?:jpe?g|png)$/i.test(path))
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

export default function CertificateGallery({ certificates }: CertificateGalleryProps) {
  if (certificates.length === 0) return null

  return <section id="certifications" className="section certificate-section" aria-labelledby="certifications-heading">
    <div className="wrap">
      <div className="certificate-section-heading">
        <span className="certificate-section-icon" aria-hidden="true"><Award size={19}/></span>
        <div><p className="certificate-eyebrow">CERTIFICATES & PROGRAMS</p><h2 id="certifications-heading">Certifications & Programs</h2></div>
      </div>
      <div className="certificate-grid">{certificates.map(certificate => {
        const certificatePath = isSupportedPublicFile(certificate.file) ? certificate.file : undefined
        const previewPath = isImagePath(certificate.previewImage)
          ? certificate.previewImage
          : isImagePath(certificate.file) ? certificate.file : undefined
        const issuer = certificate.event || certificate.organization
        return <article className="certificate-card" key={`${certificate.title}-${issuer || ''}-${certificate.year || ''}`}>
          <div className="certificate-preview">
            {previewPath ? <Image src={previewPath} alt={certificate.imageAlt || `${certificate.title} certificate preview`} width={480} height={320} sizes="(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 33vw" loading="lazy"/> : <span className="certificate-pdf-icon" aria-hidden="true"><FileText size={34}/><small>{certificatePath ? 'DOCUMENT' : 'PROGRAM'}</small></span>}
          </div>
          <div className="certificate-info">
            {certificate.type && <span className="certificate-type">{certificate.type}</span>}
            <h3>{certificate.title}</h3>
            {(issuer || certificate.year) && <p className="certificate-meta">{issuer}{issuer && certificate.year && <span aria-hidden="true"> · </span>}{certificate.year}</p>}
            <div className="certificate-actions">
              {certificatePath && <a className="view-certificate" href={certificatePath} target="_blank" rel="noreferrer" aria-label={`View ${certificate.title} certificate`}>View Certificate <ExternalLink size={14}/></a>}
              {isHttpUrl(certificate.verificationUrl) && <a className="verify-certificate" href={certificate.verificationUrl} target="_blank" rel="noreferrer" aria-label={`Verify ${certificate.title}`}>Verify <ExternalLink size={14}/></a>}
            </div>
          </div>
        </article>
      })}</div>
    </div>
  </section>
}
