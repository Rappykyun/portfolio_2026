# Interactive Portfolio Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Ralph Vincent Rodriguez's portfolio as an interactive creative lab that converts freelance prospects into qualified project inquiries.

**Architecture:** Keep the current Next.js App Router routes as Server Components and isolate browser-only React Bits effects behind small Client Component boundaries. Move project records into one typed module shared by home, project index, and project detail pages; submit inquiries through a validated Server Action to Formspree.

**Tech Stack:** Next.js 16.2.9, React 19.2.4, TypeScript 5, Tailwind CSS 4, React Bits, GSAP 3.13, OGL 1.0, Formspree, Lucide React

**Spec:** `docs/superpowers/specs/2026-09-11-portfolio-revamp-design.md`

## Global Constraints

- Keep routes `/`, `/projects`, `/projects/[projectId]`, `/contact`, and the custom 404.
- Keep pages as Server Components unless they require state, event handlers, or browser APIs.
- Use only these React Bits roles: DarkVeil hero, Noise texture, SplitText hero heading, Magnet primary calls to action, MagicBento services, LogoLoop technology proof, and FadeContent section entry.
- Render at most one WebGL surface and one dominant effect per viewport.
- Keep a readable static hero before hydration and a complete static experience under `prefers-reduced-motion`.
- Do not copy victoreke.com fonts, SVG paths, exact color tokens, logo, copy, images, or layout measurements.
- Preserve all verified project facts, live links, source links, CV, certificate, theme behavior, metadata, JSON-LD, sitemap, robots, and manifest.
- Do not invent testimonials, metrics, client names, prices, guarantees, or project outcomes.
- Meet WCAG 2.2 AA basics: semantic landmarks, ordered headings, keyboard access, visible focus, sufficient contrast, labelled form errors, live submission status, and 44px touch targets.
- Use a real `FORMSPREE_FORM_ID` before accepting the inquiry success path.
- Follow the bundled Next.js 16 guidance in `node_modules/next/dist/docs/01-app/` for Client Component boundaries, lazy loading, images, forms, and environment variables.

## File Structure

### Create

- `lib/projects.ts` — serializable project types, records, lookup, featured selection, and static route parameters.
- `lib/inquiry.ts` — inquiry field options, serializable action state, and pure validation.
- `app/_components/useReducedMotion.ts` — shared media-query hook for canvas and GSAP wrappers.
- `app/_components/HeroVisual.tsx` — client-only lazy DarkVeil boundary with static fallback.
- `app/_components/Services.tsx` — client-owned service data rendered through the adapted MagicBento component.
- `app/_components/FeaturedProjects.tsx` — outcome-led cards linked to three selected case studies.
- `app/_components/Process.tsx` — factual Discover, Build, Deliver sequence.
- `app/_components/InquiryBanner.tsx` — reusable client-conversion section.
- `app/_components/SiteEffects.tsx` — non-semantic Noise layer with reduced-motion handling.
- `app/contact/actions.ts` — server-only Formspree submission action.
- React Bits files generated under `app/_components/DarkVeil/`, `Noise/`, `SplitText/`, `Magnet/`, `MagicBento/`, `LogoLoop/`, and `FadeContent/`.

### Modify

- `package.json`, `package-lock.json` — add React Bits runtime dependencies; remove `framer-motion` after its last caller is removed.
- `app/globals.css` — replace the tiled/glass visual system with the approved editorial theme and motion fallbacks.
- `app/layout.tsx` — install the new fonts, remove ClickSpark, add SiteEffects, and update client-focused metadata.
- `app/page.tsx` — compose the new home journey.
- `app/_components/Hero.tsx` — replace student/job-seeker copy with the client offer and approved React Bits roles.
- `app/_components/Header.tsx` — simplify navigation styling while preserving route state, mobile navigation, and theme persistence.
- `app/_components/Footer.tsx` — align copy and links with the freelance offer.
- `app/_components/TechStack.tsx` — render existing technology icons through LogoLoop.
- `app/_components/Experiences.tsx` — convert the card stack into a compact credibility timeline.
- `app/_components/Certificates.tsx` — present the DataCamp credential as compact proof.
- `app/projects/page.tsx` — consume shared data and render the new project index.
- `app/projects/[projectId]/page.tsx` — consume shared data, generate static parameters, and render outcome-led case studies.
- `app/contact/page.tsx` — replace the simulated form with `useActionState` and the Formspree Server Action.
- `app/not-found.tsx` — remove Framer Motion and use the new static visual system.

