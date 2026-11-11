import type { CSSProperties, ImgHTMLAttributes } from 'react'
import type { Photo } from '../photos'

// One photograph as a <picture>: the AVIF files first, the JPEGs for a browser that cannot read
// them. `className` and `style` go on the <picture> when `frame` is set (the hero, where the
// picture itself is the layer), otherwise on the <img> and the <picture> takes no box of its own
// (page.css: picture.pic). Everything else is passed to the <img>.
export default function Pic({
  photo,
  frame = false,
  className,
  style,
  ...img
}: {
  photo: Photo
  frame?: boolean
  className?: string
  style?: CSSProperties
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'sizes' | 'width' | 'height' | 'alt' | 'className' | 'style'>) {
  return (
    <picture className={frame ? className : 'pic'} style={frame ? style : undefined}>
      <source type="image/avif" srcSet={photo.avif} sizes={photo.sizes} />
      <img
        className={frame ? undefined : className}
        style={frame ? undefined : style}
        src={photo.src}
        srcSet={photo.srcset}
        sizes={photo.sizes}
        width={photo.width}
        height={photo.height}
        alt={photo.alt}
        data-source="stand-in"
        data-subject={photo.subject}
        {...img}
      />
    </picture>
  )
}
