# Task 3 — Backend Agent Work Record

## Task
Build AI chatbot + contact form APIs for the SOFAN website.

## Files Created
- `src/app/api/chat/route.ts` — Sofia AI chatbot endpoint (POST + GET)
- `src/app/api/contact/route.ts` — Contact form endpoint (POST + GET)

## Endpoints

### POST `/api/chat`
- Request: `{ message: string, sessionId?: string, history?: Array<{role, content}> }`
- Response: `{ reply: string, sessionId: string, escalated: boolean, suggestions: string[] }`
- Behaviour:
  - Uses `z-ai-web-dev-sdk` (`ZAI.create()` → `zai.chat.completions.create({ messages, stream:false, thinking:{type:'disabled'} })`)
  - System prompt = `SOFIA_SYSTEM_PROMPT` (warm, customer-satisfaction, escalation-aware, knows all SOFAN business info + contact details + hours + services).
  - Messages array = [system prompt (role:"assistant"), ...last 8 history, new user msg].
  - Escalation detection (hybrid):
    1. Keyword match on user message (`quote`, `price`, `human`, `manager`, `urgent`, `complaint`, etc.).
    2. Session length ≥ 4 user turns → complex/ongoing conversation.
    3. If LLM reply contains the WhatsApp link → also escalate.
    When escalated, an internal nudge is appended so the model includes both WhatsApp link + email.
  - Persistence: saves user message + assistant reply to `ChatMessage` table with `sessionId` (auto-generated UUID if not provided) and `escalated` flag. DB writes wrapped in try/catch (failures logged, never crash the API).
  - Contextual quick-reply `suggestions` (3 items) based on keyword pools.
  - LLM failure → 500 with friendly fallback message + `escalated:true`.

### POST `/api/contact`
- Request: `{ name, email, phone?, service?, budget?, message, source? }`
- Validates required `name`, `email` (regex), `message` → 400 with `{ error }` on invalid.
- Saves to `ContactSubmission` table; `source` defaults to `"website"`.
- Response: `{ success: true, id }` on 200.

### GET `/api/contact`
- Returns recent submissions (default 50, max 200) for completeness/debugging.

## Verification
- `bun run lint` → passes (no errors).
- GET `/api/chat` → 200, returns service info JSON.
- GET `/api/contact` → 200, returns `{ success, submissions }`.
- POST `/api/contact` → 200 with `{ success:true, id:"cmr..." }` (DB write confirmed).
- POST `/api/chat` (greeting) → 200, Sofia introduces herself, lists services, returns suggestions.
- POST `/api/chat` (quote request) → 200, `escalated:true`, reply contains both `https://wa.me/971552079989` and `mnsofan1@gmail.com`, suggestions switch to escalation set.

## Key Design Decisions
1. **`runtime = "nodejs"` + `dynamic = "force-dynamic"`** on both routes — required for Prisma + SDK in Next.js 16 App Router.
2. **System prompt as first message with role `"assistant"`** — per `z-ai-web-dev-sdk` SKILL.md convention (their `scripts/chat.ts` example uses this pattern).
3. **Non-streaming** LLM call (`stream:false`) — simpler, reliable, fast enough for short replies.
4. **Hybrid escalation** — keyword detection + session-length + LLM-link detection — guarantees the `escalated` flag is set deterministically even if the model occasionally omits the link.
5. **DB failures never crash the API** — all `db.*` calls wrapped in try/catch with `console.error`.
6. **No invented prices** — the system prompt explicitly forbids quoting numbers and forces offer-to-connect for custom quotes.
7. **Bilingual** — system prompt instructs Sofia to respond in Arabic if the customer writes in Arabic.