### Delete after migration

- `app/_components/ClickSpark.tsx` — global click listener and perpetual animation loop.
- `app/_components/ui/card.tsx` — delete only if no reference remains after the timeline cutover.
- `public/bg-image.png` — obsolete repeating background tile.
- `public/fonts/incognito_regular.woff2`
- `public/fonts/incognito_medium.woff2`
- `public/fonts/incognito_bold.woff2`
- `public/fonts/incognito_condensed.woff2`
- `public/fonts/gitlab-mono.woff2`

---

### Task 1: Create the shared project model and migrate every project caller

**Files:**
- Create: `lib/projects.ts`
- Modify: `app/projects/page.tsx:1-119`
- Modify: `app/projects/[projectId]/page.tsx:1-441`

**Interfaces:**
- Produces: `ProjectCategory`, `ProjectSlug`, `Project`, `projects`, `featuredProjects`, `getProject(slug)`, and `projectParams`.
- Consumes: Existing project records from `app/projects/page.tsx` and `app/projects/[projectId]/page.tsx` without changing factual content.

- [ ] **Step 1: Define the serializable project contract**

Create `lib/projects.ts` with data-only fields so records can cross Server/Client boundaries safely:

```ts
export type ProjectCategory = "Web" | "Mobile" | "Data/ML" | "IoT";

export type ProjectSlug =
  | "ched-elibrary"
  | "global-gradient-code"
  | "farmstock"
  | "tritrack"
  | "access-guard";

export type ProjectFeature = {
  title: string;
  points: readonly string[];
};

export type Project = {
  slug: ProjectSlug;
  name: string;
  tagline: string;
  summary: string;
  description: string;
  category: ProjectCategory;
  featured: boolean;
  tags: readonly string[];
  timeline: string;
  role: string;
  status: string;
  live: string | null;
  github: string | null;
  demo: { email: string; password: string } | null;
  features: readonly ProjectFeature[];
  tech: readonly { label: string; value: string }[];
};
```

- [ ] **Step 2: Move the five complete records into one array**

Move every existing description, tag, link, credential, feature, and technology item from the dynamic route into five `Project` object literals named `chedELibrary`, `globalGradientCode`, `farmstock`, `tritrack`, and `accessGuard`. Add `slug`, `category`, `featured`, and the shorter index `summary` to each record. Mark CHED E-Library, Global Gradient Code, and TriTrack as featured because together they prove public-sector web, data/ML, and web/mobile delivery.

```ts
export const projects: readonly Project[] = [
  chedELibrary,
  globalGradientCode,
  farmstock,
  tritrack,
  accessGuard,
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export const projectParams = projects.map(({ slug }) => ({ projectId: slug }));
```

Do not store Lucide component functions in this module. Map `category` or `slug` to icons inside presentation components.

- [ ] **Step 3: Cut the projects index over to the shared array**

Remove its local `projects` array and import `projects` from `@/lib/projects`. Keep one `<Link>` per card and use `project.slug`, `project.name`, `project.summary`, `project.category`, and only the first three tags. Do not add filtering state because all four categories contain too few records to justify UI state.

- [ ] **Step 4: Cut the dynamic route over and prebuild all known slugs**

Import `getProject` and `projectParams`, export the static parameters, await the Next.js 16 Promise-based route params, look up the record, and retain `notFound()` for misses:

```ts
export function generateStaticParams() {
  return projectParams;
}
```

In the existing `ProjectPage` body, replace `projects[projectId as keyof typeof projects]` with `getProject(projectId)`. Keep the page's JSX inline until Task 5 redesigns it; do not introduce a pass-through case-study component.

- [ ] **Step 5: Run the project-data smoke check**

Create a temporary `scripts/check-projects.ts` that imports `projects`, `featuredProjects`, and `getProject`, then asserts five unique slugs, three featured projects, valid lookups, and no missing name, summary, description, category, or feature list. Run:

```bash
npx --yes tsx@latest scripts/check-projects.ts
```

Expected: process exits with code 0 and no assertion error. Delete `scripts/check-projects.ts` immediately after the check.

- [ ] **Step 6: Verify both routes compile**

Run:

```bash
npm run build
```

Expected: `/projects` and all five `/projects/[projectId]` paths build; an unknown slug still resolves through `notFound()`.

- [ ] **Step 7: Commit the data cutover**

