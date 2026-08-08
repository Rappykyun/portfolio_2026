# Recruiter Ready Project Case Studies

**Status:** Proposed

## Problem Statement

The portfolio lists projects and already has project detail pages, but a recruiter still has to assemble the important story from scattered fields. The homepage does not currently show project proof, and the project pages do not consistently present context, personal contribution, honest status, and evidence screenshots as one clear case study.

The portfolio must communicate project value without implying that a project was adopted in production when it was not.

## Solution

Turn the existing project pages into consistent project case studies backed by one shared typed project data source. Each case study will explain the project context, the author's role, what was built, what it demonstrates, evidence screenshots, key features, technology stack, and available demo or code links.

Add a Selected Work section below the Hero and above the Tech Stack on the homepage. It will show three featured projects: CHED E Library, Global Gradient Code, and TriTrack. Each card will link to its full case study.

During implementation, a neutral screenshot skeleton may stand in for missing evidence screenshots. The feature is not complete until one real evidence screenshot is supplied for each of the four first release case studies: CHED E Library, Global Gradient Code, Farmstock, and TriTrack.

## User Stories

1. As a recruiter, I want to see selected projects immediately below the introduction, so that I can judge the candidate's work without searching another page.
2. As a recruiter, I want to open a project case study from the homepage, so that I can understand the work in one path.
3. As a recruiter, I want to know what problem each project addressed, so that I can understand its purpose.
4. As a recruiter, I want to know the author's role, so that I can separate personal contribution from team or client work.
5. As a recruiter, I want to see what was actually built, so that I can evaluate the candidate's engineering range.
6. As a recruiter, I want to see an honest project status, so that I do not mistake a thesis, capstone, internship project, prototype, or demo for a production system.
7. As a recruiter, I want to see a real evidence screenshot, so that I can verify that the described interface or result exists.
8. As a recruiter, I want screenshots to have useful alternative text, so that I can understand the evidence with assistive technology.
9. As a recruiter, I want to open a demo or source code link when one exists, so that I can inspect the project further.
10. As a recruiter, I want links to be labelled as demos when production use is not confirmed, so that the portfolio remains truthful.
11. As a recruiter on a phone, I want the featured cards and case studies to remain readable and usable, so that the project story does not depend on a wide screen.
12. As a keyboard user, I want featured cards, case study links, and media to have visible focus states, so that I can navigate without a mouse.
13. As a screen reader user, I want case study sections and images to have meaningful semantics, so that the page structure is understandable.
14. As the portfolio owner, I want project content in one shared source, so that the project list and detail page cannot drift apart.
15. As the portfolio owner, I want to add a real screenshot later without changing the page structure, so that temporary skeletons are easy to replace.
16. As the portfolio owner, I want the same case study structure across projects, so that adding another project does not require inventing another page shape.
17. As the portfolio owner, I want projects without verified production use to use honest status language, so that the portfolio does not overstate its experience.
18. As a visitor, I want the whole featured project card to open its case study, so that the primary interaction is easy to discover.
19. As a visitor, I want demo and code links on the case study rather than nested inside the homepage card, so that card navigation remains predictable.
20. As a maintainer, I want tests to verify the shared project data, featured project selection, honest labels, skeleton paths, and homepage placement, so that later edits do not silently remove proof or change claims.

## Implementation Decisions

- Keep the current project detail route and extend its existing visual language instead of replacing the page with a new design.
- Use one shared typed project data source for the project list, featured projects, and case study pages.
- The shared data must support the project name, summary, project status, role, context, what was built, what it demonstrates, screenshot paths, screenshot alternative text, features, technology stack, demo link, and source code link.
- Use the term `project case study` for the full project story and `featured project` for a project promoted on the homepage.
- Use `evidence screenshot` only for a real captured image. A skeleton is temporary implementation content and is not final evidence.
- Use `Demo` for links that let visitors inspect or try a project without claiming production adoption. Use `Live Site` only when production use is confirmed.
- Use honest status labels. The initial selected projects are CHED E Library as an Internship Project, Global Gradient Code as a Thesis Project, and TriTrack as a Capstone Project. Farmstock remains part of the first case study release with its existing honest status.
- Use one main evidence screenshot per first release case study. Additional gallery images are outside this release.
- Use a fixed responsive media area for the main evidence screenshot. While an image is missing, render a neutral skeleton with a simple image cue and `Screenshot coming soon` text.
- Place Selected Work immediately below the Hero and before Tech Stack on the homepage.
- Show CHED E Library, Global Gradient Code, and TriTrack as the three homepage featured projects.
- Each featured card shows its skeleton or evidence screenshot, project name, honest status, role, one concise summary, and a View Case Study action.
- Keep demo and source code actions on the case study page rather than adding nested interactive links inside the featured card.
- Keep project content static and local to the repository. Do not add a CMS, database, authentication, or external content service.
- Preserve the current responsive layout, dark mode, existing typography, and established green action styles unless a case study requirement needs a focused adjustment.
- Do not claim production usage, user counts, business outcomes, or performance results that the portfolio owner has not confirmed.

## Testing Decisions

- Follow the repository's existing `node:test` and `assert` style for source level behavior checks.
- Test that all four first release case studies exist in the shared project data source.
- Test that the three approved featured projects appear in the homepage data or rendering path in the intended order.
- Test that each project has an honest status, role, case study content, screenshot path, and alternative text.
- Test that a missing screenshot uses the temporary skeleton path or rendering state without producing a broken image.
- Test that the homepage places Selected Work after the Hero and before Tech Stack.
- Test that every case study keeps its demo and source code links when those links exist.
- Test that no case study uses unsupported production language or a fake screenshot claim.
- Verify the rendered pages at narrow and wide widths, including cards wrapping, media sizing, focus states, and readable section order.
- Verify that real evidence screenshots replace every skeleton before the final release ticket is closed.

## Out of Scope

- A content management system or database.
- User accounts, analytics dashboards, comments, likes, or project submissions.
- Search, filtering, or sorting the six project cards.
- More than one evidence screenshot per project in the first release.
- Rebuilding the existing project detail route from scratch.
- Claiming that a project is used in production without confirmation.
- Creating fake metrics, fake customer quotes, or placeholder project outcomes.
- Adding a new external image hosting service.

## Further Notes

The first implementation slice should complete one case study end to end, including the shared data shape, the existing detail page, one skeleton image, and its tests. Later tickets can add the remaining case studies and the homepage section without inventing a second page structure.

The feature remains in progress while skeletons are present. The final evidence replacement ticket must be completed before the feature is described as shipped.
