# GitHub contributions on the homepage

## Goal

Add a compact GitHub contribution calendar to the homepage as supporting evidence of ongoing development activity.

## Approved design

Use `react-github-calendar` in a new `GitHubContributions` component. Render the component after the Experience section and before Certificates.

The calendar will use the public GitHub username `Rappykyun`, show the default last year, and inherit the existing light and dark theme. GitHub private contributions will appear only in the anonymized form that GitHub exposes on the public profile when the profile setting is enabled. The portfolio will not use a token or server side GitHub integration.

The section will have a clear heading and a short explanation. It will use the library's loading and error behavior, remain responsive on small screens, and avoid adding a year picker or custom controls.

## Data flow

The client component fetches contribution data through the library after hydration. No private repository names, contribution details, or credentials are sent to the portfolio.

## Error behavior

If the contribution request fails, the calendar's existing error state will render without blocking the rest of the homepage. The homepage remains usable when GitHub or the contribution service is unavailable.

## Testing

Add a small source level regression test that confirms the homepage renders the new section in the intended order and that the component uses the approved username. Run the existing tests, the new test, lint, and the production build.

## Scope

Included: one dependency, one homepage component, homepage placement, responsive styling, and one regression test.

Excluded: private GitHub API authentication, contribution history controls, custom data fetching, animations, and changes to the projects or contact pages.
