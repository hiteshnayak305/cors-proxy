# Helm Chart - [`cors-proxy`](https://hiteshnayak305.github.io/cors-proxy)

[![Artifact Hub](https://img.shields.io/endpoint?url=https://artifacthub.io/badge/repository/cors-proxy)](https://artifacthub.io/packages/search?repo=cors-proxy)

This helm chart provides deployment of cors-proxy to bypass cors strict requests.

## Installing this chart

You can install the `cors-proxy` chart with Helm v3:

```console
helm repo add cors-proxy https://hiteshnayak305.github.io/cors-proxy
helm install cors-proxy cors-proxy/cors-proxy -f values.yaml --create-namespace --namespace cors-proxy
```

You can also include it in as dependency of helm chart in `Chart.yml` as:

```yaml
dependencies:
  - name: cors-proxy
    repository: https://hiteshnayak305.github.io/cors-proxy
    version: x.x.x
    condition: cors-proxy.enabled
```

## Usage

Pull and run docker image

```console
docker pull ghcr.io/hiteshnayak305/cors-proxy:$version
docker run -p 3000:3000 ghcr.io/hiteshnayak305/cors-proxy:$version
```

You can access application at `localhost:3000/proxy?url=<destination-url>`.

## License

This project is licensed under the [MIT License](LICENSE)
