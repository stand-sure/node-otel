#! /usr/bin/env bash
if [[ $(docker ps | grep jaeger | wc -l) -gt 0 ]]; then 
  echo "jaeger already running"
elif [[ $(docker container ls -a | grep jaeger | wc -l) -gt 0 ]]; then
 echo "jaeger container exists -- starting it..."
 docker start jaeger
else
  echo "starting new instance..."
  docker run -d \
    --name jaeger \
    -e COLLECTOR_ZIPKIN_HTTP_PORT=9411 \
    -e COLLECTOR_OTLP_ENABLED=true \
    -p 5775:5775/udp      `# Agent Zipkin Thrift Compact UDP` \
    -p 6831:6831/udp      `# Agent Jaeger Thrift Compact UDP` \
    -p 6832:6832/udp      `# Agent Jaeger Thrift Binary UDP` \
    -p 5778:5778          `# Agent Config Server HTTP` \
    -p 16686:16686        `# ui` \
    -p 14268:14268        `# Collector HTTP` \
    -p 14250:14250        `# Collector GRPC` \
    -p 9411:9411          `# Collector Zipkin` \
    -p 4317:4317          `# otlp` \
    -p 4318:4318          `# otlp` \
    -p 14271:14271        `# Agent Admin HTTP - metrics, health` \
    jaegertracing/all-in-one:1.35
fi
