package com.rrms.rrms.runner;

import com.corundumstudio.socketio.SocketIOServer;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class SocketIOServerRunner implements CommandLineRunner {

    private final SocketIOServer socketIOServer;

    public SocketIOServerRunner(SocketIOServer socketIOServer) {
        this.socketIOServer = socketIOServer;
    }

    @Override
    public void run(String... args) throws Exception {
        socketIOServer.start();
        Runtime.getRuntime().addShutdownHook(new Thread(socketIOServer::stop));
    }
}
