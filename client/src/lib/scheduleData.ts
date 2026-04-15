// ============================================================
// COACHELLA 2026 — WEEKEND 2 SCHEDULE DATA
// All set times are approximate based on Weekend 1 schedule
// Design: Cinematic Desert Dusk
// ============================================================

export type Stage = 'Coachella Stage' | 'Outdoor Theatre' | 'Sahara' | 'Mojave' | 'Gobi' | 'Sonora' | 'Yuma';
export type Day = 'friday' | 'saturday' | 'sunday';

export interface ScheduleArtist {
  id: string;
  name: string;
  stage: Stage;
  day: Day;
  startTime: string;   // "HH:MM" 24h format
  endTime: string;     // "HH:MM" 24h format
  startMinutes: number; // minutes from midnight for sorting/overlap
  endMinutes: number;
  isHeadliner?: boolean;
  genre?: string;
  previewVideoId?: string;
  description?: string;
}

function toMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  // Times after midnight (e.g. 00:05, 01:00) are treated as next day
  const hours = h < 6 ? h + 24 : h;
  return hours * 60 + m;
}

function artist(
  id: string, name: string, stage: Stage, day: Day,
  start: string, end: string,
  opts: { isHeadliner?: boolean; genre?: string; previewVideoId?: string; description?: string } = {}
): ScheduleArtist {
  return {
    id, name, stage, day,
    startTime: start, endTime: end,
    startMinutes: toMinutes(start),
    endMinutes: toMinutes(end),
    ...opts,
  };
}