```bash
git add lib/projects.ts app/projects/page.tsx 'app/projects/[projectId]/page.tsx'
git commit -m "refactor: centralize portfolio project data"
```

---

### Task 2: Install and adapt the approved React Bits components

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `app/_components/DarkVeil/DarkVeil.tsx`
- Create: `app/_components/Noise/Noise.tsx`
- Create: `app/_components/SplitText/SplitText.tsx`
- Create: `app/_components/Magnet/Magnet.tsx`
- Create: `app/_components/MagicBento/MagicBento.tsx`
- Create: `app/_components/LogoLoop/LogoLoop.tsx`
- Create: `app/_components/FadeContent/FadeContent.tsx`
- Create: `app/_components/useReducedMotion.ts`

**Interfaces:**
- Produces: The seven approved React Bits components and `useReducedMotion(): boolean`.
- Consumes: `components.json` aliases and the configured `@react-bits` registry.

- [ ] **Step 1: Install the approved TypeScript/Tailwind variants in one CLI call**

```bash
npx shadcn@latest add @react-bits/DarkVeil-TS-TW @react-bits/Noise-TS-TW @react-bits/SplitText-TS-TW @react-bits/Magnet-TS-TW @react-bits/MagicBento-TS-TW @react-bits/LogoLoop-TS-TW @react-bits/FadeContent-TS-TW
```

Accept only the component files and required `ogl`, `gsap`, and `@gsap/react` dependencies. Do not add another animation, icon, carousel, or component library.

- [ ] **Step 2: Add one reduced-motion hook for browser-only effects**

```ts
"use client";

import { useEffect, useState } from "react";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}
```

- [ ] **Step 3: Make MagicBento accept real service data**

Remove its hardcoded demo `cardData`. Export a serializable card type and add a required `cards` prop:

```ts
export type BentoCardData = {
  title: string;
  description: string;
  label: string;
};

export interface BentoProps {
  cards: readonly BentoCardData[];
  // Keep the generated visual options that are used by Services.
}
```

Render `cards.map(...)`. Use stable `card.title` keys instead of array indexes. Keep spotlight and border glow. Default `clickEffect`, particles, tilt, and magnetism to false so separate React Bits roles do not stack inside one card.

- [ ] **Step 4: Harden continuous effects for reduced motion**

For DarkVeil and Noise, do not start `requestAnimationFrame` when the hook or media query reports reduced motion. Render a static CSS-backed canvas container instead. For SplitText and FadeContent, show final content immediately. LogoLoop already stops its track for reduced motion; preserve that behavior.

- [ ] **Step 5: Compile the generated and adapted components**

```bash
npm run build
```

Expected: all seven components compile under React 19 and Tailwind CSS 4 with no missing module or client-boundary error.

- [ ] **Step 6: Commit the component installation**

```bash
git add package.json package-lock.json app/_components/DarkVeil app/_components/Noise app/_components/SplitText app/_components/Magnet app/_components/MagicBento app/_components/LogoLoop app/_components/FadeContent app/_components/useReducedMotion.ts
git commit -m "feat: add curated React Bits components"
```

---

### Task 3: Replace the global visual system and application shell

**Files:**
- Modify: `app/globals.css:1-281`
- Modify: `app/layout.tsx:1-142`
- Modify: `app/_components/Header.tsx:1-160`
- Modify: `app/_components/Footer.tsx:1-59`
- Create: `app/_components/SiteEffects.tsx`
- Delete: `app/_components/ClickSpark.tsx`
- Delete: `public/bg-image.png`
- Delete: `public/fonts/incognito_regular.woff2`
- Delete: `public/fonts/incognito_medium.woff2`
- Delete: `public/fonts/incognito_bold.woff2`
- Delete: `public/fonts/incognito_condensed.woff2`
- Delete: `public/fonts/gitlab-mono.woff2`

**Interfaces:**
- Produces: Theme tokens, page container utilities, global focus behavior, theme-aware shell, and one decorative site texture.
- Consumes: `Noise`, current theme script, current navigation routes, and current social links.

- [ ] **Step 1: Replace copied-looking local typography with Ralph's own pairing**

In `app/layout.tsx`, replace Inter and the preloaded Incognito files with `Bricolage_Grotesque` and `IBM_Plex_Mono` from `next/font/google`:

```ts
import { Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});
```

Apply both variables to `<html>`. Remove all manual font preload links and local `@font-face` blocks.

