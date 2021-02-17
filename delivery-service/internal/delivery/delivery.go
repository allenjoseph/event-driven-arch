package delivery

import (
	"log"

	"delivery-service/pkg/env"
	"delivery-service/pkg/messaging"
	"delivery-service/pkg/utils"

	zmq "github.com/pebbe/zmq4"
)

// ConnectToDeliveryChannel PUSH socket
func ConnectToDeliveryChannel() (*zmq.Socket) {
	pushAddr := env.GetEnv("ZMQ_PUSH_ADDRESS", "tcp://127.0.0.1:5557")

	log.Printf("ConnectToDeliveryChannel (PUSH socket) starting on %s", pushAddr)
	push, err := messaging.ConnectToPushSocket(pushAddr)
	utils.FailOnError(err, "Socket PUSH failed", "Socket PUSH connected")

	return push
}