export const w2Schedule: ScheduleArtist[] = [
  // ─── FRIDAY ───────────────────────────────────────────────
  // Coachella Stage
  artist('sc-fri', 'Sabrina Carpenter', 'Coachella Stage', 'friday', '21:45', '23:15', { isHeadliner: true, genre: 'Pop', previewVideoId: 'hp5O72WUqTk', description: 'Friday headliner. Expect Espresso, Feather, Please Please Please and a massive celebrity guest moment.' }),
  artist('xx-fri', 'The xx', 'Coachella Stage', 'friday', '20:00', '21:15', { genre: 'Indie / Electronic', previewVideoId: 'UvRxaZH7DUY', description: 'Minimalist indie-electronic duo performing their iconic catalog.' }),
  artist('teddy-fri', 'Teddy Swims', 'Coachella Stage', 'friday', '18:35', '19:45', { genre: 'R&B / Soul', previewVideoId: 'WOui79-lRec', description: 'Powerhouse vocalist. Expect Joe Jonas and Vanessa Carlton guest spots.' }),
  artist('record-fri', 'Record Safari', 'Coachella Stage', 'friday', '16:30', '17:30', { genre: 'Electronic / DJ', description: 'Opening DJ set for the main stage.' }),

  // Outdoor Theatre
  artist('disclosure-fri', 'Disclosure', 'Outdoor Theatre', 'friday', '22:35', '00:05', { genre: 'Electronic / House', previewVideoId: 'NPijQ_jkyoA', description: 'Deep house legends closing out the Outdoor Theatre.' }),
  artist('turnstile-fri', 'Turnstile', 'Outdoor Theatre', 'friday', '20:05', '21:15', { genre: 'Hardcore / Post-Punk', description: 'One of the most energetic live bands in the world right now.' }),
  artist('dijon-fri', 'Dijon', 'Outdoor Theatre', 'friday', '18:40', '19:40', { genre: 'R&B / Soul', description: 'Soulful, genre-bending R&B.' }),
  artist('lykke-fri', 'Lykke Li', 'Outdoor Theatre', 'friday', '17:20', '18:20', { genre: 'Indie Pop', description: 'Ethereal Swedish indie pop.' }),

  // Sahara
  artist('sexyy-fri', 'Sexyy Red', 'Sahara', 'friday', '00:05', '01:05', { genre: 'Hip-Hop', previewVideoId: 'BIwqNJcwUAc', description: 'Closing the Sahara on Friday night. Expect Lizzo to appear.' }),
  artist('swae-fri', 'Swae Lee', 'Sahara', 'friday', '22:50', '23:55', { genre: 'Hip-Hop / R&B', description: 'Melodic trap with guests Jhené Aiko and Nav.' }),
  artist('katseye-fri', 'Katseye', 'Sahara', 'friday', '19:15', '20:15', { genre: 'K-Pop / Pop', description: 'K-Pop group making their Coachella debut.' }),
  artist('hugel-fri', 'Hugel', 'Sahara', 'friday', '17:45', '18:45', { genre: 'Electronic / House', description: 'Surprise guests Snoop Dogg and Big Sean expected.' }),

  // Mojave
  artist('ethel-fri', 'Ethel Cain', 'Mojave', 'friday', '19:30', '20:45', { genre: 'Gothic Pop / Americana', description: 'Hauntingly beautiful dark americana.' }),
  artist('central-fri', 'Central Cee', 'Mojave', 'friday', '21:30', '22:30', { genre: 'UK Rap / Drill', description: 'UK drill star bringing London energy to the desert.' }),
  artist('bini-fri', 'Bini', 'Mojave', 'friday', '18:20', '19:20', { genre: 'OPM / Pop', description: 'Historic Coachella debut — first Filipino group to perform.' }),
  artist('blood-fri', 'Blood Orange', 'Mojave', 'friday', '16:10', '17:10', { genre: 'Art Pop / R&B', description: 'Dev Hynes\' genre-defying art pop project.' }),

  // Gobi
  artist('creepy-fri', 'Creepy Nuts', 'Gobi', 'friday', '18:00', '19:00', { genre: 'J-Rap', description: 'Japanese rap duo behind the viral "Bling-Bang-Bang-Born".' }),
  artist('holly-fri', 'Holly Humberstone', 'Gobi', 'friday', '16:30', '17:30', { genre: 'Indie Pop', description: 'Emotional British indie pop.' }),

  // Sonora
  artist('hot-fri', 'Hot Mulligan', 'Sonora', 'friday', '17:00', '18:00', { genre: 'Emo / Pop-Punk', description: 'Emotional pop-punk energy.' }),
  artist('wednesday-fri', 'Wednesday', 'Sonora', 'friday', '19:00', '20:00', { genre: 'Country / Shoegaze', description: 'Unique blend of country and shoegaze.' }),

  // Yuma
  artist('groove-fri', 'Groove Armada', 'Yuma', 'friday', '20:00', '22:00', { genre: 'Electronic / House', description: 'Classic house and trip-hop legends.' }),

  // ─── SATURDAY ─────────────────────────────────────────────
  // Coachella Stage
  artist('jb-sat', 'Justin Bieber', 'Coachella Stage', 'saturday', '21:45', '23:15', { isHeadliner: true, genre: 'Pop', previewVideoId: 'He9WmjUvpJ8', description: 'The comeback set of the decade. New music + classics. Guests The Kid Laroi, Dijon, Tems, Wizkid.' }),
  artist('strokes-sat', 'The Strokes', 'Coachella Stage', 'saturday', '20:00', '21:15', { genre: 'Indie Rock', previewVideoId: 'GXVidwXrAzs', description: 'Career-spanning indie rock set from NYC legends.' }),
  artist('giveon-sat', 'Giveon', 'Coachella Stage', 'saturday', '18:30', '19:45', { genre: 'R&B / Soul', previewVideoId: 'OIFrNsGyhAQ', description: 'Deep baritone R&B with guest Kehlani.' }),
  artist('addison-sat', 'Addison Rae', 'Coachella Stage', 'saturday', '17:00', '18:00', { genre: 'Pop / Dance', previewVideoId: 'OSUGAnIjCEA', description: 'Pop performance with Maddie Ziegler guest appearance.' }),
  artist('jaqck-sat', 'Jaqck Glam', 'Coachella Stage', 'saturday', '16:00', '17:00', { genre: 'Pop', description: 'Opening the main stage on Saturday.' }),

  // Outdoor Theatre
  artist('david-sat', 'David Byrne', 'Outdoor Theatre', 'saturday', '22:20', '23:45', { genre: 'Art Rock / New Wave', description: 'Talking Heads legend with a theatrical career-spanning set.' }),
  artist('labrinth-sat', 'Labrinth', 'Outdoor Theatre', 'saturday', '20:30', '21:45', { genre: 'Electronic / R&B', description: 'Cinematic, visually spectacular performance.' }),
  artist('sombr-sat', 'Sombr', 'Outdoor Theatre', 'saturday', '19:00', '20:00', { genre: 'Indie Pop', description: 'Surprise guest Billy Corgan expected.' }),
  artist('alexg-sat', 'Alex G', 'Outdoor Theatre', 'saturday', '17:30', '18:30', { genre: 'Indie Rock', description: 'Lo-fi indie rock from Philadelphia.' }),
  artist('blond-sat', 'Blondshell', 'Outdoor Theatre', 'saturday', '16:00', '17:00', { genre: 'Alt-Rock', description: 'Grunge-influenced alt-rock.' }),

  // Sahara
  artist('nin-sat', 'Nine Inch Noize', 'Sahara', 'saturday', '22:00', '23:30', { genre: 'Industrial / Electronic', previewVideoId: 'C3cLOE6Phms', description: 'NIN × Boys Noize collaboration. One of the most anticipated sets of the festival.' }),
  artist('worship-sat', 'Worship', 'Sahara', 'saturday', '20:00', '21:30', { genre: 'Electronic / Techno', description: 'Dark hypnotic electronic.' }),
  artist('rezz-sat', 'Rezz', 'Sahara', 'saturday', '18:15', '19:30', { genre: 'Electronic / Techno', description: 'Hypnotic techno from the "Space Mom".' }),
  artist('bedouin-sat', 'Bedouin', 'Yuma', 'saturday', '18:00', '20:00', { genre: 'Electronic / Deep House', description: 'Deep, hypnotic house music.' }),

  // Mojave
  artist('interpol-sat', 'Interpol', 'Mojave', 'saturday', '21:00', '22:15', { genre: 'Post-Punk / Indie Rock', description: 'Brooding, atmospheric post-punk from NYC.' }),
  artist('pinkpanth-sat', 'PinkPantheress', 'Mojave', 'saturday', '19:30', '20:45', { genre: 'Hyperpop / Dance', description: 'Viral internet pop with guests Tyriq Withers and Thundercat.' }),
  artist('kacey-sat', 'Kacey Musgraves', 'Mojave', 'saturday', '21:00', '22:15', { genre: 'Country Pop / Indie', description: '⭐ WEEKEND 2 ONLY — Replaces Jack White. Golden Hour meets Deeper Well era.' }),

  // Gobi
  artist('davido-sat', 'Davido', 'Gobi', 'saturday', '19:00', '20:00', { genre: 'Afrobeats', description: 'Nigerian Afrobeats superstar.' }),
  artist('noga-sat', 'Noga Erez', 'Gobi', 'saturday', '17:30', '18:30', { genre: 'Electronic / Pop', description: 'First Israeli singer to perform at Coachella.' }),

  // Sonora
  artist('rusowsky-sat', 'Rusowsky', 'Sonora', 'saturday', '18:00', '19:00', { genre: 'Spanish Pop / Electronic', description: 'Dreamy electronic pop from Spain.' }),

  // Yuma
  artist('armin-sat', 'Armin van Buuren & Adam Beyer', 'Yuma', 'saturday', '22:00', '00:00', { genre: 'Trance / Techno', description: 'Epic b2b between trance legend and techno titan.' }),
  artist('boysnoize-sat', 'Boys Noize', 'Yuma', 'saturday', '20:00', '22:00', { genre: 'Electronic / Techno', description: 'High-energy techno set.' }),

  // ─── SUNDAY ───────────────────────────────────────────────
  // Coachella Stage
  artist('kg-sun', 'Karol G', 'Coachella Stage', 'sunday', '21:55', '23:30', { isHeadliner: true, genre: 'Reggaeton / Latin Pop', previewVideoId: 'L00BH6cdKcY', description: 'Historic first Latina headliner. 26-song set. Guests Becky G, Wisin, Mariah Angeliq, Greg Gonzalez.' }),
  artist('thug-sun', 'Young Thug', 'Coachella Stage', 'sunday', '19:50', '21:15', { genre: 'Hip-Hop / Trap', previewVideoId: '6d8eQE92xZk', description: 'Triumphant return. Guests Nav, Camila Cabello, Ty Dolla Sign.' }),
  artist('majorlazer-sun', 'Major Lazer', 'Coachella Stage', 'sunday', '18:10', '19:25', { genre: 'Electronic / Dance', previewVideoId: 'tF0MDodznPE', description: 'High-energy party set with M.I.A. guest appearance.' }),
  artist('wetleg-sun', 'Wet Leg', 'Coachella Stage', 'sunday', '16:45', '17:55', { genre: 'Indie Rock', previewVideoId: '7r52xlpmPX8', description: 'Witty angular indie rock. Guest HorsegiirL.' }),
  artist('tijuana-sun', 'Tijuana Panthers', 'Coachella Stage', 'sunday', '15:30', '16:30', { genre: 'Indie Rock / Surf', description: 'Opening the main stage on Sunday.' }),

  // Outdoor Theatre
  artist('bigbang-sun', 'BigBang', 'Outdoor Theatre', 'sunday', '22:30', '00:00', { genre: 'K-Pop', description: 'K-Pop legends in their historic Coachella debut.' }),
  artist('laufey-sun', 'Laufey', 'Outdoor Theatre', 'sunday', '20:40', '21:55', { genre: 'Jazz Pop / Indie', description: 'Enchanting jazz-pop. One of the most beloved sets of the festival.' }),
  artist('foster-sun', 'Foster the People', 'Outdoor Theatre', 'sunday', '18:45', '19:55', { genre: 'Indie Pop / Rock', previewVideoId: 'bcOwuxRa3YE', description: 'Pumped Up Kicks and more indie pop classics.' }),
  artist('clipse-sun', 'Clipse', 'Outdoor Theatre', 'sunday', '17:15', '18:15', { genre: 'Hip-Hop', description: 'Reunion set with Travis Barker guest appearance.' }),
  artist('gigi-sun', 'Gigi Perez', 'Outdoor Theatre', 'sunday', '16:00', '17:00', { genre: 'Folk / Indie', description: 'Intimate folk-pop. Guests Bella Perez and Noah Cyrus.' }),

  // Sahara
  artist('kaskade-sun', 'Kaskade', 'Sahara', 'sunday', '22:30', '00:00', { genre: 'Electronic / Progressive House', description: 'Epic progressive house closing set.' }),
  artist('subtronics-sun', 'Subtronics', 'Sahara', 'sunday', '20:45', '22:00', { genre: 'Bass / Dubstep', description: 'Bass-heavy set with Destroy Lonely guest.' }),

  // Mojave
  artist('fka-sun', 'FKA Twigs', 'Mojave', 'sunday', '21:30', '22:45', { genre: 'Art Pop / R&B', description: 'Breathtaking avant-garde performance after 2025 cancellation.' }),
  artist('iggy-sun', 'Iggy Pop', 'Mojave', 'sunday', '20:00', '21:15', { genre: 'Punk Rock', description: 'The godfather of punk delivers a legendary set.' }),
  artist('simz-sun', 'Little Simz', 'Mojave', 'sunday', '18:30', '19:45', { genre: 'UK Hip-Hop', description: 'Critically acclaimed UK hip-hop.' }),

  // Gobi
  artist('rapture-sun', 'The Rapture', 'Gobi', 'sunday', '20:00', '21:15', { genre: 'Dance-Punk', description: 'Dance-punk legends make a triumphant return.' }),
  artist('blackflag-sun', 'Black Flag', 'Gobi', 'sunday', '18:00', '19:00', { genre: 'Hardcore Punk', description: 'Hardcore punk legends deliver a ferocious set.' }),

  // Sonora
  artist('losretros-sun', 'Los Retros', 'Sonora', 'sunday', '17:30', '18:30', { genre: 'Indie / Soul', description: 'Smooth, soulful indie.' }),
  artist('modelactriz-sun', 'Model/Actriz', 'Sonora', 'sunday', '19:00', '20:00', { genre: 'Post-Punk', description: 'Intense post-punk performance.' }),

  // Yuma
  artist('royksopp-sun', 'Röyksopp', 'Yuma', 'sunday', '21:00', '23:00', { genre: 'Electronic / Synth-Pop', description: 'Dreamy atmospheric electronic from Norway.' }),
  artist('whomadewho-sun', 'WhoMadeWho', 'Yuma', 'sunday', '19:00', '21:00', { genre: 'Electronic / Indie Dance', description: 'Indie rock meets electronic music.' }),
];