- [ ] **Step 2: Define the approved Tailwind v4 tokens**

Keep shadcn-compatible semantic variables, but replace obsolete dark scales and animation tokens with a small system:

```css
@theme {
  --font-sans: var(--font-bricolage), sans-serif;
  --font-display: var(--font-bricolage), sans-serif;
  --font-mono: var(--font-ibm-plex-mono), monospace;
  --color-signal: #16a34a;
  --color-signal-bright: #4ade80;
  --color-ink: #09090b;
  --color-paper: #fafafa;
}

:root {
  --background: 0 0% 98%;
  --foreground: 240 10% 4%;
  --surface: 0 0% 100%;
  --line: 240 6% 88%;
  --signal: 142 76% 36%;
}

.dark {
  --background: 240 10% 4%;
  --foreground: 0 0% 98%;
  --surface: 240 6% 8%;
  --line: 240 4% 16%;
  --signal: 142 69% 58%;
}
```

Keep the remaining shadcn variables only when an installed component reads them. Add reusable `.site-container`, `.section-space`, `.eyebrow`, `.focus-ring`, and subtle rule styles. Remove `background-image`, the old float/gradient/blob keyframes, `.image-blur-corner`, and `.hero-path`.

- [ ] **Step 3: Add the global Noise boundary**

Create `SiteEffects.tsx` as a Client Component. Render Noise in a fixed `pointer-events-none`, `aria-hidden`, low-opacity layer. Pass a disabled/static mode when `useReducedMotion()` is true. It must never intercept clicks or appear above dialogs and navigation.

- [ ] **Step 4: Remove ClickSpark from the root layout**

Replace the ClickSpark wrapper with the normal shell:

```tsx
<body>
  <SiteEffects />
  <div className="relative z-10 flex min-h-screen flex-col">
    <Header />
    <div className="flex-1">{children}</div>
    <Footer />
  </div>
</body>
```

Delete `ClickSpark.tsx` and the obsolete background tile.

- [ ] **Step 5: Redesign the header without changing its behavior**

Keep Home, Projects, Contact, active-route indication, mobile open/close state, and the pre-paint theme script. Use a compact bordered editorial header, a text monogram such as `RVR`, 44px mobile controls, `aria-current="page"` on the active link, and visible focus rings. Do not add a cursor effect or animated route transition.

- [ ] **Step 6: Redesign the footer around client conversion**

Keep the verified social URLs and current year. Replace the generic stack sentence with a concise availability statement and a direct Contact link. Keep the footer static and semantic.

- [ ] **Step 7: Verify shell behavior in the actual browser**

Run `npm run dev`. Check `/` at 1440×1000 and 390×844. Verify the theme does not flash, the mobile menu opens and closes by keyboard, active navigation is exposed, Noise does not block clicks, and reduced-motion emulation stops continuous texture movement.

- [ ] **Step 8: Commit the shell redesign**

```bash
git add app/globals.css app/layout.tsx app/_components/Header.tsx app/_components/Footer.tsx app/_components/SiteEffects.tsx app/_components/ClickSpark.tsx public/bg-image.png public/fonts
git commit -m "feat: replace portfolio visual system"
```

---

### Task 4: Build the interactive client-focused home page

**Files:**
- Modify: `app/page.tsx:1-26`
- Modify: `app/_components/Hero.tsx:1-125`
- Modify: `app/_components/TechStack.tsx:1-42`
- Modify: `app/_components/Experiences.tsx:1-70`
- Modify: `app/_components/Certificates.tsx:1-77`
- Create: `app/_components/HeroVisual.tsx`
- Create: `app/_components/Services.tsx`
- Create: `app/_components/FeaturedProjects.tsx`
- Create: `app/_components/Process.tsx`
- Create: `app/_components/InquiryBanner.tsx`

**Interfaces:**
- Consumes: `featuredProjects`, the seven React Bits components, existing technology icons, experience facts, certificate URL, portrait, CV, and verified social links.
- Produces: The complete home journey and reusable `InquiryBanner`.

- [ ] **Step 1: Create the lazy hero visual boundary**

`HeroVisual.tsx` must be a Client Component because Next.js 16 permits `ssr: false` only inside a Client Component:

```tsx
"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "./useReducedMotion";

const DarkVeil = dynamic(() => import("./DarkVeil/DarkVeil"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-zinc-950" />,
});

export function HeroVisual() {
  const reduced = useReducedMotion();
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {reduced ? <div className="h-full bg-zinc-950" /> : <DarkVeil hueShift={115} speed={0.25} warpAmount={0.15} resolutionScale={0.7} />}
    </div>
  );
}
```

