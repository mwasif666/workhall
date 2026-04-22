import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  HiChevronDown,
  HiMiniArrowUpRight,
  HiPlus,
  HiMinus,
  HiMagnifyingGlass,
  HiXMark,
} from "react-icons/hi2";
import { workhallLocations } from "@/data/workhallLocations";
import "./Hero.css";

const HERO_STATS = [
  { value: "06", label: "Locations" },
  { value: "24/7", label: "Access" },
];

export default function Hero() {
  const locations = useMemo(
    () => workhallLocations,
    [],
  );

  const [friends, setFriends] = useState(3);
  const [locOpen, setLocOpen] = useState(false);
  const [locationId, setLocationId] = useState("");
  const [locSearch, setLocSearch] = useState("");

  const locRef = useRef(null);
  const videoRef = useRef(null);
  const closeLoc = () => {
    setLocOpen(false);
    setLocSearch("");
  };

  const activeLocation =
    locations.find((item) => item.id === locationId) ?? null;

  const filteredLocations = useMemo(() => {
    const query = locSearch.trim().toLowerCase();
    if (!query) return locations;

    return locations.filter((item) =>
      [item.name, item.area, item.address].some((value) =>
        value.toLowerCase().includes(query),
      ),
    );
  }, [locSearch, locations]);

  useEffect(() => {
    const onDown = (e) => {
      if (!locRef.current) return;
      if (!locRef.current.contains(e.target)) closeLoc();
    };

    const onEsc = (e) => {
      if (e.key === "Escape") closeLoc();
    };

    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onEsc);

    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onEsc);
    };
  }, []);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return undefined;

    let cancelled = false;

    const tryPlay = () => {
      if (cancelled) return;

      videoEl.muted = true;
      videoEl.defaultMuted = true;
      videoEl.playsInline = true;
      videoEl.setAttribute("muted", "");
      videoEl.setAttribute("playsinline", "");
      videoEl.setAttribute("webkit-playsinline", "true");

      const playPromise = videoEl.play();
      if (playPromise?.catch) {
        playPromise.catch(() => {});
      }
    };

    tryPlay();
    videoEl.addEventListener("canplay", tryPlay);
    videoEl.addEventListener("loadeddata", tryPlay);

    return () => {
      cancelled = true;
      videoEl.removeEventListener("canplay", tryPlay);
      videoEl.removeEventListener("loadeddata", tryPlay);
    };
  }, []);

  return (
    <div className="hero">
      <div className="hero__container">
        <div className="hero__media" aria-hidden="true">
          <video
            ref={videoRef}
            className="hero__video"
            autoPlay
            muted
            defaultMuted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            poster="https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1920"
          >
            <source src="/hero-office.mp4" type="video/mp4" />
          </video>
          <div className="hero__mediaScrim" />
        </div>
        <div className="hero__box">
          <div className="hero__copy">
            <h1 className="hero__title">
              <span className="hero__titleLine">Re-Think Your</span>
              <span className="hero__titleLine hero__titleLine--large">
                Workspace.
              </span>
            </h1>

            <p className="hero__lede">
              with Pakistan&apos;s most flexible coworking spaces, open 24/7,
              across 6 locations.
              <br />
              All built for the way you actually work, not the way an office
              thinks you should.
            </p>
          </div>

          <div className="hero__controls">
            <div className="hPill hPill--friends">
              <div className="hPill__icon" />

              <div className="hPill__txt">
                <div className="hPill__label">How Many Friends?</div>
                <div className="hPill__sub">Select number of desks you need</div>
              </div>

              <div className="hCounter">
                <button
                  className="hCounter__btn"
                  type="button"
                  onClick={() => setFriends((v) => Math.max(1, v - 1))}
                  aria-label="Decrease"
                >
                  <HiMinus />
                </button>

                <div className="hCounter__val">
                  {String(friends).padStart(2, "0")}
                </div>

                <button
                  className="hCounter__btn"
                  type="button"
                  onClick={() => setFriends((v) => Math.min(99, v + 1))}
                  aria-label="Increase"
                >
                  <HiPlus />
                </button>
              </div>
            </div>

            <div
              id="loc"
              className={`hDrop ${locOpen ? "open" : ""}`}
              ref={locRef}
            >
              <button
                className="hPill hPill--loc hDrop__trigger"
                type="button"
                aria-expanded={locOpen}
                onClick={() => setLocOpen((v) => !v)}
              >
                <div className="hPill__icon" />

                <div className="hPill__txt">
                  <div className="hPill__label">Choose a Location</div>
                  <div className="hPill__sub">
                    {!activeLocation
                      ? "All locations feature all our plans and passes"
                      : activeLocation.name}
                  </div>
                </div>

                <span className="cs-iconSwap hPill__endIcon" aria-hidden="true">
                  <span className="cs-iconSwap__a">
                    <HiChevronDown />
                  </span>
                  <span className="cs-iconSwap__b">
                    <HiChevronDown />
                  </span>
                </span>

                <span className="hPill__swapText" aria-hidden="true">
                  <span className="hSwap__a">Browse</span>
                  <span className="hSwap__b">Browse -&gt;</span>
                </span>
              </button>

              {locOpen && (
                <div className="hDrop__menu">
                  <div className="hDrop__top">
                    <div className="hDrop__searchWrap">
                      <HiMagnifyingGlass className="hDrop__searchIcon" />
                      <input
                        className="hDrop__search"
                        type="text"
                        placeholder="Search location"
                        value={locSearch}
                        onChange={(e) => setLocSearch(e.target.value)}
                      />
                    </div>

                    <button
                      type="button"
                      className="hDrop__close"
                      onClick={closeLoc}
                      aria-label="Close locations"
                    >
                      <HiXMark />
                    </button>
                  </div>

                  <div className="hDrop__label">Work Hall Locations</div>

                  <div className="hDrop__grid">
                    {filteredLocations.map((locationItem) => (
                      <button
                        key={locationItem.id}
                        type="button"
                        className={`hDropOption ${
                          locationItem.id === locationId ? "isActive" : ""
                        }`}
                        onClick={() => {
                          setLocationId(locationItem.id);
                          closeLoc();
                        }}
                      >
                        <span className="hDropOption__thumb" aria-hidden="true">
                          <img
                            src={locationItem.image}
                            alt=""
                            loading="lazy"
                            draggable="false"
                          />
                        </span>

                        <span className="hDropOption__txt">
                          <span className="hDropOption__title">
                            {locationItem.name}
                          </span>
                          <span className="hDropOption__desc">
                            {locationItem.area}
                          </span>
                        </span>

                        <span className="hDropOption__icon" aria-hidden="true">
                          <HiMiniArrowUpRight />
                        </span>
                      </button>
                    ))}
                  </div>

                  {filteredLocations.length === 0 && (
                    <div className="hDrop__empty">
                      No Work Hall location matched your search.
                    </div>
                  )}
                </div>
              )}
            </div>

            <a className="hCta" href="#">
              <span className="hCta__swap">
                <span className="hSwap__a">Make Enquiry</span>
                <span className="hSwap__b">Make Enquiry -&gt;</span>
              </span>

              <span className="hCta__icon cs-iconSwap" aria-hidden="true">
                <span className="cs-iconSwap__a">
                  <HiMiniArrowUpRight />
                </span>
                <span className="cs-iconSwap__b">
                  <HiMiniArrowUpRight />
                </span>
              </span>
            </a>
          </div>

          <div className="hero__stats" aria-label="Workspace highlights summary">
            {HERO_STATS.map((item) => (
              <div key={item.label} className="heroStat">
                <div className="heroStat__value">{item.value}</div>
                <div className="heroStat__label">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
