// ============================================================
// COACHELLA 2026 — COMPLETE LINEUP & VIDEO DATA
// Design: Cinematic Desert Dusk
// ============================================================

export type Stage = 'Coachella Stage' | 'Outdoor Theatre' | 'Sahara' | 'Mojave' | 'Gobi' | 'Sonora' | 'Yuma' | 'Quasar';
export type Day = 'friday' | 'saturday' | 'sunday';

export interface Artist {
  id: string;
  name: string;
  stage: Stage;
  day: Day;
  isHeadliner?: boolean;
  setTime?: string;
  genre?: string;
  description?: string;
  // Weekend 1: actual Coachella 2026 performance videos
  w1Videos?: { title: string; videoId: string }[];
  // Weekend 2: recent live performance preview videos
  w2PreviewVideos?: { title: string; videoId: string; note?: string }[];
  guestAppearances?: string[];
  imageUrl?: string;
}

// ============================================================
// WEEKEND 1 — COACHELLA STAGE (MAIN STAGE)
// ============================================================
export const coachellaStageArtists: Artist[] = [
  // FRIDAY
  {
    id: 'sabrina-carpenter',
    name: 'Sabrina Carpenter',
    stage: 'Coachella Stage',
    day: 'friday',
    isHeadliner: true,
    setTime: '9:45 PM',
    genre: 'Pop',
    description: 'Sabrina Carpenter headlined Friday night with a spectacular set featuring celebrity guests Will Ferrell, Susan Sarandon, Samuel L. Jackson, and more.',
    guestAppearances: ['Will Ferrell', 'Susan Sarandon', 'Samuel L. Jackson', 'Sam Elliot', 'Corey Fogelmanis'],
    w1Videos: [
      { title: 'Espresso — Live at Coachella 2026', videoId: 'hp5O72WUqTk' },
      { title: 'House Tour — Live at Coachella 2026', videoId: 'x5qCbLcWgps' },
      { title: 'Sugar Talking — Live at Coachella 2026', videoId: 'Czh7--grltA' },
      { title: 'Full Performance — Coachella 2026', videoId: 'i3TKJbr_dTw' },
    ],
    w2PreviewVideos: [
      { title: 'Short n\' Sweet Tour Full Show', videoId: 'hp5O72WUqTk', note: 'Full concert tour performance' },
    ],
  },
  {
    id: 'the-xx',
    name: 'The xx',
    stage: 'Coachella Stage',
    day: 'friday',
    setTime: '8:00 PM',
    genre: 'Indie / Electronic',
    description: 'The xx delivered an intimate yet powerful set on the main stage, showcasing their signature minimalist sound.',
    w1Videos: [
      { title: 'Intro — Live at Coachella 2026', videoId: 'UvRxaZH7DUY' },
      { title: 'I Dare You — Live at Coachella 2026', videoId: 'CUKGTJmDAzk' },
    ],
    w2PreviewVideos: [
      { title: 'The xx — Live at Glastonbury', videoId: 'UvRxaZH7DUY', note: 'Recent full show' },
    ],
  },
  {
    id: 'teddy-swims',
    name: 'Teddy Swims',
    stage: 'Coachella Stage',
    day: 'friday',
    setTime: '6:35 PM',
    genre: 'R&B / Soul',
    description: 'Teddy Swims brought his powerhouse vocals to the main stage with surprise guests Joe Jonas, Vanessa Carlton, and David Lee Roth.',
    guestAppearances: ['Joe Jonas', 'Vanessa Carlton', 'David Lee Roth'],
    w1Videos: [
      { title: 'Mr. Know It All — Live at Coachella 2026', videoId: 'WOui79-lRec' },
      { title: 'ft. Vanessa Carlton — A Thousand Miles — Live at Coachella 2026', videoId: 'P165ULqzSB8' },
      { title: 'ft. Joe Jonas — When You Look At Me in the Eyes', videoId: '3xgvvV-wu28' },
    ],
    w2PreviewVideos: [
      { title: 'Teddy Swims — Live Concert 2025', videoId: 'WOui79-lRec', note: 'Full live show' },
    ],
  },
  {
    id: 'record-safari',
    name: 'Record Safari',
    stage: 'Coachella Stage',
    day: 'friday',
    setTime: '4:30 PM',
    genre: 'Electronic / DJ',
    description: 'Record Safari opened the main stage on Friday with an energetic DJ set.',
    w1Videos: [],
    w2PreviewVideos: [],
  },

  // SATURDAY
  {
    id: 'justin-bieber',
    name: 'Justin Bieber',
    stage: 'Coachella Stage',
    day: 'saturday',
    isHeadliner: true,
    setTime: '9:45 PM',
    genre: 'Pop',
    description: 'Justin Bieber\'s long-awaited return to the stage was one of the most talked-about sets of the festival. He performed new music alongside classic hits, with guests The Kid Laroi, Dijon, Tems, and Wizkid.',
    guestAppearances: ['The Kid Laroi', 'Dijon', 'Tems', 'Wizkid'],
    w1Videos: [
      { title: 'Daisies — Live at Coachella 2026', videoId: 'He9WmjUvpJ8' },
      { title: 'SPEED DEMON — Live at Coachella 2026', videoId: 'VkbT0a0VW7c' },
      { title: 'EVERYTHING HALLELUJAH — Live at Coachella 2026', videoId: 'ZnWMyve5Ey8' },
      { title: 'Full Performance — Coachella 2026', videoId: 'tzJLdsOqeQg' },
    ],
    w2PreviewVideos: [
      { title: 'Justin Bieber — Full Coachella 2026 Set', videoId: 'tzJLdsOqeQg', note: 'Full Weekend 1 performance' },
    ],
  },
  {
    id: 'the-strokes',
    name: 'The Strokes',
    stage: 'Coachella Stage',
    day: 'saturday',
    setTime: '8:00 PM',
    genre: 'Indie Rock',
    description: 'The Strokes delivered a career-spanning set on the main stage, reminding everyone why they are one of rock\'s most essential bands.',
    w1Videos: [
      { title: 'Reptilia — Live at Coachella 2026', videoId: 'GXVidwXrAzs' },
      { title: 'The Adults Are Talking — Live at Coachella 2026', videoId: 'OPPRgfnuRhw' },
      { title: 'Hard to Explain — Live at Coachella 2026', videoId: 'uBaKCE9bMrM' },
    ],
    w2PreviewVideos: [
      { title: 'The Strokes — Live at MSG 2024', videoId: 'GXVidwXrAzs', note: 'Recent full show' },
    ],
  },
  {
    id: 'giveon',
    name: 'Giveon',
    stage: 'Coachella Stage',
    day: 'saturday',
    setTime: '6:30 PM',
    genre: 'R&B / Soul',
    description: 'Giveon\'s deep baritone voice filled the main stage, with a surprise appearance from Kehlani.',
    guestAppearances: ['Kehlani'],
    w1Videos: [
      { title: 'KEEPER — Live at Coachella 2026', videoId: 'OIFrNsGyhAQ' },
    ],
    w2PreviewVideos: [
      { title: 'Giveon — Live Concert 2025', videoId: 'OIFrNsGyhAQ', note: 'Recent live performance' },
    ],
  },
  {
    id: 'addison-rae',
    name: 'Addison Rae',
    stage: 'Coachella Stage',
    day: 'saturday',
    setTime: '5:00 PM',
    genre: 'Pop / Dance',
    description: 'Addison Rae\'s pop performance featured a surprise appearance from Maddie Ziegler.',
    guestAppearances: ['Maddie Ziegler'],
    w1Videos: [
      { title: 'Diet Pepsi — Live at Coachella 2026', videoId: 'OSUGAnIjCEA' },
      { title: 'Von Dutch (A.G. Cook Remix) — Live at Coachella 2026', videoId: 'gULO59yMmBU' },
      { title: 'Aquamarine / Arcamarine — Live at Coachella 2026', videoId: 'Oh9JBciXFA8' },
    ],
    w2PreviewVideos: [
      { title: 'Addison Rae — Live Performance 2026', videoId: 'OSUGAnIjCEA', note: 'Recent live show' },
    ],
  },
  {
    id: 'jaqck-glam',
    name: 'Jaqck Glam',
    stage: 'Coachella Stage',
    day: 'saturday',
    setTime: '4:00 PM',
    genre: 'Pop',
    description: 'Jaqck Glam opened the main stage on Saturday.',
    w1Videos: [],
    w2PreviewVideos: [],
  },

  // SUNDAY
  {
    id: 'karol-g',
    name: 'Karol G',
    stage: 'Coachella Stage',
    day: 'sunday',
    isHeadliner: true,
    setTime: '9:55 PM',
    genre: 'Reggaeton / Latin Pop',
    description: 'Karol G made history as the first Latina artist to headline Coachella, delivering an epic 26-song set with guests Mariah Angeliq, Becky G, Wisin, and Greg Gonzalez.',
    guestAppearances: ['Mariah Angeliq', 'Becky G', 'Wisin', 'Greg Gonzalez'],
    w1Videos: [
      { title: 'Provenza — Live at Coachella 2026', videoId: 'SxLiEZA18X8' },
      { title: 'Tropicoqueta — Live at Coachella 2026', videoId: 'NeScCD1E0S8' },
      { title: 'Bandida Entrenada — Live at Coachella 2026', videoId: 'fI-BaP8VEJY' },
      { title: 'FULL PERFORMANCE — Coachella 2026', videoId: 'L00BH6cdKcY' },
    ],
    w2PreviewVideos: [
      { title: 'KAROL G — Full Coachella 2026 Set', videoId: 'L00BH6cdKcY', note: 'Full Weekend 1 performance' },
    ],
  },
  {
    id: 'young-thug',
    name: 'Young Thug',
    stage: 'Coachella Stage',
    day: 'sunday',
    setTime: '7:50 PM',
    genre: 'Hip-Hop / Trap',
    description: 'Young Thug\'s triumphant return to the stage featured surprise guests Nav, Camila Cabello, and Ty Dolla Sign.',
    guestAppearances: ['Nav', 'Camila Cabello', 'Ty Dolla Sign'],
    w1Videos: [
      { title: 'Lifestyle (feat. Rich Homie Quan) — Live at Coachella 2026', videoId: '6d8eQE92xZk' },
      { title: 'Havana with Camila Cabello — Live at Coachella 2026', videoId: 'mwbFnI9lVbw' },
    ],
    w2PreviewVideos: [
      { title: 'Young Thug — Live at Coachella 2026', videoId: '6d8eQE92xZk', note: 'Weekend 1 performance' },
    ],
  },
  {
    id: 'major-lazer',
    name: 'Major Lazer',
    stage: 'Coachella Stage',
    day: 'sunday',
    setTime: '6:10 PM',
    genre: 'Electronic / Dance',
    description: 'Major Lazer brought their signature high-energy party vibes with a surprise appearance from M.I.A.',
    guestAppearances: ['M.I.A.'],
    w1Videos: [
      { title: 'MINI SKIRT — Live at Coachella 2026', videoId: 'tF0MDodznPE' },
      { title: 'Lean On — Live at Coachella 2026', videoId: '3nH1iYYn9SY' },
    ],
    w2PreviewVideos: [
      { title: 'Major Lazer — Live at Coachella 2026', videoId: 'tF0MDodznPE', note: 'Weekend 1 performance' },
    ],
  },
  {
    id: 'wet-leg',
    name: 'Wet Leg',
    stage: 'Coachella Stage',
    day: 'sunday',
    setTime: '4:45 PM',
    genre: 'Indie Rock',
    description: 'Wet Leg brought their witty, angular indie rock to the main stage with a guest appearance from HorsegiirL.',
    guestAppearances: ['HorsegiirL'],
    w1Videos: [
      { title: 'CPR — Live at Coachella 2026', videoId: '7r52xlpmPX8' },
      { title: 'mangetout — Live at Coachella 2026', videoId: 'WZpe5l_f8EM' },
    ],
    w2PreviewVideos: [
      { title: 'Wet Leg — Live at Coachella 2026', videoId: '7r52xlpmPX8', note: 'Weekend 1 performance' },
    ],
  },
  {
    id: 'tijuana-panthers',
    name: 'Tijuana Panthers',
    stage: 'Coachella Stage',
    day: 'sunday',
    setTime: '3:30 PM',
    genre: 'Indie Rock / Surf',
    description: 'Tijuana Panthers opened the main stage on Sunday.',
    w1Videos: [
      { title: 'Creature — Live at Coachella 2026', videoId: 'rqnVjq7xm6k' },
    ],
    w2PreviewVideos: [],
  },
];

