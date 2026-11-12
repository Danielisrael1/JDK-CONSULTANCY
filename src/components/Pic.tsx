import type { CSSProperties, ImgHTMLAttributes } from 'react'
import type { Photo } from '../photos'

// One photograph as a <picture>: the narrow-screen cut first when the photograph has one (the
// hero), then the AVIF files, then the JPEGs for a browser that cannot read them. `className` and
// `style` go on the <picture> when `frame` is set, otherwise on the <img>, and the <picture> takes
// no box of its own (page.css: picture.pic). Everything else is passed to the <img>.
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
      {photo.art && <source type="image/avif" media={photo.art.media} srcSet={photo.art.avif} sizes={photo.sizes} />}
      {photo.art && <source type="image/jpeg" media={photo.art.media} srcSet={photo.art.srcset} sizes={photo.sizes} />}
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
