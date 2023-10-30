FROM geopython/pygeoapi:0.15.0

LABEL org.opencontainers.image.authors="Contributors of @ogcapi-js" \
    org.opencontainers.image.description="docker image for e2e tests"

# install curl for healthcheck
RUN apt-get update && \
    apt-get install -y curl && \
    rm -rf /var/lib/apt/lists/*

COPY ./config.yml /pygeoapi/local.config.yml
ADD ./data /pygeoapi/data