// ============================================================
// WEEKEND 1 — OUTDOOR THEATRE
// ============================================================
export const outdoorTheatreArtists: Artist[] = [
  // FRIDAY
  { id: 'disclosure', name: 'Disclosure', stage: 'Outdoor Theatre', day: 'friday', setTime: '10:35 PM', genre: 'Electronic / House',
    description: 'Disclosure closed out the Outdoor Theatre on Friday with their signature deep house sound.',
    w1Videos: [{ title: 'Disclosure — Live at Coachella 2026', videoId: 'NPijQ_jkyoA' }],
    w2PreviewVideos: [{ title: 'Disclosure — Live at Coachella 2026', videoId: 'NPijQ_jkyoA', note: 'Full Weekend 1 set' }] },
  { id: 'turnstile', name: 'Turnstile', stage: 'Outdoor Theatre', day: 'friday', setTime: '8:05 PM', genre: 'Hardcore / Post-Punk',
    description: 'Turnstile delivered one of the most energetic sets of the weekend.',
    w1Videos: [], w2PreviewVideos: [] },
  { id: 'dijon', name: 'Dijon', stage: 'Outdoor Theatre', day: 'friday', setTime: '6:40 PM', genre: 'R&B / Soul',
    description: 'Dijon\'s soulful performance was a highlight of Friday at the Outdoor Theatre.',
    w1Videos: [], w2PreviewVideos: [] },
  { id: 'lykke-li', name: 'Lykke Li', stage: 'Outdoor Theatre', day: 'friday', setTime: '5:20 PM', genre: 'Indie Pop',
    description: 'Lykke Li brought her ethereal indie pop to the Outdoor Theatre.',
    w1Videos: [], w2PreviewVideos: [] },

  // SATURDAY
  { id: 'david-byrne', name: 'David Byrne', stage: 'Outdoor Theatre', day: 'saturday', setTime: '10:20 PM', genre: 'Art Rock / New Wave',
    description: 'Talking Heads legend David Byrne delivered a theatrical, career-spanning performance.',
    w1Videos: [], w2PreviewVideos: [] },
  { id: 'labrinth', name: 'Labrinth', stage: 'Outdoor Theatre', day: 'saturday', setTime: '8:30 PM', genre: 'Electronic / R&B',
    description: 'Labrinth\'s cinematic performance was a visual and sonic spectacle.',
    w1Videos: [], w2PreviewVideos: [] },
  { id: 'sombr', name: 'Sombr', stage: 'Outdoor Theatre', day: 'saturday', setTime: '7:00 PM', genre: 'Indie Pop',
    description: 'Sombr\'s set featured a surprise appearance from Billy Corgan.',
    guestAppearances: ['Billy Corgan'],
    w1Videos: [], w2PreviewVideos: [] },
  { id: 'alex-g', name: 'Alex G', stage: 'Outdoor Theatre', day: 'saturday', setTime: '5:30 PM', genre: 'Indie Rock',
    description: 'Alex G brought his lo-fi indie rock to the Outdoor Theatre.',
    w1Videos: [], w2PreviewVideos: [] },
  { id: 'blondshell', name: 'Blondshell', stage: 'Outdoor Theatre', day: 'saturday', setTime: '4:00 PM', genre: 'Alt-Rock',
    description: 'Blondshell opened the Outdoor Theatre on Saturday with her grunge-influenced alt-rock.',
    w1Videos: [], w2PreviewVideos: [] },

  // SUNDAY
  { id: 'bigbang', name: 'BigBang', stage: 'Outdoor Theatre', day: 'sunday', setTime: '10:30 PM', genre: 'K-Pop',
    description: 'K-Pop legends BigBang closed out the Outdoor Theatre on Sunday in a historic performance.',
    w1Videos: [], w2PreviewVideos: [] },
  { id: 'laufey', name: 'Laufey', stage: 'Outdoor Theatre', day: 'sunday', setTime: '8:40 PM', genre: 'Jazz Pop / Indie',
    description: 'Laufey\'s enchanting jazz-pop performance was one of the most beloved sets of the weekend.',
    w1Videos: [], w2PreviewVideos: [] },
  { id: 'foster-the-people', name: 'Foster the People', stage: 'Outdoor Theatre', day: 'sunday', setTime: '6:45 PM', genre: 'Indie Pop / Rock',
    description: 'Foster the People proved they still got it with a high-energy set including Pumped Up Kicks.',
    w1Videos: [{ title: 'Pumped Up Kicks — Live at Coachella 2026', videoId: 'bcOwuxRa3YE' }],
    w2PreviewVideos: [{ title: 'Foster the People — Live at Coachella 2026', videoId: 'bcOwuxRa3YE', note: 'Weekend 1 performance' }] },
  { id: 'clipse', name: 'Clipse', stage: 'Outdoor Theatre', day: 'sunday', setTime: '5:15 PM', genre: 'Hip-Hop',
    description: 'Clipse\'s reunion set featured a surprise appearance from Travis Barker.',
    guestAppearances: ['Travis Barker'],
    w1Videos: [], w2PreviewVideos: [] },
  { id: 'gigi-perez', name: 'Gigi Perez', stage: 'Outdoor Theatre', day: 'sunday', setTime: '4:00 PM', genre: 'Folk / Indie',
    description: 'Gigi Perez opened the Outdoor Theatre on Sunday with her intimate folk-pop sound.',
    guestAppearances: ['Bella Perez', 'Noah Cyrus'],
    w1Videos: [], w2PreviewVideos: [] },
];

