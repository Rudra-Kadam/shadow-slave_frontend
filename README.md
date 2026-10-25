# Nightmare Spell — Shadow Slave RAG Companion

> *"Beyond the waking world, knowledge awaits. Dare to seek what lies beyond the shadows."*

An immersive, cinematic dark-fantasy web application and Retrieval-Augmented Generation (RAG) companion inspired by the universe of ***Shadow Slave*** by **Guiltythree**. 

The application serves as a gateway to the Dream Realm, allowing Awakened sleepers to commune with the **Nightmare Spell** to uncover lore regarding characters, aspect abilities, soul cores, nightmares, daemons, and ancient forgotten histories.

---

## Key Features

### 1. The Living Dream Realm (Landing Page)
- **Sculpted Dark-Fantasy Typography**: Monumental `SHADOW SLAVE` title rendered in *Cinzel Decorative* with a multi-stop chiseled platinum-to-slate metallic gradient, ambient eclipse backglow, and a synchronized specular silver light sweep.
- **Living Environmental Depth**: High-fidelity vista of ancient Gothic ruins overlooking dark obsidian waters beneath a crimson horizon flare.
- **Multi-Plane Camera Parallax**: Smooth interpolated mouse tracking (lerp factor `0.04`) providing spatial depth across distant ruins, midground fog, and foreground mist planes.
- **Interactive Cursor Physics**: Ambient floating ash flakes and glowing embers that organically deflect away as the cursor moves across the viewport.

### 2. The Magical Seal Gateway
- **Runic Seal Matrix**: A multi-tiered arcane dial positioned behind the primary CTA, featuring cardinal astrolabe ticks, an octagram star, and ancient runic inscriptions (`᚛ ᚜ ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ ᛇ ᛈ ᛉ ᛋ ᛏ ᛒ ᛖ ᛗ ᛚ ᛜ ᛞ ᛟ ✦`).
- **Interactive Hover Pulses**: Awakens from dormant slumber ($40\%$ opacity) to heightened violet/crimson luminescence ($85\%$ opacity) on cursor hover.
- **Portal Expansion**: On click, runes ignite into incandescent radiance, shockwave resonance rings ripple outward, and the circle expands into the full-screen portal transition.

### 3. Logarithmic Portal Transition
- **Continuous Flow**: Layered transition that softly dissolves the landing scenery without abrupt cuts or blank frames.
- **Converging Particle Vortex**: Glowing embers and shadow filaments spiral inward toward the center singularity.
- **Rotating Astrolabe Rings**: Counter-rotating celestial rings orbiting the central Spell sigil.
- **Narrative Phasing**: Sequences through canonical lore milestones: *"The shadows stir..."* $\rightarrow$ *"Memories converge. The Dream Realm opens."* before iris-expanding into the chat view.

### 4. Nightmare Spell Conversational Interface
- **Stateful Arcane Sigil**: Replaces generic robot avatars with an animated mystical emblem:
  - **Settled State**: Serene breathing glow and slow $45\text{s}$ astrolabe rotation beside answers.
  - **Retrieving State**: Accelerates dual-ring rotation, surges in brightness, and pulses with shockwave rings during memory retrieval.
  - **Responding State**: Rhythmic, organic harmonic heartbeat as knowledge manifests.
- **Exact Welcome Message**: Canonical greeting delivered upon arrival into the Dream Realm.
- **Suggested Inquiries**: Interactive chips for instant exploration (*"Who is Sunny?"*, *"Explain the Nightmare Spell"*, *"How do Aspect Abilities work?"*, *"Explore the Dream Realm"*).
- **Multiline Message Composer**: Auto-expanding textarea (`Enter` to commune, `Shift + Enter` for new lines) with active ember and wisp particle generators rising from its borders during query processing.
- **Memories Unearthed (Citations)**: Collapsible source fragment accordion revealing novel volumes, chapter identifiers, and quoted text passages.
- **Chronicles Drawer**: Collapsible sidebar on desktop and mobile for recalling past communions or exploring bookmarked lore codex entries.

### 5. Realm Shift / Nightmare Mode
- A header toggle allowing users to shift seamlessly between:
  - **Dream Realm Aesthetic**: Obsidian canvas (`#080A0F`), deep slate borders (`#20283A`), spell-violet glows (`#A78BFA`), and crimson horizon flares (`#C74352`).
  - **Waking World Aesthetic**: Deep oceanic navy (`#0B1120`), luminous titanium slate (`#1E2D4A`), celestial azure accents (`#38BDF8`), and radiant solar gold highlights (`#F59E0B`).

---

