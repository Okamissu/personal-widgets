#!/bin/bash
cd /home/okamisu/Documents/pomotable-widget

# Run WS server and HTTP server in background
node ws-server.js &
python3 -m http.server 8765 --bind 0.0.0.0 &

# Wait for both processes to keep the script alive
wait
