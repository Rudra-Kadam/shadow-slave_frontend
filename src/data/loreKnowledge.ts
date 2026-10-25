import { Source } from '../types/chat';

export interface LoreEntry {
  keywords: string[];
  title: string;
  answer: string;
  sources: Source[];
}

export const SHADOW_SLAVE_KNOWLEDGE: LoreEntry[] = [
  {
    keywords: ['sunny', 'sunless', 'lost from light', 'protagonist', 'main character'],
    title: 'Sunless (Lost from Light)',
    answer: `Sunless, commonly known as Sunny, is an Awakened and later Saint bearing the True Name **Lost from Light**. Originating from the impoverished outskirts of NQSC (North Quadrant Suburb Central), he was infected by the Nightmare Spell on his sixteenth birthday.

Upon conquering his First Nightmare in the mountain pass against the Mountain King, Sunny received a **Divine Aspect: Shadow Slave**, directly tied to the mysterious and forgotten Shadow God.

Key Attributes:
• **True Name:** Lost from Light
• **Aspect Rank:** Divine (Shadow Slave)
• **Flaw:** Clear Conscience — Sunny is incapable of speaking a falsehood; every spoken word must be literal truth.
• **Attributes:** Fated, Shadow Mark, Blood Weave, Bone Weave, Soul Weave, Marble Shell.
• **Shadows:** Unlike ordinary Awakened with Echoes, Sunny can transform slain shadows into sentient companion shadows (such as Saint, Nightmare, Soul Serpent, and Fiend).`,
    sources: [
      {
        title: 'Shadow Slave — Volume 1: Children of Fate',
        chapter: 'Chapter 14: Lost from Light',
        text: 'The Spell whispered in his ear, voice cold and melodious: [Your True Name is Lost from Light. Your Aspect is Divine: Shadow Slave.]'
      },
      {
        title: 'Shadow Slave — Volume 1: Children of Fate',
        chapter: 'Chapter 22: Clear Conscience',
        text: 'He tried to open his mouth and say that he was someone else, but the words withered in his throat. The Spell had decreed: he could never speak a lie again.'
      }
    ]
  },
  {
    keywords: ['nightmare spell', 'spell', 'what is the spell', 'how does it work', 'origin of spell'],
    title: 'The Nightmare Spell',
    answer: `The **Nightmare Spell** is a cosmic magical phenomenon that infected humanity after the Cataclysm decades ago. It acts as an arbitrator of ascension, pulling sleepers into the Dream Realm or subjecting them to Trials known as "Nightmares."

Structure & Progression:
• **First Nightmare:** The initial trial that a mundane human undergoes in their sleep. Passing it grants an Aspect, a Flaw, and makes them a Sleeper.
• **The Dream Realm:** Sleepers awaken in the Dream Realm. To return to the Waking World, they must find and conquer a Gateway or Seed of Nightmare.
• **Ascension Ranks:**
  1. Sleeper (Dormant)
  2. Awakened
  3. Master (Ascended)
  4. Saint (Transcendent)
  5. Sovereign / King (Supreme)
  6. Sacred
  7. Divine

Origin: The Nightmare Spell is not a natural disaster, but the final, terrifying masterwork of **Weaver, the Daemon of Fate**, designed to prepare mortals to inherit the shattered legacy of the dead Gods.`,
    sources: [
      {
        title: 'Shadow Slave — Volume 2: The Forgotten Shore',
        chapter: 'Chapter 105: The Nature of the Spell',
        text: 'The Spell is neither evil nor kind. It is a crucible. Those who survive its fire are forged into something greater, while the weak are consumed.'
      },
      {
        title: 'Shadow Slave — Volume 4: The Chained Isles',
        chapter: 'Chapter 450: The Daemon of Fate',
        text: 'Weaver spun a web across reality itself, weaving strings of destiny into what humanity would one day call the Nightmare Spell.'
      }
    ]
  },
  {
    keywords: ['aspect', 'abilities', 'how do aspect abilities work', 'rank', 'flaw', 'true name'],
    title: 'Aspect Abilities, Flaws, and Ranks',
    answer: `In the world of the Nightmare Spell, every Awakened individual possesses a personal magic system governed by their **Aspect**, **Flaw**, and potentially a **True Name**.

Core Components:
• **Aspect:** The specific magical affinity and potential granted by the Spell (e.g., Shadow Slave, Light Bringer, Clairvoyant). Aspects range in rank from Dormant, Awakened, Ascended, Transcendent, Supreme, Sacred, to Divine.
• **Aspect Rank:** Dictates the qualitative power, complexity, and number of abilities an individual unlocks as their core saturates with soul essence.
• **Flaw:** The fundamental balance of existence enforced by the Spell. Power is never given freely; every Aspect is bound to an immutable weakness (e.g., Sunny cannot lie; Nephis experiences agonizing burning pain whenever she heals or uses light).
• **True Name:** An exceedingly rare recognition granted by the Spell to those who perform impossible feats of defiance or will against fate. A True Name grants special destiny and protection, but also leaves its bearer vulnerable if bound by an ancient master-slave command.`,
    sources: [
      {
        title: 'Shadow Slave — Volume 1: Children of Fate',
        chapter: 'Chapter 28: Soul Cores and Flaws',
        text: 'Balance is the absolute rule of the world. For every blessing the Spell bestows, a curse must be endured. There is no power without sacrifice.'
      },
      {
        title: 'Shadow Slave — Volume 3: The Crimson Spire',
        chapter: 'Chapter 345: The Weight of a Name',
        text: 'A True Name is the sound the universe makes when it remembers who you are.'
      }
    ]
  },
  {
    keywords: ['dream realm', 'explore the dream realm', 'forgotten shore', 'chained isles', 'godgrave'],
    title: 'The Dream Realm & Regions',
    answer: `The **Dream Realm** is a desolate, shattered multiverse of ruined divine domains existing parallel to the Waking World. When humans fall asleep after their First Nightmare, their souls are pulled into this perilous expanse.

Noteworthy Regions:
• **The Forgotten Shore:** A cursed wasteland surrounded by the Dark Sea—an ocean of pitch-black liquid that rises every night, harboring colossal Great and Corrupted abominations. At its center stands the ancient City of the Sun and the Crimson Spire.
• **The Chained Isles:** A shattered archipelago of floating islands tethered together by colossal iron chains in the Sky Below. Home to the Ivory Tower and the Crushing.
• **Godgrave:** A gigantic battlefield across the skeleton of a fallen god, where sunlight incinerates all living flesh and the shadow of the god\'s bones is the only refuge.
• **The Tomb of Ariel:** An impossibly massive pyramid carved into the Great River, built by Ariel, the Daemon of Dread, where time flows in endless cycles.`,
    sources: [
      {
        title: 'Shadow Slave — Volume 2: The Forgotten Shore',
        chapter: 'Chapter 89: The Dark Sea',
        text: 'When night falls upon the Forgotten Shore, the black water rises to swallow stone, bone, and soul alike. Only the ancient ramparts offer salvation.'
      },
      {
        title: 'Shadow Slave — Volume 5: The Tomb of Ariel',
        chapter: 'Chapter 1204: The Great River',
        text: 'A river of time that has no beginning and no end, winding through the colossal mausoleum of the Daemon of Dread.'
      }
    ]
  },
  {
    keywords: ['nephis', 'changing star', 'immortal flame', 'light bringer'],
    title: 'Nephis (Changing Star)',
    answer: `**Nephis**, known by her True Name **Changing Star**, is the sole survivor of the legendary Immortal Flame clan. She is Sunny\'s comrade, rival, and the lodestar of the cohort that conquered the Forgotten Shore.

Key Details:
• **True Name:** Changing Star
• **Aspect Rank:** Divine (Light Bringer / Nephilim)
• **Flaw:** Passion — Her holy flames bring immense restorative healing and destructive power, but every ember she channels inflicts excruciating, mind-shattering pain upon her own soul.
• **Goal:** To destroy the Nightmare Spell entirely, holding it responsible for the destruction of her family and civilization.
• **Relationship with Sunny:** Linked by Sunny\'s Shadow Slave attribute, forming one of the most complex, tragic, and profound dynamics in the story.`,
    sources: [
      {
        title: 'Shadow Slave — Volume 1: Children of Fate',
        chapter: 'Chapter 72: Changing Star',
        text: 'She stood bathed in immaculate white radiance, a lone star burning defiantly against the encroaching darkness of the forgotten world.'
      },
      {
        title: 'Shadow Slave — Volume 3: The Crimson Spire',
        chapter: 'Chapter 350: The Cost of Fire',
        text: 'Her hands trembled as the incandescent flames restored flesh and bone, each spark of healing tearing through her own nerves with unimaginable torment.'
      }
    ]
  },
  {
    keywords: ['cassie', 'cassia', 'song of the fallen', 'prophet', 'clairvoyant'],
    title: 'Cassie (Song of the Fallen)',
    answer: `**Cassie (Cassia)**, bearing the True Name **Song of the Fallen**, is a member of the original cohort. Stricken blind during her First Nightmare, the Spell compensated her with terrifying vision into destiny.

Key Details:
• **Aspect:** Clairvoyant (Sacred Rank)
• **Flaw:** Blindness — Cassie cannot perceive the physical world with mundane eyes.
• **Role:** The architect of prophecies. In the Forgotten Shore, her early vision of a dancer bowing to an incandescent star set the tragic course of Sunny and Nephis\'s binding into motion, a burden that defined her life as she manipulated fate to atone.`,
    sources: [
      {
        title: 'Shadow Slave — Volume 2: The Forgotten Shore',
        chapter: 'Chapter 140: Sight in the Darkness',
        text: 'I cannot see the ground beneath my feet, Sunny... but I can see where our footprints lead in the dust of tomorrow.'
      }
    ]
  },
  {
    keywords: ['weaver', 'daemon of fate', 'lineage', 'blood weave', 'bone weave'],
    title: 'Weaver & The Daemons',
    answer: `**Weaver, the Daemon of Fate**, is the firstborn and most enigmatic of the Seven Daemons. Unlike the Gods who represented fundamental forces of reality, the Daemons were born from the unknown void or flaws of creation.

Weaver\'s Lineage:
Sunny inadvertently consumes fragments of Weaver\'s physical and conceptual legacy throughout his ascension:
1. **Blood Weave:** Grants complete immunity to biological corruption and unyielding vitality.
2. **Bone Weave:** Transforms Sunny\'s skeletal structure into indestructible dark ivory, allowing superhuman endurance.
3. **Soul Weave:** Hardens and fortifies his soul core and essence threads.
4. **Flesh Weave & Mind Weave:** Further aspects of the forbidden tapestry Weaver left behind.

The Daemons also include **Hope** (Daemon of Desire), **Ariel** (Daemon of Dread), **Nether** (Daemon of Destiny/Stone), and **Oblivion**.`,
    sources: [
      {
        title: 'Shadow Slave — Volume 2: The Forgotten Shore',
        chapter: 'Chapter 168: Blood Weave',
        text: 'A drop of golden ichor burned into his veins. The Spell spoke: [You have consumed a drop of Weaver\'s blood. Blood Weave awakened.]'
      },
      {
        title: 'Shadow Slave — Volume 4: The Chained Isles',
        chapter: 'Chapter 512: The Seventh Daemon',
        text: 'Even the Gods feared Weaver, for who could fight against the one who writes the script of destiny itself?'
      }
    ]
  },
  {
    keywords: ['mordret', 'prince of war', 'reflection', 'mirrors'],
    title: 'Mordret (Prince of Nothing)',
    answer: `**Mordret**, also known as the Prince of Nothing, is the disowned son of Sovereign Anvil of Valor and one of the most terrifying entities in the Dream Realm.

Key Traits:
• **Aspect:** Sacred Aspect of Reflections/Mirrors.
• **Abilities:** Mordret has no fixed physical body. He inhabits mirrors and reflections, capable of possessing the souls of anyone whose eyes catch a reflective surface, slaughtering their inner soul core from within.
• **Nature:** A psychological tactician whose schemes span decades, Mordret\'s terrifying threat lies in his complete disregard for mortal life and his relentless vendetta against the Great Clans.`,
    sources: [
      {
        title: 'Shadow Slave — Volume 4: The Chained Isles',
        chapter: 'Chapter 602: In the Mirror',
        text: 'Never look into his eyes in the dark, and never trust a mirror when the reflection smiles before you do.'
      }
    ]
  }
];