## Architecture & Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | React 19 + TypeScript | Component-driven UI and strict type safety |
| **Build Tool** | Vite 8 | Ultra-fast local development and production bundling |
| **Styling** | Tailwind CSS v4 | Dark-fantasy custom theme and CSS transitions |
| **Typography** | Cinzel Decorative & Plus Jakarta Sans | High fantasy display paired with readable body prose |
| **Icons** | Lucide React | Functional, affordance-only interface controls |
| **Graphics** | HTML5 Canvas + Scalable Vector Graphics | Particle vortex, living ash/embers, and runic dials |

---

## Future Python RAG Backend Integration

The frontend is architected with a clean boundary between the mock demonstration engine and the future Python RAG backend:

- **Configured Endpoint**: `POST /api/chat`
- **Environment Variable**: `VITE_API_BASE_URL`

### Request Contract

```json
{
  "question": "Who is Sunny?",
  "conversation_id": "session_1792897306000"
}
```

### Response Contract

```json
{
  "answer": "Sunless, commonly known as Sunny, is an Awakened and later Saint bearing the True Name Lost from Light...",
  "conversation_id": "session_1792897306000",
  "sources": [
    {
      "title": "Shadow Slave — Volume 1: Children of Fate",
      "chapter": "Chapter 14: Lost from Light",
      "text": "The Spell whispered in his ear, voice cold and melodious: [Your True Name is Lost from Light. Your Aspect is Divine: Shadow Slave.]"
    }
  ]
}
```

When `VITE_API_BASE_URL` is unset, the application automatically runs in **Dream Archive Mock Mode**, utilizing the built-in lore repository (`src/data/loreKnowledge.ts`).

---

## Directory Structure

```
├── .env.example                     # Environment variables template
├── index.html                       # HTML entry point with Google Fonts
├── metadata.json                    # AI Studio applet metadata
├── package.json                     # Dependencies and build scripts
├── tsconfig.json                    # TypeScript compiler configuration
├── vite.config.ts                   # Vite configuration
└── src/
    ├── assets/
    │   └── images/                  # High-fidelity Dream Realm concept art
    ├── components/
    │   ├── ChatComposer.tsx         # Auto-growing multiline message composer
    │   ├── ChatHeader.tsx           # Navigation bar with Realm Shift toggle
    │   ├── ChatLayout.tsx           # Full conversation stream and state manager
    │   ├── ChatMessageItem.tsx      # Assistant & user messages with source accordion
    │   ├── ComposerEmberParticles.tsx # Glowing embers particle effect generator
    │   ├── ConversationSidebar.tsx  # Chronicles drawer and grimoire bookmarks
    │   ├── DreamRealmBackground.tsx # Living parallax background with ash/ember canvas
    │   ├── DreamRealmTransition.tsx # Logarithmic particle vortex transition
    │   ├── EmblemSigil.tsx          # Stateful animated Nightmare Spell emblem
    │   ├── EnterDreamRealmButton.tsx # Magical seal Gateway button
    │   ├── LandingPage.tsx          # Full-viewport cinematic landing page
    │   ├── SourceReferences.tsx     # "Memories Unearthed" collapsible citations
    │   └── SuggestedQuestions.tsx   # Fast exploration chips
    ├── data/
    │   └── loreKnowledge.ts         # Lore database for Sunny, Nephis, Spell rules, etc.
    ├── services/
    │   ├── chatService.ts           # Python backend API connector & fallback dispatcher
    │   └── mockChatService.ts       # Isolated mock response service
    ├── types/
    │   └── chat.ts                  # TypeScript models (Messages, Sources, Sessions)
    ├── App.tsx                      # Root component managing application stages
    ├── index.css                    # Tailwind CSS v4 theme variables and animations
    └── main.tsx                     # React DOM entry point
```

---

## Getting Started

### Prerequisites
- Node.js (v18.0 or higher recommended)
- npm or yarn

### Installation
```bash
# Clone the repository and install dependencies
npm install
```

### Running the Development Server
```bash
npm run dev
```
The app will be accessible at `http://localhost:3000`.

### Type Checking & Linting
```bash
npm run lint
```

### Production Build
```bash
npm run build
```

---

## Configuration

Copy `.env.example` to `.env`:

```bash
# Optional: Set to your running Python RAG backend URL
# Leave empty to utilize the built-in isolated lore repository
VITE_API_BASE_URL=""
```

---

## Credits & Attribution

- **Universe & Lore**: Inspired by ***Shadow Slave***, written by **Guiltythree**.
- **Design Philosophy**: Cinematic on entry, immersive in conversation, trustworthy in its answers.
