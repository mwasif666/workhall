import React, { useMemo, useState } from "react";
import "./WorkspaceJourney.css";

const INTRO_BACKGROUND =
  "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=2000&q=80";

const STEPS = [
  {
    id: "companyRole",
    summaryLabel: "Company profile",
    eyebrow: "Step 1",
    question: "How are you connected to the company?",
    helper: "Select your role so we can guide you better.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=2000&q=80",
    options: [
      {
        id: "owner",
        title: "Company Owner",
        desc: "I make workspace decisions for the company.",
        image:
          "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=2000&q=80",
      },
      {
        id: "manager",
        title: "Team Manager",
        desc: "I manage team operations and office needs.",
        image:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2000&q=80",
      },
      {
        id: "hr-admin",
        title: "HR / Admin",
        desc: "I arrange workspaces and day-to-day logistics.",
        image:
          "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=2000&q=80",
      },
      {
        id: "team-member",
        title: "Team Member",
        desc: "I am shortlisting options for approval.",
        image:
          "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=80",
      },
    ],
  },
  {
    id: "workspaceType",
    summaryLabel: "Preferred workspace",
    eyebrow: "Step 2",
    question: "What type of space do you need?",
    helper: "Pick the workspace format that fits your requirement.",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=2000&q=80",
    options: [
      {
        id: "meeting-room",
        title: "Meeting Room",
        desc: "A fully-enclosed room equipped with a flat screen to level-up your business meetings and close those deals.",
        image:
          "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=2000&q=80",
      },
      {
        id: "air",
        title: "Air",
        desc: "Access to an open seat in our shared space. You'll choose a new spot every time you come in.",
        image:
          "https://images.unsplash.com/photo-1600494603989-9650cf6ddd3d?auto=format&fit=crop&w=2000&q=80",
      },
      {
        id: "private-suite",
        title: "Private Office Suite",
        desc: "Work with teams of all sizes in a fully-autonomous private office, powered to run your business smoothly.",
        image:
          "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=2000&q=80",
      },
      {
        id: "x",
        title: "X",
        desc: "Assigned, permanent workstations in our shared space. Grab your desk and return to the same spot every day.",
        image:
          "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=2000&q=80",
      },
    ],
  },
  {
    id: "teamSize",
    summaryLabel: "Total team members",
    eyebrow: "Step 3",
    question: "How many members are in your company team?",
    helper: "This helps us suggest the right plan size.",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=2000&q=80",
    options: [
      {
        id: "1-5",
        title: "1 to 5 members",
        desc: "Small core team.",
        image:
          "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=2000&q=80",
      },
      {
        id: "6-15",
        title: "6 to 15 members",
        desc: "Growing startup team.",
        image:
          "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=2000&q=80",
      },
      {
        id: "16-40",
        title: "16 to 40 members",
        desc: "Established operations team.",
        image:
          "https://images.unsplash.com/photo-1531539134685-27d854339120?auto=format&fit=crop&w=2000&q=80",
      },
      {
        id: "40+",
        title: "40+ members",
        desc: "Large-scale organization setup.",
        image:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80",
      },
    ],
  },
  {
    id: "seatCount",
    summaryLabel: "Seats required now",
    eyebrow: "Step 4",
    question: "How many seats do you need right now?",
    helper: "Select current seating demand.",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=2000&q=80",
    options: [
      {
        id: "1",
        title: "1 seat",
        desc: "For single professional.",
        image:
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=2000&q=80",
      },
      {
        id: "2-4",
        title: "2 to 4 seats",
        desc: "For compact teams.",
        image:
          "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=2000&q=80",
      },
      {
        id: "5-10",
        title: "5 to 10 seats",
        desc: "For active departments.",
        image:
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=80",
      },
      {
        id: "11+",
        title: "11+ seats",
        desc: "For larger onsite presence.",
        image:
          "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?auto=format&fit=crop&w=2000&q=80",
      },
    ],
  },
  {
    id: "timeSlot",
    summaryLabel: "Preferred time slot",
    eyebrow: "Step 5",
    question: "Which time slot works best for your team?",
    helper: "Choose one of these preferred timings.",
    image:
      "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=2000&q=80",
    options: [
      {
        id: "morning",
        title: "9:00 AM - 1:00 PM",
        desc: "Morning productivity slot.",
        image:
          "https://images.unsplash.com/photo-1504805572947-34fad45aed93?auto=format&fit=crop&w=2000&q=80",
      },
      {
        id: "afternoon",
        title: "1:00 PM - 5:00 PM",
        desc: "Afternoon collaboration slot.",
        image:
          "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2000&q=80",
      },
      {
        id: "evening",
        title: "6:00 PM - 10:00 PM",
        desc: "Evening execution slot.",
        image:
          "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=2000&q=80",
      },
      {
        id: "full-day",
        title: "Full Day Access",
        desc: "For all-day office coverage.",
        image:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80",
      },
    ],
  },
];

function getOptionById(step, optionId) {
  if (!step || !optionId) return null;
  return step.options.find((option) => option.id === optionId) ?? null;
}