// ============================================================
// WEEKEND 1 — SAHARA TENT
// ============================================================
export const saharaArtists: Artist[] = [
  // FRIDAY
  { id: 'sexyy-red', name: 'Sexyy Red', stage: 'Sahara', day: 'friday', setTime: '12:05 AM', genre: 'Hip-Hop / Rap',
    description: 'Sexyy Red closed out the Sahara on Friday night with a surprise from Lizzo.',
    guestAppearances: ['Lizzo'],
    w1Videos: [{ title: 'Looking For The Hoes — Live at Coachella 2026', videoId: 'BIwqNJcwUAc' }],
    w2PreviewVideos: [{ title: 'Sexyy Red — Live at Coachella 2026', videoId: 'BIwqNJcwUAc', note: 'Weekend 1 performance' }] },
  { id: 'swae-lee', name: 'Swae Lee', stage: 'Sahara', day: 'friday', setTime: '10:50 PM', genre: 'Hip-Hop / R&B',
    description: 'Swae Lee brought his melodic trap sound with guests Jhené Aiko and Nav.',
    guestAppearances: ['Jhené Aiko', 'Nav'],
    w1Videos: [], w2PreviewVideos: [] },
  { id: 'katseye', name: 'Katseye', stage: 'Sahara', day: 'friday', setTime: '7:15 PM', genre: 'K-Pop / Pop',
    description: 'First-time Coachella performers Katseye brought their K-Pop energy to the Sahara.',
    guestAppearances: ['Huntrix (Ejae, Audrey Nuna, Rei Ami)'],
    w1Videos: [], w2PreviewVideos: [] },
  { id: 'hugel', name: 'Hugel', stage: 'Sahara', day: 'friday', setTime: '5:45 PM', genre: 'Electronic / House',
    description: 'Hugel\'s set featured surprise guests Snoop Dogg and Big Sean.',
    guestAppearances: ['Snoop Dogg', 'Big Sean'],
    w1Videos: [], w2PreviewVideos: [] },

  // SATURDAY
  { id: 'nine-inch-noize', name: 'Nine Inch Noize', stage: 'Sahara', day: 'saturday', setTime: '8:00 PM', genre: 'Industrial / Electronic',
    description: 'Nine Inch Nails and Boys Noize performed together as Nine Inch Noize, an extended version of their Peel It Back Tour collaboration.',
    w1Videos: [
      { title: 'Heresy — Live at Coachella 2026', videoId: 'C3cLOE6Phms' },
      { title: 'Closer — Live at Coachella 2026', videoId: 'Vm6k0geoynQ' },
    ],
    w2PreviewVideos: [{ title: 'Nine Inch Noize — Live at Coachella 2026', videoId: 'C3cLOE6Phms', note: 'Weekend 1 performance' }] },
  { id: 'worship', name: 'Worship', stage: 'Sahara', day: 'saturday', setTime: '10:00 PM', genre: 'Electronic / Techno',
    description: 'Worship delivered a dark, hypnotic electronic set at the Sahara.',
    w1Videos: [], w2PreviewVideos: [] },
  { id: 'rezz', name: 'Rezz', stage: 'Sahara', day: 'saturday', setTime: '6:15 PM', genre: 'Electronic / Techno',
    description: 'Rezz\'s hypnotic set was a fan favorite at the Sahara tent.',
    w1Videos: [], w2PreviewVideos: [] },

  // SUNDAY
  { id: 'kaskade', name: 'Kaskade', stage: 'Sahara', day: 'sunday', setTime: '10:30 PM', genre: 'Electronic / Progressive House',
    description: 'Kaskade closed out the Sahara on Sunday with an epic progressive house set.',
    w1Videos: [], w2PreviewVideos: [] },
  { id: 'subtronics', name: 'Subtronics', stage: 'Sahara', day: 'sunday', setTime: '8:45 PM', genre: 'Bass / Dubstep',
    description: 'Subtronics brought the bass with a surprise from Destroy Lonely.',
    guestAppearances: ['Destroy Lonely'],
    w1Videos: [], w2PreviewVideos: [] },
];

