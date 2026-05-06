import {
  useEffect,
  useMemo,
  type ReactElement,
} from "react";
import Lanyard from "./Footer/Lanyard";

interface WorkHallFooterProps {
  onFoundersVideoClick?: () => void;
  phone?: string;
  email?: string;
  address?: string;
}

interface FooterLinkItem {
  label: string;
  href: string;
}

interface IconLinkItem extends FooterLinkItem {
  title: string;
  icon: () => ReactElement;
}

const FOOTER_STYLES = `
.whf2-root {
  width: 100%;
  background: var(--wh-bg, #f8f0e3);
  color: var(--wh-text-primary, #111111);
  font-family: inherit;
}

.whf2-partnerBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 20px 80px;
  background: var(--wh-bg-elevated, #f2e7d8);
  border-top: 1px solid var(--wh-border, rgba(0, 0, 0, 0.08));
}

.whf2-partnerCopy {
  min-width: 0;
}

.whf2-label {
  display: block;
  margin-bottom: 4px;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--wh-text-muted, #978d84);
}

.whf2-partnerText {
  margin: 0;
  max-width: 460px;
  font-size: 0.85rem;
  line-height: 1.65;
  color: var(--wh-text-secondary, #6c655f);
}

.whf2-partnerButton {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 10px 20px;
  border: 1px solid var(--wh-border, rgba(0, 0, 0, 0.08));
  border-radius: 6px;
  background: transparent;
  color: var(--wh-text-primary, #111111);
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 200ms ease;
}

.whf2-partnerButton:hover {
  border-color: var(--wh-border-hover, rgba(0, 0, 0, 0.16));
  background: var(--wh-bg-card, #fffdf9);
}

.whf2-main {
  padding: 72px 80px 0;
  background: var(--wh-bg, #f8f0e3);
}

.whf2-grid {
  display: grid;
  grid-template-columns: 280px 1fr 320px;
  column-gap: 80px;
  align-items: start;
}

.whf2-brandWordmark {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--wh-text-primary, #111111);
}

.whf2-brandCopy {
  margin: 14px 0 0;
  max-width: 240px;
  font-size: 0.8rem;
  line-height: 1.7;
  color: var(--wh-text-secondary, #6c655f);
}

.whf2-foundersCard {
  width: 100%;
  margin-top: 28px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid var(--wh-border, rgba(0, 0, 0, 0.08));
  border-radius: 10px;
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;
  transition: border-color 200ms ease;
}

.whf2-foundersCard:hover {
  border-color: var(--wh-border-hover, rgba(0, 0, 0, 0.16));
}

.whf2-foundersThumb {
  width: 64px;
  height: 48px;
  flex: 0 0 64px;
  display: grid;
  place-items: center;
  border-radius: 6px;
  background: var(--wh-bg-card, #fffdf9);
}

.whf2-foundersTitle {
  display: block;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--wh-text-primary, #111111);
}

.whf2-foundersMeta {
  display: block;
  margin-top: 2px;
  font-size: 0.7rem;
  color: var(--wh-text-muted, #978d84);
}

.whf2-qrRow {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.whf2-qrBox {
  width: 72px;
  height: 72px;
  flex: 0 0 72px;
  display: grid;
  place-items: center;
  padding: 6px;
  border: 1px solid var(--wh-border, rgba(0, 0, 0, 0.08));
  border-radius: 8px;
  background: #ffffff;
}

.whf2-qrMetaLabel {
  display: block;
  font-size: 0.65rem;
  color: var(--wh-text-muted, #978d84);
}

.whf2-qrMetaSite {
  display: block;
  margin-top: 2px;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--wh-text-primary, #111111);
}

.whf2-aiBlock {
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid var(--wh-border, rgba(0, 0, 0, 0.08));
}

.whf2-aiCopy {
  margin: 0 0 14px;
  max-width: 220px;
  font-size: 0.75rem;
  line-height: 1.5;
  color: var(--wh-text-secondary, #6c655f);
}

.whf2-aiIcons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.whf2-iconButton {
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 1px solid var(--wh-border, rgba(0, 0, 0, 0.08));
  background: var(--wh-bg-card, #fffdf9);
  color: var(--wh-text-primary, #111111);
  text-decoration: none;
  transition:
    transform 150ms ease,
    border-color 150ms ease;
}

.whf2-iconButton:hover {
  transform: scale(1.1);
  border-color: var(--wh-border-hover, rgba(0, 0, 0, 0.16));
}

.whf2-navColumn {
  min-width: 0;
}

.whf2-navGrid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 40px;
}

.whf2-sectionLabel {
  margin-bottom: 16px;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--wh-text-muted, #978d84);
}

.whf2-navLink {
  display: block;
  padding: 5px 0;
  font-size: 0.85rem;
  color: var(--wh-text-secondary, #6c655f);
  text-decoration: none;
  transition: color 150ms ease;
}

.whf2-navLink:hover {
  color: var(--wh-text-primary, #111111);
}

.whf2-contactRow {
  margin-top: 48px;
  padding-top: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-top: 1px solid var(--wh-border, rgba(0, 0, 0, 0.08));
}

.whf2-contactMeta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  color: var(--wh-text-muted, #978d84);
}

.whf2-contactMeta a {
  color: inherit;
  text-decoration: none;
}

.whf2-contactMeta a:hover {
  color: var(--wh-text-secondary, #6c655f);
}

.whf2-separator {
  color: var(--wh-text-muted, #978d84);
}

.whf2-socials {
  display: flex;
  align-items: center;
  gap: 10px;
}

.whf2-socialButton {
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 1px solid var(--wh-border, rgba(0, 0, 0, 0.08));
  color: var(--wh-text-primary, #111111);
  text-decoration: none;
  transition:
    transform 150ms ease,
    border-color 150ms ease;
}

.whf2-socialButton:hover {
  transform: scale(1.05);
  border-color: var(--wh-border-hover, rgba(0, 0, 0, 0.16));
}

.whf2-lanyardColumn {
  position: relative;
  height: 520px;
  display: flex;
  align-items: flex-end;
}

.whf2-lanyardStage {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 520px;
  border-radius: 18px;
  overflow: hidden;
}

.whf2-bottomBar {
  margin-top: 64px;
  padding: 24px 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-top: 1px solid var(--wh-border, rgba(0, 0, 0, 0.08));
}

.whf2-bottomLeft {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  color: var(--wh-text-muted, #978d84);
}

.whf2-bottomLeft a {
  color: inherit;
  text-decoration: none;
}

.whf2-bottomLeft a:hover {
  color: var(--wh-text-secondary, #6c655f);
}

.whf2-bottomRight {
  font-size: 0.75rem;
  color: var(--wh-text-muted, #978d84);
  font-style: italic;
  text-align: right;
}

@media (max-width: 1280px) {
  .whf2-grid {
    grid-template-columns: 280px 1fr 260px;
  }

  .whf2-navGrid {
    gap: 28px;
  }
}

@media (max-width: 1024px) {
  .whf2-grid {
    grid-template-columns: 280px 1fr;
  }

  .whf2-lanyardColumn {
    display: none;
  }
}

@media (max-width: 768px) {
  .whf2-partnerBar {
    flex-direction: column;
    align-items: stretch;
    padding: 20px 24px;
    text-align: center;
  }

  .whf2-partnerCopy {
    display: grid;
    justify-items: center;
  }

  .whf2-partnerButton {
    width: 100%;
  }

  .whf2-main {
    padding: 48px 24px 0;
  }

  .whf2-grid {
    grid-template-columns: 1fr;
    row-gap: 42px;
  }

  .whf2-navColumn {
    order: 3;
  }

  .whf2-navGrid {
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .whf2-contactRow {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .whf2-bottomBar {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 24px;
  }

  .whf2-bottomRight {
    text-align: center;
  }
}
`;

