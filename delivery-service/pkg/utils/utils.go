package utils

import (
	"fmt"
	"log"
)

// FailOnError util function
func FailOnError(err error, errorMsg string, successMsg string) {
	if err != nil {
		log.Fatalf("%s: %s", errorMsg, err)
		panic(fmt.Sprintf("%s: %s", errorMsg, err))
	}

	log.Printf(successMsg)
}