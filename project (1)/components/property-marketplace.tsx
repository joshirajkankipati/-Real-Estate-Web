'use client'

import { useMemo, useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, House, Menu, Search, SlidersHorizontal, X } from 'lucide-react'
import { PropertyCard, type Property } from '@/components/property-card'

const properties: Property[] = [
  {
    id: 1,
    title: 'The Garden House',
    neighborhood: 'Silver Lake',
    city: 'Los Angeles',
    region: 'California',
    price: '$1,850,000',
    priceValue: 1850000,
    transaction: 'Buy',
    type: 'House',
    beds: 3,
    baths: 2,
    area: '2,140',
    image: '/images/estate-courtyard.png',
    imageAlt: 'Sunlit modern home opening onto a quiet, olive tree courtyard',
    tag: 'JUST LISTED',
    featured: true,
    amenities: ['Private garden', 'Outdoor dining', 'Natural light'],
  },
  {
    id: 2,
    title: 'Casa del Mar',
    neighborhood: 'The Mesa',
    city: 'Santa Barbara',
    region: 'California',
    price: '$8,400',
    priceValue: 8400,
    period: '/ month',
    transaction: 'Rent',
    type: 'House',
    beds: 3,
    baths: 2,
    area: '1,860',
    image: '/images/estate-coastal.png',
    imageAlt: 'Airy coastal living room with broad windows and an ocean view',
    tag: 'AVAILABLE NOW',
    amenities: ['Ocean views', 'Furnished', 'Walk to beach'],
  },
  {
    id: 3,
    title: 'The Willow Brownstone',
    neighborhood: 'Fort Greene',
    city: 'Brooklyn',
    region: 'New York',
    price: '$2,275,000',
    priceValue: 2275000,
    transaction: 'Buy',
    type: 'Apartment',
    beds: 4,
    baths: 3,
    area: '2,680',
    image: '/images/estate-brownstone.png',
    imageAlt: 'Historic Brooklyn parlor with tall windows and warm oak floors',
    tag: 'RARE FIND',
    featured: true,
    amenities: ['Original details', 'Garden access', 'Doorman'],
  },
  {
    id: 4,
    title: 'Desert House No. 8',
    neighborhood: 'Joshua Tree',
    city: 'Morongo Valley',
    region: 'California',
    price: '$975,000',
    priceValue: 975000,
    transaction: 'Buy',
    type: 'House',
    beds: 2,
    baths: 2,
    area: '1,520',
    image: '/images/estate-desert.png',
    imageAlt: 'Low modern desert retreat with mountain views through glass doors',
    tag: 'NEW PRICE',
    amenities: ['Mountain views', 'Plunge pool', 'Solar powered'],
  },
  {
    id: 5,
    title: 'Notting Hill Mews',
    neighborhood: 'Notting Hill',
    city: 'London',
    region: 'United Kingdom',
    price: '£1,250,000',
    priceValue: 1250000,
    transaction: 'Buy',
    type: 'Apartment',
    beds: 2,
    baths: 2,
    area: '1,240',
    image: '/images/estate-townhouse.png',
    imageAlt: 'Elegant London living room with a fireplace and leafy green accents',
    tag: 'HEARTH SELECT',
    amenities: ['Period features', 'Private terrace', 'Village cafés'],
  },
  {
    id: 6,
    title: 'Pine & Stone Cabin',
    neighborhood: 'Woodstock',
    city: 'Hudson Valley',
    region: 'New York',
    price: '$5,200',
    priceValue: 5200,
    period: '/ month',
    transaction: 'Rent',
    type: 'Cabin',
    beds: 2,
    baths: 1,
    area: '1,080',
    image: '/images/estate-cabin.png',
    imageAlt: 'Timber cabin with large forest-facing windows and a stone fireplace',
    tag: 'WEEKEND READY',
    amenities: ['Wood-burning stove', 'Forest setting', 'Pet friendly'],
  },
]

const transactionFilters = ['All homes', 'For sale', 'For rent'] as const
const propertyTypes = ['All types', 'House', 'Apartment', 'Cabin'] as const

type TransactionFilter = typeof transactionFilters[number]
type PropertyTypeFilter = typeof propertyTypes[number]

