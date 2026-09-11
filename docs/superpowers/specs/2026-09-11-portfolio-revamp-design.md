# Portfolio Revamp Design

## Status

Approved in chat for planning. Implementation must not start until the user reviews this written specification.

## Goal

Redesign Ralph Vincent Rodriguez's portfolio into an interactive creative lab that attracts freelance and client leads for mixed software projects. The site must combine strong visual craft with clear services, credible project evidence, and a reliable project-inquiry path.

## Inspiration Boundary

The redesign adapts principles observed on [victoreke.com](https://victoreke.com/): editorial spacing, concise project summaries, restrained hierarchy, an asymmetric hero, subtle surface texture, and proof-led case studies.

The redesign must not copy Victor Eke's font files, logo, biographical copy, exact color values, isometric SVG paths, animation coordinates, photography, or page composition. Ralph's project domains and identity must define all original graphics and copy.

## Audience and Conversion

The primary audience is prospective freelance clients seeking mixed software work across web, mobile, data and machine learning, or IoT.

The primary conversion is **Send a project inquiry**. Supporting actions are **View selected work**, **Open live demo**, **View source**, and **Download CV**.

The visitor journey is:

1. Understand what Ralph can build.
2. See evidence from relevant deployed work.
3. Understand the working process and technical range.
4. Submit a scoped project inquiry.

## Visual Direction

### Concept: Interactive Creative Lab

The visual system uses a near-black zinc canvas, sharp off-white typography, a high-contrast green signal color, subtle animated grain, and limited warm accents drawn from project identities. Light mode uses the same hierarchy with pale neutral surfaces and a darker accessible green.

The layout is open and editorial rather than a stack of glass cards. Content sections use strong vertical rhythm, thin rules, controlled asymmetry, and compact metadata. The current repeating background tile and universal rounded glass containers are removed.

The hero pairs a concise client promise with an original responsive technical field. The field represents connected software systems and data flow; it must not resemble the reference site's isometric mesh.

### Motion Rules

- One dominant animated effect per viewport.
- Text animation appears on the hero headline only.
- Section reveals run once and move no more than 10px.
- Hover transitions remain within 150–250ms.
- Body copy never animates character by character.
- All ambient animation stops or becomes static under `prefers-reduced-motion`.
- Motion must not delay navigation, reading, or form submission.

## Information Architecture

The redesign keeps the current routes. No CMS or speculative routes are added.

### Home `/`

1. **Hero** — client-focused promise, short service range, availability, primary inquiry button, and selected-work link.
2. **Services** — interactive bento layout for web applications, mobile applications, data and ML systems, and IoT systems.
3. **Featured Work** — three strongest case studies selected for breadth and proof. Each item states the problem, delivered system, role, and live or source evidence.
4. **Working Process** — Discover, Build, Deliver. Copy stays factual and short.
5. **Credibility** — compact experience timeline and DataCamp credential.
6. **Technology Proof** — a looping, pausable technology rail.
7. **Inquiry Banner** — direct transition to the contact route.

### Projects `/projects`

Show all five projects in a responsive, scannable index. Each card uses a project identity, one-line value proposition, service category, and clear case-study link. Filters may cover Web, Mobile, Data/ML, and IoT only when each filter has content; otherwise use static category labels and avoid filter state.

### Project Detail `/projects/[projectId]`

Each case study follows one consistent order:

1. Outcome-led title and summary.
2. Role, timeline, stack, and status metadata.
3. Live Demo and Source actions where real links exist.
4. Problem.
5. Solution.
6. Key features.
7. Architecture and technical decisions.
8. Result and verified evidence.
9. Next-project navigation and inquiry action.

Demo credentials remain visible only where they are already public and valid. The redesign must not invent metrics or outcomes.

### Contact `/contact`

The inquiry form contains:

- Name.
- Email.
- Project type: Web, Mobile, Data/ML, IoT, or Other.
- Budget range.
- Desired timeline.
- Project brief.

The form posts to Formspree. Direct email remains visible as a fallback. The implementation requires a real Formspree form ID before the success path can be accepted.

## React Bits Component Map

Use TypeScript and Tailwind variants from `@react-bits`.

- **DarkVeil** — hero background only; lazy-loaded with a static pre-hydration fallback. Requires `ogl`.
- **Noise** — low-opacity global texture; non-interactive and disabled for reduced motion.
- **SplitText** — one-time hero headline entrance. Requires `gsap` and `@gsap/react`.
- **Magnet** — primary inquiry buttons on pointer-capable devices; native button behavior remains unchanged.
- **MagicBento** — service capability section. Requires `gsap`.
- **LogoLoop** — technology proof rail with hover/focus pause and meaningful accessible labels.
- **FadeContent** — restrained section entrances. Requires `gsap`.

Do not add overlapping cursor trails, click particles, multiple WebGL backgrounds, animated body copy, or effects that repeat the same purpose. “Maximize React Bits” means using its components across meaningful interaction roles, not rendering every available effect.

## Application Architecture

- Keep Next.js App Router, React, TypeScript, and Tailwind CSS v4.
- Follow the repository's current `app/_components` and `lib` aliases from `components.json`.
- Move shared project records from the dynamic page into one typed project-data module consumed by home, project index, and project detail routes.
- Keep route pages server-rendered where possible. Add client boundaries only around React Bits effects, theme controls, filters if retained, and the inquiry form.
- Remove the current `ClickSpark` wrapper and obsolete presentation helpers after every caller is migrated.
- Remove `framer-motion` only if no references remain after the redesign. React Bits components use GSAP for the selected motion roles; avoid two animation runtimes without a caller.
- Preserve metadata, sitemap, robots, manifest, JSON-LD, theme flash prevention, CV, portrait, credential, and valid project links.

## Form Behavior and Errors

- Use native form controls and browser validation where adequate.
- Disable repeat submission while the request is pending.
- Show an accessible inline success message and clear the form only after Formspree confirms success.
- Preserve entered values on network or server failure.
- Show an accessible error message with direct-email fallback.
- Do not simulate success with a timer.
- Keep the Formspree endpoint in an environment variable or explicit configuration value that is safe for client submission.

## Responsive Behavior

- Mobile: single-column reading order, compact header, 44px controls, static or reduced hero field, and no horizontal overflow from animated components.
- Tablet: two-column project and service layouts where content remains readable.
- Desktop: asymmetric hero, broader bento composition, and three-column project index.
- Pointer effects must not be required on touch devices.
- Long project names, URLs, and technology labels must wrap without changing layout width.

## Accessibility Requirements

- Meet WCAG 2.2 AA contrast for text, controls, focus indicators, and status messages.
- Preserve semantic landmarks and ordered heading levels.
- All links and buttons receive visible keyboard focus.
- Decorative canvases and textures remain hidden from assistive technology.
- Interactive cards expose one clear link target and do not nest conflicting controls.
- Theme controls have accessible names and states.
- Form errors associate with their fields; submission status uses an appropriate live region.
- Reduced-motion mode produces a complete static experience.

## Performance Constraints

- Lazy-load WebGL and noncritical animation code.
- Keep the hero readable before client JavaScript loads.
- Use one WebGL surface at most.
- Pause off-screen continuous effects where supported.
- Use existing optimized images with explicit dimensions and responsive sizes.
- Avoid a new CMS, analytics package, carousel library, or second icon library.

## Verification

Implementation is complete only after these checks:

1. Next.js production build and TypeScript diagnostics pass.
2. Home, projects, every project detail route, contact, theme toggle, and 404 render without console errors.
3. Desktop and mobile browser screenshots confirm hierarchy, responsive layout, and no overflow.
4. Keyboard-only navigation reaches all controls in logical order with visible focus.
5. Reduced-motion emulation removes or simplifies all selected React Bits motion.
6. Project links, live demos, source links, CV, and certificate links resolve as intended.
7. Formspree success and failure paths preserve the specified form behavior.
8. Lighthouse-oriented checks confirm no avoidable layout shift from hero or project media.
9. The shadcn React Bits audit checklist is run after all generated components are integrated.
10. The Impeccable mechanical detector is run once over the final changed UI files.

## Out of Scope

- Blog, photo gallery, CMS, testimonials, invented client metrics, pricing tables, authentication, client portal, and analytics.
- Exact recreation of victoreke.com.
- More than one WebGL background or decorative cursor system.
- New project content not supported by repository evidence.

## Implementation Prerequisite

A valid Formspree form ID is required before the contact form can be verified end to end. All other design and implementation work can proceed without it, but the redesign cannot be called complete until real submission succeeds.
