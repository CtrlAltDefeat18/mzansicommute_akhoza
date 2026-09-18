MzansiMove web project
======================

MzansiMove is a pre pilot mobility venture led by Ayanda Khoza.

The first pilot is planned for Makhanda in the Eastern Cape.

The route, operational partners and verified traction are still to be confirmed.

Google Cloud Shell setup
========================

Upload the packaged tar file to Google Cloud Shell.

Open the Cloud Shell terminal and extract the archive.

```bash
tar -xzf MzansiMove_Cloud_Shell.tar.gz
cd mzansimove
npm ci
npm run dev
```

Cloud Shell will print a local port, normally port 3000.

Use the Web preview menu and select Preview on port 3000.

Editing workflow
================

Open the Cloud Shell editor from the toolbar.

The main page content is in app/page.tsx.

The design system is in app/globals.css.

Site metadata is in app/layout.tsx.

Changes should refresh automatically while the development server runs.

Validation
==========

Run the production build before sharing or deploying changes.

```bash
npm run build
```

Current product status
======================

The website is a pre pilot portfolio and landing page.

Its scorecard values are labelled as targets rather than verified traction.

The contact form is a front end prototype and does not yet send messages.

Founder inputs still needed
===========================

Confirm the final biography and founder photograph.

Confirm the Allan Gray competition name and approved award wording.

Confirm the public email address and desired contact form destination.

Confirm the pilot route and participating operators.

Confirm which traction figures may be published.

Confirm a domain name and social media links.