export default function WorkspaceJourney() {
  const [screen, setScreen] = useState("intro");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentStep = STEPS[stepIndex];
  const selectedOption = getOptionById(currentStep, answers[currentStep?.id]);
  const progressText = `${String(stepIndex + 1).padStart(2, "0")}/${String(
    STEPS.length,
  ).padStart(2, "0")}`;

  const backgroundImage = useMemo(() => {
    if (screen === "intro") return INTRO_BACKGROUND;

    if (screen === "summary") {
      const selectedWorkspace = getOptionById(STEPS[1], answers.workspaceType);
      return selectedWorkspace?.image ?? STEPS[1].image;
    }

    return selectedOption?.image ?? currentStep?.image ?? INTRO_BACKGROUND;
  }, [answers.workspaceType, currentStep, screen, selectedOption]);

  const canGoNext = Boolean(selectedOption);

  const summaryRows = STEPS.map((step) => ({
    label: step.summaryLabel,
    value: getOptionById(step, answers[step.id])?.title ?? "Not selected",
  }));

  const startJourney = () => {
    setScreen("wizard");
    setStepIndex(0);
  };

  const selectOption = (optionId) => {
    if (!currentStep) return;

    setAnswers((prev) => ({
      ...prev,
      [currentStep.id]: optionId,
    }));
  };

  const goBack = () => {
    if (screen === "summary") {
      setScreen("wizard");
      setStepIndex(STEPS.length - 1);
      return;
    }

    if (stepIndex === 0) {
      setScreen("intro");
      return;
    }

    setStepIndex((prev) => prev - 1);
  };

  const goNext = () => {
    if (!canGoNext) return;

    if (stepIndex === STEPS.length - 1) {
      setScreen("summary");
      return;
    }

    setStepIndex((prev) => prev + 1);
  };

  const restart = () => {
    setAnswers({});
    setStepIndex(0);
    setScreen("intro");
  };

  return (
    <section className="wj-section" id="workspace-journey">
      <div
        className="wj-shell"
        style={{
          "--wj-bg-image": `url("${backgroundImage}")`,
        }}
      >
        <div className="wj-layer">
          {screen === "intro" ? (
            <div className="wj-intro">
              <p className="wj-intro__kicker">WORKHALL SPACE MATCH</p>
              <h2 className="wj-intro__title">
                Find your ideal workspace in minutes.
              </h2>
              <p className="wj-intro__desc">
                Answer a few quick questions and we will match you with the
                best setup at Workhall.
              </p>

              <button className="wj-btn wj-btn--primary" onClick={startJourney}>
                Start Questions
              </button>
            </div>
          ) : null}

          {screen === "wizard" ? (
            <div className="wj-wizard">
              <header className="wj-topbar">
                <button
                  className="wj-iconBtn"
                  type="button"
                  onClick={goBack}
                  aria-label="Go back"
                >
                  &lt;
                </button>
                <div className="wj-brand">Workhall</div>
                <div className="wj-stepNo">{progressText}</div>
              </header>

              <div className="wj-head">
                <p className="wj-eyebrow">{currentStep.eyebrow}</p>
                <h2 className="wj-question">{currentStep.question}</h2>
                <p className="wj-helper">{currentStep.helper}</p>
              </div>

              <div className="wj-grid">
                {currentStep.options.map((option) => {
                  const isActive = answers[currentStep.id] === option.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      className={`wj-card ${isActive ? "isActive" : ""}`}
                      onClick={() => selectOption(option.id)}
                    >
                      <div className="wj-card__title">{option.title}</div>
                      <div className="wj-card__desc">{option.desc}</div>
                    </button>
                  );
                })}
              </div>

              <footer className="wj-foot">
                <button className="wj-btn wj-btn--ghost" type="button" onClick={goBack}>
                  Back
                </button>
                <button
                  className="wj-btn wj-btn--primary"
                  type="button"
                  onClick={goNext}
                  disabled={!canGoNext}
                >
                  {stepIndex === STEPS.length - 1 ? "Show Summary" : "Next"}
                </button>
              </footer>
            </div>
          ) : null}

          {screen === "summary" ? (
            <div className="wj-summary">
              <header className="wj-summary__head">
                <p className="wj-eyebrow">All Set</p>
                <h2 className="wj-summary__title">
                  Perfect, your workspace brief is ready.
                </h2>
                <p className="wj-summary__desc">
                  Review your selections and send your enquiry.
                </p>
              </header>

              <div className="wj-summary__grid">
                {summaryRows.map((item) => (
                  <div key={item.label} className="wj-summary__item">
                    <div className="wj-summary__label">{item.label}</div>
                    <div className="wj-summary__value">{item.value}</div>
                  </div>
                ))}
              </div>

              <footer className="wj-foot">
                <button className="wj-btn wj-btn--ghost" type="button" onClick={goBack}>
                  Edit Answers
                </button>
                <a className="wj-btn wj-btn--primary wj-btn--link" href="#">
                  Submit Enquiry
                </a>
              </footer>

              <button className="wj-restart" type="button" onClick={restart}>
                Start over
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
