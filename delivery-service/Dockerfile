# builder
FROM golang:alpine AS builder
RUN apk update && apk add zeromq-dev

WORKDIR /go/src/delivery-service
COPY . .
RUN go install

# runner
FROM alpine
WORKDIR /usr/bin
COPY --from=builder /go/bin .
