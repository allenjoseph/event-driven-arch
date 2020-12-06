# builder
FROM golang:alpine AS builder
RUN apk update && apk add zeromq-dev alpine-sdk

WORKDIR /go/src/delivery-service
COPY . .
RUN go install

# runner
FROM alpine
RUN apk update && apk add zeromq-dev alpine-sdk
WORKDIR /usr/bin
COPY --from=builder /go/bin .
