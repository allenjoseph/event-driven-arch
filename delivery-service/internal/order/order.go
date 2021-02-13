package order

import (
	"log"

	"delivery-service/pkg/env"
	"delivery-service/pkg/messaging"
	"delivery-service/pkg/utils"

	zmq "github.com/pebbe/zmq4"
)

// SubscribeToTopic SUB socket
func SubscribeToTopic(topic string) (*zmq.Socket) {
	subAddr := env.GetEnv("ZMQ_SUB_ADDRESS", "tcp://127.0.0.1:5555")

	log.Printf("ChannelOrderCreated (SUB socket) starting on %s", subAddr)
	sub, err := messaging.ConnectToSubSocket(subAddr, topic)
	utils.FailOnError(err, "Socket SUB failed", "Socket SUB connected")

	return sub
}