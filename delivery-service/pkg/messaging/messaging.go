package messaging

import (
	zmq "github.com/pebbe/zmq4"
)

// ConnectToSubSocket connect to zmq sub socket
func ConnectToSubSocket(addr string, filter string) (*zmq.Socket, error) {
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

// ConnectToPushSocket connect to zmq push socket
func ConnectToPushSocket(addr string) (*zmq.Socket, error) {
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