Tune values during browser verification; keep the field dark, low contrast, and readable behind content.

- [ ] **Step 2: Rewrite the hero for client intent**

Use one semantic `<h1>` through SplitText with the approved promise: **“I build software that moves real work forward.”** Follow with one short paragraph that names web, mobile, data/ML, and IoT. Keep `Open for freelance projects`, location, Contact, Projects, CV, GitHub, and LinkedIn. Remove Facebook from the hero. Wrap the primary Contact link with Magnet without changing the link's keyboard behavior.

Place the portrait as a smaller proof element, not the dominant hero image. Use `next/image` with explicit dimensions, `sizes`, and the existing alt text.

- [ ] **Step 3: Adapt MagicBento into the four-service section**

Create `Services.tsx` with these factual cards:

```ts
const services = [
  { label: "01", title: "Web applications", description: "Portals, inventory systems, dashboards, and operational tools." },
  { label: "02", title: "Mobile applications", description: "Cross-platform workflows with realtime data, maps, and notifications." },
  { label: "03", title: "Data and ML", description: "Forecasting, dashboards, data preparation, and decision-support systems." },
  { label: "04", title: "IoT systems", description: "Connected prototypes that combine embedded control, sensors, and offline operation." },
] as const;
```

Render MagicBento with emerald glow, spotlight and border glow enabled, tilt enabled only for fine pointers, particles off, and click effects off. Set `disableAnimations` from `useReducedMotion()`.

- [ ] **Step 4: Create outcome-led featured project cards**

`FeaturedProjects.tsx` remains a Server Component. Render `featuredProjects` as three links with category, name, summary, role, and evidence label. Use project-specific accent details, but no invented screenshots or metrics. Wrap each card in FadeContent at the smallest client boundary.

- [ ] **Step 5: Add the working process**

Create a static `Process.tsx` with three ordered steps: Discover, Build, Deliver. Explain scope alignment, iterative implementation, and deployed handoff in one sentence each. Do not promise fixed timelines or support terms.

- [ ] **Step 6: Convert credibility sections to open editorial layouts**

Keep both existing experience records and the DataCamp credential. Remove Card primitives and `compact` props. Render a thin timeline with semantic `<ol>`, `<time>` text, and a single certificate proof row. Keep the real certificate URL and dates.

- [ ] **Step 7: Convert TechStack to LogoLoop**

Mark `TechStack.tsx` as a Client Component. Use the eight existing SVG icons as `LogoItem.node` entries with title and `ariaLabel`. Use `speed={35}`, `pauseOnHover`, `fadeOut`, and `scaleOnHover={false}`. Reduced motion must show one static, wrapping list instead of duplicated moving content.

- [ ] **Step 8: Add the final inquiry banner**

Create `InquiryBanner.tsx` with a direct client prompt, Contact link, and email fallback. Use Magnet only on the Contact action. Keep the copy factual and avoid urgency claims.

- [ ] **Step 9: Compose the home route**

Remove `sectionClass` and compose this Server Component order:

```tsx
<main>
  <Hero />
  <Services />
  <FeaturedProjects />
  <Process />
  <Experiences />
  <Certificates />
  <TechStack />
  <InquiryBanner />
</main>
```

Use open section spacing and rules from `globals.css`; do not wrap every section in a card.

- [ ] **Step 10: Verify the complete home journey**

With the dev server running, exercise `/` at desktop and mobile widths. Confirm the first viewport states offer, service range, and inquiry action; every section appears in logical order; no text is hidden before hydration; all animated components stop in reduced-motion mode; and no horizontal overflow occurs.

- [ ] **Step 11: Commit the home page**

```bash
git add app/page.tsx app/_components/Hero.tsx app/_components/HeroVisual.tsx app/_components/Services.tsx app/_components/FeaturedProjects.tsx app/_components/Process.tsx app/_components/InquiryBanner.tsx app/_components/TechStack.tsx app/_components/Experiences.tsx app/_components/Certificates.tsx
git commit -m "feat: rebuild client-focused home page"
```

---

### Task 5: Redesign the project index and case-study pages

**Files:**
- Modify: `app/projects/page.tsx`
- Modify: `app/projects/[projectId]/page.tsx`

