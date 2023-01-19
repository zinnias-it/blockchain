const Websocket = require("ws");
const P2P_PORT = process.env.P2P_PORT || 5001;
// const peers = process.env.PEERS ? process.env.PEERS.split(",") : [];
const peers = ["ws://localhost:5001", "ws://localhost:5002"];

class P2pServer {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.sockets = [];
  }

  listen() {
    console.log("Listening for peer-to-peer connections on: " + P2P_PORT);
    try {
      const server = new Websocket.Server({ port: P2P_PORT });
      server.on("connection", (socket) => this.connectSocket(socket));
      this.connectToPeers();
    } catch (error) {
      console.log(error);
    }
  }

  connectToPeers() {
    try {
      peers.forEach((peer) => {
        const socket = new Websocket(peer);
        socket.on("open", () => this.connectSocket(socket));
      });
    } catch (error) {
      console.log(error);
    }
  }

  connectSocket(socket) {
    try {
      this.sockets.push(socket);
      console.log("Socket connected");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = P2pServer;
