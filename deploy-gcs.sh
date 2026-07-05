#!/bin/bash
# Deploy the production build to a Google Cloud Storage static website bucket.
#
# Before first use, fill in GCS_BUCKET and GCP_PROJECT below (or export them
# as environment variables). The bucket must be configured to serve
# index.html as both the main page and the 404 page, so client-side routing
# (React Router) works for direct links to any route.

set -e

GCS_BUCKET="${GCS_BUCKET:?Set GCS_BUCKET, e.g. export GCS_BUCKET=ci-mainpage-prod}"
GCP_PROJECT="${GCP_PROJECT:?Set GCP_PROJECT, e.g. export GCP_PROJECT=my-gcp-project-id}"

echo "==> Building..."
npm run build

echo "==> Syncing dist/ to gs://${GCS_BUCKET}..."
gcloud storage rsync dist "gs://${GCS_BUCKET}" --recursive --delete-unmatched-destination-objects --project "${GCP_PROJECT}"

echo "==> Configuring website (index.html as main page and 404 page)..."
gcloud storage buckets update "gs://${GCS_BUCKET}" \
  --web-main-page-suffix=index.html \
  --web-error-page=index.html \
  --project "${GCP_PROJECT}"

echo "==> Deploy complete."
