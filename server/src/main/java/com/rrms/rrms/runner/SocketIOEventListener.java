package com.rrms.rrms.runner;

import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.annotation.OnEvent;
import org.springframework.stereotype.Component;

@Component
public class SocketIOEventListener {

    private final SocketIOServer socketIOServer;

    public SocketIOEventListener(SocketIOServer socketIOServer) {
        this.socketIOServer = socketIOServer;
    }

    @OnEvent("newReview")
    public void onNewReview(SocketIOServer client, String reviewData) {
        System.out.println("Received new review: " + reviewData);
        // Broadcast the event to all clients
        socketIOServer.getBroadcastOperations().sendEvent("newReview", reviewData);
    }
}
