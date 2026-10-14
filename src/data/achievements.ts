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

export type CertificateType = 'Participation' | 'Completion' | 'Finalist recognition' | 'Award' | 'Technical certification' | 'Training' | 'Workshop' | 'Seminar' | 'Program'

export type Certificate = {
  title: string
  event?: string
  organization?: string
  year?: string
  type?: CertificateType
  file?: string
  previewImage?: string
  imageAlt?: string
  verificationUrl?: string
}

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

// Add only credentials you intend to publish. Put public files in
// public/certificates/ and reference them as '/certificates/<filename>'.
// For PDFs, previewImage may point to an optional JPG or PNG in that folder.
export const certificates: Certificate[] = []