export function queryLoreDatabase(question: string): LoreEntry {
  const normalized = question.toLowerCase();

  for (const entry of SHADOW_SLAVE_KNOWLEDGE) {
    for (const kw of entry.keywords) {
      if (normalized.includes(kw)) {
        return entry;
      }
    }
  }

  // Atmospheric default response
  return {
    keywords: ['default'],
    title: 'Echoes of the Dream Realm',
    answer: `The shadows ripple across the ruined pillars of the Forgotten Shore. 

While that specific memory is veiled within the deeper layers of the Dream Realm, the **Nightmare Spell** observes your curiosity. The world of *Shadow Slave* is shaped by the struggle of the Awakened against the Nightmare corruption, the legacy of dead Gods, the machinations of the Daemons, and the eternal clash between light and shadow.

Feel free to inquire deeper regarding:
• **Key Figures:** Sunny (Lost from Light), Nephis (Changing Star), Cassie, or Mordret.
• **Systems:** Soul Cores, Aspect Abilities, Flaws, Memories, and True Names.
• **Cosmology:** The Seven Gods, Weaver's Lineage, the Dream Realm, and the Great Clans (Valor, Song, House of Night).`,
    sources: [
      {
        title: 'Chronicles of the Nightmare Spell',
        chapter: 'Archive: The Tapestry of Fate',
        text: 'The threads of destiny are innumerable. Every question asked draws a strand from the void, awaiting the one who dares to unweave it.'
      }
    ]
  };
}
