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
import { workhallLocations } from "@/data/workhallLocations";

import "./WorkhallLocationsMap.css";

export default function WorkhallLocationsMap() {
  const locations = useMemo(() => workhallLocations, []);
  const [slideByLocation, setSlideByLocation] = useState<
    Record<string, number>
  >(() =>
    Object.fromEntries(workhallLocations.map((location) => [location.id, 0])),
  );

  const bounds = useMemo(() => {
    const latitudes = locations.map((location) => location.latitude);
    const longitudes = locations.map((location) => location.longitude);

    return {
      latMin: Math.min(...latitudes),
      latMax: Math.max(...latitudes),
      lngMin: Math.min(...longitudes),
      lngMax: Math.max(...longitudes),
      centerLat:
        latitudes.reduce((total, latitude) => total + latitude, 0) /
        latitudes.length,
      centerLng:
        longitudes.reduce((total, longitude) => total + longitude, 0) /
        longitudes.length,
    };
  }, [locations]);

  const mapEmbedUrl = useMemo(
    () =>
      `https://maps.google.com/maps?q=${bounds.centerLat},${bounds.centerLng}&t=&z=11&ie=UTF8&iwloc=&output=embed`,
    [bounds.centerLat, bounds.centerLng],
  );

  const getPinStyle = (latitude: number, longitude: number) => {
    const xProgress =
      (longitude - bounds.lngMin) /
      Math.max(bounds.lngMax - bounds.lngMin, 0.001);
    const yProgress =
      1 -
      (latitude - bounds.latMin) /
        Math.max(bounds.latMax - bounds.latMin, 0.001);

    return {
      left: `${12 + xProgress * 74}%`,
      top: `${16 + yProgress * 60}%`,
    };
  };

  const moveSlide = (
    locationId: string,
    totalSlides: number,
    direction: number,
  ) =>
    setSlideByLocation((current) => ({
      ...current,
      [locationId]:
        ((current[locationId] ?? 0) + direction + totalSlides) % totalSlides,
    }));

  return (
    <section id="locations" className="wl-section">
      <div className="wl-shell">
        <header className="wl-head">
          <p className="wl-eyebrow">Locations</p>
          <h2 className="wl-title">
            Six Work Hall spaces, each placed for a different Karachi work
            rhythm.
          </h2>
          <p className="wl-intro">
            Verified public location details, redesigned as a visual showcase.
            Browse the branch that fits your route, your clients, and the way
            your team likes to work.
          </p>
        </header>

        <div className="wl-list">
          {locations.map((location, index) => {
            const isReversed = index % 2 === 1;
            const cardStyle = {
              "--wl-accent": location.accent,
            } as CSSProperties;

            return (
              <article
                key={location.id}
                className={`wl-card${isReversed ? " wl-card--reverse" : ""}`}
                style={cardStyle}
              >
                <div className="wl-visual" aria-hidden="true">
                  <iframe
                    src={mapEmbedUrl}
                    title={`${location.name} map background`}
                    className="wl-mapFrame"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    tabIndex={-1}
                  />
                  <div className="wl-mapShade" />
                  <div className="wl-mapPins">
                    {locations.map((pinLocation) => {
                      const isActivePin = pinLocation.id === location.id;
                      const pinStyle = getPinStyle(
                        pinLocation.latitude,
                        pinLocation.longitude,
                      );

                      return (
                        <span
                          key={`${location.id}-${pinLocation.id}`}
                          className={`wl-mapPin${
                            isActivePin ? " is-active" : ""
                          }`}
                          style={pinStyle}
                        >
                          <MapPin />
                          {isActivePin && (
                            <span className="wl-mapPinLabel">
                              {pinLocation.area}
                            </span>
                          )}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="wl-content">
                  <div
                    className={`wl-panelTrack${isReversed ? " wl-panelTrack--reverse" : ""}`}
                  >
                    <div className="wl-panel">
                      {/* <div className="wl-panelTop">
                        <span className="wl-area">{location.area}</span>
                        <span className="wl-index">
                          {String(index + 1).padStart(2, "0")} /{" "}
                          {String(locations.length).padStart(2, "0")}
                        </span>
                      </div> */}

                      <figure className="wl-media">
                        <img
                          src={
                            location.gallery[slideByLocation[location.id] ?? 0]
                          }
                          alt={`${location.name} workspace`}
                          className="wl-mediaImg"
                          loading={index < 2 ? "eager" : "lazy"}
                        />

                        <div className="wl-carouselNav">
                          <button
                            type="button"
                            className="wl-carouselBtn"
                            aria-label={`Previous ${location.name} image`}
                            onClick={() =>
                              moveSlide(
                                location.id,
                                location.gallery.length,
                                -1,
                              )
                            }
                          >
                            <ChevronLeft />
                          </button>
                          <button
                            type="button"
                            className="wl-carouselBtn"
                            aria-label={`Next ${location.name} image`}
                            onClick={() =>
                              moveSlide(location.id, location.gallery.length, 1)
                            }
                          >
                            <ChevronRight />
                          </button>
                        </div>
                        <div className="wl-carouselDots" aria-hidden="true">
                          {location.gallery.map((image, imageIndex) => (
                            <span
                              key={image}
                              className={`wl-carouselDot${
                                imageIndex ===
                                (slideByLocation[location.id] ?? 0)
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
                          <p className="wl-description">
                            {location.description}
                          </p>
                        </div>

                        <div className="wl-address">
                          <MapPin className="wl-addressIcon" />
                          <span>{location.address}</span>
                        </div>

                        <div className="wl-facts">
                          <ul
                            className="wl-highlights"
                            aria-label={`${location.name} highlights`}
                          >
                            {location.highlights.map(
                              (highlight, highlightIndex) => (
                                <li
                                  key={highlight}
                                  className={`wl-highlight${
                                    highlightIndex ===
                                    location.featuredHighlight
                                      ? " is-active"
                                      : ""
                                  }`}
                                >
                                  <span className="wl-highlightIcon">
                                    <Check />
                                  </span>
                                  {highlight}
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                      </div>

                      <div className="wl-actions">
                        <Button asChild className="wl-btn wl-btn--solid">
                          <a
                            href={location.bookTourUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <span className="wl-btnLabel">Book a Tour</span>
                            <span
                              className="wl-btnIconWrap wl-iconSwap"
                              aria-hidden="true"
                            >
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
                          <a
                            href={location.mapsUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <span className="wl-btnLabel">View Location</span>
                            <span
                              className="wl-btnIconWrap wl-iconSwap"
                              aria-hidden="true"
                            >
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
