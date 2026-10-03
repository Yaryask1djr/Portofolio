# Musbahu Abdullahi Iliyasu — Developer Portfolio

A responsive static portfolio presenting full-stack development projects, skills,
SIWES experience, education and contact details. Built with HTML, CSS and JavaScript;
no build system, backend or database is required.

## Projects

- [Tweak Insight Logistics](https://github.com/Yaryask1djr/Tweak-Insight-Logistics): delivery logistics workflows.
- [AGPMS](https://github.com/Yaryask1djr/AGPMS): gate pass management with resident, security and administrator interfaces.
- [This portfolio](https://github.com/Yaryask1djr/Portofolio): responsive frontend development.

Project links point to source repositories. No unverified live demo URLs are advertised.

## Local development

```sh
git clone https://github.com/Yaryask1djr/Portofolio.git
cd Portofolio
python -m http.server 8000
```

Open http://localhost:8000. Check JavaScript syntax with `node --check script.js`.

## Files

- `index.html`: semantic sections, metadata and real profile/project links.
- `style.css`: responsive layouts, light/dark themes, focus styles and reduced motion support.
- `script.js`: accessible menu, persistent theme with storage fallback, active links and optional card reveals.
- `favicon.svg`: portfolio monogram.
- `.github/workflows/pages.yml`: manually triggered GitHub Pages deployment.
- `REVIEW.md`: review findings, fixes and remaining recommendations.

## Deployment

Deployment is prepared but has not been activated or verified on a public host.
The workflow has no push trigger; merging changes does not run this workflow.

After reviewing and merging the changes into `main`:

1. Under repository **Settings → Pages**, choose **GitHub Actions** as the source.
2. Under **Actions**, select **Deploy portfolio to GitHub Pages**.
3. Run the workflow from **main**. It skips all other branches.
4. Open the URL returned by the deployment and check desktop/mobile navigation,
   theme switching, contact links and project links.
5. Enable **Enforce HTTPS** in Pages settings if available.

The expected project URL is `https://yaryask1djr.github.io/Portofolio/`;
it is not presented as a working live site until deployment succeeds.
Only the four public site files and `.nojekyll` are uploaded. Review documents and
repository configuration are excluded from the deployment artifact.

Official setup documentation: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

## Accessibility and reliability

Keyboard focus is visible. Mobile navigation exposes its expanded state and closes
on Escape, link selection, outside clicks and viewport changes. Theme preferences
fall back to the system setting when storage is unavailable. Main content remains
visible without JavaScript or IntersectionObserver, and reduced motion is respected.

Google Fonts and Font Awesome are external dependencies. Text and system font
fallbacks remain usable if these CDNs are unavailable; decorative icons may disappear.
There is no contact form: email links open the visitor's configured mail application.

## Content maintenance

Keep project descriptions accurate and avoid publishing unverified performance or
security claims. Add genuine screenshots, project case studies and a reviewed CV
when available. Confirm personal details and list exact course titles/credentials
before sharing the portfolio with recruiters. Update metadata after choosing a
final domain; no canonical URL is guessed here.

Personal identity and branding belong to Musbahu Abdullahi Iliyasu. This repository
contains no explicit open-source license granting reuse.