const WORK_HALL_LINKS: FooterLinkItem[] = [
  { label: "Plans", href: "#plans" },
  { label: "Locations", href: "#locations" },
  { label: "Community", href: "#community" },
  { label: "Events", href: "#community" },
  { label: "Why Work Hall", href: "#why-work-hall" },
  { label: "Contact", href: "#locations" },
  { label: "Member's Lounge", href: "#locations" },
];

const PLAN_LINKS: FooterLinkItem[] = [
  { label: "Air", href: "#plans" },
  { label: "X", href: "#plans" },
  { label: "Nox", href: "#plans" },
  { label: "Base", href: "#plans" },
  { label: "Box", href: "#plans" },
  { label: "Suite", href: "#plans" },
  { label: "Campus", href: "#plans" },
  { label: "HQ", href: "#plans" },
];

const LOCATION_LINKS: FooterLinkItem[] = [
  { label: "Tipu Sultan", href: "#locations" },
  { label: "PECHS", href: "#locations" },
  { label: "Gulshan", href: "#locations" },
  { label: "Shahrah-e-Faisal", href: "#locations" },
  { label: "Zamzama", href: "#locations" },
  { label: "Metropole", href: "#locations" },
];

const AI_LINKS: IconLinkItem[] = [
  { title: "Ask ChatGPT", href: "https://chat.openai.com", label: "ChatGPT", icon: ChatGptIcon },
  { title: "Ask Gemini", href: "https://gemini.google.com", label: "Gemini", icon: GeminiIcon },
  { title: "Ask Perplexity", href: "https://www.perplexity.ai", label: "Perplexity", icon: PerplexityIcon },
  { title: "Ask Claude", href: "https://claude.ai", label: "Claude", icon: ClaudeIcon },
  { title: "Ask Copilot", href: "https://copilot.microsoft.com", label: "Copilot", icon: CopilotIcon },
];