// ============================================================
// WEEKEND 1 — MOJAVE TENT
// ============================================================
export const mojaveArtists: Artist[] = [
  // FRIDAY
  { id: 'blood-orange', name: 'Blood Orange', stage: 'Mojave', day: 'friday', setTime: '4:10 PM', genre: 'Art Pop / R&B',
    description: 'Blood Orange opened the Mojave tent on Friday with his genre-defying art pop.',
    w1Videos: [], w2PreviewVideos: [] },
  { id: 'ethel-cain', name: 'Ethel Cain', stage: 'Mojave', day: 'friday', setTime: '5:20 PM', genre: 'Gothic Pop / Americana',
    description: 'Ethel Cain\'s hauntingly beautiful set was one of the most talked-about performances of the weekend.',
    w1Videos: [], w2PreviewVideos: [] },
  { id: 'central-cee', name: 'Central Cee', stage: 'Mojave', day: 'friday', setTime: '7:30 PM', genre: 'UK Rap / Drill',
    description: 'Central Cee brought UK drill to the California desert in a high-energy set.',
    w1Videos: [], w2PreviewVideos: [] },
  { id: 'bini', name: 'Bini', stage: 'Mojave', day: 'friday', setTime: '6:20 PM', genre: 'OPM / Pop',
    description: 'Bini made history as the first Filipino group to perform at Coachella, trending #1 worldwide.',
    w1Videos: [], w2PreviewVideos: [] },

  // SATURDAY
  { id: 'interpol', name: 'Interpol', stage: 'Mojave', day: 'saturday', setTime: '9:00 PM', genre: 'Post-Punk / Indie Rock',
    description: 'Interpol delivered a brooding, atmospheric set at the Mojave tent.',
    w1Videos: [], w2PreviewVideos: [] },
  { id: 'pinkpantheress', name: 'PinkPantheress', stage: 'Mojave', day: 'saturday', setTime: '7:30 PM', genre: 'Hyperpop / Dance',
    description: 'PinkPantheress brought her viral internet pop sound with guests Tyriq Withers and Thundercat.',
    guestAppearances: ['Tyriq Withers', 'Thundercat'],
    w1Videos: [], w2PreviewVideos: [] },
  { id: 'jack-white', name: 'Jack White', stage: 'Mojave', day: 'saturday', setTime: '9:00 PM', genre: 'Rock / Blues',
    description: 'Jack White was added as a surprise addition to the lineup, delivering a raw and electrifying rock set.',
    w1Videos: [], w2PreviewVideos: [] },

  // SUNDAY
  { id: 'fka-twigs', name: 'FKA Twigs', stage: 'Mojave', day: 'sunday', setTime: '9:30 PM', genre: 'Art Pop / R&B',
    description: 'FKA Twigs finally performed at Coachella after her 2025 cancellation, delivering a breathtaking avant-garde performance.',
    w1Videos: [], w2PreviewVideos: [] },
  { id: 'iggy-pop', name: 'Iggy Pop', stage: 'Mojave', day: 'sunday', setTime: '8:00 PM', genre: 'Punk Rock',
    description: 'The godfather of punk, Iggy Pop, delivered a legendary set at the Mojave tent.',
    w1Videos: [], w2PreviewVideos: [] },
  { id: 'little-simz', name: 'Little Simz', stage: 'Mojave', day: 'sunday', setTime: '6:30 PM', genre: 'UK Hip-Hop',
    description: 'Little Simz brought her critically acclaimed UK hip-hop to the Mojave tent.',
    w1Videos: [], w2PreviewVideos: [] },
];

