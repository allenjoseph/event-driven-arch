package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"

	uuid "github.com/google/uuid"
	zmq "github.com/pebbe/zmq4"
)

// Delivery struct
type Delivery struct {
	UUID     string `json:"uuid"`
	Order    string `json:"order"`
	Delivery string `json:"delivery"`
}

// Order struct
type Order struct {
	UUID    string `json:"uuid"`
	Dish    string `json:"dish"`
	Address string `json:"address"`
	Note    string `json:"note"`
}

func main() {
	// Connect to PUSH Socket
	pushHost := getEnv("PUSH_HOST", "127.0.0.1")
	pushPort := getEnv("PUSH_PORT", "5557")
	pushAddr := fmt.Sprintf("tcp://%s:%s", pushHost, pushPort)
	push, err := connectToPushSocket(pushAddr)
	if err != nil {
		log.Fatal(err)
	}
	defer push.Close()
	log.Printf("[DELIVERY_SERVICE] Socket PUSH connected on %s", pushAddr)

	// Connect to SUB Socket
	subHost := getEnv("SUB_HOST", "127.0.0.1")
	subPort := getEnv("SUB_PORT", "5555")
	subAddr := fmt.Sprintf("tcp://%s:%s", subHost, subPort)
	domainEvent := "order_created"
	sub, err := connectToSubSocket(subAddr, domainEvent)
	if err != nil {
		log.Fatal(err)
	}
	defer sub.Close()
	log.Printf("[DELIVERY_SERVICE] Socket SUB connected on %s", subAddr)

	for {
		// Listen Order Created Events
		// event looks like: [<topic>, <json event>]
		evt, err := sub.RecvMessage(0)
		if err != nil {
			log.Println(err)
			break
		}
		log.Printf("[DELIVERY_SERVICE] Order created event received! %s", evt)

		var order Order
		err = json.Unmarshal([]byte(evt[1]), &order)
		if err != nil {
			log.Println(err)
			continue
		}

		// Setup Delivery Assignment
		deliveryData := Delivery{
			UUID:     uuid.New().String(),
			Order:    order.UUID,
			Delivery: "Allen Joseph",
		}

		deliveryEvt, err := json.Marshal(deliveryData)
		if err != nil {
			log.Println(err)
			continue
		}

		// Push Delivery Assigned Event
		result, err := push.Send(string(deliveryEvt), 0)
		if err != nil {
			log.Println(err)
		}
		log.Printf("[DELIVERY_SERVICE] Delivery assigned event pushed! (%d)(%s)", result, deliveryEvt)
	}
}

func connectToSubSocket(addr string, filter string) (*zmq.Socket, error) {
	socket, err := zmq.NewSocket(zmq.SUB)
	if err != nil {
		return nil, err
	}

	err = socket.SetSubscribe(filter)
	if err != nil {
		return nil, err
	}

	err = socket.Connect(addr)
	if err != nil {
		return nil, err
	}

	return socket, nil
}

func connectToPushSocket(addr string) (*zmq.Socket, error) {
	socket, err := zmq.NewSocket(zmq.PUSH)
	if err != nil {
		return nil, err
	}

	err = socket.Connect(addr)
	if err != nil {
		return nil, err
	}

	return socket, nil
}

func getEnv(key string, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}
