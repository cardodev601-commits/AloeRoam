# AloeRoam Website

Official public website for AloeRoam, built with Next.js and deployed with Vercel.

Primary website:

https://aloeroam.app

## Brand palette

- Aloe Deep: `#174D3A`
- Aloe Green: `#2F7D5B`
- Young Aloe: `#77B77D`
- Karoo Gold: `#E5A93D`
- Cloud White: `#FCFDFC`

## Website routes

The project is designed to provide these public routes:

- `/` - AloeRoam homepage
- `/privacy-policy` - Privacy Policy
- `/terms` - Terms of Use
- `/support` - Support and FAQs
- `/email-verified` - Email verification landing page
- `/password-reset` - Password recovery landing page

## Expected project structure

```text
aloeroam-web/
├── package.json
├── public/
└── src/
    └── app/
        ├── globals.css
        ├── layout.js
        ├── page.js
        ├── privacy-policy/
        │   └── page.js
        ├── terms/
        │   └── page.js
        ├── support/
        │   └── page.js
        ├── email-verified/
        │   └── page.js
        └── password-reset/
            └── page.js
```

## Local setup

### 1. Install Node.js

Install a current Node.js release suitable for your Next.js project.

Check the installed versions:

```bash
node --version
npm --version
```

### 2. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd aloeroam-web
```

If the project is already on your computer, open a terminal in the project directory instead.

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL reported by Next.js in your browser.

## Test the important pages locally

Check each route before deployment:

```text
/
/privacy-policy
/terms
/support
/email-verified
/password-reset
```

Verify that:

- The homepage loads without errors.
- AloeRoam colours and styling are applied.
- Footer links open the correct pages.
- Privacy Policy and Terms pages are readable on desktop and mobile.
- Support links work.
- Email Verified displays correctly.
- Password Reset displays correctly.

## Production build check

Before pushing changes, run:

```bash
npm run build
```

Resolve any build errors before deploying.

If your project has a lint script, also run:

```bash
npm run lint
```

## Commit changes to Git

```bash
git status
git add .
git commit -m "Update AloeRoam website"
git push
```

Use an appropriate commit message for the changes being deployed.

## Vercel deployment

The AloeRoam website can be connected to a Git repository in Vercel.

For the existing Vercel project, pushing to the production branch should trigger a deployment according to the project's Vercel Git configuration.

After deployment, open the Vercel project and confirm that the production deployment completed successfully.

## Vercel domains

The intended primary public domain is:

```text
aloeroam.app
```

Recommended domain setup:

```text
aloeroam.app
www.aloeroam.app
```

Both domains should be added to the AloeRoam Vercel project.

DNS records in Cloudflare should use the exact values shown by Vercel for each domain. Keep the Vercel domain configuration and Cloudflare DNS configuration aligned.

After DNS is configured, verify both:

```text
https://aloeroam.app
https://www.aloeroam.app
```

## Cloudflare

AloeRoam DNS is managed through Cloudflare.

When changing DNS:

1. Open the AloeRoam domain in Cloudflare.
2. Open DNS records.
3. Compare each required record with the value shown by Vercel.
4. Save the changes.
5. Recheck the domain status in Vercel.
6. Test the HTTPS URL in a browser.

Do not guess Vercel DNS targets. Use the values displayed for the domain in the Vercel project.

## Supabase authentication URLs

After the AloeRoam website routes are deployed and tested, the public website can be used for authentication-related redirects.

Intended website URLs include:

```text
https://aloeroam.app
https://aloeroam.app/email-verified
https://aloeroam.app/password-reset
```

The mobile password recovery flow also uses the AloeRoam app deep-link scheme:

```text
aloeroam://reset-password
```

The React Native app and Supabase configuration must both be configured consistently before relying on the deep link in production.

## Password recovery page

The `/password-reset` website page contains an action intended to open:

```text
aloeroam://reset-password
```

The website page itself does not replace the React Native password-entry screen. The AloeRoam mobile app must handle the deep link and route the user to the existing ResetPasswordScreen.

## Email verification page

The public verification landing page is:

```text
https://aloeroam.app/email-verified
```

Test the complete Supabase verification flow after changing authentication redirect settings.

## Website styling

Global website styling lives in:

```text
src/app/globals.css
```

The stylesheet contains:

- AloeRoam colour variables
- Homepage hero styling
- Buttons
- Feature cards
- Provider section
- Footer
- Legal page styles
- Email verification status styles
- Password recovery status styles
- Responsive mobile rules
- Keyboard focus styles
- Reduced-motion handling

## Metadata

Global Next.js metadata is configured in:

```text
src/app/layout.js
```

It currently uses AloeRoam branding and `https://aloeroam.app` as the website base URL.

## Adding a new page

With the Next.js App Router, create a folder under `src/app` and add a `page.js` file.

Example structure:

```text
src/app/about/page.js
```

This creates the route:

```text
/about
```

## Release checklist

Before a production website update:

- [ ] `npm install` completes successfully.
- [ ] `npm run dev` starts successfully.
- [ ] Homepage renders correctly.
- [ ] Privacy Policy page works.
- [ ] Terms page works.
- [ ] Support page works.
- [ ] Email Verified page works.
- [ ] Password Reset page works.
- [ ] Navigation links work.
- [ ] Mobile layout looks correct.
- [ ] `npm run build` succeeds.
- [ ] Changes are committed to Git.
- [ ] Changes are pushed to the repository.
- [ ] Vercel production deployment succeeds.
- [ ] `https://aloeroam.app` loads correctly.
- [ ] `https://www.aloeroam.app` behaves as intended.
- [ ] Supabase redirect URLs point to the final AloeRoam URLs.
- [ ] Password recovery is tested from email through to the React Native app.
- [ ] Email verification is tested end to end.

## Security notes

- Do not commit Supabase service-role keys or other server secrets to the repository.
- Do not expose private credentials in browser-side JavaScript.
- Keep `.env*` files containing real secrets out of Git unless the specific file is intentionally safe to publish.
- Configure production environment variables through the appropriate deployment environment rather than hardcoding secrets.
- Never ask users to send passwords or recovery credentials through the support page.

## AloeRoam

Discover local events, promotions and services around you.
