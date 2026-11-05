# Weekwise

A student-built prototype that makes choosing a college schedule more visual. Select a major, choose a semester of courses, and compare different ways the same courses could fit into a week.

[Try the live demo](https://barrymamello-njia.github.io/weekwise-schedule-prototype/) · [Privacy and security](SECURITY.md)

## What you can try

- Choose Computer Science, Psychology, or Finance and an applicable degree path.
- Explore compact course options across major foundations and core areas, including art, writing, math, science, and languages.
- Compare Early finish, Slow mornings, and Friday free calendars with distinct course colors and linked Computer Science labs.
- Keep Plan A, B, and C alternatives, add sample advisor questions, and download or print an advisor copy.
- Optionally remember choices in your browser, or clear the demo data.

## Run it yourself

Download this repository and open `index.html` in a modern browser. No installation, account, API key, or server is needed. All styling and application logic are inside this one file.

## Privacy by default

Choices last for the current visit unless you turn on **Remember my demo choices on this browser**. The application does not send course selections or advisor notes to a server. Use sample information only, particularly on shared computers. Downloaded and printed copies include any advisor notes you enter.

The hosting provider may process technical access logs. Public repository code and GitHub profile information are visible to others.

## Prototype limits

This is an independent student project, not affiliated with or endorsed by Fordham University. Course suggestions reference Fordham catalogue sources linked inside the app. Sections and meeting times are fictional, availability is not live, credit caps are team-supplied planning rules, and requirement labels are not a degree audit. The demo does not access university records or submit registrations. Ask your advisor to confirm an actual course plan.

## Editing and checks

After changing the inline JavaScript in `index.html`, run:

```sh
python3 refresh-policy.py
node check.cjs
```

The first command updates the script hash in the browser security policy. Without that update, browsers block a modified script. The checks exercise privacy behavior and startup using DOM test doubles; they are not a full browser test or penetration test.

## GitHub Pages

In repository **Settings → Pages**, choose **Deploy from a branch**, select **main** and **/(root)**, and save. The `.nojekyll` marker serves the static files without Jekyll processing. Use the HTTPS demo link once GitHub reports the deployment is ready.

## Feedback

Try it with sample courses and share usability feedback through this repository. Keep personal academic information, advisor communications, credentials, and student IDs out of issues and pull requests.
