import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PILOTED — Your car. Our driver." },
      {
        name: "description",
        content:
          "PILOTED is a driver-providing agency. You keep the wheel of your own car — we bring the hands. Vetted professional drivers, on demand.",
      },
      { property: "og:title", content: "PILOTED — Your car. Our driver." },
      {
        property: "og:description",
        content:
          "A driver-providing agency. Keep your car, borrow a professional to drive it.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Ticker />
      <Manifesto />
      <How />
      <Standards />
      <ForWho />
      <AppCTA />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-10">
        <a href="#" className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center bg-ink text-taxi font-display font-bold text-sm">
            P
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            PILOTED
          </span>
        </a>
        <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
          <a href="#story" className="link-underline hover:text-foreground transition-colors">Story</a>
          <a href="#how" className="link-underline hover:text-foreground transition-colors">How it works</a>
          <a href="#standards" className="link-underline hover:text-foreground transition-colors">Standards</a>
          <a href="#who" className="link-underline hover:text-foreground transition-colors">Who we serve</a>
        </nav>
        <a
          href="#app"
          className="group relative inline-flex items-center gap-2 overflow-hidden bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-widest text-taxi transition-transform hover:-translate-y-0.5"
        >
          Get the app
          <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 lg:grid-cols-2">
        {/* Left */}
        <div className="flex flex-col justify-between px-6 pt-16 pb-14 lg:px-10 lg:pt-24 lg:pb-20">
          <div>
            <Reveal variant="up" className="mb-8 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
              <span className="h-px w-8 bg-ink" />
              A driver-providing agency
            </Reveal>
            <Reveal as="h1" variant="up" delay={80} className="font-display text-[14vw] leading-[0.85] font-extrabold tracking-tighter sm:text-[10vw] lg:text-[8.5vw] xl:text-[7.5rem]">
              Your car.
              <br />
              <span className="italic font-normal text-muted-foreground">Our</span>{" "}
              <span className="relative inline-block">
                driver.
                <span className="absolute -bottom-2 left-0 h-3 w-full bg-taxi -z-0" />
              </span>
            </Reveal>
            <Reveal as="p" variant="up" delay={240} className="mt-10 max-w-md text-base leading-relaxed text-muted-foreground">
              You already own the car you love. We bring the professional who
              drives it — for the school run, the long night home, the airport
              dash, the workday behind you.
            </Reveal>
          </div>

          <Reveal variant="up" delay={360} className="mt-12 flex flex-wrap items-center gap-6">
            <a
              href="#app"
              className="group relative inline-flex items-center gap-3 overflow-hidden bg-ink px-6 py-4 text-sm font-semibold uppercase tracking-widest text-taxi transition-transform hover:-translate-y-0.5"
            >
              Book on the app
              <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </a>
            <a
              href="#story"
              className="text-sm font-medium underline decoration-taxi decoration-4 underline-offset-8 transition-all hover:decoration-ink hover:underline-offset-[10px]"
            >
              Read the story
            </a>
          </Reveal>
        </div>

        {/* Right */}
        <Reveal variant="left" delay={120} className="relative min-h-[420px] bg-ink text-taxi lg:min-h-[720px]">
          <div className="absolute inset-0 opacity-20 checker-stripe" />
          <div className="relative flex h-full flex-col justify-between p-8 lg:p-12">
            <div className="flex items-start justify-between">
              <span className="font-display text-xs uppercase tracking-[0.3em] text-taxi/70">
                / 001 — Est. 2025
              </span>
              <span className="font-display text-xs uppercase tracking-[0.3em] text-taxi/70">
                Drivers, not rides
              </span>
            </div>

            <div className="my-16 lg:my-0">
              <Reveal as="div" variant="clip" delay={380} className="font-display text-[22vw] font-extrabold leading-none tracking-tighter sm:text-[16vw] lg:text-[14vw]">
                24/7
              </Reveal>
              <Reveal as="p" variant="up" delay={620} className="mt-4 max-w-xs text-sm text-taxi/70">
                Vetted, uniformed, licensed drivers — dispatched to your
                doorstep, ready to take your wheel.
              </Reveal>
            </div>

            <div className="grid grid-cols-3 gap-6 border-t border-taxi/20 pt-8 text-taxi">
              {[
                { n: "420+", label: "Drivers on call" },
                { n: "14", label: "Cities live" },
                { n: "4.9", label: "Avg. rating" },
              ].map((s, i) => (
                <Reveal key={s.label} variant="up" delay={720 + i * 120}>
                  <Stat n={s.n} label={s.label} />
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl font-bold lg:text-4xl">{n}</div>
      <div className="mt-1 text-[10px] uppercase tracking-widest text-taxi/60">
        {label}
      </div>
    </div>
  );
}

function Ticker() {
  const words = [
    "Your car",
    "Our driver",
    "School runs",
    "Airport dashes",
    "Late nights",
    "Business hours",
    "Weekend errands",
    "Long drives home",
  ];
  const line = [...words, ...words];
  return (
    <div className="overflow-hidden border-b border-border bg-taxi py-5">
      <div className="marquee flex whitespace-nowrap">
        {line.map((w, i) => (
          <span
            key={i}
            className="mx-8 font-display text-2xl font-bold uppercase tracking-tight text-ink"
          >
            {w} <span className="mx-6 text-ink/40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Manifesto() {
  return (
    <section id="story" className="border-b border-border">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 py-24 lg:grid-cols-12 lg:px-10 lg:py-32">
        <div className="lg:col-span-4">
          <div className="sticky top-32">
            <Reveal variant="up" className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
              — The Story
            </Reveal>
            <Reveal as="h2" variant="up" delay={120} className="mt-4 font-display text-4xl font-bold leading-[0.95] lg:text-5xl">
              We don't rent
              <br />
              cars.
              <br />
              <span className="text-taxi-deep">We lend hands.</span>
            </Reveal>
          </div>
        </div>
        <div className="space-y-8 text-lg leading-relaxed text-foreground/90 lg:col-span-7 lg:col-start-6 lg:text-xl">
          <Reveal as="p" variant="up">
            Every other service asks you to give something up — your car, your
            route, your control. PILOTED starts from the opposite idea. You
            already have a car you love. What you don't always have is the time,
            the energy, or the licence to drive it.
          </Reveal>
          <Reveal as="p" variant="up" delay={140}>
            So we built an agency of drivers. Not a fleet. Not a rideshare. Just
            people. Vetted, uniformed, insured, and dispatched to your door in
            minutes.
          </Reveal>
          <Reveal as="p" variant="up" delay={280} className="font-display text-2xl font-semibold tracking-tight text-ink lg:text-3xl">
            You keep the wheel. We bring the hands.
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function How() {
  const steps = [
    {
      n: "01",
      t: "Open the app",
      d: "Tell us where, when, and how long you need a driver. That's it.",
    },
    {
      n: "02",
      t: "We dispatch a driver",
      d: "A vetted PILOTED driver arrives at your door — uniformed, on time, ready.",
    },
    {
      n: "03",
      t: "You ride. We drive.",
      d: "Sit back. Answer emails. Sleep. Talk. It's still your car.",
    },
  ];
  return (
    <section id="how" className="border-b border-border bg-ink text-bone">
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal variant="up" className="text-xs font-medium uppercase tracking-[0.25em] text-taxi">
              — How it works
            </Reveal>
            <Reveal as="h2" variant="up" delay={120} className="mt-4 font-display text-5xl font-bold leading-[0.95] lg:text-6xl">
              Three taps.
              <br />
              One driver.
            </Reveal>
          </div>
          <Reveal as="p" variant="up" delay={240} className="max-w-sm text-bone/60">
            Bookings happen in the PILOTED app. This site is here to tell you
            who we are before you download it.
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px bg-bone/10 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal
              key={s.n}
              variant="up"
              delay={i * 160}
              className="group flex flex-col justify-between bg-ink p-8 transition-colors hover:bg-bone/[0.04] lg:p-10"
            >
              <div className="font-display text-6xl font-extrabold text-taxi transition-transform duration-500 group-hover:-translate-y-1 lg:text-7xl">
                {s.n}
              </div>
              <div className="mt-16">
                <h3 className="font-display text-2xl font-semibold text-bone">
                  {s.t}
                </h3>
                <p className="mt-3 text-bone/60">{s.d}</p>
                <div className="mt-6 h-px w-0 bg-taxi transition-all duration-700 group-hover:w-full" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Standards() {
  const items = [
    { t: "Vetted", d: "Background, licence and driving-record checks — every driver, every quarter." },
    { t: "Trained", d: "In-house academy: defensive driving, hospitality, discretion." },
    { t: "Uniformed", d: "You'll know the driver at your door is ours the moment you see them." },
    { t: "Insured", d: "Every trip is covered end-to-end. Your car stays your car." },
  ];
  return (
    <section id="standards" className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal variant="up" className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
              — The Standard
            </Reveal>
            <Reveal as="h2" variant="up" delay={120} className="mt-4 font-display text-5xl font-bold leading-[0.95] lg:text-6xl">
              A driver you'd
              <br />
              hand your keys to
              <span className="text-taxi-deep">.</span>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:col-span-7">
            {items.map((it, i) => (
              <Reveal
                key={it.t}
                variant="up"
                delay={i * 120}
                className="group bg-background p-8 transition-colors hover:bg-taxi/10"
              >
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-taxi transition-transform duration-500 group-hover:scale-150" />
                  <h3 className="font-display text-xl font-semibold">{it.t}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {it.d}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ForWho() {
  const cards = [
    {
      n: "01",
      tag: "Busy parents",
      title: "The school run,\nwithout the school run.",
      note: "Morning drop-offs. Ballet pick-ups. Your car in your driveway by dinner.",
      span: "md:col-span-4 md:row-span-2",
      tone: "ink",
    },
    {
      n: "02",
      tag: "Executives",
      title: "A moving\noffice.",
      note: "Take the call. Close the deck. Arrive sharp.",
      span: "md:col-span-4",
      tone: "bone",
    },
    {
      n: "03",
      tag: "After a drink",
      title: "Home safe.\nCar home too.",
      note: "No taxi line. No car left behind at the bar.",
      span: "md:col-span-4",
      tone: "taxi",
    },
    {
      n: "04",
      tag: "Family & elders",
      title: "A trusted driver\nfor the days you shouldn't.",
      note: "Appointments, groceries, grandkids — driven by someone you'd trust with keys.",
      span: "md:col-span-5",
      tone: "bone",
    },
    {
      n: "05",
      tag: "Weddings & events",
      title: "A chauffeured\nday — in your own car.",
      note: "One driver. One day. Your vehicle, treated like a limousine.",
      span: "md:col-span-3",
      tone: "ink",
    },
  ];

  const toneClass = (t: string) =>
    t === "ink"
      ? "bg-ink text-bone"
      : t === "taxi"
        ? "bg-taxi text-ink"
        : "bg-background text-ink border border-border";

  return (
    <section id="who" className="border-b border-border bg-secondary/40">
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
              — Who it's for
            </div>
            <h2 className="mt-4 font-display text-5xl font-bold leading-[0.9] lg:text-7xl">
              Built for the people
              <br />
              who'd rather{" "}
              <span className="italic font-normal text-muted-foreground">not</span>{" "}
              be driving
              <span className="text-taxi-deep">.</span>
            </h2>
          </div>
          <p className="text-muted-foreground lg:col-span-4 lg:text-right">
            Five kinds of moments where handing over the wheel — but keeping
            your car — just makes sense.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-8 md:auto-rows-[minmax(220px,auto)]">
          {cards.map((c) => (
            <article
              key={c.n}
              className={`group relative flex flex-col justify-between overflow-hidden p-8 transition-transform hover:-translate-y-1 lg:p-10 ${c.span} ${toneClass(c.tone)}`}
            >
              <div className="flex items-start justify-between">
                <span className="font-display text-xs uppercase tracking-[0.3em] opacity-60">
                  {c.tag}
                </span>
                <span className="font-display text-xs opacity-40">/ {c.n}</span>
              </div>
              <div className="mt-16">
                <h3 className="whitespace-pre-line font-display text-3xl font-semibold leading-[1.05] tracking-tight lg:text-4xl">
                  {c.title}
                </h3>
                <p className="mt-4 max-w-sm text-sm opacity-70">{c.note}</p>
              </div>
              <span
                aria-hidden
                className="absolute -bottom-6 -right-4 font-display text-[8rem] font-extrabold leading-none opacity-[0.06] transition-opacity group-hover:opacity-20"
              >
                {c.n}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


function AppCTA() {
  return (
    <section id="app" className="border-b border-border bg-taxi text-ink">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-6 py-24 lg:grid-cols-2 lg:px-10 lg:py-32">
        <div>
          <div className="text-xs font-medium uppercase tracking-[0.25em] text-ink/70">
            — Book only in the app
          </div>
          <h2 className="mt-4 font-display text-5xl font-bold leading-[0.9] lg:text-7xl">
            Download.
            <br />
            Tap. Drive.
          </h2>
          <p className="mt-6 max-w-md text-ink/80">
            The website tells the story. The app does the work. Bookings,
            dispatch and driver tracking live entirely in the PILOTED app.
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
          <StoreButton store="App Store" sub="Download on the" />
          <StoreButton store="Google Play" sub="Get it on" />
        </div>
      </div>
    </section>
  );
}

function StoreButton({ store, sub }: { store: string; sub: string }) {
  return (
    <a
      href="#"
      className="group flex min-w-[220px] items-center gap-4 bg-ink px-6 py-5 text-taxi transition-transform hover:-translate-y-1"
    >
      <span className="grid h-10 w-10 place-items-center border border-taxi/40 font-display text-lg font-bold">
        ▶
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-[10px] uppercase tracking-widest text-taxi/60">
          {sub}
        </span>
        <span className="font-display text-lg font-semibold">{store}</span>
      </span>
    </a>
  );
}

function Footer() {
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center bg-ink text-taxi font-display font-bold text-sm">
                P
              </span>
              <span className="font-display text-lg font-bold tracking-tight">
                PILOTED
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              A driver-providing agency. Your car. Our driver. Bookings happen
              in the app.
            </p>
          </div>
          <FooterCol
            title="Company"
            items={["Story", "Standards", "Careers", "Press"]}
          />
          <FooterCol
            title="Contact"
            items={["hello@piloted.co", "+000 000 0000", "Instagram", "LinkedIn"]}
          />
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} PILOTED. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <span>Terms</span>
            <span>Privacy</span>
            <span className="checker-stripe h-3 w-16" aria-hidden />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
        {title}
      </div>
      <ul className="mt-4 space-y-2 text-sm">
        {items.map((i) => (
          <li key={i}>
            <a href="#" className="hover:text-taxi-deep transition-colors">
              {i}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
