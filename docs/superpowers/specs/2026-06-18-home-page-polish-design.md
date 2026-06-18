# Home Page Polish — Design

**Date:** 2026-06-18
**Scope:** `app/page.tsx` and its children — `Hero.tsx`, `Experiences.tsx`, `TechStack.tsx`

## Context

Ralph is a **graduating** CS student at Sultan Kudarat State University (no longer seeking internships — targeting full-time / junior dev roles). The home page is structurally sound but has stale content, a redundant section, a broken button, and a timeline that assumes two entries.

## Problems being fixed

1. **Stale status** — hero badge says "Open to internships"; should be "Open to work".
2. **Broken CTA** — "Download CV" button has no `href` and does nothing.
3. **Redundant About** — the hero intro and the About paragraph repeat nearly identical content within one screen.
4. **Placeholder Experiences** — real data ("Get Organized" / "Track Progress") is dummy text. Needs the real CHED internship.
5. **Lopsided timeline** — alternating left/right layout looks broken with a single real entry.

## Decisions (confirmed with user)

- **CV button:** link to `/cv.pdf` (user drops the file in `/public`). Button works once the file exists.
- **About tone:** confident, role-seeking — frames Ralph as a graduating dev ready for full-time work, leaning on the CHED experience.

## Changes

### Hero (`Hero.tsx`)
- Status badge: `Open to internships` → `Open to work`.
- Wire `Download CV` button: convert from `<button>` to an `<a href="/cv.pdf" download>` (keep identical styling) so it actually downloads.
- **Merge** the hero intro paragraph and the standalone "About" block into a single, stronger role-seeking paragraph. Remove the duplicate "About" heading + paragraph. Net result: one bio, not two.

### Experiences (`Experiences.tsx`)
- Replace the two placeholder `steps` with the real entry:
  - **Fullstack Developer Intern — CHED Regional Office XII**
  - **Jun–Jul 2025**
  - "Built an e-library / library management system using Laravel and React."
- Add a `period` field to the `Step` type (title / period / description) so dates render.
- Replace the alternating left/right desktop timeline with a **single-column vertical timeline** (node on the left, card to the right) that reads correctly with one entry and scales cleanly as more are added. Mobile layout already does this — unify both on the single-column pattern.

### Tech Stack (`TechStack.tsx`)
- Minor spacing/consistency polish only. No structural change.

## Out of scope (this pass)
- `metadataBase` / OG `your-domain.com` placeholders (separate SEO pass).
- Projects page, Contact page (home only for now).

## Verification
- `npm run build` (or the project's build) must pass with no new errors.
- Visually confirm: badge text, CV button downloads, single bio paragraph, real internship entry in a clean single-column timeline.