const SOCIAL_LINKS: IconLinkItem[] = [
  {
    title: "Instagram",
    href: "https://instagram.com/workhall.co",
    label: "Instagram",
    icon: InstagramIcon,
  },
  {
    title: "LinkedIn",
    href: "https://pk.linkedin.com/company/work-hall",
    label: "LinkedIn",
    icon: LinkedInIcon,
  },
  {
    title: "Facebook",
    href: "https://www.facebook.com/workhall.co",
    label: "Facebook",
    icon: FacebookIcon,
  },
];

const QR_MATRIX = buildPseudoQrMatrix("https://workhall.co");

function useInjectedFooterStyles() {
  useEffect(() => {
    if (typeof document === "undefined") return;

    let styleTag = document.getElementById(
      "wh-footer-styles",
    ) as HTMLStyleElement | null;

    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = "wh-footer-styles";
      document.head.appendChild(styleTag);
    }

    if (styleTag.textContent !== FOOTER_STYLES) {
      styleTag.textContent = FOOTER_STYLES;
    }
  }, []);
}

function hashSeed(input: string) {
  return Array.from(input).reduce(
    (seed, character) => ((seed * 31 + character.charCodeAt(0)) >>> 0),
    7,
  );
}

function buildPseudoQrMatrix(value: string) {
  const size = 21;
  const matrix = Array.from({ length: size }, () => Array<boolean>(size).fill(false));
  const reserved = Array.from({ length: size }, () => Array<boolean>(size).fill(false));

  const placeFinder = (startRow: number, startColumn: number) => {
    for (let row = -1; row <= 7; row += 1) {
      for (let column = -1; column <= 7; column += 1) {
        const actualRow = startRow + row;
        const actualColumn = startColumn + column;

        if (
          actualRow < 0 ||
          actualColumn < 0 ||
          actualRow >= size ||
          actualColumn >= size
        ) {
          continue;
        }

        reserved[actualRow][actualColumn] = true;

        if (row < 0 || row > 6 || column < 0 || column > 6) {
          matrix[actualRow][actualColumn] = false;
          continue;
        }

        const isBorder =
          row === 0 || row === 6 || column === 0 || column === 6;
        const isCenter = row >= 2 && row <= 4 && column >= 2 && column <= 4;
        matrix[actualRow][actualColumn] = isBorder || isCenter;
      }
    }
  };

  placeFinder(0, 0);
  placeFinder(0, size - 7);
  placeFinder(size - 7, 0);

  for (let index = 8; index < size - 8; index += 1) {
    reserved[6][index] = true;
    reserved[index][6] = true;
    matrix[6][index] = index % 2 === 0;
    matrix[index][6] = index % 2 === 0;
  }

  for (let index = 0; index < 9; index += 1) {
    reserved[8][index] = true;
    reserved[index][8] = true;
  }

  for (let index = size - 8; index < size; index += 1) {
    reserved[8][index] = true;
    reserved[index][8] = true;
  }

  matrix[size - 8][8] = true;
  reserved[size - 8][8] = true;

  let seed = hashSeed(value);
  const nextBit = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return ((seed >>> 30) & 1) === 1;
  };

  let column = size - 1;
  let upward = true;

  while (column > 0) {
    if (column === 6) {
      column -= 1;
    }

    for (let rowOffset = 0; rowOffset < size; rowOffset += 1) {
      const row = upward ? size - 1 - rowOffset : rowOffset;

      for (let step = 0; step < 2; step += 1) {
        const currentColumn = column - step;

        if (reserved[row][currentColumn]) {
          continue;
        }

        matrix[row][currentColumn] = nextBit();
      }
    }

    upward = !upward;
    column -= 2;
  }

  return matrix;
}

