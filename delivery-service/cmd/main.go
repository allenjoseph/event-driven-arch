package cmd

import (
	"encoding/json"
	"log"

	"delivery-service/internal/delivery"
	"delivery-service/internal/order"

	uuid "github.com/google/uuid"
)

// DeliveryEvent struct
type DeliveryEvent struct {
	UUID     string `json:"uuid"`
	Order    string `json:"order"`
	Rider    string `json:"rider"`
}

// OrderEvent struct
type OrderEvent struct {
	UUID    string `json:"uuid"`
	Dish    string `json:"dish"`
	Address string `json:"address"`
	Note    string `json:"note"`
}

// Run for delivery service
func Run() {
	// Connect to DeliveryChannel
	deliveryChannel := delivery.ConnectToDeliveryChannel()
	defer deliveryChannel.Close()

	// Subscribe to OrderCreated topic
	orderChannel := order.SubscribeToTopic("order_created")
	defer orderChannel.Close()

	// Listen OrderCreated events
	for {
		// event looks like: [<topic>, <json event>]
		evt, err := orderChannel.RecvMessage(0)
		if err != nil {
			log.Println(err)
			continue
		}
		log.Printf("Event OrderCreated received! %s", evt[1])

		var order OrderEvent
		err = json.Unmarshal([]byte(evt[1]), &order)
		if err != nil {
			log.Println(err)
			continue
		}

		// Setup Delivery Assignment
		deliveryData := DeliveryEvent{
			UUID:  uuid.New().String(),
			Order: order.UUID,
			Rider: "Allen Joseph",
		}

		deliveryEvt, err := json.Marshal(deliveryData)
		if err != nil {
			log.Println(err)
			continue
		}

		// Push Delivery Assigned Event
		const zmqDontwait = 0;
		result, err := deliveryChannel.Send(string(deliveryEvt), zmqDontwait)
		if err != nil {
			log.Println(err)
		}
		log.Printf("event DeliveryAssigned  pushed! \nmessage id: %d\npayload: %s", result, deliveryEvt)
	}
}
