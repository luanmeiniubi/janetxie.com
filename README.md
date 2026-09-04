# Janet Xie — Instructional Design Portfolio

A flat, yellow-forward portfolio built from your real Wix content. No build step — just HTML, CSS, and a little JS.

## Files
| File | What it is |
|------|-----------|
| `index.html` | Home — intro, tools, featured work, testimonials |
| `about.html` | Bio, education, toolkit, and the "Let's Connect" contact form |
| `work.html` | Full portfolio grid, grouped like your original site (Instructional Design / Education & Curriculum Design) |
| `case-*.html` | One page per project (8 total) — see below |
| `styles.css` | All styling. Colors/fonts live in the `:root` block at the top |
| `script.js` | Mobile menu, scroll reveal, contact form handler |

## Case study pages
- `case-bias-free-selling.html` — Bias-Free Selling (AI-powered sales training)
- `case-braking-barriers.html` — Braking Barriers (car buying for women)
- `case-oli-torus.html` — OLI Torus onboarding hub
- `case-job-aid.html` — Supporting the ID Community (AWS hosting guide)
- `case-lego.html` — LEGO Charades!
- `case-netlogo.html` — Particles World (NetLogo models)
- `case-talk-it-up.html` — Talk It Up! (small talk course)
- `case-tutor.html` — Engaging 1v1 Tutor (Mi'An Education)

## Design system
- **Yellow-forward, flat, no gradients or emoji** — solid color blocks (yellow / coral / sage / plum / slate), hard borders, offset drop-shadows on buttons and cards, chevron `‹‹‹ back` links. Headings use Space Grotesk (bold, graphic); body text uses Inter.
- To change the accent palette, edit the `:root` variables at the top of `styles.css` (`--yellow`, `--coral`, `--sage`, `--plum`, `--slate`).
- Project cards cycle through `.on-yellow`, `.on-coral`, `.on-sage`, `.on-plum`, `.on-slate` classes — swap classes on any `.project-card` to change its color.

## Still to fill in
Search for **`EDIT`** comments in the HTML — there are only a few left:
1. **Headshot** — drop a `headshot.jpg` in this folder, then replace `<span class="initials">JX</span>` in `index.html` and `about.html` with `<img src="headshot.jpg" alt="Janet Xie" />`.
2. **Résumé** — add `resume.pdf` to this folder (the download button already points to it).
3. **LinkedIn URL** — the `#` placeholders in the nav/footer/about "Connect" section need your real profile link.

## Make the contact form actually send email
The form on `about.html` is front-end only right now. Easiest fix (free):
1. Sign up at [formspree.io](https://formspree.io) and create a form.
2. In `about.html`, set `<form id="contact-form" action="https://formspree.io/f/XXXX" method="POST">`.
3. Delete the `#contact-form` handler block at the bottom of `script.js` (it currently intercepts submission to show a placeholder message).

## Preview it locally
Double-click `index.html`, or run a local server for cleaner relative-link behavior:
```bash
cd "New_Portfolio/Website"
python3 -m http.server 8000
# then open http://localhost:8000
```

## Publish it (free options)
- **GitHub Pages** — push this folder to a repo, enable Pages in settings.
- **Netlify / Vercel** — drag-and-drop this folder onto their dashboard.
- **Cloudflare Pages** — connect the repo or upload directly.
- Or follow your own guide in `case-job-aid.html` and self-host on AWS S3.