export function PropertyMarketplace() {
  const [query, setQuery] = useState('')
  const [transaction, setTransaction] = useState<TransactionFilter>('All homes')
  const [propertyType, setPropertyType] = useState<PropertyTypeFilter>('All types')
  const [savedHomes, setSavedHomes] = useState<number[]>([])
  const [savedOnly, setSavedOnly] = useState(false)
  const [sortOrder, setSortOrder] = useState('recommended')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const filteredProperties = useMemo(() => {
    const searchTerm = query.trim().toLowerCase()
    const filtered = properties.filter((property) => {
      const matchesSearch = !searchTerm || [property.title, property.neighborhood, property.city, property.region, property.type]
        .some((value) => value.toLowerCase().includes(searchTerm))
      const matchesTransaction = transaction === 'All homes' || property.transaction === (transaction === 'For sale' ? 'Buy' : 'Rent')
      const matchesType = propertyType === 'All types' || property.type === propertyType
      const matchesSaved = !savedOnly || savedHomes.includes(property.id)
      return matchesSearch && matchesTransaction && matchesType && matchesSaved
    })

    if (sortOrder === 'price-low') return filtered.sort((a, b) => a.priceValue - b.priceValue)
    if (sortOrder === 'price-high') return filtered.sort((a, b) => b.priceValue - a.priceValue)
    return filtered
  }, [query, transaction, propertyType, savedHomes, savedOnly, sortOrder])

  function toggleSaved(id: number) {
    setSavedHomes((current) => current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id])
  }

  function scrollToListings() {
    document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Hearth and Harbor home">
          <span className="brand__mark"><House aria-hidden="true" /></span>
          <span>hearth<span className="brand__amp">&</span>harbor</span>
        </a>
        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <nav className={`site-nav${mobileMenuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          <a href="#listings" onClick={() => setMobileMenuOpen(false)}>Find a home</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>Our approach</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          <a className="site-nav__cta" href="mailto:hello@hearthandharbor.com?subject=I'm%20looking%20for%20a%20home">
            Let&apos;s talk <ArrowUpRight aria-hidden="true" />
          </a>
        </nav>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero__copy">
          <p className="eyebrow"><span className="eyebrow__line" />A little more room to feel at home</p>
          <h1 id="hero-title">Find a place<br />that feels like <em>you.</em></h1>
          <p className="hero__description">Thoughtful homes, in places worth putting down roots. Start with a feeling, we&apos;ll help you find the address.</p>
          <a className="hero__link" href="#listings">Explore our homes <ArrowRight aria-hidden="true" /></a>
          <div className="hero__note"><span className="hero__note-mark">H.</span><span>Good homes make<br />everyday feel different.</span></div>
        </div>
        <div className="hero__visual">
          <div className="hero__image-frame">
            <img src="/images/estate-courtyard.png" alt="A tranquil home courtyard framed by an olive tree" />
            <div className="hero__image-caption"><span>01 / 06</span><span>Spaces with a little soul</span></div>
          </div>
          <span className="hero__side-note">A HOME, WELL FOUND — SINCE 2014</span>
          <div className="hero__stamp" aria-hidden="true"><span>H</span><small>HOMES<br />WITH HEART</small></div>
        </div>
      </section>

      <section className="search-band" aria-label="Search properties">
        <div className="search-band__intro">
          <span className="search-band__number">01</span>
          <span>Start somewhere</span>
        </div>
        <label className="search-field">
          <Search aria-hidden="true" />
          <span className="sr-only">Search by city, neighborhood, or home name</span>
          <input
            type="search"
            placeholder="City, neighborhood, or home name"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {query && <button type="button" className="search-field__clear" aria-label="Clear search" onClick={() => setQuery('')}><X aria-hidden="true" /></button>}
        </label>
        <button className="search-band__button" type="button" onClick={scrollToListings}>Find your place <ArrowRight aria-hidden="true" /></button>
      </section>

      <section className="listings-section" id="listings" aria-labelledby="listings-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span className="eyebrow__line" />A considered collection</p>
            <h2 id="listings-title">Places to <em>belong.</em></h2>
          </div>
          <p className="section-heading__aside">From the weekend-away to the forever home.<br />Here are a few places we think you&apos;ll love.</p>
        </div>

        <div className="listing-toolbar" aria-label="Property filters">
          <div className="listing-toolbar__filters">
            <div className="filter-tabs" role="group" aria-label="Filter by availability">
              {transactionFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={`filter-tab${transaction === filter ? ' is-active' : ''}`}
                  aria-pressed={transaction === filter}
                  onClick={() => setTransaction(filter)}
                >{filter}</button>
              ))}
            </div>
            <label className="select-wrap">
              <SlidersHorizontal aria-hidden="true" />
              <span className="sr-only">Filter by property type</span>
              <select value={propertyType} onChange={(event) => setPropertyType(event.target.value as PropertyTypeFilter)}>
                {propertyTypes.map((type) => <option key={type} value={type}>{type}</option>)}
              </select>
              <ChevronDown aria-hidden="true" />
            </label>
            <button
              type="button"
              className={`saved-filter${savedOnly ? ' is-active' : ''}`}
              aria-pressed={savedOnly}
              onClick={() => setSavedOnly((current) => !current)}
            >
              <Check aria-hidden="true" /> Saved {savedHomes.length > 0 && <span>{savedHomes.length}</span>}
            </button>
          </div>
          <label className="sort-control">
            <span>Sort by</span>
            <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)} aria-label="Sort properties">
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
            {sortOrder === 'price-high' ? <ArrowDown aria-hidden="true" /> : <ArrowUpRight aria-hidden="true" />}
          </label>
        </div>

        <div className="results-line" aria-live="polite">
          <span>{filteredProperties.length === 1 ? '1 home' : `${filteredProperties.length} homes`} to explore</span>
          <span className="results-line__right">CURATED, NEVER CROWDED <span>✳</span></span>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="property-grid">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} isSaved={savedHomes.includes(property.id)} onToggleSaved={toggleSaved} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-state__icon"><Search aria-hidden="true" /></span>
            <h3>No homes found just yet.</h3>
            <p>Try a different neighborhood or clear your filters to see the full collection.</p>
            <button type="button" onClick={() => { setQuery(''); setTransaction('All homes'); setPropertyType('All types'); setSavedOnly(false) }}>Clear filters <ArrowRight aria-hidden="true" /></button>
          </div>
        )}
      </section>

      <section className="about-band" id="about">
        <div className="about-band__marker">A note from us</div>
        <div className="about-band__content">
          <span className="about-band__ornament" aria-hidden="true">“</span>
          <h2>A home is more than an address. It&apos;s the backdrop to your <em>everyday.</em></h2>
          <p>We look for the places with something you can&apos;t quite put on a listing sheet. A morning light. A favorite corner. A neighborhood that already feels like yours.</p>
          <a href="mailto:hello@hearthandharbor.com?subject=Tell%20me%20about%20Hearth%20%26%20Harbor">A little more about us <ArrowUpRight aria-hidden="true" /></a>
        </div>
        <div className="about-band__signature">H<span>&</span>H</div>
      </section>

      <footer className="site-footer" id="contact">
        <div className="site-footer__top">
          <div>
            <a className="brand brand--footer" href="#top"><span className="brand__mark"><House aria-hidden="true" /></span><span>hearth<span className="brand__amp">&</span>harbor</span></a>
            <p>Good places. Good people.<br />A better way home.</p>
          </div>
          <div className="site-footer__contact">
            <span>LET&apos;S FIND YOUR PLACE</span>
            <a href="mailto:hello@hearthandharbor.com">hello@hearthandharbor.com <ArrowUpRight aria-hidden="true" /></a>
            <a href="tel:+14155550184">+1 (415) 555-0184 <ArrowUpRight aria-hidden="true" /></a>
          </div>
          <a className="back-to-top" href="#top" aria-label="Back to top"><ArrowUpRight aria-hidden="true" /></a>
        </div>
        <div className="site-footer__bottom"><span>© 2026 Hearth & Harbor Realty</span><span>Homes, thoughtfully found.</span><span>San Francisco · Los Angeles · Everywhere</span></div>
      </footer>
    </main>
  )
}
