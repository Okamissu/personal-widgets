const WebSocket = require('ws')

// Listen on all interfaces
const wss = new WebSocket.Server({ host: '0.0.0.0', port: 8766 })

let state = null

wss.on('connection', (ws) => {
  // Send current state to newly connected client
  if (state) ws.send(JSON.stringify(state))

  ws.on('message', (msg) => {
    try {
      const newState = JSON.parse(msg)
      state = newState

      // Broadcast to all clients (including sender)
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(newState))
        }
      })
    } catch (e) {
      console.error('Invalid message', e)
    }
  })
})

console.log('WebSocket server running on ws://0.0.0.0:8766')