// ============================================================
// WEEKEND 1 — GOBI TENT
// ============================================================
export const gobiArtists: Artist[] = [
  // FRIDAY
  { id: 'creepy-nuts', name: 'Creepy Nuts', stage: 'Gobi', day: 'friday', setTime: '6:00 PM', genre: 'J-Rap',
    description: 'Japanese rap duo Creepy Nuts brought their viral "Bling-Bang-Bang-Born" energy to Coachella.',
    w1Videos: [], w2PreviewVideos: [] },
  { id: 'holly-humberstone', name: 'Holly Humberstone', stage: 'Gobi', day: 'friday', setTime: '4:30 PM', genre: 'Indie Pop',
    description: 'Holly Humberstone\'s emotional indie pop resonated deeply with the Coachella crowd.',
    w1Videos: [], w2PreviewVideos: [] },

  // SATURDAY
  { id: 'davido', name: 'Davido', stage: 'Gobi', day: 'saturday', setTime: '7:00 PM', genre: 'Afrobeats',
    description: 'Nigerian Afrobeats star Davido brought the energy of Lagos to the Gobi tent.',
    w1Videos: [], w2PreviewVideos: [] },
  { id: 'noga-erez', name: 'Noga Erez', stage: 'Gobi', day: 'saturday', setTime: '5:30 PM', genre: 'Electronic / Pop',
    description: 'Noga Erez made history as the first Israeli singer to perform at Coachella.',
    w1Videos: [], w2PreviewVideos: [] },

  // SUNDAY
  { id: 'the-rapture', name: 'The Rapture', stage: 'Gobi', day: 'sunday', setTime: '8:00 PM', genre: 'Dance-Punk',
    description: 'Dance-punk legends The Rapture made a triumphant return to the Coachella stage.',
    w1Videos: [], w2PreviewVideos: [] },
  { id: 'black-flag', name: 'Black Flag', stage: 'Gobi', day: 'sunday', setTime: '6:00 PM', genre: 'Hardcore Punk',
    description: 'Hardcore punk legends Black Flag delivered a ferocious set at the Gobi tent.',
    w1Videos: [], w2PreviewVideos: [] },
];

