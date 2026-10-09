import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type FormEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import {
  clinic,
  clinicPhotos,
  doctors,
  faqCategories,
  galleryImages,
  mainNav,
  photos,
  treatments,
  type FaqCategory,
  type Treatment,
} from "./siteData";

type IconName = "tooth" | "pin" | "phone" | "arrow" | "clock" | "family" | "spark" | "care" | "check" | "menu" | "close" | "chevron" | "calendar" | "clipboard" | "shield" | "smile" | "layers" | "plus" | "left" | "right";

const NavigationContext = createContext<(to: string) => void>(() => undefined);

function cleanPath(path: string) {
  if (!path || path === "/") return "/";
  return path.replace(/\/+$/, "");
}

interface SiteLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  to: string;
}

function SiteLink({ to, onClick, ...props }: SiteLinkProps) {
  const navigate = useContext(NavigationContext);
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      to.startsWith("http") ||
      to.startsWith("tel:") ||
      to.startsWith("mailto:") ||
      to.startsWith("#")
    ) return;
    event.preventDefault();
    navigate(to);
  };
  return <a href={to} {...props} onClick={handleClick} />;
}

function Icon({ name, size = 20, className = "" }: { name: IconName; size?: number; className?: string }) {
  const paths: Record<IconName, ReactNode> = {
    tooth: <path d="M12 4.2c-2-1.5-5.5-1.1-6.8.9-1.3 2-.2 5.2.7 8.2.8 2.7 1.4 5.4 2.7 6.2 1.2.7 1.8-1 2.5-2.8.3-.7.6-1.2.9-1.2s.6.5.9 1.2c.7 1.8 1.3 3.5 2.5 2.8 1.3-.8 1.9-3.5 2.7-6.2.9-3 2-6.2.7-8.2-1.3-2-4.8-2.4-6.8-.9Z" />,
    pin: <><path d="M19 10.1c0 5-7 10.4-7 10.4S5 15.1 5 10.1a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.2" /></>,
    phone: <path d="M6.7 3.8 9 3.3l1.8 4.2-1.7 1.4a15 15 0 0 0 6 6l1.4-1.7 4.2 1.8-.5 2.3a2 2 0 0 1-2.2 1.6A17.8 17.8 0 0 1 4.8 6a2 2 0 0 1 1.9-2.2Z" />,
    arrow: <><path d="M4 12h15" /><path d="m13 5 7 7-7 7" /></>,
    clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.4 2" /></>,
    family: <><circle cx="9" cy="8" r="3" /><path d="M3.5 19v-1.3a5.5 5.5 0 0 1 11 0V19" /><circle cx="17.4" cy="9" r="2.2" /><path d="M16.2 14.2a4.1 4.1 0 0 1 4.3 4.1V19" /></>,
    spark: <><path d="m12 3 1.4 5.6L19 10l-5.6 1.4L12 17l-1.4-5.6L5 10l5.6-1.4L12 3Z" /><path d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z" /></>,
    care: <><path d="M20.2 8.8c0 5.4-8.2 10.2-8.2 10.2S3.8 14.2 3.8 8.8A4.8 4.8 0 0 1 12 5.5a4.8 4.8 0 0 1 8.2 3.3Z" /><path d="M8.5 10.5h2l1-2 1.5 4 1-2h1.5" /></>,
    check: <><path d="m5 12.5 4.2 4.2L19.5 6.5" /></>,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    close: <><path d="m6 6 12 12" /><path d="M18 6 6 18" /></>,
    chevron: <path d="m6 9 6 6 6-6" />,
    calendar: <><rect x="4" y="5.5" width="16" height="15" rx="1.8" /><path d="M8 3.5v4M16 3.5v4M4 10h16M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01" /></>,
    clipboard: <><rect x="5" y="5" width="14" height="16" rx="2" /><path d="M9 5V3h6v2M8.5 10h7M8.5 14h7M8.5 18h4" /></>,
    shield: <><path d="M12 3 19 6v5.2c0 4.3-3 7.8-7 9.8-4-2-7-5.5-7-9.8V6l7-3Z" /><path d="m9 12 2 2 4-4" /></>,
    smile: <><circle cx="12" cy="12" r="8.5" /><path d="M8.5 14.5a4.3 4.3 0 0 0 7 0M9 9.5h.01M15 9.5h.01" /></>,
    layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    left: <><path d="M20 12H5" /><path d="m11 18-6-6 6-6" /></>,
    right: <><path d="M4 12h15" /><path d="m13 6 6 6-6 6" /></>,
  };
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function ToothMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 56" fill="none" aria-hidden="true">
      <path d="M24 8.3c-4.7-3.7-13-2.8-16.2 2.1-3.2 4.8-.5 12.2 1.7 19.4 1.8 6.4 3.1 12.8 6.4 14.7 2.8 1.6 4.3-2.4 5.9-6.7.6-1.7 1.3-2.9 2.2-2.9s1.6 1.2 2.2 2.9c1.6 4.3 3.1 8.3 5.9 6.7 3.3-1.9 4.6-8.3 6.4-14.7 2.2-7.2 4.9-14.6 1.7-19.4C37 5.5 28.7 4.6 24 8.3Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M15.5 14.5c2.8-2.6 6.5-2.8 8.5-.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function Logo({ onClick }: { onClick?: AnchorHTMLAttributes<HTMLAnchorElement>["onClick"] }) {
  const [failed, setFailed] = useState(false);
  return (
    <SiteLink to="/" className="brand-link" aria-label="Simply Smilez Dental home" onClick={onClick}>
      {failed ? (
        <span className="fallback-logo">
          <ToothMark />
          <span><b>SIMPLY SMILEZ</b><small>Dental care</small></span>
        </span>
      ) : (
        <img
          className="brand-logo"
          src="/logo.webp"
          width="404"
          height="93"
          alt="Simply Smilez Dental care"
          onError={() => setFailed(true)}
        />
      )}
    </SiteLink>
  );
}

function Photo({
  src,
  alt,
  className = "",
  fallback,
  loading = "lazy",
  fetchPriority,
}: {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
}) {
  const [failed, setFailed] = useState(false);
  const activeSrc = failed && fallback ? fallback : src;
  return (
    <img
      className={className}
      src={activeSrc}
      alt={alt}
      width="1200"
      height="627"
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      onError={() => {
        if (fallback && !failed) setFailed(true);
      }}
    />
  );
}

function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`container ${className}`}>{children}</div>;
}

