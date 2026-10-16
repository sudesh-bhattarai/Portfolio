import CertificateGallery from '@/components/CertificateGallery'
import { certificates } from '@/data/achievements'

export default function CertificatesPage() {
  return <main className="min-h-screen">
    <CertificateGallery certificates={certificates}/>
  </main>
}