// ============================================================
// WEEKEND 1 — SONORA TENT
// ============================================================
export const sonoraArtists: Artist[] = [
  // FRIDAY
  { id: 'hot-mulligan', name: 'Hot Mulligan', stage: 'Sonora', day: 'friday', setTime: '5:00 PM', genre: 'Emo / Pop-Punk',
    description: 'Hot Mulligan brought their emotional pop-punk to the Sonora tent.',
    w1Videos: [], w2PreviewVideos: [] },
  { id: 'wednesday', name: 'Wednesday', stage: 'Sonora', day: 'friday', setTime: '7:00 PM', genre: 'Country / Shoegaze',
    description: 'Wednesday\'s unique blend of country and shoegaze was a standout set at the Sonora tent.',
    w1Videos: [], w2PreviewVideos: [] },

  // SATURDAY
  { id: 'rusowsky', name: 'Rusowsky', stage: 'Sonora', day: 'saturday', setTime: '6:00 PM', genre: 'Spanish Pop / Electronic',
    description: 'Spanish artist Rusowsky brought his dreamy electronic pop to the Sonora tent.',
    w1Videos: [], w2PreviewVideos: [] },

  // SUNDAY
  { id: 'los-retros', name: 'Los Retros', stage: 'Sonora', day: 'sunday', setTime: '5:30 PM', genre: 'Indie / Soul',
    description: 'Los Retros delivered a smooth, soulful set at the Sonora tent.',
    w1Videos: [], w2PreviewVideos: [] },
  { id: 'model-actriz', name: 'Model/Actriz', stage: 'Sonora', day: 'sunday', setTime: '7:00 PM', genre: 'Post-Punk',
    description: 'Model/Actriz\'s intense post-punk performance was a highlight of the Sonora tent.',
    w1Videos: [], w2PreviewVideos: [] },
];

