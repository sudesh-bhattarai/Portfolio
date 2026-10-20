import type { StaticImageData } from 'next/image'

export function relativeStaticImage(image: StaticImageData, parentLevels = 0): StaticImageData {
  const relativePrefix = `./${'../'.repeat(parentLevels)}`

  return {
    ...image,
    src: `${relativePrefix}${image.src.replace(/^\/+/, '')}`,
  }
}
