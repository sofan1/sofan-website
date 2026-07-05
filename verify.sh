#!/bin/bash
# Full end-to-end verification of the SOFAN website + Sofia AI chat.
# Runs everything in one shell so the dev server stays alive throughout.
set +e
cd /home/z/my-project

pkill -9 -f "next" 2>/dev/null
sleep 1
rm -f dev.log

# Start dev server detached
setsid bash -c 'cd /home/z/my-project && exec bun x next dev -p 3000 > dev.log 2>&1' < /dev/null &

# Wait for ready
READY=0
for i in $(seq 1 45); do
  code=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000/ 2>/dev/null)
  if [ "$code" = "200" ]; then READY=1; echo "SERVER READY (${i}s)"; break; fi
  sleep 1
done
[ "$READY" = "0" ] && { echo "SERVER FAILED TO START"; tail -20 dev.log; exit 1; }

agent-browser set viewport 1440 900 >/dev/null 2>&1
agent-browser open http://localhost:3000/ 2>&1 | tail -1
sleep 4

echo ""
echo "============================================"
echo "1. PAGE LOAD CHECK"
echo "============================================"
echo "Title: $(agent-browser get title 2>&1 | tail -1)"
echo "Errors: $(agent-browser errors 2>&1 | tail -3)"

echo ""
echo "============================================"
echo "2. OPEN CHAT WIDGET (via eval click)"
echo "============================================"
agent-browser eval "document.querySelector('button[aria-label=\"Open chat with Sofia AI agent\"]')?.click(); 'ok'" 2>&1 | tail -1
sleep 2
CHATINPUT=$(agent-browser snapshot -i 2>&1 | grep -i "type your message" | sed -nE 's/.*\[ref=([^]]+)\].*/@\1/p' | head -1)
echo "Chat input ref: $CHATINPUT"
if [ -z "$CHATINPUT" ]; then echo "FAIL: chat panel did not open"; exit 1; fi
# Verify greeting present
echo "Greeting check: $(agent-browser snapshot 2>&1 | grep -ci "sofia\|how can i help") matches"

echo ""
echo "============================================"
echo "3. SEND MESSAGE -> SOFIA AI RESPONSE"
echo "============================================"
agent-browser fill "$CHATINPUT" "Hi, what services do you offer?" 2>&1 | tail -1
SENDBTN=$(agent-browser snapshot -i 2>&1 | grep -i "send message" | sed -nE 's/.*\[ref=([^]]+)\].*/@\1/p' | head -1)
echo "Send btn ref: $SENDBTN"
agent-browser click "$SENDBTN" 2>&1 | tail -1
echo "Waiting for Sofia AI to respond (up to 20s)..."
for i in $(seq 1 20); do
  sleep 1
  # Count assistant messages (look for service keywords in a fresh snapshot)
  REPLY=$(agent-browser snapshot 2>&1 | grep -ciE "website development|seo campaign|digital marketing|custom web app|how can i help|across the uae")
  if [ "$REPLY" -gt 2 ]; then echo "Sofia responded after ${i}s (keyword hits: $REPLY)"; break; fi
done
echo "--- Messages in chat ---"
agent-browser snapshot 2>&1 | grep -iE "website development|seo|digital marketing|custom web|services|affordable|uae|connect|whatsapp" | head -6
agent-browser screenshot /home/z/my-project/verify-chat-response.png 2>&1 | tail -1

echo ""
echo "============================================"
echo "4. TEST ESCALATION (ask for a quote)"
echo "============================================"
CHATINPUT2=$(agent-browser snapshot -i 2>&1 | grep -i "type your message" | sed -nE 's/.*\[ref=([^]]+)\].*/@\1/p' | head -1)
agent-browser fill "$CHATINPUT2" "I need a price quote for a website" 2>&1 | tail -1
SENDBTN2=$(agent-browser snapshot -i 2>&1 | grep -i "send message" | sed -nE 's/.*\[ref=([^]]+)\].*/@\1/p' | head -1)
agent-browser click "$SENDBTN2" 2>&1 | tail -1
echo "Waiting for escalation response (up to 20s)..."
for i in $(seq 1 20); do
  sleep 1
  ESC=$(agent-browser snapshot 2>&1 | grep -ciE "whatsapp|connect with our team|wa.me|mnsofan1@gmail")
  if [ "$ESC" -gt 1 ]; then echo "Escalation triggered after ${i}s (hits: $ESC)"; break; fi
done
echo "--- Escalation check ---"
agent-browser snapshot 2>&1 | grep -iE "whatsapp|connect|wa.me|email|call" | head -5
agent-browser screenshot /home/z/my-project/verify-escalation.png 2>&1 | tail -1

echo ""
echo "============================================"
echo "5. CONTACT FORM SUBMISSION"
echo "============================================"
agent-browser eval "document.querySelector('#contact')?.scrollIntoView({behavior:'instant'})" >/dev/null 2>&1
sleep 1
NAMEINP=$(agent-browser snapshot -i 2>&1 | grep -i "full name" | sed -nE 's/.*\[ref=([^]]+)\].*/@\1/p' | head -1)
EMAILINP=$(agent-browser snapshot -i 2>&1 | grep -i "^.*email \*" | sed -nE 's/.*\[ref=([^]]+)\].*/@\1/p' | head -1)
MSGINP=$(agent-browser snapshot -i 2>&1 | grep -i "project details" | sed -nE 's/.*\[ref=([^]]+)\].*/@\1/p' | head -1)
echo "name=$NAMEINP email=$EMAILINP msg=$MSGINP"
agent-browser fill "$NAMEINP" "Test User" 2>&1 | tail -1
agent-browser fill "$EMAILINP" "test@example.com" 2>&1 | tail -1
agent-browser fill "$MSGINP" "I need a premium website for my Dubai business." 2>&1 | tail -1
SUBMITBTN=$(agent-browser snapshot -i 2>&1 | grep -i "submit inquiry" | sed -nE 's/.*\[ref=([^]]+)\].*/@\1/p' | head -1)
echo "submit btn: $SUBMITBTN"
agent-browser click "$SUBMITBTN" 2>&1 | tail -1
echo "Waiting for form submission (6s)..."
sleep 6
echo "--- Success check ---"
agent-browser snapshot 2>&1 | grep -iE "thank you|within 2 hours|follow up" | head -3
agent-browser screenshot /home/z/my-project/verify-contact.png 2>&1 | tail -1

echo ""
echo "============================================"
echo "6. RESPONSIVE CHECK (mobile viewport)"
echo "============================================"
agent-browser set viewport 390 844 >/dev/null 2>&1
sleep 1
agent-browser screenshot /home/z/my-project/verify-mobile.png 2>&1 | tail -1
echo "Mobile screenshot saved"

echo ""
echo "============================================"
echo "DONE - all checks executed"
echo "============================================"
echo "Dev log tail:"
tail -8 dev.log