// ============================================================
// WEEKEND 1 — YUMA TENT
// ============================================================
export const yumaArtists: Artist[] = [
  // FRIDAY
  { id: 'groove-armada', name: 'Groove Armada', stage: 'Yuma', day: 'friday', setTime: '8:00 PM', genre: 'Electronic / House',
    description: 'Groove Armada brought their classic house and trip-hop sounds to the Yuma tent.',
    w1Videos: [], w2PreviewVideos: [] },

  // SATURDAY
  { id: 'armin-van-buuren', name: 'Armin van Buuren & Adam Beyer', stage: 'Yuma', day: 'saturday', setTime: '10:00 PM', genre: 'Trance / Techno',
    description: 'Trance legend Armin van Buuren and techno titan Adam Beyer joined forces for an epic b2b set.',
    w1Videos: [], w2PreviewVideos: [] },
  { id: 'boys-noize', name: 'Boys Noize', stage: 'Yuma', day: 'saturday', setTime: '8:00 PM', genre: 'Electronic / Techno',
    description: 'Boys Noize delivered a high-energy techno set at the Yuma tent.',
    w1Videos: [], w2PreviewVideos: [] },
  { id: 'bedouin', name: 'Bedouin', stage: 'Yuma', day: 'saturday', setTime: '6:00 PM', genre: 'Electronic / Deep House',
    description: 'Bedouin\'s deep, hypnotic set was a perfect fit for the Yuma tent.',
    w1Videos: [], w2PreviewVideos: [] },

  // SUNDAY
  { id: 'royksopp', name: 'Röyksopp', stage: 'Yuma', day: 'sunday', setTime: '9:00 PM', genre: 'Electronic / Synth-Pop',
    description: 'Norwegian electronic duo Röyksopp delivered a dreamy, atmospheric set at the Yuma tent.',
    w1Videos: [], w2PreviewVideos: [] },
  { id: 'whomadewho', name: 'WhoMadeWho', stage: 'Yuma', day: 'sunday', setTime: '7:00 PM', genre: 'Electronic / Indie Dance',
    description: 'WhoMadeWho\'s blend of indie rock and electronic music was a crowd favorite.',
    w1Videos: [], w2PreviewVideos: [] },
];

