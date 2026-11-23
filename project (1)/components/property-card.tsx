import Image from 'next/image'
import { ArrowUpRight, Bath, BedDouble, Heart, Maximize2, MapPin } from 'lucide-react'

export type Property = {
  id: number
  title: string
  neighborhood: string
  city: string
  region: string
  price: string
  priceValue: number
  period?: string
  transaction: 'Buy' | 'Rent'
  type: 'House' | 'Apartment' | 'Cabin'
  beds: number
  baths: number
  area: string
  image: string
  imageAlt: string
  tag: string
  featured?: boolean
  amenities: string[]
}

type PropertyCardProps = {
  property: Property
  isSaved: boolean
  onToggleSaved: (id: number) => void
}

export function PropertyCard({ property, isSaved, onToggleSaved }: PropertyCardProps) {
  const subject = encodeURIComponent(`I'm interested in ${property.title} in ${property.neighborhood}`)

  return (
    <article className="property-card">
      <div className="property-card__image-wrap">
        <Image
          src={property.image}
          alt={property.imageAlt}
          fill
          sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
          className="property-card__image"
        />
        <div className="property-card__image-top">
          <span className="property-card__tag">{property.tag}</span>
          <button
            className={`save-button${isSaved ? ' is-saved' : ''}`}
            type="button"
            onClick={() => onToggleSaved(property.id)}
            aria-label={isSaved ? `Remove ${property.title} from saved homes` : `Save ${property.title}`}
            aria-pressed={isSaved}
          >
            <Heart aria-hidden="true" fill={isSaved ? 'currentColor' : 'none'} />
          </button>
        </div>
        {property.featured && <span className="property-card__featured">THE HEARTH EDIT</span>}
      </div>

      <div className="property-card__body">
        <div className="property-card__heading">
          <div>
            <p className="property-card__eyebrow"><MapPin aria-hidden="true" />{property.neighborhood}, {property.city}</p>
            <h3>{property.title}</h3>
          </div>
          <div className="property-card__price">
            <strong>{property.price}</strong>
            {property.period && <span>{property.period}</span>}
          </div>
        </div>

        <div className="property-card__facts" aria-label="Property details">
          <span><BedDouble aria-hidden="true" />{property.beds} beds</span>
          <span><Bath aria-hidden="true" />{property.baths} baths</span>
          <span><Maximize2 aria-hidden="true" />{property.area} sq ft</span>
          <span className="property-card__type">{property.type}</span>
        </div>

        <div className="property-card__amenities" aria-label="Facilities">
          {property.amenities.map((amenity) => <span key={amenity}>{amenity}</span>)}
        </div>

        <a className="property-card__contact" href={`mailto:hello@hearthandharbor.com?subject=${subject}`}>
          Request a tour <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </article>
  )
}
