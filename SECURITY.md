# Privacy and security

This repository contains only the public sample-data prototype and supporting documentation/checks. It excludes original PDFs, research notes, personal browser data, old Git history, hosting identifiers, and credentials.

## Current protections

- No application accounts, backend, registration integration, analytics/ad scripts, external dependencies, or application-level network requests.
- Browser saving is off for new visitors. When enabled, choices and advisor notes remain in local browser storage until removed by the clear-data control or browser settings.
- Clearing is confirmed and deletes only this application's saved data. Turning off browser saving removes the persisted copy. Downloaded files, printouts, and previously shared copies remain outside the app's control.
- Advisor notes are treated as text and HTML-escaped in exports.
- An embedded Content Security Policy permits only the application's exact inline script hash. It blocks other scripts, inline event handlers, script network connections, objects, frames, workers, forms, and base-URL changes. Inline styles are allowed for this one-file prototype's styling and calendar positions.
- A no-referrer policy and `noopener noreferrer` on catalogue links limit cross-site information sharing.
- A root allowlist in `.gitignore` helps keep unintended files out of future commits. It does not scan or remove secrets already committed; review every change before pushing.

## Limits and safe use

Use sample information only. Browser storage is not encrypted private storage and may be read by another person using the same browser profile, a malicious browser extension, or software on a compromised device. Other sites served from the same GitHub Pages origin can share browser storage access; do not treat different URL paths as security boundaries.

GitHub can process technical request information such as IP addresses. This repository does not configure custom HTTP response headers for GitHub Pages; the browser protections listed above come from the embedded policy. Host-supplied headers and HTTPS must be checked on the actual live deployment. A `_headers` file intended for another hosting provider should not be assumed to apply here.

Public code can be inspected, copied, or forked. Never add access tokens, passwords, API keys, registration PINs, real student records, or private advisor notes to this repository. Protect the creator's GitHub account with two-factor authentication and use a GitHub-provided private commit email address.

## Reporting a concern

For a privacy or security concern, contact the repository owner through a private channel already available to you. Do not publish credentials, personal data, or exploit details in a public issue. If GitHub's private vulnerability-reporting feature is available and enabled, use it.

Automated tests are regression checks, not a security certification or penetration test. Changes to data collection, hosting, scripts, or registration integration require another review.