function PartnerBar({ email }: { email: string }) {
  return (
    <div className="whf2-partnerBar">
      <div className="whf2-partnerCopy">
        <span className="whf2-label">Partner With Us</span>
        <p className="whf2-partnerText">
          Looking to collaborate, sponsor, or grow alongside Karachi&apos;s
          most active coworking community?
        </p>
      </div>

      <a className="whf2-partnerButton" href={`mailto:${email}`}>
        Get in Touch →
      </a>
    </div>
  );
}

function BrandColumn({
  onFoundersVideoClick,
}: Pick<WorkHallFooterProps, "onFoundersVideoClick">) {
  return (
    <div>
      <h2 className="whf2-brandWordmark">Work Hall</h2>
      <p className="whf2-brandCopy">
        Karachi&apos;s most flexible coworking space.
        <br />
        Six locations, open 24/7, built around the people inside.
      </p>

      <button
        className="whf2-foundersCard"
        type="button"
        onClick={onFoundersVideoClick}
      >
        <span className="whf2-foundersThumb" aria-hidden="true">
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="currentColor"
            style={{ color: "var(--wh-text-secondary, #6c655f)" }}
          >
            <path d="M4 2.5L13 8L4 13.5V2.5Z" />
          </svg>
        </span>

        <span>
          <span className="whf2-foundersTitle">Hear from our Founders</span>
          <span className="whf2-foundersMeta">Play video</span>
        </span>
      </button>

      <div className="whf2-qrRow">
        <div className="whf2-qrBox" aria-hidden="true">
          <QrCodeArt />
        </div>

        <div>
          <span className="whf2-qrMetaLabel">Scan to visit</span>
          <span className="whf2-qrMetaSite">workhall.co</span>
        </div>
      </div>

      <div className="whf2-aiBlock">
        <p className="whf2-aiCopy">
          Ask any AI about coworking in Karachi. The answer is us.
        </p>

        <div className="whf2-aiIcons">
          {AI_LINKS.map((item) => (
            <a
              key={item.label}
              className="whf2-iconButton"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              title={item.title}
              aria-label={item.title}
            >
              <item.icon />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function QrCodeArt() {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <rect width="21" height="21" fill="#ffffff" />
      {QR_MATRIX.map((row, rowIndex) =>
        row.map((isFilled, columnIndex) =>
          isFilled ? (
            <rect
              key={`${rowIndex}-${columnIndex}`}
              x={columnIndex}
              y={rowIndex}
              width="1"
              height="1"
              fill="#0a0a0a"
            />
          ) : null,
        ),
      )}
    </svg>
  );
}

function NavigationColumn({
  phone,
  email,
  address,
}: Required<Pick<WorkHallFooterProps, "phone" | "email" | "address">>) {
  return (
    <div className="whf2-navColumn">
      <div className="whf2-navGrid">
        <FooterNavSection label="Work Hall" links={WORK_HALL_LINKS} />
        <FooterNavSection label="Our Plans" links={PLAN_LINKS} />
        <FooterNavSection label="Our Locations" links={LOCATION_LINKS} />
      </div>

      <div className="whf2-contactRow">
        <div className="whf2-contactMeta">
          <span>{phone}</span>
          <span className="whf2-separator">·</span>
          <a href={`mailto:${email}`}>{email}</a>
          <span className="whf2-separator">·</span>
          <span>{address}</span>
        </div>

        <div className="whf2-socials">
          {SOCIAL_LINKS.map((item) => (
            <a
              key={item.label}
              className="whf2-socialButton"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.title}
              title={item.title}
            >
              <item.icon />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function FooterNavSection({
  label,
  links,
}: {
  label: string;
  links: FooterLinkItem[];
}) {
  return (
    <div>
      <div className="whf2-sectionLabel">{label}</div>
      {links.map((link) => (
        <a key={link.label} className="whf2-navLink" href={link.href}>
          {link.label}
        </a>
      ))}
    </div>
  );
}

function LanyardColumn() {
  return (
    <div className="whf2-lanyardColumn">
      <div className="whf2-lanyardStage">
        <Lanyard
          position={[0, 0, 24]}
          gravity={[0, -40, 0]}
          fov={20}
          cardTexturePath="/WH%20Card.png"
          bandColor="#ff7a1a"
          lineWidth={0.28}
          useBandTexture={false}
        />
      </div>
    </div>
  );
}

function BottomBar() {
  return (
    <div className="whf2-bottomBar">
      <div className="whf2-bottomLeft">
        <span>© 2026 Work Hall. All rights reserved.</span>
        <span className="whf2-separator">·</span>
        <a href="/privacy">Privacy Policy</a>
        <span className="whf2-separator">·</span>
        <a href="/terms">Terms of Service</a>
      </div>

      <div className="whf2-bottomRight">
        Made with care, by our own community — right here at Work Hall.
      </div>
    </div>
  );
}

function ChatGptIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 41 41" fill="currentColor">
      <path d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835 9.964 9.964 0 0 0-6.666-2.505 10.079 10.079 0 0 0-9.612 6.977 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 6.666 2.505 10.079 10.079 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.813zM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496zM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744zM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.012L7.044 23.86a7.504 7.504 0 0 1-2.747-10.24zm27.658 6.437l-9.724-5.615 3.367-1.943a.121.121 0 0 1 .114-.012l8.048 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.647-1.13zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763zm-21.063 6.929l-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225zm1.829-3.943l4.33-2.501 4.332 2.5v4.999l-4.331 2.5-4.331-2.5V18z" />
    </svg>
  );
}

function GeminiIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 28 28" fill="none">
      <path
        d="M14 28C14 26.0633 13.6267 24.2433 12.88 22.54C12.1567 20.8367 11.165 19.355 9.905 18.095C8.645 16.835 7.1633 15.8433 5.46 15.12C3.7567 14.3733 1.9367 14 0 14C1.9367 14 3.7567 13.6383 5.46 12.915C7.1633 12.1683 8.645 11.165 9.905 9.905C11.165 8.645 12.1567 7.1633 12.88 5.46C13.6267 3.7567 14 1.9367 14 0C14 1.9367 14.3617 3.7567 15.085 5.46C15.8317 7.1633 16.835 8.645 18.095 9.905C19.355 11.165 20.8367 12.1683 22.54 12.915C24.2433 13.6383 26.0633 14 28 14C26.0633 14 24.2433 14.3733 22.54 15.12C20.8367 15.8433 19.355 16.835 18.095 18.095C16.835 19.355 15.8317 20.8367 15.085 22.54C14.3617 24.2433 14 26.0633 14 28Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PerplexityIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 4.5L6.5 9.5H10V15.5H7L12 19.5L17 15.5H14V9.5H17.5L12 4.5Z" />
    </svg>
  );
}

function ClaudeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.709 15.955l4.72-2.647.08-.23-.08-.23-4.72-2.648v-1.24l6.045 3.426.097.328-.097.329-6.045 3.426v-1.514zM19.291 8.045l-4.72 2.647-.08.23.08.23 4.72 2.648v1.24l-6.045-3.426-.097-.328.097-.329 6.045-3.426v1.514z" />
    </svg>
  );
}

function CopilotIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.5 5.5h3L15 10h-2.5v2H15l-1.5 2.5h-3L12 12H9.5l1.5-2.5H9L7.5 7h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function WorkHallFooter({
  onFoundersVideoClick,
  phone = "[PHONE]",
  email = "hello@workhall.co",
  address = "[ADDRESS]",
}: WorkHallFooterProps) {
  useInjectedFooterStyles();
  const stableVideoClick = useMemo(
    () => onFoundersVideoClick ?? (() => undefined),
    [onFoundersVideoClick],
  );

  return (
    <div className="whf2-root">
      <PartnerBar email={email} />

      <footer className="whf2-main">
        <div className="whf2-grid">
          <BrandColumn onFoundersVideoClick={stableVideoClick} />
          <NavigationColumn phone={phone} email={email} address={address} />
          <LanyardColumn />
        </div>

        <BottomBar />
      </footer>
    </div>
  );
}