**Interfaces:**
- Consumes: `projects`, `getProject`, `projectParams`, `FadeContent`, and `InquiryBanner`.
- Produces: Scannable project discovery and one consistent evidence-led case-study template.

- [ ] **Step 1: Build the projects index header**

Replace student-focused copy with a client-facing heading and short explanation of the four delivery categories. Keep the route a Server Component and do not add filters.

- [ ] **Step 2: Build the responsive project grid**

Use one column on mobile, two at `md`, and three at `xl`. Each card contains one icon mapped locally from `category`, category label, name, one-line summary, and at most three stack labels. The whole card is one Link. Add visible focus and a restrained border/translate hover state through FadeContent, not a second animated-card library.

- [ ] **Step 3: Reorder project details around evidence**

Use this order: outcome-led header, metadata, Live/Source actions, About, Features, Architecture/Tech, demo credentials when present, next project, InquiryBanner. Keep all current data. Change section labels only when meaning remains accurate.

- [ ] **Step 4: Add deterministic previous/next navigation**

Find the current index in `projects`; previous wraps to the last record and next wraps to the first. Use standard Links and expose project names in accessible labels.

- [ ] **Step 5: Verify every case study**

Open all five known slugs and one unknown slug. Confirm facts and links match `lib/projects.ts`, conditional Live/Source/Demo blocks render correctly, next navigation cycles through all records, and the unknown slug reaches the custom 404.

- [ ] **Step 6: Commit project presentation**

```bash
git add app/projects/page.tsx 'app/projects/[projectId]/page.tsx'
git commit -m "feat: redesign project case studies"
```

---

### Task 6: Replace the simulated contact form with Formspree delivery

**Files:**
- Create: `lib/inquiry.ts`
- Create: `app/contact/actions.ts`
- Modify: `app/contact/page.tsx:1-241`

**Interfaces:**
- Produces: `PROJECT_TYPES`, `BUDGET_RANGES`, `InquiryPayload`, `InquiryState`, `initialInquiryState`, `parseInquiry(formData)`, and `submitInquiry(previousState, formData): Promise<InquiryState>`.
- Consumes: Server-only `FORMSPREE_FORM_ID`; native FormData; Formspree JSON response.

- [ ] **Step 1: Define the action state and trust-boundary validation**

Create `lib/inquiry.ts` outside the `\"use server\"` module so its synchronous validator can also be exercised by the temporary smoke script:

```ts
export const PROJECT_TYPES = [\"Web\", \"Mobile\", \"Data/ML\", \"IoT\", \"Other\"] as const;
export const BUDGET_RANGES = [
  \"Not sure yet\",
  \"Under $1,000\",
  \"$1,000–$3,000\",
  \"$3,000–$8,000\",
  \"$8,000+\",
] as const;

export type InquiryPayload = {
  name: string;
  email: string;
  projectType: (typeof PROJECT_TYPES)[number];
  budget: (typeof BUDGET_RANGES)[number];
  timeline: string;
  brief: string;
};

export type InquiryState = {
  status: \"idle\" | \"success\" | \"error\";
  message: string;
  fieldErrors: Partial<Record<keyof InquiryPayload, string>>;
};

export const initialInquiryState: InquiryState = {
  status: \"idle\",
  message: \"\",
  fieldErrors: {},
};

const value = (formData: FormData, key: keyof InquiryPayload) =>
  String(formData.get(key) ?? \"\").trim();

export function parseInquiry(
  formData: FormData,
): { data: InquiryPayload | null; fieldErrors: InquiryState[\"fieldErrors\"] } {
  const name = value(formData, \"name\");
  const email = value(formData, \"email\");
  const projectType = value(formData, \"projectType\");
  const budget = value(formData, \"budget\");
  const timeline = value(formData, \"timeline\");
  const brief = value(formData, \"brief\");
  const fieldErrors: InquiryState[\"fieldErrors\"] = {};

  if (name.length < 2 || name.length > 80) fieldErrors.name = \"Enter a name between 2 and 80 characters.\";
  if (email.length > 254 || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) fieldErrors.email = \"Enter a valid email address.\";
  if (!PROJECT_TYPES.includes(projectType as InquiryPayload[\"projectType\"])) fieldErrors.projectType = \"Choose a project type.\";
  if (!BUDGET_RANGES.includes(budget as InquiryPayload[\"budget\"])) fieldErrors.budget = \"Choose a budget range.\";
  if (timeline.length < 2 || timeline.length > 80) fieldErrors.timeline = \"Enter a timeline between 2 and 80 characters.\";
  if (brief.length < 20 || brief.length > 3000) fieldErrors.brief = \"Enter a project brief between 20 and 3000 characters.\";

  if (Object.keys(fieldErrors).length) return { data: null, fieldErrors };

  return {
    data: {
      name,
      email,
      projectType: projectType as InquiryPayload[\"projectType\"],
      budget: budget as InquiryPayload[\"budget\"],
      timeline,
      brief,
    },
    fieldErrors,
  };
}
```