// ============================================================
// WEEKEND 2 — PREVIEW SECTION
// Artists performing Weekend 2 with their most recent live performance videos
// ============================================================
export const weekend2PreviewArtists: Artist[] = [
  {
    id: 'sabrina-carpenter-w2',
    name: 'Sabrina Carpenter',
    stage: 'Coachella Stage',
    day: 'friday',
    isHeadliner: true,
    genre: 'Pop',
    description: 'Sabrina Carpenter returns to headline Friday night. Expect the same spectacular show with potential new surprises.',
    w2PreviewVideos: [
      { title: 'Espresso — Live at Coachella W1 2026', videoId: 'hp5O72WUqTk', note: 'Weekend 1 performance — get a taste of what\'s coming!' },
      { title: 'House Tour — Live at Coachella W1 2026', videoId: 'x5qCbLcWgps', note: 'Opening number from Weekend 1' },
    ],
  },
  {
    id: 'justin-bieber-w2',
    name: 'Justin Bieber',
    stage: 'Coachella Stage',
    day: 'saturday',
    isHeadliner: true,
    genre: 'Pop',
    description: 'Justin Bieber headlines Saturday night again. His emotional comeback set is not to be missed.',
    w2PreviewVideos: [
      { title: 'Daisies — Live at Coachella W1 2026', videoId: 'He9WmjUvpJ8', note: 'Emotional highlight from Weekend 1' },
      { title: 'SPEED DEMON — Live at Coachella W1 2026', videoId: 'VkbT0a0VW7c', note: 'High-energy opener from Weekend 1' },
    ],
  },
  {
    id: 'karol-g-w2',
    name: 'Karol G',
    stage: 'Coachella Stage',
    day: 'sunday',
    isHeadliner: true,
    genre: 'Reggaeton / Latin Pop',
    description: 'Karol G closes out Weekend 2 as the first Latina headliner in Coachella history. A must-see historic performance.',
    w2PreviewVideos: [
      { title: 'Provenza — Live at Coachella W1 2026', videoId: 'SxLiEZA18X8', note: 'Crowd favorite from Weekend 1' },
      { title: 'FULL PERFORMANCE — Coachella W1 2026', videoId: 'L00BH6cdKcY', note: 'Full Weekend 1 set' },
    ],
  },
  {
    id: 'kacey-musgraves-w2',
    name: 'Kacey Musgraves',
    stage: 'Mojave',
    day: 'saturday',
    genre: 'Country Pop / Indie',
    description: 'Kacey Musgraves is a surprise addition for Weekend 2 only, replacing Jack White at the Mojave tent.',
    w2PreviewVideos: [
      { title: 'Kacey Musgraves — Live at Glastonbury 2024', videoId: 'dQw4w9WgXcQ', note: 'Recent live show — preview her style' },
    ],
  },
  {
    id: 'the-strokes-w2',
    name: 'The Strokes',
    stage: 'Coachella Stage',
    day: 'saturday',
    genre: 'Indie Rock',
    description: 'The Strokes return for Weekend 2 with their career-defining indie rock set.',
    w2PreviewVideos: [
      { title: 'Reptilia — Live at Coachella W1 2026', videoId: 'GXVidwXrAzs', note: 'From Weekend 1 — same setlist expected' },
      { title: 'The Adults Are Talking — Live at Coachella W1 2026', videoId: 'OPPRgfnuRhw', note: 'Fan favorite from Weekend 1' },
    ],
  },
  {
    id: 'disclosure-w2',
    name: 'Disclosure',
    stage: 'Outdoor Theatre',
    day: 'friday',
    genre: 'Electronic / House',
    description: 'Disclosure returns for Weekend 2 to close out the Outdoor Theatre on Friday.',
    w2PreviewVideos: [
      { title: 'Disclosure — Live at Coachella W1 2026', videoId: 'NPijQ_jkyoA', note: 'Full Weekend 1 set' },
    ],
  },
  {
    id: 'bigbang-w2',
    name: 'BigBang',
    stage: 'Outdoor Theatre',
    day: 'sunday',
    genre: 'K-Pop',
    description: 'K-Pop legends BigBang return for Weekend 2 in their historic Coachella debut.',
    w2PreviewVideos: [
      { title: 'BigBang — BANG BANG BANG Live', videoId: 'dQw4w9WgXcQ', note: 'Recent live performance' },
    ],
  },
  {
    id: 'laufey-w2',
    name: 'Laufey',
    stage: 'Outdoor Theatre',
    day: 'sunday',
    genre: 'Jazz Pop / Indie',
    description: 'Laufey returns for Weekend 2 with her enchanting jazz-pop sound.',
    w2PreviewVideos: [
      { title: 'Laufey — Live at the Hollywood Bowl 2024', videoId: 'dQw4w9WgXcQ', note: 'Recent full show' },
    ],
  },
  {
    id: 'nine-inch-noize-w2',
    name: 'Nine Inch Noize',
    stage: 'Sahara',
    day: 'saturday',
    genre: 'Industrial / Electronic',
    description: 'Nine Inch Nails × Boys Noize return for Weekend 2 with their groundbreaking industrial collaboration.',
    w2PreviewVideos: [
      { title: 'Heresy — Live at Coachella W1 2026', videoId: 'C3cLOE6Phms', note: 'From Weekend 1' },
      { title: 'Closer — Live at Coachella W1 2026', videoId: 'Vm6k0geoynQ', note: 'From Weekend 1' },
    ],
  },
  {
    id: 'fka-twigs-w2',
    name: 'FKA Twigs',
    stage: 'Mojave',
    day: 'sunday',
    genre: 'Art Pop / R&B',
    description: 'FKA Twigs returns for Weekend 2 after her stunning debut performance in Weekend 1.',
    w2PreviewVideos: [
      { title: 'FKA Twigs — Eusexua Live', videoId: 'dQw4w9WgXcQ', note: 'Recent live performance' },
    ],
  },
];

// ============================================================
// ALL ARTISTS COMBINED
// ============================================================
export const allArtists: Artist[] = [
  ...coachellaStageArtists,
  ...outdoorTheatreArtists,
  ...saharaArtists,
  ...mojaveArtists,
  ...gobiArtists,
  ...sonoraArtists,
  ...yumaArtists,
];

export const stageColors: Record<Stage, string> = {
  'Coachella Stage': 'stage-main',
  'Outdoor Theatre': 'stage-outdoor',
  'Sahara': 'stage-sahara',
  'Mojave': 'stage-mojave',
  'Gobi': 'stage-gobi',
  'Sonora': 'stage-sonora',
  'Yuma': 'stage-yuma',
  'Quasar': 'stage-yuma',
};

export const dayLabels: Record<Day, string> = {
  friday: 'Friday, April 10',
  saturday: 'Saturday, April 11',
  sunday: 'Sunday, April 12',
};

export const dayColors: Record<Day, { bg: string; text: string; border: string }> = {
  friday: { bg: 'bg-amber-500/20', text: 'text-amber-300', border: 'border-amber-500/40' },
  saturday: { bg: 'bg-rose-500/20', text: 'text-rose-300', border: 'border-rose-500/40' },
  sunday: { bg: 'bg-emerald-500/20', text: 'text-emerald-300', border: 'border-emerald-500/40' },
};
