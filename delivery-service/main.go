package main

import (
	serviceDelivery "delivery-service/cmd"
)

func main() {
	keepRunning := make(chan bool)

	serviceDelivery.Run()

	<-keepRunning
}
