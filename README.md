# Helm Chart - [`cors-proxy`](https://hiteshnayak305.github.io/cors-proxy)

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

## License

This project is licensed under the [MIT License](LICENSE)
