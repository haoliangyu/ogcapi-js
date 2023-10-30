FROM geopython/pygeoapi:0.15.0

LABEL maintainer="https://github.com/haoliangyu/ogcapi-js" \
    description="docker image for e2e tests"

# install curl for healthcheck
RUN apt-get update && \
    apt-get install -y curl && \
    rm -rf /var/lib/apt/lists/*

COPY ./config.yml /pygeoapi/local.config.yml
ADD ./data /pygeoapi/data
