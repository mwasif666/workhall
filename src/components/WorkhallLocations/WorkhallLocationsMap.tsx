import { useEffect, useMemo, useState } from "react";
import MapLibreGL from "maplibre-gl";
import { MapPin, Navigation, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Map,
  MapControls,
  MapMarker,
  MapPopup,
  MarkerContent,
  useMap,
} from "@/components/ui/map";
import {
  workhallLocations,
  type WorkhallLocation,
} from "@/data/workhallLocations";
import { cn } from "@/lib/utils";

function MapViewportController({
  activeLocation,
  locations,
}: {
  activeLocation: WorkhallLocation | null;
  locations: WorkhallLocation[];
}) {
  const { isLoaded, map } = useMap();

  useEffect(() => {
    if (!isLoaded || !map || locations.length === 0 || activeLocation) return;

    const bounds = new MapLibreGL.LngLatBounds();
    locations.forEach((location) =>
      bounds.extend([location.longitude, location.latitude]),
    );

    map.fitBounds(bounds, {
      padding: 96,
      maxZoom: 11.4,
      duration: 900,
    });
  }, [activeLocation, isLoaded, locations, map]);

  useEffect(() => {
    if (!isLoaded || !map || !activeLocation) return;

    map.flyTo({
      center: [activeLocation.longitude, activeLocation.latitude],
      zoom: 13.1,
      speed: 0.9,
      curve: 1.15,
      offset: [0, 140],
      essential: true,
    });
  }, [activeLocation, isLoaded, map]);

  return null;
}

export default function WorkhallLocationsMap() {
  const locations = useMemo(() => workhallLocations, []);
  const [activeId, setActiveId] = useState("");
  const visibleLocations = activeId
    ? locations.filter((location) => location.id === activeId)
    : locations;

  const activeLocation =
    locations.find((location) => location.id === activeId) ?? null;

  return (
    <section id="locations" className="relative bg-[#f5f3ef]">
      <div className="relative h-[100svh] min-h-[760px] w-full overflow-hidden bg-[#e8e3db]">
        <div className="pointer-events-none absolute left-4 top-4 z-10 flex max-w-[calc(100%-2rem)] items-start gap-2 sm:left-6 sm:top-6">
          <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/88 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-black/65 shadow-[0_14px_30px_rgba(15,23,42,0.12)] backdrop-blur-md">
            Karachi Work Hall Map
          </div>

          {activeLocation && (
            <button
              type="button"
              onClick={() => setActiveId("")}
              className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#111111] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_14px_30px_rgba(15,23,42,0.18)]"
            >
              <X className="size-3.5" />
              Show All Pins
            </button>
          )}
        </div>

        <div className="relative h-full w-full">
          <Map center={[67.0715, 24.875]} zoom={11} cooperativeGestures>
            <MapViewportController
              activeLocation={activeLocation}
              locations={locations}
            />

            {visibleLocations.map((location) => {
              const isActive = location.id === activeLocation?.id;

              return (
                <MapMarker
                  key={location.id}
                  longitude={location.longitude}
                  latitude={location.latitude}
                  anchor="bottom"
                  onClick={() =>
                    setActiveId((current) =>
                      current === location.id ? "" : location.id,
                    )
                  }
                >
                  <MarkerContent>
                    <div className="relative flex items-center justify-center">
                      {isActive && (
                        <span className="absolute size-14 rounded-full bg-[#ea4335]/18 blur-md" />
                      )}
                      <span
                        className={cn(
                          "relative flex size-9 -rotate-45 items-center justify-center rounded-[50%_50%_50%_0] border-[3px] border-white bg-[#ea4335] shadow-[0_12px_24px_rgba(17,17,17,0.3)] transition-all duration-200",
                          isActive &&
                            "size-11 shadow-[0_18px_34px_rgba(234,67,53,0.42)]",
                        )}
                      >
                        <span className="" />
                      </span>
                    </div>
                  </MarkerContent>
                </MapMarker>
              );
            })}

            {activeLocation && (
              <MapPopup
                longitude={activeLocation.longitude}
                latitude={activeLocation.latitude}
                closeButton
                closeOnClick={false}
                onClose={() => setActiveId("")}
                className="w-[252px] rounded-[22px] border border-black/8 p-0 shadow-[0_20px_48px_rgba(17,17,17,0.18)]"
              >
                <div className="overflow-hidden rounded-[22px] bg-white">
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={activeLocation.image}
                      alt={activeLocation.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent" />
                  </div>

                  <div className="space-y-3 p-4">
                    <div className="flex items-start gap-2 text-sm leading-6 text-black/68">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-black/55" />
                      <span>{activeLocation.address}</span>
                    </div>

                    <div className="pt-1">
                      <Button
                        asChild
                        size="sm"
                        className="h-9 w-full rounded-full bg-[#111111] text-white hover:bg-[#111111]/92"
                      >
                        <a
                          href={activeLocation.mapsUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Navigation className="mr-1.5 size-3.5" />
                          Directions
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </MapPopup>
            )}

            <MapControls
              position="bottom-right"
              showZoom
              showCompass
              showLocate
              showFullscreen
            />
          </Map>
        </div>
      </div>
    </section>
  );
}
