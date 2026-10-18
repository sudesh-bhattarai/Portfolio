# Sudesh Bhattarai — Portfolio

A responsive personal portfolio built with Next.js App Router, TypeScript, Tailwind CSS, Motion, and Lucide React.

## Run locally

```bash
npm install
npm run dev
```

## Editable information

- `src/data/personalInfo.ts` — name, role, About paragraphs, links, education, and portrait path.
- Add a portrait as `public/profile-photo.jpg`, then set `photo: '/profile-photo.jpg'` in `src/data/personalInfo.ts`.
- `src/data/projects.ts` — project names, descriptions, image URLs, technologies, and GitHub/demo links.
- `src/data/skills.ts` — skill categories and badges.
- `src/data/achievements.ts` — education-related experience, achievements, and certificate gallery data.
- `src/app/layout.tsx` — page title, description, and Open Graph metadata.
- `src/app/page.tsx` — page structure and the visible section headings, labels, and form messages. Edit this when you want to change what a section says or how it is arranged; update the data files above for your personal details and lists.
- Put your own resume PDF at `public/resume.pdf`; the hero Download Resume button points to `/resume.pdf`.

Replace any social profile URLs before publishing. Only achievement and certificate details supplied in the data file are displayed.

## Certificates

Place public certificate files in the matching folder under `public/certificates/`:

- `technical-programs/` — technical courses, programs, workshops, and seminars.
- `hackathons-competitions/` — hackathons and competition certificates.
- `leadership-mentorship/` — leadership and mentorship certificates.

Then add an entry to the `certificates` array in `src/data/achievements.ts`. Use a unique `id`, a real title and issuer, one category, and a `file` path beginning with `/certificates/` (for example, `/certificates/leadership-mentorship/hackathon-mentorship.pdf`). PDFs and JPG, JPEG, PNG, or WebP images are supported. For a PDF thumbnail, optionally add a separate image under the same folder and set `previewImage` to its public path. Add `featured: true` to sort an actual credential near the beginning of the gallery. A certificate without an uploaded file is listed as awaiting its file and has no broken link.

## Contact form

The contact form is configured with the Formspree endpoint `https://formspree.io/f/xzedyzwo`. The endpoint is a public form identifier, not a secret API key. `.env.local` supplies the setting for local runs. For deployment, set `NEXT_PUBLIC_FORMSPREE_ENDPOINT` to the same endpoint in your hosting provider's environment settings, then rebuild the site. Confirm the recipient address and form activation in your Formspree dashboard; messages are routed according to that form's settings.

## Production build

```bash
npm run build
npm start
```

Project photos use hosted Unsplash image URLs. Replace them in `src/data/projects.ts` with your own images if preferred.