export const stages: Stage[] = [
  'Coachella Stage', 'Outdoor Theatre', 'Sahara', 'Mojave', 'Gobi', 'Sonora', 'Yuma',
];

export const stageShortNames: Record<Stage, string> = {
  'Coachella Stage': 'Main',
  'Outdoor Theatre': 'Outdoor',
  'Sahara': 'Sahara',
  'Mojave': 'Mojave',
  'Gobi': 'Gobi',
  'Sonora': 'Sonora',
  'Yuma': 'Yuma',
};

export const stageColorMap: Record<Stage, { bg: string; text: string; border: string; dot: string }> = {
  'Coachella Stage': { bg: 'bg-amber-500/20', text: 'text-amber-300', border: 'border-amber-500/40', dot: '#F59E0B' },
  'Outdoor Theatre': { bg: 'bg-emerald-500/20', text: 'text-emerald-300', border: 'border-emerald-500/40', dot: '#10B981' },
  'Sahara':          { bg: 'bg-rose-500/20',    text: 'text-rose-300',    border: 'border-rose-500/40',    dot: '#F43F5E' },
  'Mojave':          { bg: 'bg-violet-500/20',  text: 'text-violet-300',  border: 'border-violet-500/40',  dot: '#8B5CF6' },
  'Gobi':            { bg: 'bg-orange-500/20',  text: 'text-orange-300',  border: 'border-orange-500/40',  dot: '#F97316' },
  'Sonora':          { bg: 'bg-teal-500/20',    text: 'text-teal-300',    border: 'border-teal-500/40',    dot: '#14B8A6' },
  'Yuma':            { bg: 'bg-blue-500/20',    text: 'text-blue-300',    border: 'border-blue-500/40',    dot: '#3B82F6' },
};

export const dayLabels: Record<Day, { short: string; long: string; date: string }> = {
  friday:   { short: 'Fri', long: 'Friday',   date: 'April 17' },
  saturday: { short: 'Sat', long: 'Saturday', date: 'April 18' },
  sunday:   { short: 'Sun', long: 'Sunday',   date: 'April 19' },
};

// Check if two artists have overlapping set times
export function hasConflict(a: ScheduleArtist, b: ScheduleArtist): boolean {
  if (a.day !== b.day) return false;
  if (a.id === b.id) return false;
  return a.startMinutes < b.endMinutes && a.endMinutes > b.startMinutes;
}

// Get all conflicts for a given artist within a list of selected artists
export function getConflicts(artist: ScheduleArtist, selected: ScheduleArtist[]): ScheduleArtist[] {
  return selected.filter(s => hasConflict(artist, s) && s.id !== artist.id);
}

// Format minutes-from-midnight to display time
export function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const period = h < 12 || h === 24 ? 'AM' : 'PM';
  const displayH = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${displayH}:${m.toString().padStart(2, '0')} ${period}`;
}
