import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { workhallLocations, type WorkhallLocation } from "@/data/workhallLocations";

import "./WorkhallLocationsMap.css";

function MapVisual({ location }: { location: WorkhallLocation }) {
  const embedUrl = `https://maps.google.com/maps?q=${location.latitude},${location.longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="wl-visual" aria-hidden="true">
      <iframe
        src={embedUrl}
        title={`${location.name} map`}
        className="wl-mapFrame"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        tabIndex={-1}
      />
      <div className="wl-mapShade" />
    </div>
  );
}

export default function WorkhallLocationsMap() {
  const locations = useMemo(() => workhallLocations, []);
  const [slideByLocation, setSlideByLocation] = useState<Record<string, number>>(
    () => Object.fromEntries(workhallLocations.map((l) => [l.id, 0])),
  );

  const moveSlide = (locationId: string, totalSlides: number, direction: number) =>
    setSlideByLocation((cur) => ({
      ...cur,
      [locationId]: ((cur[locationId] ?? 0) + direction + totalSlides) % totalSlides,
    }));

  return (
    <section id="locations" className="wl-section">
      <div className="wl-shell">
        <header className="wl-head">
          <p className="wl-eyebrow">Locations</p>
          <h2 className="wl-title">
            Six Work Hall spaces, each placed for a different Karachi work rhythm.
          </h2>
          <p className="wl-intro">
            Verified public location details, redesigned as a visual showcase. Browse
            the branch that fits your route, your clients, and the way your team likes
            to work.
          </p>
        </header>

        <div className="wl-list">
          {locations.map((location, index) => {
            const isReversed = index % 2 === 1;
            const cardStyle = {
              "--wl-accent": location.accent,
              top: `${80 + index * 20}px`,
              zIndex: index + 1,
            } as CSSProperties;

            return (
              <article
                key={location.id}
                className={`wl-card${isReversed ? " wl-card--reverse" : ""}`}
                style={cardStyle}
              >
                <MapVisual location={location} />

                <div className="wl-content">
                  <div className={`wl-panelTrack${isReversed ? " wl-panelTrack--reverse" : ""}`}>
                    <div className="wl-panel">
                      <figure className="wl-media">
                        <img
                          src={location.gallery[slideByLocation[location.id] ?? 0]}
                          alt={`${location.name} workspace`}
                          className="wl-mediaImg"
                          loading={index < 2 ? "eager" : "lazy"}
                        />

                        <div className="wl-carouselNav">
                          <button
                            type="button"
                            className="wl-carouselBtn"
                            aria-label={`Previous ${location.name} image`}
                            onClick={() => moveSlide(location.id, location.gallery.length, -1)}
                          >
                            <ChevronLeft />
                          </button>
                          <button
                            type="button"
                            className="wl-carouselBtn"
                            aria-label={`Next ${location.name} image`}
                            onClick={() => moveSlide(location.id, location.gallery.length, 1)}
                          >
                            <ChevronRight />
                          </button>
                        </div>

                        <div className="wl-carouselDots" aria-hidden="true">
                          {location.gallery.map((image, imageIndex) => (
                            <span
                              key={image}
                              className={`wl-carouselDot${
                                imageIndex === (slideByLocation[location.id] ?? 0)
                                  ? " is-active"
                                  : ""
                              }`}
                            />
                          ))}
                        </div>
                      </figure>

                      <div className="wl-scroll">
                        <div className="wl-copy">
                          <h3 className="wl-name">{location.name}</h3>
                          <p className="wl-description">{location.description}</p>
                        </div>

                        <div className="wl-address">
                          <MapPin className="wl-addressIcon" />
                          <span>{location.address}</span>
                        </div>

                        <div className="wl-facts">
                          <ul className="wl-highlights" aria-label={`${location.name} highlights`}>
                            {location.highlights.map((highlight, highlightIndex) => (
                              <li
                                key={highlight}
                                className={`wl-highlight${
                                  highlightIndex === location.featuredHighlight ? " is-active" : ""
                                }`}
                              >
                                <span className="wl-highlightIcon">
                                  <Check />
                                </span>
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="wl-actions">
                        <Button asChild className="wl-btn wl-btn--solid">
                          <a href={location.bookTourUrl} target="_blank" rel="noreferrer">
                            <span className="wl-btnLabel">Book a Tour</span>
                            <span className="wl-btnIconWrap wl-iconSwap" aria-hidden="true">
                              <span className="wl-iconSwap__a">
                                <CalendarDays className="wl-btnIcon" />
                              </span>
                              <span className="wl-iconSwap__b">
                                <CalendarDays className="wl-btnIcon" />
                              </span>
                            </span>
                          </a>
                        </Button>

                        <Button asChild className="wl-btn wl-btn--ghost">
                          <a href={location.mapsUrl} target="_blank" rel="noreferrer">
                            <span className="wl-btnLabel">View Location</span>
                            <span className="wl-btnIconWrap wl-iconSwap" aria-hidden="true">
                              <span className="wl-iconSwap__a">
                                <ArrowUpRight className="wl-btnIcon" />
                              </span>
                              <span className="wl-iconSwap__b">
                                <ArrowUpRight className="wl-btnIcon" />
                              </span>
                            </span>
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
