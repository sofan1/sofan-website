#!/bin/bash
# Robust dev-server launcher that survives across shell sessions.
# Uses double-fork daemonization to fully detach from the controlling terminal/session.
cd /home/z/my-project

# Kill any existing dev server
pkill -9 -f "next-server" 2>/dev/null
pkill -9 -f "next dev" 2>/dev/null
pkill -9 -f "bun x next" 2>/dev/null
sleep 1
rm -f dev.log

# Double-fork daemonization: parent exits, child reparented to init (PID 1),
# fully detached from any session/terminal so it survives shell exit.
(
  # First fork
  setsid bash -c '
    cd /home/z/my-project
    # Second fork
    nohup bun x next dev -p 3000 > dev.log 2>&1 < /dev/null &
    echo $! > .dev.pid
  ' < /dev/null > /dev/null 2>&1
  exit 0
) &

# Wait for the server to become ready (up to 50s)
READY=0
for i in $(seq 1 50); do
  code=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000/ 2>/dev/null)
  if [ "$code" = "200" ]; then
    READY=1
    echo "SERVER READY (HTTP 200) after ${i}s"
    break
  fi
  sleep 1
done

if [ "$READY" = "0" ]; then
  echo "SERVER FAILED TO START"
  echo "--- dev.log ---"
  tail -20 dev.log 2>/dev/null
  exit 1
fi

echo "PID: $(cat .dev.pid 2>/dev/null)"
ss -tlnp 2>/dev/null | grep 3000 | head -1