- [ ] **Step 2: Post only normalized fields from the server**

Create `app/contact/actions.ts`:

```ts
\"use server\";

import { parseInquiry, type InquiryState } from \"@/lib/inquiry\";

const fallback = (): InquiryState => ({
  status: \"error\",
  message: \"Project inquiries are temporarily unavailable. Please email ralphvincentrodriguez@sksu.edu.ph.\",
  fieldErrors: {},
});

export async function submitInquiry(
  _previousState: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const { data, fieldErrors } = parseInquiry(formData);
  if (!data) return { status: \"error\", message: \"Check the highlighted fields.\", fieldErrors };

  const formId = process.env.FORMSPREE_FORM_ID;
  if (!formId) return fallback();

  const payload = new FormData();
  for (const [key, entry] of Object.entries(data)) payload.set(key, entry);
  payload.set(\"_subject\", `Portfolio inquiry from ${data.name}`);

  try {
    const response = await fetch(`https://formspree.io/f/${formId}`, {
      method: \"POST\",
      headers: { Accept: \"application/json\" },
      body: payload,
      cache: \"no-store\",
    });
    if (!response.ok) return fallback();
    return { status: \"success\", message: \"Your project inquiry was sent.\", fieldErrors: {} };
  } catch {
    return fallback();
  }
}
```

Do not log personal form values or forward unexpected FormData fields.

- [ ] **Step 3: Prove validation before wiring the UI**

Create a temporary `scripts/check-inquiry.ts` that calls the exported pure validation helper with an empty payload, an invalid email, an unsupported project type, a short brief, and one valid payload. Assert field-specific errors and valid normalized output. Run:

```bash
npx --yes tsx@latest scripts/check-inquiry.ts
```

Expected: process exits with code 0. Delete the script after the check.

- [ ] **Step 4: Rebuild the contact form with React 19 state**

Keep `app/contact/page.tsx` as a Client Component and use:

```ts
const [state, formAction, pending] = useActionState(submitInquiry, initialInquiryState);
```

Use an uncontrolled native form with `action={formAction}` so fields remain populated after server errors. Include name, email, project type, budget range, timeline, and brief. Associate each returned error with `aria-describedby`; set `aria-invalid`; render status in `aria-live="polite"`. Disable only the submit button while pending.

- [ ] **Step 5: Clear only after confirmed success**

Place the form in a small Client Component with a ref. On a transition to `state.status === "success"`, call `formRef.current?.reset()`. Do not use a timer and do not clear on validation, configuration, network, or Formspree errors.

- [ ] **Step 6: Verify failure and success behavior**

First run without `FORMSPREE_FORM_ID`: submit a valid form and confirm the visible direct-email fallback while all values remain. Then set the real Formspree ID, restart the dev server, submit one labelled test inquiry, confirm Formspree receives it, confirm one success message appears, and confirm the form resets. Also verify native required/email validation and a 20-character brief boundary.

- [ ] **Step 7: Commit the real inquiry flow**

```bash
git add lib/inquiry.ts app/contact/page.tsx app/contact/actions.ts
git commit -m "feat: deliver project inquiries through Formspree"
```

---

### Task 7: Finish metadata, 404, dependency cleanup, and dead-file removal

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/not-found.tsx:1-56`
- Modify: `package.json`
- Modify: `package-lock.json`
- Delete if unused: `app/_components/ui/card.tsx`

**Interfaces:**
- Consumes: Approved client positioning, redesigned shell, remaining dependency references, and deployment environment.
- Produces: Accurate client-facing metadata, static 404, and no obsolete animation or card runtime.

- [ ] **Step 1: Update metadata and structured data without inventing claims**

Change the title and description from student/job-seeker language to freelance software delivery. Keep Person JSON-LD, real email, location, school, and social profiles. Read `SITE_URL` on the server and fall back to `http://localhost:3000` for local builds:

```ts
const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";
```

Use it for `metadataBase`, `openGraph.url`, and structured-data `url`. Remove the nonexistent `/og-image.png` reference unless a real image is added during visual implementation. Production deployment must set `SITE_URL` to its confirmed canonical HTTPS origin.

- [ ] **Step 2: Replace the animated 404 with the shared static language**

Remove `"use client"`, `motion`, and the history-back button. Keep a clear `404`, one explanation, Home Link, and Projects Link. This makes the page a Server Component and removes the last decorative infinite animation.

- [ ] **Step 3: Remove obsolete dependencies and files**

Search all source files for `framer-motion`, `ClickSpark`, the Card primitive, `/bg-image.png`, `font-incognito`, and `Gitlab Mono`. Delete `framer-motion` from dependencies only when no import remains. Delete `app/_components/ui/card.tsx` only when no reference remains. Remove obsolete font and image files listed under “Delete after migration.”

- [ ] **Step 4: Run focused diagnostics and production build**

Run workspace TypeScript diagnostics through LSP, then:

```bash
npm run lint
npm run build
```

Expected: zero errors, no missing local assets, and no Client/Server serialization warning.

- [ ] **Step 5: Commit cleanup**

```bash
git add app/layout.tsx app/not-found.tsx package.json package-lock.json app/_components/ui/card.tsx public
git commit -m "chore: remove obsolete portfolio presentation"
```

---

### Task 8: Perform final visual, accessibility, and interaction verification

**Files:**
- Modify only files with defects found in this bounded verification pass.

**Interfaces:**
- Consumes: Complete redesign from Tasks 1–7.
- Produces: Browser evidence that the approved specification works across the actual site.

- [ ] **Step 1: Start the production-like application**

```bash
npm run build && npm start
```

Verify the server is ready on port 3000 before opening a browser.

- [ ] **Step 2: Capture desktop and mobile surfaces in one pass**

Capture `/`, `/projects`, one project with live/demo links, one project without them, `/contact`, and an unknown route at 1440×1000 and 390×844. Check hierarchy, spacing, text wrapping, theme contrast, canvas bounds, and horizontal overflow.

- [ ] **Step 3: Exercise all navigation and actions**

Use keyboard-only navigation to open/close the mobile menu, toggle theme, enter every route, follow project previous/next links, reach CV and certificate links, and focus all form controls. Confirm every interactive card has one unambiguous action.

- [ ] **Step 4: Exercise reduced-motion mode**

Emulate `prefers-reduced-motion: reduce`, reload each route, and confirm DarkVeil, Noise, SplitText, FadeContent, MagicBento motion, Magnet movement, and LogoLoop movement all stop or render immediately without hiding content.

- [ ] **Step 5: Verify inquiry behavior against the real endpoint**

Submit one labelled test inquiry with the configured Formspree ID. Confirm pending, success, and reset. Then test a rejected or unavailable endpoint and confirm error, preserved values, and direct-email fallback.

- [ ] **Step 6: Run the React Bits audit checklist**

Use the shadcn MCP `get_audit_checklist` tool after every generated component has been integrated. Check every applicable item against the actual source and browser result.

- [ ] **Step 7: Run the Impeccable detector once**

```bash
node C:\Users\Lenovo Pc\.agents\skills\impeccable\scripts\detect.mjs --json app/layout.tsx app/globals.css app/page.tsx app/projects/page.tsx "app/projects/[projectId]/page.tsx" app/contact/page.tsx app/not-found.tsx app/_components
```

Fix all applicable findings in one batch. Ignore only findings that conflict with the approved visual direction or factual content, and record the reason in the final report.

- [ ] **Step 8: Confirm the final build after fixes**

```bash
npm run lint && npm run build
```

Expected: both commands exit 0. Recheck desktop and mobile once only if Task 7 changed visual code.

- [ ] **Step 9: Commit verified fixes**

```bash
git add app lib package.json package-lock.json public
git commit -m "fix: complete portfolio accessibility review"
```

## Execution Prerequisites

Before Task 6 success verification and final deployment:

- Create a Formspree form and provide `FORMSPREE_FORM_ID` in the runtime environment.
- Set `SITE_URL` to the confirmed production HTTPS origin. The current inferred root `https://ralphvincent.tech` fails TLS hostname validation and must not be used without correction.

No other external service, CMS, analytics package, testimonial content, or new project asset is required.
