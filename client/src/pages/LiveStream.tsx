// LiveStream Hub — Coachella 2026 Live Stream Page
// Design: Cinematic Desert Dusk
// Features: Embedded YouTube streams, live chat, schedule, watch party mode

import { useState, useEffect } from 'react';
import { Radio, Calendar, Clock, ChevronLeft, ExternalLink, MessageCircle, Users, Zap, AlertCircle, Play, RefreshCw, Coffee, Share2, Copy, Check } from 'lucide-react';
import { useLocation } from 'wouter';

// Official Coachella YouTube channel livestream IDs
// These are the actual Coachella YouTube live stream IDs used during the festival
// Update these with the actual live stream IDs when Coachella publishes them
const STREAMS = [
  {
    id: 'stream-main',
    label: 'Main Stage',
    channelName: 'Coachella Stage',
    color: 'text-amber-400',
    bg: 'bg-amber-500/15',
    border: 'border-amber-500/30',
    // Official Coachella YouTube channel live stream — replace with actual stream ID when live
    // Coachella typically streams at: youtube.com/@coachella
    liveVideoId: 'live_stream?channel=UCzA78XJqFEAbk_gyFBgMBqA',
    // Fallback: link to Coachella YouTube channel
    channelUrl: 'https://www.youtube.com/@coachella/streams',
    // Weekend 1 replay for preview
    replayVideoId: 'i3TKJbr_dTw',
    description: 'Headliners: Sabrina Carpenter (Fri), Justin Bieber (Sat), Karol G (Sun)',
  },
  {
    id: 'stream-outdoor',
    label: 'Outdoor Theatre',
    channelName: 'Outdoor Theatre',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/15',
    border: 'border-emerald-500/30',
    liveVideoId: 'live_stream?channel=UCzA78XJqFEAbk_gyFBgMBqA',
    channelUrl: 'https://www.youtube.com/@coachella/streams',
    replayVideoId: 'NPijQ_jkyoA',
    description: 'Disclosure, Laufey, BigBang, Foster the People',
  },
  {
    id: 'stream-sahara',
    label: 'Sahara',
    channelName: 'Sahara Tent',
    color: 'text-rose-400',
    bg: 'bg-rose-500/15',
    border: 'border-rose-500/30',
    liveVideoId: 'live_stream?channel=UCzA78XJqFEAbk_gyFBgMBqA',
    channelUrl: 'https://www.youtube.com/@coachella/streams',
    replayVideoId: 'C3cLOE6Phms',
    description: 'Nine Inch Noize, Major Lazer, Kaskade',
  },
];

const W2_SCHEDULE = [
  { day: 'Friday Apr 17', color: 'text-amber-300', bg: 'bg-amber-500/10', border: 'border-amber-500/20', sets: [
    { time: '5:00 PM', artist: 'Groove Armada', stage: 'Yuma' },
    { time: '6:35 PM', artist: 'Teddy Swims', stage: 'Main Stage' },
    { time: '7:00 PM', artist: 'Disclosure', stage: 'Outdoor Theatre' },
    { time: '8:00 PM', artist: 'The xx', stage: 'Main Stage' },
    { time: '9:00 PM', artist: 'Laufey', stage: 'Outdoor Theatre' },
    { time: '9:45 PM', artist: '⭐ Sabrina Carpenter', stage: 'Main Stage' },
  ]},
  { day: 'Saturday Apr 18', color: 'text-rose-300', bg: 'bg-rose-500/10', border: 'border-rose-500/20', sets: [
    { time: '5:00 PM', artist: 'Wet Leg', stage: 'Outdoor Theatre' },
    { time: '6:00 PM', artist: 'Addison Rae', stage: 'Sahara' },
    { time: '7:00 PM', artist: 'The Strokes', stage: 'Main Stage' },
    { time: '7:30 PM', artist: 'Kacey Musgraves', stage: 'Mojave' },
    { time: '8:30 PM', artist: 'Nine Inch Noize', stage: 'Sahara' },
    { time: '10:00 PM', artist: '⭐ Justin Bieber', stage: 'Main Stage' },
  ]},
  { day: 'Sunday Apr 19', color: 'text-emerald-300', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', sets: [
    { time: '5:30 PM', artist: 'Little Simz', stage: 'Mojave' },
    { time: '6:30 PM', artist: 'Foster the People', stage: 'Outdoor Theatre' },
    { time: '7:00 PM', artist: 'Iggy Pop', stage: 'Mojave' },
    { time: '8:00 PM', artist: 'BigBang', stage: 'Outdoor Theatre' },
    { time: '9:30 PM', artist: 'FKA Twigs', stage: 'Mojave' },
    { time: '10:00 PM', artist: '⭐ Karol G', stage: 'Main Stage' },
  ]},
];