function SectionHeading({
  eyebrow,
  title,
  text,
  className = "",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  className?: string;
  light?: boolean;
}) {
  return (
    <div className={`section-heading ${light ? "section-heading-light" : ""} ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {text && <p className="section-intro">{text}</p>}
    </div>
  );
}

function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs container">
      <ol>
        <li><SiteLink to="/">Home</SiteLink></li>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} aria-current={index === items.length - 1 ? "page" : undefined}>
            {item.to ? <SiteLink to={item.to}>{item.label}</SiteLink> : <span>{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Header({ path }: { path: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileNavigationRef = useRef<HTMLDivElement>(null);
  const wasMenuOpen = useRef(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!menuOpen) {
      if (wasMenuOpen.current) requestAnimationFrame(() => menuTriggerRef.current?.focus());
      wasMenuOpen.current = false;
      return;
    }
    wasMenuOpen.current = true;
    requestAnimationFrame(() => mobileNavigationRef.current?.querySelector<HTMLElement>(".mobile-close")?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuTriggerRef.current?.focus();
      }
      if (event.key === "Tab" && mobileNavigationRef.current) {
        const focusable = Array.from(mobileNavigationRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"))
          .filter((element) => element.tabIndex >= 0);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.body.classList.add("menu-open");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const active = (to: string) => path === to || (to !== "/" && path.startsWith(`${to}/`));

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="utility-bar">
        <Container className="utility-inner">
          <span className="utility-location"><Icon name="pin" size={15} /> Shaikpet, Hyderabad</span>
          <div className="utility-contacts">
            <a href={`tel:${clinic.phonePrimaryHref}`}><Icon name="phone" size={14} /> {clinic.phonePrimary}</a>
            <span className="utility-divider" aria-hidden="true" />
            <a href={`tel:${clinic.phoneSecondaryHref}`}>{clinic.phoneSecondary}</a>
            <span className="utility-open">Mon-Sat 10:00 am-9:00 pm <span aria-hidden="true">·</span> Sun 11:00 am-4:00 pm</span>
          </div>
        </Container>
      </div>
      <div className="nav-bar">
        <Container className="nav-inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Main navigation">
            {mainNav.map((item) => (
              <SiteLink key={item.to} to={item.to} className={active(item.to) ? "active" : ""} aria-current={active(item.to) ? "page" : undefined}>
                {item.label}
              </SiteLink>
            ))}
          </nav>
          <SiteLink to="/contact#appointment" className="header-appointment">Book an Appointment <Icon name="arrow" size={16} /></SiteLink>
          <button
            type="button"
            className="menu-trigger"
            ref={menuTriggerRef}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? "close" : "menu"} size={24} />
          </button>
        </Container>
      </div>
      <div className={`mobile-navigation ${menuOpen ? "is-open" : ""}`} id="mobile-navigation" aria-hidden={!menuOpen} ref={mobileNavigationRef}>
        <div className="mobile-navigation-top">
          <Logo onClick={closeMenu} />
          <button className="mobile-close" type="button" aria-label="Close navigation menu" onClick={closeMenu}><Icon name="close" size={24} /></button>
        </div>
        <nav aria-label="Mobile navigation">
          {mainNav.map((item, index) => (
            <SiteLink key={item.to} to={item.to} tabIndex={menuOpen ? 0 : -1} aria-current={active(item.to) ? "page" : undefined} onClick={closeMenu}>
              <span className="mobile-nav-index">0{index + 1}</span><span>{item.label}</span><Icon name="arrow" size={17} />
            </SiteLink>
          ))}
        </nav>
        <SiteLink to="/contact#appointment" className="button button-primary mobile-book" tabIndex={menuOpen ? 0 : -1} onClick={closeMenu}>Book an Appointment <Icon name="arrow" size={17} /></SiteLink>
        <div className="mobile-contact-row">
          <a href={`tel:${clinic.phonePrimaryHref}`}><Icon name="phone" size={16} /> {clinic.phonePrimary}</a>
          <span>Shaikpet, Hyderabad</span>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const treatmentLinks = treatments;
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-main">
          <div className="footer-brand-column">
            <Logo />
            <p>Thoughtful dental care for children and adults, with a focus on comfort, service and modern dental technology.</p>
            <SiteLink to="/contact#appointment" className="footer-book-link">Plan a visit <Icon name="arrow" size={16} /></SiteLink>
          </div>
          <div className="footer-link-column">
            <p className="footer-title">Explore</p>
            <div className="footer-links">
              {mainNav.map((link) => <SiteLink key={link.to} to={link.to}>{link.label}</SiteLink>)}
              <SiteLink to="/privacy-policy">Privacy Policy</SiteLink>
            </div>
          </div>
          <div className="footer-link-column">
            <p className="footer-title">Treatments</p>
            <div className="footer-links">
              {treatmentLinks.map((treatment) => <SiteLink key={treatment.slug} to={`/treatments/${treatment.slug}`}>{treatment.title}</SiteLink>)}
              <SiteLink to="/treatments">All treatments <Icon name="arrow" size={13} /></SiteLink>
            </div>
          </div>
          <div className="footer-contact-column">
            <p className="footer-title">Visit Simply Smilez</p>
            <p className="footer-address">{clinic.address}</p>
            <div className="footer-links footer-phones">
              <a href={`tel:${clinic.phonePrimaryHref}`}>{clinic.phonePrimary}</a>
              <a href={`tel:${clinic.phoneSecondaryHref}`}>{clinic.phoneSecondary}</a>
            </div>
            <p className="footer-hours">{clinic.hoursWeekdays}<br />{clinic.hoursSunday}</p>
            <a className="footer-directions" href={clinic.directions} target="_blank" rel="noreferrer">Get directions <Icon name="arrow" size={15} /></a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Simply Smilez Dental. All rights reserved.</span>
          <span>Dental care in Shaikpet, Hyderabad</span>
        </div>
      </Container>
    </footer>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 550);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      className={`back-to-top ${visible ? "is-visible" : ""}`}
      type="button"
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}

function SiteFrame({ children }: { children: ReactNode }) {
  return <>{children}<Footer /><BackToTop /></>;
}

function TextLink({ to, children, className = "" }: { to: string; children: ReactNode; className?: string }) {
  return <SiteLink to={to} className={`text-link ${className}`}>{children}<Icon name="arrow" size={17} /></SiteLink>;
}

function ButtonLink({
  to,
  children,
  variant = "primary",
  className = "",
}: {
  to: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light" | "outline-light";
  className?: string;
}) {
  return <SiteLink to={to} className={`button button-${variant} ${className}`}>{children}<Icon name="arrow" size={17} /></SiteLink>;
}

function HomePage() {
  const previewTreatments = treatments;
  return (
    <>
      <section className="home-hero">
        <Container className="home-hero-grid">
          <div className="hero-copy">
            <p className="eyebrow hero-location">SIMPLY SMILEZ DENTAL <span>·</span> SHAIKPET, HYDERABAD</p>
            <p className="hero-brand-name">Simply Smilez <span>Dental</span></p>
            <h1>Your Smile Deserves Exceptional Care.</h1>
            <p className="hero-description">Thoughtful dental care for children and adults, combining a comfortable patient experience with modern dental technology.</p>
            <div className="button-row">
              <ButtonLink to="/contact#appointment">Book an Appointment</ButtonLink>
              <ButtonLink to="/treatments" variant="secondary">Explore Treatments</ButtonLink>
            </div>
            <p className="hero-support"><span className="support-rule" />Personalized dental care for every stage of life.</p>
            <ToothMark className="hero-tooth-detail" />
          </div>
          <div className="hero-photo-wrap reveal reveal-image">
            <Photo src={photos.hero} alt="A dentist speaks with a patient during a relaxed consultation in a bright clinic." className="hero-photo" loading="eager" fetchPriority="high" />
            <div className="hero-photo-caption"><span>Care that begins with listening.</span><span>SHAIKPET · HYDERABAD</span></div>
          </div>
        </Container>
        <div className="hero-baseline" aria-hidden="true"><span>01 / 05</span><span>Comprehensive dental care</span><span className="baseline-line" /></div>
      </section>

      <section className="quick-access" aria-label="Clinic highlights">
        <Container className="quick-access-grid">
          {[
            { icon: "family" as const, title: "Children & Adult Care", to: "/about" },
            { icon: "tooth" as const, title: "General Dentistry", to: "/treatments/general-cosmetic-dentistry" },
            { icon: "spark" as const, title: "Cosmetic Dentistry", to: "/treatments/veneers-whitening" },
            { icon: "pin" as const, title: "Shaikpet, Hyderabad", to: "/contact" },
          ].map((item) => (
            <SiteLink to={item.to} className="quick-item" key={item.title}>
              <Icon name={item.icon} size={23} />
              <span>{item.title}</span>
              <Icon name="arrow" size={15} className="quick-arrow" />
            </SiteLink>
          ))}
        </Container>
      </section>

      <section className="welcome-section section-space">
        <Container className="welcome-grid">
          <div className="welcome-photo reveal reveal-image">
            <Photo src={clinicPhotos.interior} fallback={photos.clinic} alt="A clean, contemporary dental treatment room, shown for illustrative context." />
            <span className="image-index">A thoughtful place for care <span>01</span></span>
          </div>
          <div className="welcome-copy reveal">
            <p className="eyebrow">WELCOME TO SIMPLY SMILEZ</p>
            <h2>Comfort, Care and Confidence in Every Smile.</h2>
            <p>Simply Smilez Dental is committed to providing a positive experience for each patient. Combining comfort and service with technology, we aim to offer new standards of dental care.</p>
            <p>From a child's first visit to treatment planning as an adult, we make space for questions, clear explanations and care that is considered around you.</p>
            <TextLink to="/about">Discover Our Clinic</TextLink>
          </div>
        </Container>
      </section>

      <section className="treatments-section section-space" id="treatments">
        <Container>
          <div className="treatments-heading-row reveal">
            <SectionHeading eyebrow="CARE, CONSIDERED" title="Complete Dental Care. One Trusted Destination." text="Explore treatment options for children and adults, with recommendations shaped around an individual assessment." />
            <TextLink to="/treatments" className="heading-link">View all treatments</TextLink>
          </div>
          <TreatmentGrid items={previewTreatments} featured />
          <p className="treatment-disclaimer">Treatment suitability, steps and expected outcomes vary by individual. A dental consultation is needed before deciding on care.</p>
        </Container>
      </section>

      <section className="cosmetic-feature section-space">
        <Container className="cosmetic-grid">
          <div className="cosmetic-photo reveal reveal-image">
            <Photo src={photos.adultSmile} alt="Editorial stock photograph of a natural smile, used illustratively and not as a patient result." />
            <span className="photo-side-note">A smile, your own way.</span>
          </div>
          <div className="cosmetic-copy reveal">
            <p className="eyebrow">COSMETIC DENTISTRY</p>
            <h2>Love the Smile You're Becoming.</h2>
            <p>Veneers, whitening, crowns and orthodontic options can each address different concerns. Start with a conversation about what matters to you, then explore choices, maintenance and limitations with a dental professional.</p>
            <ul className="minimal-list">
              <li><span>01</span>Dental veneers and whitening</li>
              <li><span>02</span>Crowns and tooth-coloured fillings</li>
              <li><span>03</span>Orthodontic options for alignment</li>
            </ul>
            <ButtonLink to="/treatments/veneers-whitening">Explore Cosmetic Treatments</ButtonLink>
          </div>
        </Container>
      </section>

      <section className="kids-feature section-space">
        <Container className="kids-grid">
          <div className="kids-copy reveal">
            <p className="eyebrow">GENTLE CARE FOR GROWING SMILES</p>
            <h2>Little Smiles Matter Just as Much.</h2>
            <p>Pediatric dentistry helps children build healthy routines and gives parents a place to ask questions as teeth and jaws grow. When orthodontic concerns arise, Invisalign First may be one option for selected children after an assessment.</p>
            <div className="kids-links">
              <TextLink to="/kids-dentistry">Discover Kids Dentistry</TextLink>
              <TextLink to="/treatments/invisalign-first">Explore Invisalign First</TextLink>
            </div>
          </div>
          <div className="kids-photo reveal reveal-image">
            <Photo src={photos.child} alt="A parent and child talking with a dentist during a family dental consultation." />
            <span className="image-index">Care for the whole family <span>02</span></span>
          </div>
        </Container>
      </section>

      <section className="values-section section-space">
        <Container>
          <SectionHeading eyebrow="THE SIMPLY SMILEZ APPROACH" title="Care shaped around real people." text="A considered experience at every stage, from the first conversation to ongoing care." className="values-heading reveal" />
          <div className="values-grid">
            {[
              { icon: "care" as const, title: "Patient-Focused Approach", text: "We make time to understand what brings you in and explain the options clearly." },
              { icon: "family" as const, title: "Care for Children & Adults", text: "Dental care for growing smiles, adults and families in one welcoming clinic." },
              { icon: "clipboard" as const, title: "Personalized Treatment Planning", text: "Recommendations are considered around your oral health, goals and needs." },
              { icon: "layers" as const, title: "Modern Dental Technology", text: "Technology supports thoughtful assessment and contemporary dental care." },
            ].map((value, index) => (
              <article className="value-item reveal" key={value.title}>
                <div className="value-topline"><span>0{index + 1}</span><Icon name={value.icon} size={26} /></div>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <LocationSection />
      <FinalCta />
    </>
  );
}

function TreatmentGrid({ items, featured = false }: { items: Treatment[]; featured?: boolean }) {
  return (
    <div className={`treatment-grid ${featured ? "treatment-grid-featured" : ""}`}>
      {items.map((treatment, index) => (
        <article className={`treatment-card reveal ${featured && index === 0 ? "is-featured" : ""}`} key={treatment.slug}>
          <SiteLink to={`/treatments/${treatment.slug}`} className="treatment-card-link" aria-label={`Explore ${treatment.title}`}>
            <span className="treatment-image-wrap">
              <Photo src={treatment.photo} alt={treatment.photoAlt} />
              <span className="treatment-index">{String(index + 1).padStart(2, "0")}</span>
            </span>
            <span className="treatment-card-content">
              <span className="treatment-card-title">{treatment.title}<Icon name="arrow" size={18} /></span>
              <span className="treatment-card-description">{treatment.short}</span>
            </span>
          </SiteLink>
        </article>
      ))}
    </div>
  );
}

function LocationSection({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`location-section ${compact ? "location-section-compact" : "section-space"}`}>
      <Container className="location-grid">
        <div className="location-copy reveal">
          <p className="eyebrow">FIND US IN SHAIKPET</p>
          <h2>A familiar place for thoughtful dental care.</h2>
          <p className="location-address">{clinic.address}</p>
          <div className="location-meta">
            <div><Icon name="phone" size={19} /><span><a href={`tel:${clinic.phonePrimaryHref}`}>{clinic.phonePrimary}</a><a href={`tel:${clinic.phoneSecondaryHref}`}>{clinic.phoneSecondary}</a></span></div>
            <div><Icon name="clock" size={19} /><span>{clinic.hoursWeekdays}<br />{clinic.hoursSunday}</span></div>
          </div>
          <a className="text-link" href={clinic.directions} target="_blank" rel="noreferrer">Get Directions <Icon name="arrow" size={17} /></a>
        </div>
        <div className="map-frame reveal reveal-image">
          <iframe
            title="Map showing P.V. Reddy Complex in Shaikpet, Hyderabad"
            src="https://maps.google.com/maps?q=P.V.%20Reddy%20Complex%2C%20Dwaraka%20Nagar%20Colony%2C%20Shaikpet%2C%20Hyderabad%20500008&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <a className="map-directions" href={clinic.directions} target="_blank" rel="noreferrer"><Icon name="pin" size={17} /> Open directions <Icon name="arrow" size={15} /></a>
        </div>
      </Container>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="final-cta">
      <Container className="final-cta-inner">
        <div className="final-cta-copy reveal">
          <p className="eyebrow">A GOOD PLACE TO BEGIN</p>
          <h2>Your Next Smile Starts Here.</h2>
          <p>Connect with Simply Smilez Dental to explore your dental care options.</p>
        </div>
        <div className="final-cta-actions reveal">
          <ButtonLink to="/contact#appointment" variant="light">Book an Appointment</ButtonLink>
          <a className="button button-outline-light" href={`tel:${clinic.phonePrimaryHref}`}>Call Our Clinic <Icon name="phone" size={16} /></a>
        </div>
        <ToothMark className="cta-tooth-mark" />
      </Container>
    </section>
  );
}

function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "About" }]} />
      <section className="editorial-page-hero">
        <Container className="editorial-hero-grid">
          <div className="editorial-hero-copy reveal">
            <p className="eyebrow">A MORE THOUGHTFUL DENTAL VISIT</p>
            <h1>Care should feel considered, from the very first hello.</h1>
            <p>Simply Smilez Dental is committed to providing a positive experience for every patient, combining comfort and service with modern dental technology.</p>
            <ButtonLink to="/treatments">Explore Treatments</ButtonLink>
          </div>
          <div className="editorial-hero-image reveal reveal-image">
            <Photo src={clinicPhotos.consultation} fallback={photos.consultation} alt="A dentist and patient talk through care options in a bright consultation room." />
            <span className="image-index">Simply Smilez Dental <span>01</span></span>
          </div>
        </Container>
      </section>
      <section className="about-philosophy section-space">
        <Container className="about-philosophy-grid">
          <div className="about-philosophy-heading reveal">
            <p className="eyebrow">OUR PHILOSOPHY</p>
            <h2>Good care starts with a good conversation.</h2>
          </div>
          <div className="about-philosophy-copy reveal">
            <p>Dental care is personal. We want every patient to have the space to explain a concern, ask questions and understand their options before making decisions about treatment.</p>
            <p>Our clinic provides care for children and adults, with a focus on patient comfort, clear communication and treatment planning shaped around individual needs.</p>
            <TextLink to="/patient-information">What to expect at your visit</TextLink>
          </div>
        </Container>
      </section>
      <section className="about-image-band">
        <Photo src={clinicPhotos.care} fallback={photos.clinicChair} alt="Bright dental room with a contemporary treatment chair and clinical equipment." />
        <div className="about-image-caption"><span>COMFORT, SERVICE AND TECHNOLOGY</span><span>SHAIKPET, HYDERABAD</span></div>
      </section>
      <section className="about-commitments section-space">
        <Container>
          <SectionHeading eyebrow="WHAT GUIDES OUR CARE" title="A positive experience is built one detail at a time." text="Our approach brings comfort, communication and clinical care into the same conversation." className="reveal" />
          <div className="about-commitments-grid">
            {[
              ["01", "Patient comfort", "We aim to create a welcoming experience and explain each step so you know what to expect."],
              ["02", "Personalized care", "Your dental history, current needs and preferences help shape an individual plan."],
              ["03", "Care across ages", "Children, teenagers and adults can discuss their dental needs in one family-focused clinic."],
              ["04", "Modern technology", "Contemporary dental technology can support assessment and treatment planning."],
            ].map(([number, title, text]) => <div className="commitment-row reveal" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></div>)}
          </div>
        </Container>
      </section>
      <section className="about-care-section section-space">
        <Container className="about-care-grid">
          <div className="about-care-image reveal reveal-image"><Photo src={photos.child} alt="A family consultation with a dentist, illustrating care for children and adults." /></div>
          <div className="about-care-copy reveal">
            <p className="eyebrow">FOR EVERY STAGE OF LIFE</p>
            <h2>Care that grows with your family.</h2>
            <p>From preventive visits and children's dentistry to orthodontic, restorative and cosmetic treatment conversations, our team can help you understand the options that may suit you.</p>
            <div className="inline-link-list"><TextLink to="/kids-dentistry">Children's dentistry</TextLink><TextLink to="/invisalign">Invisalign and braces</TextLink><TextLink to="/treatments">All treatments</TextLink></div>
          </div>
        </Container>
      </section>
      <LocationSection compact />
      <FinalCta />
    </>
  );
}

function DoctorsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Doctors" }]} />
      <section className="doctors-intro">
        <Container className="doctors-intro-inner">
          <div className="reveal">
            <p className="eyebrow">MEET YOUR DENTAL TEAM</p>
            <h1>Experience and expertise, centered on you.</h1>
          </div>
          <p className="reveal">Get to know the senior doctors consulting at Simply Smilez Dental. Each brings specialist training and years of experience to their field.</p>
        </Container>
      </section>
      <section className="doctors-section section-space">
        <Container className="doctors-grid">
          {doctors.map((doctor) => (
            <article className="doctor-card reveal" key={doctor.name}>
              <div className="doctor-image-wrap">
                <Photo src={doctor.image} alt={doctor.imageAlt} className="doctor-image" loading="eager" />
              </div>
              <div className="doctor-card-content">
                <div className="doctor-badges">
                  <span>{doctor.verification}</span>
                  <span>Senior Doctor</span>
                </div>
                <p className="doctor-specialty">{doctor.specialty}</p>
                <h2>{doctor.name}</h2>
                <p className="doctor-designation">{doctor.designation}</p>
                <p className="doctor-credentials">{doctor.credentials}</p>
                <p className="doctor-summary">{doctor.summary}</p>
                <dl className="doctor-metrics">
                  {doctor.metrics.map((metric) => (
                    <div key={metric.label}>
                      <dt>{metric.value}</dt>
                      <dd>{metric.label}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </Container>
      </section>
      <FinalCta />
    </>
  );
}

function TreatmentsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Treatments" }]} />
      <section className="directory-intro">
        <Container className="directory-intro-grid">
          <div className="reveal">
            <p className="eyebrow">DENTAL CARE, ALL IN ONE PLACE</p>
            <h1>Thoughtful options for healthier, more confident smiles.</h1>
          </div>
          <div className="directory-intro-aside reveal">
            <p>Explore care for children and adults at Simply Smilez Dental in Shaikpet. Every recommendation starts with an assessment and a conversation about what matters to you.</p>
            <TextLink to="/contact#appointment">Talk with our team</TextLink>
          </div>
        </Container>
      </section>
      <section className="directory-treatments section-space">
        <Container>
          <div className="directory-overline"><span>01 — 10</span><span>OUR TREATMENTS</span></div>
          <TreatmentGrid items={treatments} />
          <p className="treatment-disclaimer">Treatment availability and suitability are confirmed after an individual dental assessment. Descriptions on this website are general information, not a diagnosis.</p>
        </Container>
      </section>
      <FinalCta />
    </>
  );
}

function FaqAccordion({ categories, prefix = "faq" }: { categories: FaqCategory[]; prefix?: string }) {
  const [openItem, setOpenItem] = useState<string | null>(null);
  return (
    <div className="faq-categories">
      {categories.map((category, groupIndex) => (
        <section className="faq-category" key={category.title}>
          <h2>{category.title}</h2>
          <div className="faq-list">
            {category.items.map((item, itemIndex) => {
              const key = `${groupIndex}-${itemIndex}`;
              const questionId = `${prefix}-${groupIndex}-${itemIndex}-question`;
              const answerId = `${prefix}-${groupIndex}-${itemIndex}-answer`;
              const expanded = openItem === key;
              return (
                <article className={`faq-item ${expanded ? "is-open" : ""}`} key={item.question}>
                  <h3>
                    <button id={questionId} type="button" aria-expanded={expanded} aria-controls={answerId} onClick={() => setOpenItem(expanded ? null : key)}>
                      <span>{item.question}</span><span className="faq-toggle"><Icon name={expanded ? "close" : "plus"} size={17} /></span>
                    </button>
                  </h3>
                  <div id={answerId} className="faq-answer" role="region" aria-labelledby={questionId} hidden={!expanded}>
                    <p>{item.answer}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

function TreatmentPage({ treatment }: { treatment: Treatment }) {
  const treatmentFaqs: FaqCategory[] = [{ title: `Questions about ${treatment.title.toLowerCase()}`, items: treatment.faqs }];
  const related = treatments.filter((item) => item.slug !== treatment.slug).slice(0, 3);
  return (
    <>
      <Breadcrumbs items={[{ label: "Treatments", to: "/treatments" }, { label: treatment.title }]} />
      <section className="treatment-hero-page">
        <Container className="treatment-hero-grid">
          <div className="treatment-hero-copy reveal">
            <p className="eyebrow">DENTAL CARE IN SHAIKPET</p>
            <h1>{treatment.title}</h1>
            <p className="treatment-lead">{treatment.intro}</p>
            <ButtonLink to="/contact#appointment">Arrange a Consultation</ButtonLink>
            <span className="treatment-hero-note"><Icon name="shield" size={18} /> Individual assessment and clear treatment conversations.</span>
          </div>
          <div className="treatment-hero-image reveal reveal-image">
            <Photo src={treatment.photo} alt={treatment.photoAlt} />
            <span className="photo-credit-note">Illustrative photography</span>
          </div>
        </Container>
      </section>
      <section className="treatment-overview section-space">
        <Container className="treatment-overview-grid">
          <div className="overview-title reveal"><p className="eyebrow">THE OVERVIEW</p><h2>Start with what your smile needs.</h2></div>
          <div className="overview-copy reveal"><p>{treatment.intro}</p><p>Online information can help you prepare questions, but it cannot replace an examination. A dental professional can explain which options fit your situation and what to expect from each.</p></div>
        </Container>
      </section>
      <section className="treatment-details-section">
        <Container>
          <div className="treatment-detail-columns">
            <div className="detail-column reveal">
              <p className="eyebrow">WHEN TO ASK ABOUT IT</p>
              <h2>Common reasons for a visit</h2>
              <ul className="check-list">{treatment.reasons.map((reason) => <li key={reason}><Icon name="check" size={17} />{reason}</li>)}</ul>
            </div>
            <div className="detail-column detail-considerations reveal">
              <p className="eyebrow">POSSIBLE BENEFITS & CONSIDERATIONS</p>
              <h2>Understand both sides.</h2>
              <ul className="benefit-list">{treatment.benefits.map((benefit) => <li key={benefit}><span className="benefit-plus">+</span>{benefit}</li>)}</ul>
              <p className="consideration-copy">{treatment.considerations.join(" ")}</p>
            </div>
          </div>
        </Container>
      </section>
      <section className="treatment-process-section section-space">
        <Container>
          <SectionHeading eyebrow="A CLEARER NEXT STEP" title="What the treatment process may involve." text="Your exact care pathway will be discussed after assessment. These general stages are a guide to the conversation." className="reveal" />
          <ol className="process-list">
            {treatment.process.map((step, index) => <li className="process-step reveal" key={step}><span className="process-number">0{index + 1}</span><p>{step}</p></li>)}
          </ol>
        </Container>
      </section>
      <section className="suitability-section">
        <Container className="suitability-grid">
          <div className="suitability-mark"><Icon name="shield" size={28} /></div>
          <div><p className="eyebrow">IS IT RIGHT FOR YOU?</p><h2>Suitability is always individual.</h2><p>{treatment.suitability}</p></div>
          <SiteLink to="/patient-information" className="text-link">Patient Information <Icon name="arrow" size={17} /></SiteLink>
        </Container>
      </section>
      <section className="treatment-faq-section section-space">
        <Container className="treatment-faq-grid">
          <div className="treatment-faq-heading reveal"><p className="eyebrow">GOOD QUESTIONS TO ASK</p><h2>Before you decide.</h2><p>Use your consultation to understand the options, care stages, costs and aftercare that may apply to you.</p><TextLink to="/faqs">Visit all FAQs</TextLink></div>
          <div className="reveal"><FaqAccordion categories={treatmentFaqs} prefix={treatment.slug} /></div>
        </Container>
      </section>
      <section className="related-treatments section-space">
        <Container>
          <div className="related-heading"><SectionHeading eyebrow="CONTINUE EXPLORING" title="Other care to consider." /><TextLink to="/treatments">All treatments</TextLink></div>
          <TreatmentGrid items={related} />
        </Container>
      </section>
      <FinalCta />
    </>
  );
}

function InvisalignPage() {
  const alignerFaqs: FaqCategory[] = [{ title: "Invisalign questions", items: [
    { question: "What are clear aligners?", answer: "Clear aligners are removable trays designed to move teeth in planned stages. An orthodontic assessment is needed to see whether they are appropriate for your case." },
    { question: "Are aligners better than braces?", answer: "Neither option is best for everyone. Aligners and fixed braces have different indications, care needs and routines; your clinician can compare them after assessment." },
    { question: "Can children use Invisalign First?", answer: "Some growing children may be considered for Invisalign First after an assessment of their development and orthodontic needs. Early treatment is not necessary for every child." },
    { question: "Can I eat while wearing aligners?", answer: "Aligners are generally removed for meals and for drinks other than water. Follow the instructions from the treating clinician for your specific plan." },
  ] }];
  return (
    <>
      <Breadcrumbs items={[{ label: "Invisalign" }]} />
      <section className="invisalign-hero">
        <Container className="invisalign-hero-grid">
          <div className="invisalign-hero-copy reveal">
            <p className="eyebrow">CLEAR ALIGNERS · SHAIKPET, HYDERABAD</p>
            <h1>A clearer way to explore a more aligned smile.</h1>
            <p>Invisalign clear aligners are removable trays used to move teeth in planned stages. A dental assessment can help you understand whether aligners, braces or another approach may suit you.</p>
            <ButtonLink to="/contact#appointment">Discuss Invisalign</ButtonLink>
            <span className="hero-footnote">Treatment suitability and outcomes vary by individual.</span>
          </div>
          <div className="invisalign-hero-image reveal reveal-image"><Photo src={photos.alignment} alt="A dental professional presenting a dental model during an orthodontic conversation." /><span className="image-index">A considered orthodontic plan <span>01</span></span></div>
        </Container>
      </section>
      <section className="invisalign-overview section-space">
        <Container className="invisalign-overview-grid">
          <div className="invisalign-overview-title reveal"><p className="eyebrow">CLEAR ALIGNERS, EXPLAINED</p><h2>Small changes, planned with care.</h2></div>
          <div className="invisalign-overview-copy reveal"><p>Clear aligners are custom-made removable trays. They are typically changed in a sequence according to a clinician's plan and need to be worn as directed to support the intended tooth movements.</p><p>Aligner treatment is not simply a cosmetic choice. Tooth position, bite, gum health, restorations and your ability to follow the care instructions all matter.</p><TextLink to="/treatments/invisalign-braces">Invisalign & Braces treatment details</TextLink></div>
        </Container>
      </section>
      <section className="comparison-section section-space">
        <Container>
          <SectionHeading eyebrow="TWO APPROACHES, DIFFERENT ROUTINES" title="Aligners or braces? Start with the right questions." text="A consultation can help you compare the approaches that are clinically appropriate for your teeth and bite." className="reveal" />
          <div className="comparison-table-wrap reveal">
            <table className="comparison-table">
              <thead><tr><th scope="col">Consideration</th><th scope="col">Clear aligners</th><th scope="col">Traditional braces</th></tr></thead>
              <tbody>
                <tr><th scope="row">How they work</th><td>Removable trays worn in a planned sequence.</td><td>Fixed brackets and wires adjusted during reviews.</td></tr>
                <tr><th scope="row">Everyday care</th><td>Remove for meals and cleaning; consistent wear matters.</td><td>Remain in place; brushing and food choices need extra attention.</td></tr>
                <tr><th scope="row">Suitability</th><td>Depends on the movement needed and your ability to follow the plan.</td><td>May suit some tooth movements that need fixed control.</td></tr>
                <tr><th scope="row">Reviews</th><td>Follow the clinician's schedule and wear guidance.</td><td>Attend planned adjustments and oral-health reviews.</td></tr>
              </tbody>
            </table>
          </div>
        </Container>
      </section>
      <section className="invisalign-first-feature section-space">
        <Container className="invisalign-first-grid">
          <div className="invisalign-first-image reveal reveal-image"><Photo src={photos.child} alt="Parent and child visiting a dental professional together." /></div>
          <div className="invisalign-first-copy reveal"><p className="eyebrow">FOR SOME GROWING SMILES</p><h2>Invisalign First for children.</h2><p>Some children in the mixed-dentition stage may be suitable for early orthodontic care. A careful review of growth, incoming teeth, bite and readiness helps determine whether Invisalign First, another approach or continued monitoring is appropriate.</p><TextLink to="/treatments/invisalign-first">Learn about Invisalign First</TextLink></div>
        </Container>
      </section>
      <section className="journey-section section-space">
        <Container>
          <SectionHeading eyebrow="THE TREATMENT JOURNEY" title="A conversation before a commitment." text="The steps below are a general guide. Your individual plan may differ." className="reveal" />
          <ol className="process-list">
            {[
              "Discuss your smile goals, oral-health history and questions.",
              "Complete a clinical assessment and any records needed for planning.",
              "Review suitability, alternatives, care routines and likely stages.",
              "If you proceed, attend follow-ups and follow the wear and retention guidance.",
            ].map((step, index) => <li className="process-step reveal" key={step}><span className="process-number">0{index + 1}</span><p>{step}</p></li>)}
          </ol>
        </Container>
      </section>
      <section className="invisalign-faq section-space"><Container className="invisalign-faq-grid"><div className="reveal"><p className="eyebrow">YOUR QUESTIONS</p><h2>Before you begin.</h2><p>Good orthodontic care starts with a clear understanding of your options and the daily commitment involved.</p></div><div className="reveal"><FaqAccordion categories={alignerFaqs} prefix="invisalign" /></div></Container></section>
      <FinalCta />
    </>
  );
}

function KidsPage() {
  const kidFaqs: FaqCategory[] = [{ title: "Kids dentistry questions", items: [
    { question: "How can I help my child feel at ease?", answer: "Talk positively about the visit, keep explanations simple and share any worries with the clinic. A parent or guardian can stay involved in the discussion." },
    { question: "What happens at a preventive dental visit?", answer: "The dentist may review oral-health routines, examine teeth and gums and discuss prevention or any concerns. The visit is adapted to your child's needs." },
    { question: "Is early orthodontic treatment always needed?", answer: "No. A dentist may recommend routine monitoring, an orthodontic assessment or early treatment depending on how a child's teeth and bite are developing." },
  ] }];
  return (
    <>
      <Breadcrumbs items={[{ label: "Kids Dentistry" }]} />
      <section className="kids-page-hero">
        <Container className="kids-page-hero-grid">
          <div className="kids-page-copy reveal"><p className="eyebrow">KIDS DENTISTRY · SHAIKPET</p><h1>Growing up with healthy smiles starts here.</h1><p>Gentle, age-aware dental care can help children feel more familiar with looking after their teeth. We welcome parents' questions and support families as smiles grow.</p><ButtonLink to="/contact#appointment">Plan a Visit</ButtonLink></div>
          <div className="kids-page-image reveal reveal-image"><Photo src={photos.childCheckup} alt="A child speaking with a dental professional during a friendly check-up." /><span className="image-index">Care for little smiles <span>01</span></span></div>
        </Container>
      </section>
      <section className="kids-overview section-space"><Container className="kids-overview-grid"><div className="reveal"><p className="eyebrow">A POSITIVE FIRST STEP</p><h2>Dental care that meets a child where they are.</h2></div><div className="reveal"><p>Children's dentistry looks after teeth, gums and oral development through the changing years. A visit can be a chance to check oral health, answer parents' questions and create practical routines at home.</p><p>Every child is different. We explain the visit in a simple, reassuring way and discuss care with the parent or guardian.</p></div></Container></section>
      <section className="kids-practice-section">
        <Container className="kids-practice-grid">
          <div className="kids-practice-copy reveal"><p className="eyebrow">PREVENTION, MADE PRACTICAL</p><h2>Little habits make a lasting difference.</h2><p>Daily brushing, a balanced approach to snacks and drinks, and regular dental reviews can all support a child's oral health. Your dental team can tailor guidance to your child's age and routine.</p><ul className="check-list"><li><Icon name="check" size={17} />Brush twice a day with age-appropriate guidance.</li><li><Icon name="check" size={17} />Help children clean thoroughly until they can manage independently.</li><li><Icon name="check" size={17} />Ask about tooth-friendly snacks, drinks and fluoride advice.</li><li><Icon name="check" size={17} />Arrange a visit if a tooth hurts, changes colour or is injured.</li></ul></div>
          <div className="kids-practice-image reveal reveal-image"><Photo src={photos.child} alt="A parent and child speaking with a dentist about family dental care." /></div>
        </Container>
      </section>
      <section className="kids-guidance-section section-space"><Container className="kids-guidance-grid"><div className="kids-guidance-title reveal"><p className="eyebrow">FOR PARENTS & GUARDIANS</p><h2>A few ways to make a visit feel familiar.</h2></div><div className="parent-guidance-list">
        {[
          ["Before the visit", "Tell your child the dentist will look at their teeth and help keep them healthy. Keep the explanation calm and simple."],
          ["At the appointment", "Share health conditions, medicines, previous experiences and anything that may help the team understand your child."],
          ["After the visit", "Follow the dentist's advice, keep daily routines steady and contact the clinic if you have questions about the plan."],
        ].map(([title, text], index) => <article className="parent-guidance-row reveal" key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}
      </div></Container></section>
      <section className="kids-aligner-feature"><Container className="kids-aligner-inner"><div className="kids-aligner-mark"><Icon name="tooth" size={28} /></div><div><p className="eyebrow">EARLY ORTHODONTIC OPTIONS</p><h2>Could Invisalign First be right for your child?</h2><p>Some growing children may benefit from early orthodontic treatment. An assessment helps determine whether Invisalign First, another approach or monitoring is appropriate.</p><TextLink to="/treatments/invisalign-first">Explore Invisalign First</TextLink></div><Photo src={photos.dentalModel} alt="A dental professional discusses a dental model with a patient." /></Container></section>
      <section className="kids-faq section-space"><Container className="kids-faq-grid"><div><p className="eyebrow">QUESTIONS FROM PARENTS</p><h2>Good to know.</h2><TextLink to="/patient-information">First-visit information</TextLink></div><div><FaqAccordion categories={kidFaqs} prefix="kids" /></div></Container></section>
      <FinalCta />
    </>
  );
}

const galleryFilters = ["All", "Clinic", "Treatments", "Smile Gallery", "Children & Family"] as const;
type GalleryFilter = typeof galleryFilters[number];

function GalleryPage() {
  const [filter, setFilter] = useState<GalleryFilter>("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const visibleImages = galleryImages.filter((image) => filter === "All" || image.category === filter);
  const activeImage = activeIndex === null ? null : visibleImages[activeIndex];

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
    window.setTimeout(() => returnFocusRef.current?.focus(), 20);
  }, []);

  const changeImage = useCallback((direction: number) => {
    setActiveIndex((current) => {
      if (current === null || visibleImages.length === 0) return current;
      return (current + direction + visibleImages.length) % visibleImages.length;
    });
  }, [visibleImages.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => lightboxRef.current?.querySelector<HTMLElement>(".lightbox-close")?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowRight") changeImage(1);
      if (event.key === "ArrowLeft") changeImage(-1);
      if (event.key === "Tab" && lightboxRef.current) {
        const focusable = Array.from(lightboxRef.current.querySelectorAll<HTMLElement>("button:not([disabled])"));
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, changeImage, closeLightbox]);

  const openImage = (event: MouseEvent<HTMLButtonElement>, index: number) => {
    returnFocusRef.current = event.currentTarget;
    setActiveIndex(index);
  };

  return (
    <>
      <Breadcrumbs items={[{ label: "Gallery" }]} />
      <section className="gallery-intro">
        <Container className="gallery-intro-grid">
          <div className="reveal"><p className="eyebrow">A VISUAL INTRODUCTION</p><h1>Small details. Thoughtful care. Real smiles.</h1></div>
          <p className="reveal">Explore a visual guide to dental care, family dentistry and the spaces where care happens. Some images are illustrative stock photography and do not depict Simply Smilez staff, patients or treatment outcomes.</p>
        </Container>
      </section>
      <section className="gallery-section section-space">
        <Container>
          <div className="gallery-filter-row" role="group" aria-label="Filter gallery images">
            {galleryFilters.map((item) => <button type="button" key={item} className={`gallery-filter ${filter === item ? "is-active" : ""}`} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}<span>{item === "All" ? galleryImages.length : galleryImages.filter((image) => image.category === item).length}</span></button>)}
          </div>
          <div className="gallery-grid" aria-live="polite">
            {visibleImages.map((image, index) => (
              <article className={`gallery-card ${filter === "All" && index === 0 ? "gallery-feature" : ""}`} key={`${image.title}-${image.src}`}>
                <button className="gallery-image-button" type="button" aria-label={`Open image: ${image.title}`} onClick={(event) => openImage(event, index)}>
                  <Photo src={image.src} fallback={image.fallback} alt={image.alt} />
                  <span className="gallery-open-icon"><Icon name="plus" size={19} /></span>
                </button>
                <div className="gallery-card-caption"><span>{image.category}</span><h2>{image.title}</h2></div>
              </article>
            ))}
          </div>
          <p className="gallery-note">Photography in this gallery is for editorial illustration only. No before-and-after images or guaranteed treatment results are shown.</p>
        </Container>
      </section>
      {activeImage && (
        <div className="lightbox-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) closeLightbox(); }}>
          <div
            className="lightbox-dialog"
            role="dialog"
            aria-modal="true"
            aria-label={`Gallery image: ${activeImage.title}`}
            tabIndex={-1}
            ref={lightboxRef}
            onTouchStart={(event) => { touchStartX.current = event.touches[0]?.clientX ?? null; }}
            onTouchEnd={(event) => {
              if (touchStartX.current === null) return;
              const delta = event.changedTouches[0].clientX - touchStartX.current;
              if (Math.abs(delta) > 50) changeImage(delta < 0 ? 1 : -1);
              touchStartX.current = null;
            }}
          >
            <div className="lightbox-top"><span>{String((activeIndex ?? 0) + 1).padStart(2, "0")} <span aria-hidden="true">/</span> {String(visibleImages.length).padStart(2, "0")}</span><button type="button" className="lightbox-close" aria-label="Close gallery image" onClick={closeLightbox}><Icon name="close" size={23} /></button></div>
            <div className="lightbox-content">
              <button className="lightbox-arrow lightbox-prev" type="button" aria-label="Previous image" onClick={() => changeImage(-1)}><Icon name="left" size={23} /></button>
              <Photo key={activeImage.src} src={activeImage.src} fallback={activeImage.fallback} alt={activeImage.alt} className="lightbox-photo" loading="eager" />
              <button className="lightbox-arrow lightbox-next" type="button" aria-label="Next image" onClick={() => changeImage(1)}><Icon name="right" size={23} /></button>
            </div>
            <div className="lightbox-caption"><span>{activeImage.category}</span><p>{activeImage.title}</p><small>{activeImage.alt}</small></div>
          </div>
        </div>
      )}
      <FinalCta />
    </>
  );
}

function PatientInformationPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Patient Information" }]} />
      <section className="patient-intro"><Container className="patient-intro-grid"><div className="reveal"><p className="eyebrow">A LITTLE PREPARATION GOES A LONG WAY</p><h1>Everything you need for a more comfortable first visit.</h1></div><p className="reveal">Whether you are visiting for a check-up or discussing a specific concern, this guide can help you prepare questions and understand what to expect.</p></Container></section>
      <section className="patient-visit-section section-space"><Container className="patient-visit-grid"><div className="patient-visit-heading reveal"><p className="eyebrow">YOUR FIRST VISIT</p><h2>Come as you are. Bring your questions.</h2><p>We want you to feel informed before a care decision is made. If you need help planning a visit, call the clinic.</p><a href={`tel:${clinic.phonePrimaryHref}`} className="text-link">Call {clinic.phonePrimary}<Icon name="arrow" size={17} /></a></div><div className="patient-guide-list">
        {[
          ["Before your appointment", "Make a note of symptoms, health conditions, allergies and current medicines. Bring details of recent dental treatment or imaging if you have them."],
          ["At the appointment", "Tell the team what you are hoping to address and ask about any part of the visit or proposed care that is unclear."],
          ["Your treatment plan", "A recommendation should follow assessment. Ask about alternatives, stages, aftercare, fees and what to do if your symptoms change."],
          ["Insurance enquiries", "Coverage varies by policy. Please check directly with your insurer and call the clinic before your appointment to ask what documents may be useful."],
        ].map(([title, text], index) => <article className="patient-guide-row reveal" key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}
      </div></Container></section>
      <section className="patient-children-band"><Container className="patient-children-grid"><Photo src={photos.child} alt="Parent and child discussing dental care with a dentist." /><div><p className="eyebrow">BRINGING A CHILD?</p><h2>Make room for little questions, too.</h2><p>Share your child's health history, medicines, previous dental experiences and anything that may help the visit feel familiar. A parent or guardian should be part of care conversations and decisions.</p><TextLink to="/kids-dentistry">Read our Kids Dentistry guide</TextLink></div></Container></section>
      <section className="patient-links-section section-space"><Container><SectionHeading eyebrow="KEEP EXPLORING" title="Helpful information before you visit." className="reveal" /><div className="patient-link-grid">
        {[
          { title: "Dental treatments", text: "Read about the services offered and questions to ask.", to: "/treatments" },
          { title: "Frequently asked questions", text: "Find general information about care and appointments.", to: "/faqs" },
          { title: "Contact & appointments", text: "Call or send a frontend appointment enquiry.", to: "/contact" },
        ].map((item, index) => <SiteLink className="patient-link-item reveal" to={item.to} key={item.to}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p><Icon name="arrow" size={18} /></SiteLink>)}
      </div></Container></section>
      <FinalCta />
    </>
  );
}

function FaqPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "FAQs" }]} />
      <section className="faq-page-intro"><Container className="faq-page-intro-inner"><div className="reveal"><p className="eyebrow">CLEAR ANSWERS, A GOOD PLACE TO START</p><h1>Frequently asked questions.</h1></div><p className="reveal">These general answers can help you prepare for a conversation. They are not a diagnosis or a substitute for personalised dental advice.</p></Container></section>
      <section className="faq-page-content section-space"><Container className="faq-page-layout"><aside className="faq-sidebar"><p className="eyebrow">ON THIS PAGE</p><nav aria-label="FAQ categories">{faqCategories.map((category, index) => <a href={`#faq-category-${index}`} key={category.title}>{category.title}<Icon name="arrow" size={14} /></a>)}</nav><div className="faq-callout"><Icon name="phone" size={18} /><p>Need to ask us directly?</p><a href={`tel:${clinic.phonePrimaryHref}`}>{clinic.phonePrimary}</a></div></aside><div className="faq-main-list">
        {faqCategories.map((category, index) => <section className="faq-main-category reveal" id={`faq-category-${index}`} key={category.title}><h2>{category.title}</h2><FaqAccordion categories={[category]} prefix={`general-${index}`} /></section>)}
      </div></Container></section>
      <FinalCta />
    </>
  );
}

interface AppointmentFields {
  name: string;
  phone: string;
  email: string;
  treatment: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}

const emptyAppointment: AppointmentFields = { name: "", phone: "", email: "", treatment: "", preferredDate: "", preferredTime: "", message: "" };

function AppointmentForm() {
  const [values, setValues] = useState<AppointmentFields>(emptyAppointment);
  const [errors, setErrors] = useState<Partial<Record<keyof AppointmentFields, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const setField = (field: keyof AppointmentFields, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitted(false);
  };

  const validate = () => {
    const next: Partial<Record<keyof AppointmentFields, string>> = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    const phoneDigits = values.phone.replace(/\D/g, "");
    if (!phoneDigits) next.phone = "Please enter a telephone number.";
    else if (phoneDigits.length < 8 || phoneDigits.length > 15) next.phone = "Enter a valid telephone number.";
    if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = "Enter a valid email address, or leave this field blank.";
    if (!values.treatment) next.treatment = "Please select a treatment or enquiry type.";
    if (values.preferredDate) {
      const selectedDate = new Date(`${values.preferredDate}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) next.preferredDate = "Choose today or a future date.";
    }
    return next;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttempted(true);
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const firstInvalid = Object.keys(nextErrors)[0] as keyof AppointmentFields;
      const invalidId = firstInvalid === "preferredDate" ? "appointment-date" : `appointment-${firstInvalid}`;
      document.getElementById(invalidId)?.focus();
      return;
    }
    setSubmitted(true);
    setValues(emptyAppointment);
    setAttempted(false);
  };

  if (submitted) {
    return (
      <div className="form-confirmation" role="status" aria-live="polite">
        <span className="confirmation-icon"><Icon name="check" size={24} /></span>
        <p className="eyebrow">FRONTEND DEMONSTRATION</p>
        <h2>Your enquiry preview is ready.</h2>
        <p>No appointment or message has been sent. This demonstration does not transmit or store your details. To speak with the clinic, call <a href={`tel:${clinic.phonePrimaryHref}`}>{clinic.phonePrimary}</a> or <a href={`tel:${clinic.phoneSecondaryHref}`}>{clinic.phoneSecondary}</a>.</p>
        <button type="button" className="text-link form-reset" onClick={() => { setSubmitted(false); setErrors({}); }}>Start another enquiry <Icon name="arrow" size={17} /></button>
      </div>
    );
  }

  const inputClass = (field: keyof AppointmentFields) => errors[field] ? "form-control has-error" : "form-control";
  return (
    <form className="appointment-form" onSubmit={handleSubmit} noValidate aria-describedby="form-demo-note">
      <p className="form-required-note"><span>*</span> Required fields</p>
      {attempted && Object.keys(errors).length > 0 && <p className="form-error-summary" role="alert">Please review the highlighted fields below.</p>}
      <div className="form-grid">
        <div className="field-group">
          <label htmlFor="appointment-name">Your name <span>*</span></label>
          <input id="appointment-name" className={inputClass("name")} value={values.name} onChange={(event) => setField("name", event.target.value)} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "error-name" : undefined} />
          {errors.name && <span className="field-error" id="error-name">{errors.name}</span>}
        </div>
        <div className="field-group">
          <label htmlFor="appointment-phone">Telephone <span>*</span></label>
          <input id="appointment-phone" className={inputClass("phone")} type="tel" inputMode="tel" value={values.phone} onChange={(event) => setField("phone", event.target.value)} autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "error-phone" : undefined} />
          {errors.phone && <span className="field-error" id="error-phone">{errors.phone}</span>}
        </div>
        <div className="field-group">
          <label htmlFor="appointment-email">Email address <span className="optional-label">Optional</span></label>
          <input id="appointment-email" className={inputClass("email")} type="email" value={values.email} onChange={(event) => setField("email", event.target.value)} autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "error-email" : undefined} />
          {errors.email && <span className="field-error" id="error-email">{errors.email}</span>}
        </div>
        <div className="field-group">
          <label htmlFor="appointment-treatment">What can we help with? <span>*</span></label>
          <select id="appointment-treatment" className={inputClass("treatment")} value={values.treatment} onChange={(event) => setField("treatment", event.target.value)} aria-invalid={Boolean(errors.treatment)} aria-describedby={errors.treatment ? "error-treatment" : undefined}>
            <option value="">Select a treatment or enquiry</option>
            {treatments.map((treatment) => <option key={treatment.slug} value={treatment.title}>{treatment.title}</option>)}
            <option value="General appointment enquiry">General appointment enquiry</option>
          </select>
          {errors.treatment && <span className="field-error" id="error-treatment">{errors.treatment}</span>}
        </div>
        <div className="field-group">
          <label htmlFor="appointment-date">Preferred date <span className="optional-label">Optional</span></label>
          <input id="appointment-date" className={inputClass("preferredDate")} type="date" min={new Date().toISOString().slice(0, 10)} value={values.preferredDate} onChange={(event) => setField("preferredDate", event.target.value)} aria-invalid={Boolean(errors.preferredDate)} aria-describedby={errors.preferredDate ? "error-date" : undefined} />
          {errors.preferredDate && <span className="field-error" id="error-date">{errors.preferredDate}</span>}
        </div>
        <div className="field-group">
          <label htmlFor="appointment-time">Preferred time <span className="optional-label">Optional</span></label>
          <select id="appointment-time" className="form-control" value={values.preferredTime} onChange={(event) => setField("preferredTime", event.target.value)}>
            <option value="">No preference</option><option>Morning</option><option>Afternoon</option><option>Evening</option>
          </select>
        </div>
        <div className="field-group field-full">
          <label htmlFor="appointment-message">Anything you would like us to know? <span className="optional-label">Optional</span></label>
          <textarea id="appointment-message" className="form-control" rows={4} value={values.message} onChange={(event) => setField("message", event.target.value)} maxLength={600} placeholder="Please avoid including sensitive medical details in this demonstration form." />
          <span className="field-hint">{values.message.length}/600 characters. This form does not submit or store information.</span>
        </div>
      </div>
      <div className="form-submit-row"><button type="submit" className="button button-primary">Preview Enquiry <Icon name="arrow" size={17} /></button><p id="form-demo-note">Frontend demonstration only. No real appointment is booked and no message is sent.</p></div>
    </form>
  );
}

function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Contact" }]} />
      <section className="contact-intro"><Container className="contact-intro-grid"><div className="reveal"><p className="eyebrow">SAY HELLO · SHAIKPET, HYDERABAD</p><h1>Let's find a good time to talk.</h1></div><p className="reveal">Call Simply Smilez Dental or use the frontend enquiry demonstration below to prepare an appointment request.</p></Container></section>
      <section className="contact-main section-space" id="appointment"><Container className="contact-layout"><div className="contact-details reveal"><p className="eyebrow">GET IN TOUCH</p><h2>We'd be glad to hear from you.</h2><div className="contact-detail-block"><span className="contact-icon"><Icon name="phone" size={19} /></span><div><h3>Call our clinic</h3><a href={`tel:${clinic.phonePrimaryHref}`}>{clinic.phonePrimary}</a><a href={`tel:${clinic.phoneSecondaryHref}`}>{clinic.phoneSecondary}</a></div></div><div className="contact-detail-block"><span className="contact-icon"><Icon name="pin" size={19} /></span><div><h3>Visit us</h3><p>{clinic.address}</p><a className="text-link" href={clinic.directions} target="_blank" rel="noreferrer">Get Directions <Icon name="arrow" size={15} /></a></div></div><div className="contact-detail-block"><span className="contact-icon"><Icon name="clock" size={19} /></span><div><h3>Opening hours</h3><p>{clinic.hoursWeekdays}<br />{clinic.hoursSunday}</p></div></div><p className="contact-note">For urgent dental concerns, please call the clinic directly. If you are experiencing a medical emergency, seek urgent medical care.</p></div><div className="contact-form-panel reveal"><div className="contact-form-heading"><p className="eyebrow">APPOINTMENT ENQUIRY</p><h2>Tell us what you need.</h2><p>Share the basics and note a preferred time. The live website will need an approved submission method before this becomes a real enquiry.</p></div><AppointmentForm /></div></Container></section>
      <LocationSection compact />
    </>
  );
}

function PrivacyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
      <section className="privacy-intro"><Container><div className="reveal"><p className="eyebrow">PRIVACY & TRANSPARENCY</p><h1>Privacy Policy</h1><p className="privacy-updated">Draft for review · Last updated 2026</p></div></Container></section>
      <section className="privacy-content section-space"><Container className="privacy-layout"><aside className="privacy-note"><Icon name="shield" size={23} /><p>This page is a draft for the website demonstration. Business-specific details and final legal wording must be reviewed before launch.</p></aside><article className="privacy-article">
        <section><h2>About this website</h2><p>This website is a frontend demonstration for Simply Smilez Dental. It provides general clinic and treatment information. It is not a clinical diagnosis or substitute for professional advice.</p></section>
        <section><h2>Appointment enquiry demonstration</h2><p>The appointment form on this demonstration validates fields in your browser and displays a local confirmation state. It does not transmit a message, create an appointment, or save form details to a database or persistent browser storage. Do not enter sensitive medical information into the demonstration form.</p></section>
        <section><h2>Telephone and directions</h2><p>Telephone links open your device's calling application, and the directions link opens Google Maps. If you choose to use these third-party services, their providers may process information under their own terms and privacy policies.</p></section>
        <section><h2>Photography and third-party content</h2><p>This demonstration loads the clinic logo from its published website, web fonts from Google Fonts, illustrative photographs from Pexels and a Google Maps view. These providers may receive technical request information such as an IP address when their content is requested. Confirm the selected providers, terms, consent requirements and disclosures for the production website.</p></section>
        <section><h2>Information to verify before launch</h2><p>The clinic's business operator should confirm the legal entity and contact details responsible for this site, the final purpose and lawful basis for any data collection, the approved enquiry submission method, retention periods, access controls, security measures, any analytics or cookies, third-party services, data-subject contact route and applicable jurisdictional requirements.</p><p>No analytics, advertising trackers, account system or persistent patient-information storage has been implemented in this demonstration.</p></section>
        <section><h2>Medical information</h2><p>Please do not share urgent or sensitive medical details through this demonstration. Call the clinic to discuss your care. For an emergency, contact local emergency medical services.</p></section>
        <section><h2>Contact</h2><p>For questions about the clinic's privacy practices, contact Simply Smilez Dental directly at the Shaikpet clinic using the telephone numbers listed on the <SiteLink to="/contact">Contact page</SiteLink>. Confirm an approved privacy contact before this policy is published.</p></section>
      </article></Container></section>
      <FinalCta />
    </>
  );
}

function NotFoundPage() {
  return (
    <section className="not-found-page"><Container className="not-found-inner"><ToothMark className="not-found-mark" /><p className="eyebrow">404 · PAGE NOT FOUND</p><h1>Looks like this smile took a different turn.</h1><p>The page you are looking for may have moved. Let's get you back to the right place.</p><div className="button-row"><ButtonLink to="/">Back to Home</ButtonLink><ButtonLink to="/treatments" variant="secondary">Explore Treatments</ButtonLink></div></Container></section>
  );
}

interface MetaInfo { title: string; description: string; }

function pageMeta(path: string): MetaInfo {
  if (path === "/") return { title: "Dental Clinic in Shaikpet, Hyderabad | Simply Smilez Dental", description: "Thoughtful dental care for children and adults at Simply Smilez Dental in Shaikpet, Hyderabad. Explore treatments and contact the clinic." };
  if (path === "/about") return { title: "About Simply Smilez Dental | Shaikpet, Hyderabad", description: "Learn about Simply Smilez Dental's patient-focused approach, family dental care and commitment to comfort and modern dental technology." };
  if (path === "/treatments") return { title: "Dental Treatments in Shaikpet, Hyderabad | Simply Smilez", description: "Explore Invisalign, braces, dental implants, root canals, crowns, fillings, cosmetic and children's dentistry in Shaikpet, Hyderabad." };
  if (path.startsWith("/treatments/")) {
    const treatment = treatments.find((item) => `/treatments/${item.slug}` === path);
    if (treatment) return { title: `${treatment.title} in Shaikpet, Hyderabad | Simply Smilez Dental`, description: `${treatment.short} Discuss treatment suitability with Simply Smilez Dental in Shaikpet, Hyderabad.` };
  }
  const pages: Record<string, MetaInfo> = {
    "/invisalign": { title: "Invisalign in Shaikpet, Hyderabad | Simply Smilez Dental", description: "Explore clear aligners, traditional braces, general suitability and Invisalign First for children at Simply Smilez Dental in Shaikpet." },
    "/kids-dentistry": { title: "Kids Dentist in Shaikpet, Hyderabad | Simply Smilez Dental", description: "Explore preventive and pediatric dental care for children and guidance for parents at Simply Smilez Dental in Shaikpet, Hyderabad." },
    "/gallery": { title: "Dental Clinic Gallery | Simply Smilez Dental, Shaikpet", description: "Explore an editorial gallery of clinic spaces, dental care and family dentistry. Illustrative stock photography is clearly identified." },
    "/doctors": { title: "Our Doctors | Simply Smilez Dental, Hyderabad", description: "Meet Dr. Susheel Kumar, Pediatric Dentist and Implantologist, and Dr. Ankush Kumar, Orthodontist and Invisalign Provider at Simply Smilez Dental." },
    "/patient-information": { title: "Patient Information | Simply Smilez Dental, Shaikpet", description: "Prepare for a first visit, learn what to bring, understand treatment planning and find useful dental care information." },
    "/faqs": { title: "Dental FAQs | Simply Smilez Dental, Shaikpet Hyderabad", description: "Answers to common questions about appointments, general dentistry, Invisalign, children's dentistry, crowns and insurance." },
    "/contact": { title: "Contact a Dentist in Shaikpet | Simply Smilez Dental", description: "Contact Simply Smilez Dental in Shaikpet, Hyderabad. View phone numbers, opening hours, directions and appointment enquiry details." },
    "/privacy-policy": { title: "Privacy Policy | Simply Smilez Dental", description: "Privacy information for the Simply Smilez Dental website demonstration, including form behavior and details to verify before launch." },
    "/not-found": { title: "Page Not Found | Simply Smilez Dental", description: "The page could not be found. Return to Simply Smilez Dental or explore treatments in Shaikpet, Hyderabad." },
  };
  return pages[path] ?? pages["/not-found"];
}

export default function App() {
  const [path, setPath] = useState(() => cleanPath(window.location.pathname));
  const navigate = useCallback((to: string) => {
    window.history.pushState({}, "", to);
    const nextPath = cleanPath(to.split("#")[0] || "/");
    setPath(nextPath);
    const hash = to.split("#")[1];
    if (hash) {
      window.setTimeout(() => document.getElementById(decodeURIComponent(hash))?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const onPopState = () => {
      setPath(cleanPath(window.location.pathname));
      if (window.location.hash) {
        window.setTimeout(() => document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
      } else window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const meta = pageMeta(path);
    document.title = meta.title;
    let description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!description) {
      description = document.createElement("meta");
      description.name = "description";
      document.head.appendChild(description);
    }
    description.content = meta.description;
  }, [path]);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    document.documentElement.classList.add("motion-ready");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -7% 0px", threshold: 0.08 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [path]);

  let page: ReactNode;
  const currentTreatment = path.startsWith("/treatments/") ? treatments.find((item) => `/treatments/${item.slug}` === path) : undefined;
  if (path === "/") page = <HomePage />;
  else if (path === "/about") page = <AboutPage />;
  else if (path === "/doctors") page = <DoctorsPage />;
  else if (path === "/treatments") page = <TreatmentsPage />;
  else if (currentTreatment) page = <TreatmentPage treatment={currentTreatment} />;
  else if (path === "/invisalign") page = <InvisalignPage />;
  else if (path === "/kids-dentistry") page = <KidsPage />;
  else if (path === "/gallery") page = <GalleryPage />;
  else if (path === "/patient-information") page = <PatientInformationPage />;
  else if (path === "/faqs") page = <FaqPage />;
  else if (path === "/contact") page = <ContactPage />;
  else if (path === "/privacy-policy") page = <PrivacyPage />;
  else page = <NotFoundPage />;

  return (
    <NavigationContext.Provider value={navigate}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header path={path} />
      <main id="main-content" key={path} className="page-main">
        <SiteFrame>{page}</SiteFrame>
      </main>
    </NavigationContext.Provider>
  );
}
