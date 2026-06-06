# Farmora AI Helm Chart

This chart deploys the Farmora AI Next.js application to Kubernetes.

## Install

```sh
helm install farmora-ai ./charts/farmora-ai \
  --set image.repository=farmora-ai \
  --set image.tag=latest \
  --set secretEnv.values.OPENAI_API_KEY=your_openai_api_key
```

## Upgrade

```sh
helm upgrade --install farmora-ai ./charts/farmora-ai \
  --set image.repository=your-registry/farmora-ai \
  --set image.tag=latest
```

## Use an Existing Secret

Create a Kubernetes secret that contains `OPENAI_API_KEY`, then install with:

```sh
helm upgrade --install farmora-ai ./charts/farmora-ai \
  --set existingSecretEnv.enabled=true \
  --set existingSecretEnv.secretName=farmora-ai-env \
  --set secretEnv.create=false
```

## Enable Ingress

```sh
helm upgrade --install farmora-ai ./charts/farmora-ai \
  --set ingress.enabled=true \
  --set ingress.className=nginx \
  --set ingress.hosts[0].host=farmora.example.com
```