// Simple chat message type
interface ChatMessage {
  id: string;
  user: string;
  text: string;
  time: string;
  color: string;
}

const USER_COLORS = ['text-amber-400', 'text-rose-400', 'text-emerald-400', 'text-blue-400', 'text-violet-400', 'text-teal-400'];

const SAMPLE_MESSAGES: ChatMessage[] = [
  { id: '1', user: 'desertvibes', text: 'Who else is SO ready for Karol G on Sunday?! 🌵', time: '9:41 PM', color: 'text-amber-400' },
  { id: '2', user: 'festivalfan', text: 'Sabrina\'s set on Friday was everything 😭', time: '9:42 PM', color: 'text-rose-400' },
  { id: '3', user: 'coachellalife', text: 'The xx reunion is going to be INSANE', time: '9:43 PM', color: 'text-emerald-400' },
  { id: '4', user: 'indiobound', text: 'Anyone else using the schedule planner? It\'s so helpful!', time: '9:44 PM', color: 'text-blue-400' },
  { id: '5', user: 'musiclover99', text: 'Kacey Musgraves W2 ONLY is such a treat 🤩', time: '9:45 PM', color: 'text-violet-400' },
];

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

function getCurrentTime() {
  return new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

export default function LiveStream() {
  const [, navigate] = useLocation();
  const [activeStream, setActiveStream] = useState(STREAMS[0]);
  const [messages, setMessages] = useState<ChatMessage[]>(SAMPLE_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [hasJoined, setHasJoined] = useState(false);
  const [userColor] = useState(USER_COLORS[Math.floor(Math.random() * USER_COLORS.length)]);
  const [isLive] = useState(false); // Set to true when Coachella is actually streaming
  const [activeDay, setActiveDay] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const shareText = `Watching Coachella 2026! 🌵 Check out the full schedule, live streams, and set times here: ${window.location.origin}/live`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const CASH_APP_URL = "https://cash.app/$ChristopherGall6";
  const CASH_APP_QR = "/cashapp_qr.png";

  // Auto-scroll chat
  useEffect(() => {
    const chatEl = document.getElementById('chat-messages');
    if (chatEl) chatEl.scrollTop = chatEl.scrollHeight;
  }, [messages]);

  // Simulate incoming messages when live
  useEffect(() => {
    if (!isLive) return;
    const sampleTexts = [
      'This set is FIRE 🔥', 'Can\'t believe I\'m watching this!', 'Best Coachella ever!',
      'The production is insane', 'Who\'s the guest?!', '🌵🌵🌵', 'Stream quality is perfect',
    ];
    const interval = setInterval(() => {
      const randomUser = `fan${Math.floor(Math.random() * 9999)}`;
      const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
      setMessages(prev => [...prev.slice(-49), {
        id: generateId(),
        user: randomUser,
        text: randomText,
        time: getCurrentTime(),
        color: USER_COLORS[Math.floor(Math.random() * USER_COLORS.length)],
      }]);
    }, 4000);
    return () => clearInterval(interval);
  }, [isLive]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setMessages(prev => [...prev.slice(-49), {
      id: generateId(),
      user: userName || 'you',
      text: newMessage.trim(),
      time: getCurrentTime(),
      color: userColor,
    }]);
    setNewMessage('');
  };

  const joinChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) return;
    setHasJoined(true);
    setMessages(prev => [...prev, {
      id: generateId(),
      user: 'system',
      text: `${userName} joined the watch party! 🎉`,
      time: getCurrentTime(),
      color: 'text-white/30',
    }]);
  };

  return (
    <div className="min-h-screen pb-10" style={{ background: 'oklch(0.12 0.015 45)' }}>
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-white/8 backdrop-blur-xl" style={{ background: 'oklch(0.12 0.015 45 / 0.95)' }}>
        <div className="container flex items-center justify-between h-14 gap-3">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm transition-colors"
          >
            <ChevronLeft size={15} />
            Back
          </button>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-red-500 animate-pulse' : 'bg-white/20'}`} />
            <span className="text-white font-bold text-sm">{isLive ? 'LIVE NOW' : 'WATCH PARTY HUB'}</span>
          </div>
          <a
            href="https://www.youtube.com/@coachella/streams"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-red-400 hover:text-red-300 text-xs font-semibold transition-colors"
          >
            <ExternalLink size={12} />
            YouTube
          </a>
        </div>
      </div>

      <div className="container pt-5">
        {/* Monetization & Sharing Bar */}
        <div className="mb-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/8 p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <Coffee size={20} className="text-amber-400" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Support the Hub</p>
                <p className="text-white/50 text-xs">Direct tip via Cash App!</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:block w-12 h-12 rounded-lg overflow-hidden border border-white/10">
                <img src={CASH_APP_QR} alt="Cash App QR" className="w-full h-full object-cover" />
              </div>
              <a 
                href={CASH_APP_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-lg transition-all"
              >
                Tip on Cash App
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-blue-500/20 bg-blue-500/8 p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Share2 size={20} className="text-blue-400" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Share with Fans</p>
                <p className="text-white/50 text-xs">Post this in YouTube chat to help others!</p>
              </div>
            </div>
            <button 
              onClick={handleCopyLink}
              className={`flex items-center gap-2 px-4 py-2 ${copied ? 'bg-green-500' : 'bg-blue-600 hover:bg-blue-500'} text-white font-bold text-xs rounded-lg transition-all`}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
        </div>

        {/* Status Banner */}
        {!isLive && (
          <div className="mb-5 rounded-2xl border border-white/8 bg-white/5 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle size={16} className="text-white/40 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white/80 font-bold text-sm mb-1">Weekend 2 Livestreams: April 17–19, 2026</p>
                <p className="text-white/40 text-sm leading-relaxed">
                  Official streams go live nightly. Until then, watch Weekend 1 replays below or{' '}
                  <a href="https://www.youtube.com/@coachella" target="_blank" rel="noopener noreferrer" className="text-amber-400/60 hover:text-amber-400 underline">
                    subscribe to Coachella on YouTube
                  </a>.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* ── LEFT: STREAM PLAYER ── */}
          <div className="lg:col-span-2 space-y-4">
            {/* Stream selector */}
            <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
              {STREAMS.map(stream => (
                <button
                  key={stream.id}
                  onClick={() => setActiveStream(stream)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                    activeStream.id === stream.id
                      ? `${stream.bg} ${stream.color} ${stream.border}`
                      : 'bg-white/5 text-white/50 border-white/8 hover:bg-white/10'
                  }`}
                >
                  <Radio size={11} className={activeStream.id === stream.id ? stream.color : 'text-white/30'} />
                  {stream.label}
                </button>
              ))}
            </div>

            {/* Video player */}
            <div className="rounded-2xl overflow-hidden border border-white/8 relative group">
              {isLive ? (
                // Live stream embed
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${activeStream.liveVideoId}&autoplay=1`}
                    title={`${activeStream.label} Live Stream`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  
                  {/* Live Schedule Overlay */}
                  <div className="absolute top-4 left-4 z-10 w-48 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-red-500/20 px-3 py-1.5 border-b border-white/10">
                      <p className="text-[10px] font-black text-red-400 uppercase tracking-widest flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        Live Schedule
                      </p>
                    </div>
                    <div className="p-2 space-y-2">
                      {W2_SCHEDULE[activeDay].sets.slice(0, 3).map((set, i) => (
                        <div key={i} className="flex flex-col">
                          <span className="text-[9px] text-white/40 font-bold uppercase">{set.time}</span>
                          <span className="text-xs text-white font-bold truncate">{set.artist}</span>
                        </div>
                      ))}
                      <div className="pt-1 border-t border-white/5">
                        <p className="text-[9px] text-amber-400/60 font-medium">Full schedule below ↓</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Pre-festival: show replay + link to live
                <div>
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <img
                      src={`https://img.youtube.com/vi/${activeStream.replayVideoId}/maxresdefault.jpg`}
                      alt={activeStream.label}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ filter: 'brightness(0.6)' }}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
                      <div className="w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-500/40 flex items-center justify-center">
                        <Radio size={24} className="text-red-400" />
                      </div>
                      <div className="text-center">
                        <p className="text-white font-bold text-lg mb-1">Live April 17–19</p>
                        <p className="text-white/60 text-sm mb-4">{activeStream.description}</p>
                        <div className="flex flex-col sm:flex-row gap-2 justify-center">
                          <a
                            href={activeStream.channelUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-red-500/90 hover:bg-red-500 text-white font-bold text-sm rounded-xl transition-colors"
                          >
                            <Play size={14} fill="white" />
                            Watch on YouTube
                          </a>
                          <button
                            onClick={() => {
                              // Show the replay video in a new tab
                              window.open(`https://www.youtube.com/watch?v=${activeStream.replayVideoId}`, '_blank');
                            }}
                            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl transition-colors border border-white/15"
                          >
                            <RefreshCw size={13} />
                            Watch W1 Replay
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Weekend 1 replay embed below */}
                  <div className="border-t border-white/8 p-4">
                    <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Play size={11} className="text-amber-400" />
                      Weekend 1 Replay — {activeStream.label}
                    </p>
                    <div className="relative w-full rounded-xl overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${activeStream.replayVideoId}?rel=0&modestbranding=1`}
                        title={`${activeStream.label} Weekend 1 Replay`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Stream info */}
            <div className={`rounded-xl border p-4 ${activeStream.border} ${activeStream.bg}`}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-red-500 animate-pulse' : 'bg-white/20'}`} />
                    <span className={`text-xs font-bold uppercase tracking-wider ${isLive ? 'text-red-400' : 'text-white/40'}`}>
                      {isLive ? 'LIVE' : 'Upcoming'}
                    </span>
                  </div>
                  <p className="text-white font-bold">{activeStream.channelName}</p>
                  <p className="text-white/50 text-sm">{activeStream.description}</p>
                </div>
                <a
                  href={activeStream.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 text-xs font-bold rounded-xl transition-colors flex-shrink-0"
                >
                  <ExternalLink size={11} />
                  YouTube
                </a>
              </div>
            </div>

            {/* W2 Schedule */}
            <div className="rounded-2xl border border-white/8 overflow-hidden" style={{ background: 'oklch(0.14 0.015 45)' }}>
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8">
                <Calendar size={14} className="text-amber-400" />
                <p className="text-white font-bold text-sm">Weekend 2 Schedule</p>
                <span className="text-white/30 text-xs ml-auto">April 17–19, 2026</span>
              </div>
              {/* Day tabs */}
              <div className="flex border-b border-white/8">
                {W2_SCHEDULE.map((day, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveDay(i)}
                    className={`flex-1 py-2.5 text-xs font-bold transition-all ${
                      activeDay === i
                        ? `${day.bg} ${day.color} border-b-2 ${day.border.replace('border-', 'border-b-')}`
                        : 'text-white/40 hover:text-white/70'
                    }`}
                  >
                    {day.day.split(' ')[0]}
                  </button>
                ))}
              </div>
              <div className="p-3 space-y-1">
                {W2_SCHEDULE[activeDay].sets.map((set, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-white/4 transition-colors">
                    <div className="flex items-center gap-1 flex-shrink-0 w-16">
                      <Clock size={10} className="text-white/25" />
                      <span className="text-white/40 text-xs">{set.time}</span>
                    </div>
                    <p className={`text-sm font-semibold flex-1 ${set.artist.startsWith('⭐') ? W2_SCHEDULE[activeDay].color : 'text-white/80'}`}>
                      {set.artist}
                    </p>
                    <span className="text-white/25 text-xs">{set.stage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: WATCH PARTY CHAT ── */}
          <div className="flex flex-col rounded-2xl border border-white/8 overflow-hidden" style={{ background: 'oklch(0.14 0.015 45)', height: 'fit-content', minHeight: '500px', maxHeight: '700px' }}>
            {/* Chat header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8 flex-shrink-0">
              <MessageCircle size={14} className="text-amber-400" />
              <p className="text-white font-bold text-sm">Watch Party Chat</p>
              <div className="flex items-center gap-1 ml-auto">
                <Users size={11} className="text-white/30" />
                <span className="text-white/30 text-xs">{isLive ? '2.4K' : '47'} watching</span>
              </div>
            </div>

            {/* Messages */}
            <div id="chat-messages" className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-none" style={{ minHeight: 0 }}>
              {messages.map(msg => (
                <div key={msg.id} className={msg.user === 'system' ? 'text-center' : 'flex items-start gap-2'}>
                  {msg.user === 'system' ? (
                    <p className="text-white/25 text-xs italic">{msg.text}</p>
                  ) : (
                    <>
                      <div className={`w-6 h-6 rounded-full bg-white/8 flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <span className={`text-[9px] font-bold ${msg.color}`}>{msg.user.charAt(0).toUpperCase()}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-1.5">
                          <span className={`text-xs font-bold ${msg.color}`}>{msg.user}</span>
                          <span className="text-white/20 text-[9px]">{msg.time}</span>
                        </div>
                        <p className="text-white/75 text-sm leading-snug break-words">{msg.text}</p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Chat input */}
            <div className="border-t border-white/8 p-3 flex-shrink-0">
              {!hasJoined ? (
                <form onSubmit={joinChat} className="space-y-2">
                  <p className="text-white/40 text-xs">Join the watch party chat!</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={userName}
                      onChange={e => setUserName(e.target.value.slice(0, 20))}
                      placeholder="Pick a username..."
                      maxLength={20}
                      className="flex-1 bg-white/8 border border-white/12 rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-amber-500/50 transition-colors"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm rounded-xl transition-colors flex-shrink-0"
                    >
                      <Zap size={14} />
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={sendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value.slice(0, 200))}
                    placeholder="Say something..."
                    maxLength={200}
                    className="flex-1 bg-white/8 border border-white/12 rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-amber-500/50 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="px-3 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm rounded-xl transition-colors flex-shrink-0 disabled:opacity-40"
                  >
                    →
                  </button>
                </form>
              )}
              <p className="text-white/20 text-[10px] mt-1.5 text-center">
                Chat is local to this browser session · No account required
              </p>
            </div>
          </div>
        </div>

        {/* YouTube Sign-in for official comments */}
        <div className="mt-5 rounded-2xl border border-white/8 p-5" style={{ background: 'oklch(0.14 0.015 45)' }}>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/20 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-400">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-sm mb-1">Comment on YouTube</p>
              <p className="text-white/50 text-sm leading-relaxed mb-3">
                To comment on the official Coachella livestream or performance videos, sign in with your Google account on YouTube. Your comments will be visible to millions of viewers worldwide.
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://www.youtube.com/@coachella/streams"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/25 text-red-300 text-sm font-semibold rounded-xl transition-colors"
                >
                  <ExternalLink size={13} />
                  Open Coachella on YouTube
                </a>
                <a
                  href="https://accounts.google.com/signin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white/8 hover:bg-white/15 border border-white/12 text-white/70 text-sm font-semibold rounded-xl transition-colors"
                >
                  Sign in with Google
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
