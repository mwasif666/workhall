import React from "react";
import "./PlansIntro.css";

export default function PlansIntro() {
  return (
    <section className="plansIntro" aria-labelledby="plans-intro-title">
      <div className="plansIntro__container">
        <div className="plansIntro__copy">
          <h2 id="plans-intro-title" className="plansIntro__title">
            <span className="plansIntro__titleLine">
              Because We&apos;ve Got A Space
            </span>
            <span className="plansIntro__titleLine">
              for Every Way You Work.
            </span>
          </h2>

          <p className="plansIntro__text">
            Whether you&apos;re a freelancer who needs a desk or an enterprise
            that needs a floor, we have a plan built around you, not the other
            way around.
          </p>
        </div>
      </div>
    </section>
  );
}
