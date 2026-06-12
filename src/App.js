/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────

const QUIZ_DATA = {
  math: [
    { q: "What is the derivative of sin(x)?", opts: ["cos(x)", "-cos(x)", "-sin(x)", "tan(x)"], a: 0 },
    { q: "If 3x − 7 = 14, what is the value of x?", opts: ["5", "6", "7", "8"], a: 2 },
    { q: "What is √144?", opts: ["11", "12", "13", "14"], a: 1 },
    { q: "Area of a triangle with base 10 and height 6?", opts: ["30", "60", "16", "40"], a: 0 },
    { q: "What is 2⁸?", opts: ["128", "256", "512", "64"], a: 1 },
  ],
  science: [
    { q: "Speed of light in a vacuum?", opts: ["3×10⁸ m/s", "3×10⁶ m/s", "3×10¹⁰ m/s", "3×10⁴ m/s"], a: 0 },
    { q: "Chemical formula of glucose?", opts: ["C₆H₁₂O₆", "C₂H₅OH", "CH₄", "H₂SO₄"], a: 0 },
    { q: "Which gas do plants absorb during photosynthesis?", opts: ["O₂", "N₂", "CO₂", "H₂"], a: 2 },
    { q: "Newton's second law: F = ?", opts: ["mv", "ma", "mv²", "m/a"], a: 1 },
    { q: "What is the powerhouse of the cell?", opts: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"], a: 2 },
  ],
  history: [
    { q: "Year India gained independence?", opts: ["1945", "1947", "1948", "1950"], a: 1 },
    { q: "Who was the first Prime Minister of India?", opts: ["Gandhi", "Nehru", "Patel", "Ambedkar"], a: 1 },
    { q: "The French Revolution began in?", opts: ["1776", "1789", "1799", "1815"], a: 1 },
    { q: "The Great Wall of China was built primarily to?", opts: ["Mark borders", "Defend against invasions", "Impress traders", "House the army"], a: 1 },
    { q: "World War I ended in?", opts: ["1916", "1917", "1918", "1919"], a: 2 },
  ],
  english: [
    { q: "What is the synonym of 'eloquent'?", opts: ["Clumsy", "Articulate", "Silent", "Confused"], a: 1 },
    { q: "Identify the figure of speech: 'The stars danced in the sky'", opts: ["Simile", "Metaphor", "Personification", "Alliteration"], a: 2 },
    { q: "'I have been studying' is in which tense?", opts: ["Simple Past", "Past Perfect", "Present Perfect Continuous", "Future Perfect"], a: 2 },
    { q: "Antonym of 'benevolent'?", opts: ["Kind", "Generous", "Malevolent", "Gentle"], a: 2 },
    { q: "Passive voice of: 'She reads books'?", opts: ["Books are read by her", "Books were read", "She had read books", "Books will be read"], a: 0 },
  ],
};

const COURSES = [
  { id: 1, title: "Mathematics",  icon: "📐", tag: "Core Science",  lessons: 48, students: "2.4k", color: "#7C3AED", desc: "Algebra, Calculus, Geometry & Trigonometry", rating: 4.9 },
  { id: 2, title: "Physics",      icon: "⚡", tag: "Core Science",  lessons: 42, students: "1.9k", color: "#0EA5E9", desc: "Mechanics, Waves, Thermodynamics, Optics",  rating: 4.8 },
  { id: 3, title: "Chemistry",    icon: "🧪", tag: "Core Science",  lessons: 38, students: "1.7k", color: "#10B981", desc: "Organic, Inorganic & Physical Chemistry",  rating: 4.7 },
  { id: 4, title: "Biology",      icon: "🧬", tag: "Life Sciences", lessons: 35, students: "2.1k", color: "#F59E0B", desc: "Cell Biology, Genetics, Human Physiology",  rating: 4.8 },
  { id: 5, title: "History",      icon: "🏛️", tag: "Humanities",    lessons: 30, students: "1.2k", color: "#EF4444", desc: "World & Indian History, Civics & Polity",  rating: 4.6 },
  { id: 6, title: "English",      icon: "📖", tag: "Languages",     lessons: 28, students: "3.1k", color: "#8B5CF6", desc: "Grammar, Literature & Writing Mastery",   rating: 4.9 },
];

const CAREERS = [
  { title: "Engineering & Tech",  icon: "⚙️",  color: "#7C3AED", paths: ["IIT/NIT via JEE Advanced", "BITS Pilani via BITSAT", "State Engineering via JEE Mains"],    subjects: ["Math","Physics","Chemistry"],    scope: "Software, Civil, Mechanical, AI/ML" },
  { title: "Medical Sciences",    icon: "🩺",  color: "#EF4444", paths: ["MBBS/BDS via NEET UG", "AIIMS MBBS", "Veterinary via NEET"],                                 subjects: ["Biology","Chemistry","Physics"],  scope: "Doctor, Dentist, Pharmacist, Biotech" },
  { title: "Commerce & Finance",  icon: "📊",  color: "#F59E0B", paths: ["CA via ICAI", "BBA / MBA via entrance exams", "CFA & CMA certifications"],                   subjects: ["Accountancy","Economics","Math"],  scope: "Finance, Banking, Investment, CA" },
  { title: "Arts & Humanities",   icon: "🎨",  color: "#10B981", paths: ["BA Hons via CUET", "CLAT for Law", "NDA for Defence"],                                       subjects: ["History","English","Pol. Sci"],   scope: "Law, Journalism, Teaching, IAS/IPS" },
];

const PROGRESS = { math: 68, science: 45, chemistry: 82, biology: 35, history: 60, english: 75 };
const PROG_META = {
  math:      { icon: "📐", color: "#7C3AED" },
  science:   { icon: "⚡", color: "#0EA5E9" },
  chemistry: { icon: "🧪", color: "#10B981" },
  biology:   { icon: "🧬", color: "#F59E0B" },
  history:   { icon: "🏛️", color: "#EF4444" },
  english:   { icon: "📖", color: "#8B5CF6" },
};

const P  = "#7C3AED";   // primary violet
const D  = "#0F0A2E";   // midnight navy
const A  = "#F59E0B";   // amber accent

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function App() {
  const [activeNav, setActiveNav] = useState("home");
  const [chatOpen,  setChatOpen]  = useState(false);
  const [messages,  setMessages]  = useState([
    { role: "assistant", text: "👋 Hi! I'm LearnBot — your AI study companion powered by Claude.\n\nAsk me anything: Maths, Science, Grammar, History, career doubts — I'm here to help!" },
  ]);
  const [input,       setInput]       = useState("");
  const [aiLoading,   setAiLoading]   = useState(false);
  const [enrolled,    setEnrolled]    = useState(new Set([1, 3]));
  const [quiz,        setQuiz]        = useState({ active: false, subject: null, idx: 0, score: 0, sel: null, done: false, time: 30 });
  const [contact,     setContact]     = useState({ name: "", email: "", msg: "" });
  const [submitted,   setSubmitted]   = useState(false);
  const chatEnd = useRef(null);
  const timerRef = useRef(null);

  // ── inject fonts + keyframe animations ──────────────────────────────────
  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');
      *{box-sizing:border-box;margin:0;padding:0}
      html{scroll-behavior:smooth}
      ::-webkit-scrollbar{width:5px}
      ::-webkit-scrollbar-track{background:#F8F7FF}
      ::-webkit-scrollbar-thumb{background:#7C3AED;border-radius:3px}
      @keyframes float1{0%,100%{transform:translate(0,0)}50%{transform:translate(30px,-40px)}}
      @keyframes float2{0%,100%{transform:translate(0,0)}50%{transform:translate(-20px,28px)}}
      @keyframes float3{0%,100%{transform:translate(0,0)}50%{transform:translate(40px,18px)}}
      @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
      @keyframes slideIn{from{transform:translateX(110%);opacity:0}to{transform:translateX(0);opacity:1}}
      @keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}
      @keyframes glow{0%,100%{box-shadow:0 0 18px rgba(124,58,237,.35)}50%{box-shadow:0 0 36px rgba(124,58,237,.6)}}
      .f1{animation:float1 9s ease-in-out infinite}
      .f2{animation:float2 11s ease-in-out infinite}
      .f3{animation:float3 13s ease-in-out infinite}
      .fu{animation:fadeUp .4s ease both}
      .si{animation:slideIn .3s ease}
      .ch:hover{transform:translateY(-5px);box-shadow:0 14px 36px rgba(124,58,237,.14)!important;transition:transform .2s,box-shadow .2s}
      .ch{transition:transform .2s,box-shadow .2s}
      button{font-family:inherit}
      input,textarea{font-family:inherit}
    `;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  // ── chat scroll ──────────────────────────────────────────────────────────
  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, aiLoading]);

  // ── quiz timer ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (quiz.active && !quiz.done && quiz.sel === null) {
      timerRef.current = setInterval(() => {
        setQuiz(q => {
          if (q.time <= 1) { clearInterval(timerRef.current); return { ...q, sel: -1, time: 0 }; }
          return { ...q, time: q.time - 1 };
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [quiz.active, quiz.idx, quiz.done, quiz.sel]);

  // ── helpers ──────────────────────────────────────────────────────────────
  const goTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setActiveNav(id); };

  const sendMessage = async () => {
    if (!input.trim() || aiLoading) return;
    const txt = input.trim();
    setInput("");
    setMessages(m => [...m, { role: "user", text: txt }]);
    setAiLoading(true);
    try {
      const hist = messages.slice(-10).map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text }));
      const res  = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.REACT_APP_ANTHROPIC_KEY,
            "anthropic-version": "2023-06-01",
            "anthropic-dangerous-direct-browser-access": "true"
            },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: "You are LearnBot, a friendly AI study assistant for school and college students in India. Help them understand academic concepts clearly and concisely (under 180 words). Use simple language, real examples, and bullet points when listing steps. Encourage learning. Respond to career questions too. Stay focused on educational topics.",
          messages: [...hist, { role: "user", content: txt }],
        }),
      });
      const data  = await res.json();
      const reply = data.content?.[0]?.text || "Couldn't process that. Try rephrasing!";
      setMessages(m => [...m, { role: "assistant", text: reply }]);
    } catch {
      setMessages(m => [...m, { role: "assistant", text: "Connection issue. Check your internet and try again." }]);
    }
    setAiLoading(false);
  };

  const pickAnswer = (i) => {
    if (quiz.sel !== null) return;
    clearInterval(timerRef.current);
    const correct = QUIZ_DATA[quiz.subject][quiz.idx].a === i;
    setQuiz(q => ({ ...q, sel: i, score: correct ? q.score + 1 : q.score }));
  };

  const nextQ = () => {
    if (quiz.idx + 1 >= QUIZ_DATA[quiz.subject].length) { setQuiz(q => ({ ...q, done: true })); }
    else { setQuiz(q => ({ ...q, idx: q.idx + 1, sel: null, time: 30 })); }
  };

  const resetQuiz = () => setQuiz({ active: false, subject: null, idx: 0, score: 0, sel: null, done: false, time: 30 });

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif", background: "#F8F7FF", color: "#1F2937", minHeight: "100vh", overflowX: "hidden" }}>

      {/* ══════════ NAV ══════════ */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(15,10,46,0.96)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(124,58,237,0.25)", padding: "0 20px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ background: "linear-gradient(135deg,#7C3AED,#A78BFA)", borderRadius: 10, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🎓</div>
          <span style={{ color: "white", fontWeight: 800, fontSize: 17, letterSpacing: "-.4px" }}>EduPortal<span style={{ color: "#A78BFA" }}>AI</span></span>
        </div>
        <div style={{ display: "flex", gap: 2 }}>
          {["home","courses","quiz","career","progress","contact"].map(n => (
            <button key={n} onClick={() => goTo(n)} style={{ background: activeNav === n ? "rgba(124,58,237,.28)" : "transparent", border: activeNav === n ? "1px solid rgba(124,58,237,.5)" : "1px solid transparent", color: activeNav === n ? "#A78BFA" : "#94A3B8", borderRadius: 8, padding: "5px 13px", fontSize: 13, fontWeight: 600, cursor: "pointer", textTransform: "capitalize", transition: "all .2s" }}>
              {n}
            </button>
          ))}
        </div>
        <button onClick={() => setChatOpen(true)} style={{ background: "linear-gradient(135deg,#7C3AED,#5B21B6)", color: "white", border: "none", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
          🤖 Ask AI
        </button>
      </nav>

      {/* ══════════ HERO ══════════ */}
      <section id="home" style={{ minHeight: "100vh", background: `linear-gradient(135deg,${D} 0%,#1E1040 55%,#2D1B69 100%)`, display: "flex", alignItems: "center", paddingTop: 60, position: "relative", overflow: "hidden" }}>
        {/* ambient orbs */}
        <div className="f1" style={{ position:"absolute",top:"18%",right:"13%",width:320,height:320,borderRadius:"50%",background:"radial-gradient(circle,rgba(124,58,237,.28) 0%,transparent 70%)",pointerEvents:"none" }}/>
        <div className="f2" style={{ position:"absolute",bottom:"18%",left:"8%",width:220,height:220,borderRadius:"50%",background:"radial-gradient(circle,rgba(245,158,11,.18) 0%,transparent 70%)",pointerEvents:"none" }}/>
        <div className="f3" style={{ position:"absolute",top:"52%",left:"48%",width:460,height:460,borderRadius:"50%",background:"radial-gradient(circle,rgba(167,139,250,.08) 0%,transparent 70%)",pointerEvents:"none",transform:"translate(-50%,-50%)" }}/>

        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "80px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center", width: "100%" }}>
          {/* left */}
          <div className="fu">
            <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(124,58,237,.18)",border:"1px solid rgba(124,58,237,.4)",borderRadius:100,padding:"6px 16px",marginBottom:22 }}>
              <span style={{ color:"#A78BFA",fontSize:12,fontWeight:700,letterSpacing:"1px" }}>🌍 SDG 4 – QUALITY EDUCATION</span>
            </div>
            <h1 style={{ fontSize:52,fontWeight:800,color:"white",lineHeight:1.1,marginBottom:18,letterSpacing:"-1.5px" }}>
              Learn Smarter<br/>with <span style={{ background:"linear-gradient(90deg,#A78BFA,#F59E0B)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>AI Guidance</span>
            </h1>
            <p style={{ fontSize:17,color:"#94A3B8",lineHeight:1.75,marginBottom:30,maxWidth:470 }}>
              Personalized study materials, AI doubt-solving, smart quizzes, and career roadmaps — one platform built for every learner.
            </p>
            <div style={{ display:"flex",gap:12 }}>
              <button onClick={() => goTo("courses")} style={{ background:"linear-gradient(135deg,#7C3AED,#5B21B6)",color:"white",border:"none",borderRadius:12,padding:"13px 26px",fontSize:15,fontWeight:700,cursor:"pointer" }}>Explore Courses →</button>
              <button onClick={() => setChatOpen(true)} style={{ background:"transparent",color:"#A78BFA",border:"2px solid rgba(167,139,250,.4)",borderRadius:12,padding:"13px 26px",fontSize:15,fontWeight:700,cursor:"pointer" }}>🤖 Ask a Doubt</button>
            </div>
            {/* stats */}
            <div style={{ display:"flex",gap:30,marginTop:44,paddingTop:28,borderTop:"1px solid rgba(255,255,255,.1)" }}>
              {[["12+","Subjects"],["500+","Resources"],["50k+","Students"],["4.9★","Avg Rating"]].map(([n,l])=>(
                <div key={l}><div style={{ fontSize:22,fontWeight:800,color:"white" }}>{n}</div><div style={{ fontSize:12,color:"#64748B",marginTop:2 }}>{l}</div></div>
              ))}
            </div>
          </div>
          {/* right – feature grid */}
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
            {[
              {icon:"📚",title:"Study Materials",desc:"Curated notes & PDFs",c:"#7C3AED"},
              {icon:"🎥",title:"Video Lectures",desc:"Expert-led lessons",c:"#0EA5E9"},
              {icon:"🤖",title:"AI Chatbot",desc:"Instant doubt solving",c:"#F59E0B"},
              {icon:"📊",title:"Progress Tracker",desc:"Know where you stand",c:"#10B981"},
              {icon:"🎯",title:"Smart Quizzes",desc:"Test your knowledge",c:"#EF4444"},
              {icon:"🚀",title:"Career Guide",desc:"Plan your future path",c:"#8B5CF6"},
            ].map((f,i)=>(
              <div key={f.title} className="ch fu" onClick={() => f.title.includes("AI") ? setChatOpen(true) : goTo(f.title.includes("Quiz")?"quiz":f.title.includes("Progress")?"progress":f.title.includes("Career")?"career":"courses")}
                style={{ background:"rgba(255,255,255,.07)",backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,.12)",borderRadius:16,padding:20,cursor:"pointer",animationDelay:`${i*.08}s` }}>
                <div style={{ fontSize:28,marginBottom:8 }}>{f.icon}</div>
                <div style={{ fontWeight:700,color:"white",fontSize:14 }}>{f.title}</div>
                <div style={{ color:"#94A3B8",fontSize:12,marginTop:4 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ COURSES ══════════ */}
      <section id="courses" style={{ padding:"80px 24px",maxWidth:1180,margin:"0 auto" }}>
        <SectionHeader eyebrow="📚 Study Resources" title="Explore All Subjects" sub="Comprehensive curriculum from Class 8 to graduation, crafted by expert educators." />
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:22 }}>
          {COURSES.map(c=>(
            <div key={c.id} className="ch" style={{ background:"white",borderRadius:20,overflow:"hidden",boxShadow:"0 2px 12px rgba(0,0,0,.06)",border:"1px solid #F1F5F9" }}>
              <div style={{ background:`linear-gradient(135deg,${c.color}18,${c.color}08)`,padding:"22px 22px 18px",borderBottom:`3px solid ${c.color}` }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                  <div>
                    <div style={{ fontSize:36 }}>{c.icon}</div>
                    <h3 style={{ fontSize:19,fontWeight:800,color:D,marginTop:8 }}>{c.title}</h3>
                    <span style={{ background:`${c.color}18`,color:c.color,borderRadius:100,padding:"3px 11px",fontSize:11,fontWeight:700 }}>{c.tag}</span>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontSize:16,fontWeight:800,color:c.color }}>{c.rating}★</div>
                    <div style={{ color:"#94A3B8",fontSize:12 }}>{c.students}</div>
                  </div>
                </div>
              </div>
              <div style={{ padding:20 }}>
                <p style={{ color:"#64748B",fontSize:13,lineHeight:1.55,marginBottom:16 }}>{c.desc}</p>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                  <span style={{ color:"#94A3B8",fontSize:12 }}>📖 {c.lessons} lessons</span>
                  <button onClick={()=>setEnrolled(e=>{const ne=new Set(e);ne.has(c.id)?ne.delete(c.id):ne.add(c.id);return ne;})}
                    style={{ background:enrolled.has(c.id)?"#F1F5F9":`linear-gradient(135deg,${c.color},${c.color}CC)`,color:enrolled.has(c.id)?"#64748B":"white",border:"none",borderRadius:10,padding:"8px 16px",fontSize:12,fontWeight:700,cursor:"pointer" }}>
                    {enrolled.has(c.id)?"✓ Enrolled":"Enroll Free"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ QUIZ ══════════ */}
      <section id="quiz" style={{ background:`linear-gradient(135deg,${D} 0%,#1E1040 100%)`,padding:"80px 24px" }}>
        <div style={{ maxWidth:780,margin:"0 auto" }}>
          <SectionHeader dark eyebrow="🎯 Test Yourself" title="Smart Quiz Engine" sub="5 questions per subject · 30 seconds each · Instant feedback" />

          {!quiz.active && (
            <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:16 }}>
              {[{key:"math",label:"Mathematics",icon:"📐",c:"#7C3AED"},{key:"science",label:"Science",icon:"⚡",c:"#0EA5E9"},{key:"history",label:"History",icon:"🏛️",c:"#EF4444"},{key:"english",label:"English",icon:"📖",c:"#10B981"}].map(s=>(
                <button key={s.key} className="ch" onClick={()=>setQuiz({active:true,subject:s.key,idx:0,score:0,sel:null,done:false,time:30})}
                  style={{ background:"rgba(255,255,255,.07)",border:`2px solid ${s.c}40`,borderRadius:20,padding:28,cursor:"pointer",textAlign:"center",fontFamily:"inherit" }}>
                  <div style={{ fontSize:38,marginBottom:10 }}>{s.icon}</div>
                  <div style={{ fontWeight:800,color:"white",fontSize:17 }}>{s.label}</div>
                  <div style={{ color:"#94A3B8",fontSize:12,marginTop:5 }}>5 Questions</div>
                  <div style={{ display:"inline-block",background:`${s.c}25`,color:s.c,borderRadius:100,padding:"4px 14px",fontSize:12,fontWeight:700,marginTop:12 }}>Start Quiz →</div>
                </button>
              ))}
            </div>
          )}

          {quiz.active && quiz.done && (
            <div style={{ background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.15)",borderRadius:24,padding:48,textAlign:"center" }}>
              <div style={{ fontSize:60,marginBottom:14 }}>{quiz.score===5?"🏆":quiz.score>=4?"🥈":"📚"}</div>
              <h3 style={{ fontSize:30,fontWeight:800,color:"white" }}>Quiz Complete!</h3>
              <div style={{ fontSize:52,fontWeight:800,color:P,margin:"14px 0" }}>{quiz.score}/5</div>
              <p style={{ color:"#94A3B8",fontSize:16,marginBottom:30 }}>
                {quiz.score===5?"Perfect score! Outstanding!":quiz.score>=4?"Excellent! Almost flawless!":quiz.score>=3?"Good work! Keep practising.":"Keep going — you'll get there!"}
              </p>
              <div style={{ display:"flex",gap:12,justifyContent:"center" }}>
                <button onClick={()=>setQuiz({active:true,subject:quiz.subject,idx:0,score:0,sel:null,done:false,time:30})} style={{ background:`linear-gradient(135deg,${P},#5B21B6)`,color:"white",border:"none",borderRadius:12,padding:"12px 24px",fontSize:14,fontWeight:700,cursor:"pointer" }}>Retry Quiz</button>
                <button onClick={resetQuiz} style={{ background:"transparent",color:"#A78BFA",border:"2px solid rgba(167,139,250,.4)",borderRadius:12,padding:"12px 24px",fontSize:14,fontWeight:700,cursor:"pointer" }}>Change Subject</button>
              </div>
            </div>
          )}

          {quiz.active && !quiz.done && (() => {
            const qn = QUIZ_DATA[quiz.subject][quiz.idx];
            return (
              <div style={{ background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.15)",borderRadius:24,padding:38 }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18 }}>
                  <span style={{ color:"#A78BFA",fontWeight:700,fontSize:13 }}>Question {quiz.idx+1} / {QUIZ_DATA[quiz.subject].length}</span>
                  <div style={{ width:38,height:38,borderRadius:"50%",background:quiz.time<=10?"rgba(239,68,68,.3)":"rgba(124,58,237,.3)",border:`2px solid ${quiz.time<=10?"#EF4444":P}`,display:"flex",alignItems:"center",justifyContent:"center",color:quiz.time<=10?"#EF4444":"#A78BFA",fontWeight:800,fontSize:14 }}>
                    {quiz.time}
                  </div>
                </div>
                {/* progress bar */}
                <div style={{ background:"rgba(255,255,255,.1)",borderRadius:4,height:4,marginBottom:28 }}>
                  <div style={{ background:P,height:4,borderRadius:4,width:`${(quiz.idx/QUIZ_DATA[quiz.subject].length)*100}%`,transition:"width .3s" }}/>
                </div>
                <h3 style={{ fontSize:21,fontWeight:700,color:"white",marginBottom:26,lineHeight:1.45 }}>{qn.q}</h3>
                <div style={{ display:"grid",gap:11,marginBottom:26 }}>
                  {qn.opts.map((opt,i)=>{
                    let bg="rgba(255,255,255,.07)",bdr="1px solid rgba(255,255,255,.15)",col="white";
                    if(quiz.sel!==null){
                      if(i===qn.a){bg="rgba(16,185,129,.2)";bdr="2px solid #10B981";col="#6EE7B7";}
                      else if(i===quiz.sel&&quiz.sel!==qn.a){bg="rgba(239,68,68,.2)";bdr="2px solid #EF4444";col="#FCA5A5";}
                    }
                    return(
                      <button key={i} onClick={()=>pickAnswer(i)}
                        style={{ background:bg,border:bdr,borderRadius:12,padding:"13px 18px",color:col,fontSize:14,fontWeight:600,cursor:quiz.sel!==null?"default":"pointer",textAlign:"left",transition:"all .15s",display:"flex",alignItems:"center",gap:12 }}>
                        <span style={{ background:"rgba(255,255,255,.1)",borderRadius:"50%",width:26,height:26,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:12 }}>{String.fromCharCode(65+i)}</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {quiz.sel!==null&&(
                  <div style={{ display:"flex",justifyContent:"flex-end" }}>
                    <button onClick={nextQ} style={{ background:`linear-gradient(135deg,${P},#5B21B6)`,color:"white",border:"none",borderRadius:12,padding:"11px 26px",fontSize:14,fontWeight:700,cursor:"pointer" }}>
                      {quiz.idx+1>=QUIZ_DATA[quiz.subject].length?"See Results →":"Next Question →"}
                    </button>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      </section>

      {/* ══════════ CAREER GUIDANCE ══════════ */}
      <section id="career" style={{ padding:"80px 24px",maxWidth:1180,margin:"0 auto" }}>
        <SectionHeader eyebrow="🚀 Plan Ahead" title="Career Pathways" sub="Discover your ideal stream and the roadmap to make it real." />
        <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:22 }}>
          {CAREERS.map(c=>(
            <div key={c.title} className="ch" style={{ background:"white",border:`1px solid ${c.color}18`,borderRadius:20,padding:28,boxShadow:"0 2px 12px rgba(0,0,0,.05)" }}>
              <div style={{ display:"flex",alignItems:"center",gap:14,marginBottom:18 }}>
                <div style={{ width:54,height:54,borderRadius:16,background:`${c.color}14`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26 }}>{c.icon}</div>
                <h3 style={{ fontSize:19,fontWeight:800,color:D }}>{c.title}</h3>
              </div>
              <div style={{ marginBottom:16 }}>
                <div style={{ fontWeight:700,fontSize:11,color:"#94A3B8",marginBottom:8,textTransform:"uppercase",letterSpacing:"1px" }}>Entry Paths</div>
                {c.paths.map(p=>(
                  <div key={p} style={{ display:"flex",alignItems:"center",gap:8,marginBottom:6 }}>
                    <div style={{ width:6,height:6,borderRadius:"50%",background:c.color,flexShrink:0 }}/>
                    <span style={{ fontSize:13,color:"#374151" }}>{p}</span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop:`1px solid ${c.color}18`,paddingTop:14,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                <div>
                  <div style={{ fontWeight:700,fontSize:11,color:"#94A3B8",marginBottom:6,textTransform:"uppercase",letterSpacing:"1px" }}>Key Subjects</div>
                  <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
                    {c.subjects.map(s=>(
                      <span key={s} style={{ background:`${c.color}14`,color:c.color,borderRadius:100,padding:"3px 10px",fontSize:11,fontWeight:700 }}>{s}</span>
                    ))}
                  </div>
                </div>
                <button onClick={()=>setChatOpen(true)} style={{ background:`${c.color}14`,color:c.color,border:"none",borderRadius:10,padding:"8px 16px",fontSize:12,fontWeight:700,cursor:"pointer" }}>Ask AI →</button>
              </div>
              <div style={{ marginTop:12,background:"#F8FAFC",borderRadius:10,padding:"9px 14px" }}>
                <span style={{ fontSize:12,color:"#64748B" }}>💼 <strong>Scope:</strong> {c.scope}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ PROGRESS TRACKER ══════════ */}
      <section id="progress" style={{ background:"linear-gradient(135deg,#F8F7FF,#EDE9FE25)",padding:"80px 24px",borderTop:"1px solid #E5E7EB" }}>
        <div style={{ maxWidth:980,margin:"0 auto" }}>
          <SectionHeader eyebrow="📊 Your Journey" title="Learning Progress" sub="Track how far you've come across every subject." />
          <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:18 }}>
            {Object.entries(PROGRESS).map(([subj,pct])=>{
              const { icon, color } = PROG_META[subj];
              return(
                <div key={subj} style={{ background:"white",borderRadius:16,padding:22,boxShadow:"0 2px 8px rgba(0,0,0,.05)",border:"1px solid #F1F5F9" }}>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
                    <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                      <span style={{ fontSize:22 }}>{icon}</span>
                      <span style={{ fontWeight:700,color:D,textTransform:"capitalize" }}>{subj}</span>
                    </div>
                    <span style={{ fontSize:19,fontWeight:800,color }}>{pct}%</span>
                  </div>
                  <div style={{ background:"#F1F5F9",borderRadius:100,height:10,overflow:"hidden" }}>
                    <div style={{ width:`${pct}%`,height:"100%",background:`linear-gradient(90deg,${color},${color}88)`,borderRadius:100,transition:"width 1s ease" }}/>
                  </div>
                  <div style={{ display:"flex",justifyContent:"space-between",marginTop:8 }}>
                    <span style={{ fontSize:12,color:"#94A3B8" }}>{Math.round(pct*.48)} / 48 lessons</span>
                    <span style={{ fontSize:12,fontWeight:700,color:pct>=70?"#10B981":pct>=50?"#F59E0B":"#EF4444" }}>
                      {pct>=70?"On Track":pct>=50?"Good Progress":"Needs Attention"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Badges */}
          <div style={{ marginTop:28,background:"white",borderRadius:20,padding:26,boxShadow:"0 2px 12px rgba(0,0,0,.05)",border:"1px solid #F1F5F9" }}>
            <h4 style={{ fontWeight:800,color:D,marginBottom:18,fontSize:17 }}>🏆 Achievements Unlocked</h4>
            <div style={{ display:"flex",gap:12,flexWrap:"wrap" }}>
              {["🌟 First Quiz","📚 3 Courses","🔥 7-Day Streak","🎯 Perfect Score","🤖 AI Explorer","✅ 50 Lessons"].map(b=>(
                <div key={b} style={{ background:"linear-gradient(135deg,#F8F7FF,#EDE9FE)",border:"1px solid #DDD6FE",borderRadius:100,padding:"8px 16px",fontSize:12,fontWeight:700,color:P }}>{b}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ CONTACT ══════════ */}
      <section id="contact" style={{ padding:"80px 24px",maxWidth:680,margin:"0 auto" }}>
        <SectionHeader eyebrow="📬 Get In Touch" title="Contact Us" sub="Questions, suggestions, or feedback? We'd love to hear from you." />
        {!submitted ? (
          <div style={{ background:"white",borderRadius:24,padding:38,boxShadow:"0 4px 24px rgba(0,0,0,.08)",border:"1px solid #F1F5F9" }}>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14 }}>
              <Field label="Full Name"      value={contact.name}  onChange={v=>setContact(f=>({...f,name:v}))}  placeholder="Your name" />
              <Field label="Email Address" value={contact.email} onChange={v=>setContact(f=>({...f,email:v}))} placeholder="you@example.com" type="email" />
            </div>
            <div style={{ marginBottom:22 }}>
              <label style={{ display:"block",fontWeight:700,fontSize:12,color:"#374151",marginBottom:7,textTransform:"uppercase",letterSpacing:".5px" }}>Message</label>
              <textarea value={contact.msg} onChange={e=>setContact(f=>({...f,msg:e.target.value}))}
                placeholder="Write your message here…" rows={5}
                style={{ width:"100%",background:"#F8FAFC",border:"2px solid #E5E7EB",borderRadius:12,padding:"12px 14px",fontSize:14,outline:"none",color:"#1F2937",resize:"vertical" }}/>
            </div>
            <button onClick={()=>{if(contact.name&&contact.email&&contact.msg)setSubmitted(true);}}
              style={{ width:"100%",background:`linear-gradient(135deg,${P},#5B21B6)`,color:"white",border:"none",borderRadius:13,padding:"15px",fontSize:15,fontWeight:800,cursor:"pointer" }}>
              Send Message →
            </button>
          </div>
        ) : (
          <div style={{ background:"white",borderRadius:24,padding:60,textAlign:"center",boxShadow:"0 4px 24px rgba(0,0,0,.08)" }}>
            <div style={{ fontSize:52,marginBottom:14 }}>✅</div>
            <h3 style={{ fontSize:22,fontWeight:800,color:D }}>Message Sent!</h3>
            <p style={{ color:"#64748B",marginTop:10 }}>We'll get back to you within 24 hours.</p>
            <button onClick={()=>{setSubmitted(false);setContact({name:"",email:"",msg:""}); }}
              style={{ background:`${P}14`,color:P,border:"none",borderRadius:12,padding:"10px 22px",fontSize:13,fontWeight:700,cursor:"pointer",marginTop:22 }}>
              Send Another
            </button>
          </div>
        )}
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer style={{ background:D,color:"#94A3B8",padding:"44px 24px 28px",borderTop:"1px solid rgba(255,255,255,.08)" }}>
        <div style={{ maxWidth:1180,margin:"0 auto" }}>
          <div style={{ display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:36,marginBottom:36 }}>
            <div>
              <div style={{ display:"flex",alignItems:"center",gap:9,marginBottom:14 }}>
                <div style={{ background:"linear-gradient(135deg,#7C3AED,#A78BFA)",borderRadius:10,width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18 }}>🎓</div>
                <span style={{ color:"white",fontWeight:800,fontSize:17 }}>EduPortal<span style={{ color:"#A78BFA" }}>AI</span></span>
              </div>
              <p style={{ fontSize:13,lineHeight:1.7,maxWidth:250 }}>AI-powered education platform committed to inclusive quality learning for every student. SDG 4 aligned.</p>
            </div>
            {[["Platform",["Courses","Quizzes","Progress","Career Guide"]],["Learn",["Mathematics","Science","History","English"]],["Support",["Ask AI","Contact","FAQs","Community"]]].map(([title,links])=>(
              <div key={title}>
                <div style={{ color:"white",fontWeight:700,marginBottom:14,fontSize:14 }}>{title}</div>
                {links.map(l=><div key={l} style={{ marginBottom:9,fontSize:13,cursor:"pointer" }}>{l}</div>)}
              </div>
            ))}
          </div>
          <div style={{ borderTop:"1px solid rgba(255,255,255,.08)",paddingTop:20,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
            <span style={{ fontSize:12 }}>© 2025 EduPortalAI — Built for SDG 4: Quality Education 🌍</span>
            <span style={{ fontSize:12 }}>Powered by Claude AI 🤖</span>
          </div>
        </div>
      </footer>

      {/* ══════════ FLOATING CHAT BUTTON ══════════ */}
      {!chatOpen && (
        <button onClick={()=>setChatOpen(true)} style={{ position:"fixed",bottom:26,right:26,width:62,height:62,borderRadius:"50%",background:`linear-gradient(135deg,${P},#5B21B6)`,border:"none",cursor:"pointer",boxShadow:"0 8px 30px rgba(124,58,237,.45)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,zIndex:200,animation:"glow 3s ease-in-out infinite" }}>
          🤖
          <span style={{ position:"absolute",top:-3,right:-3,width:18,height:18,borderRadius:"50%",background:"#10B981",border:"2.5px solid white" }}/>
        </button>
      )}

      {/* ══════════ CHAT PANEL ══════════ */}
      {chatOpen && (
        <div className="si" style={{ position:"fixed",bottom:18,right:18,width:375,height:555,background:"white",borderRadius:24,boxShadow:"0 24px 80px rgba(0,0,0,.22)",zIndex:300,display:"flex",flexDirection:"column",overflow:"hidden",border:"1px solid #E5E7EB" }}>
          {/* header */}
          <div style={{ background:`linear-gradient(135deg,${D},#1E1040)`,padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0 }}>
            <div style={{ display:"flex",alignItems:"center",gap:11 }}>
              <div style={{ width:40,height:40,borderRadius:"50%",background:"linear-gradient(135deg,#7C3AED,#A78BFA)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22 }}>🤖</div>
              <div>
                <div style={{ color:"white",fontWeight:800,fontSize:14 }}>LearnBot AI</div>
                <div style={{ color:"#10B981",fontSize:11,display:"flex",alignItems:"center",gap:4 }}>
                  <span style={{ width:6,height:6,borderRadius:"50%",background:"#10B981",display:"inline-block" }}/> Online — Powered by Claude
                </div>
              </div>
            </div>
            <button onClick={()=>setChatOpen(false)} style={{ background:"rgba(255,255,255,.12)",border:"none",borderRadius:"50%",width:30,height:30,color:"white",cursor:"pointer",fontSize:15,display:"flex",alignItems:"center",justifyContent:"center" }}>✕</button>
          </div>

          {/* messages */}
          <div style={{ flex:1,overflowY:"auto",padding:14,display:"flex",flexDirection:"column",gap:10,background:"#F8FAFC" }}>
            {messages.map((m,i)=>(
              <div key={i} style={{ display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",animation:"fadeUp .3s ease" }}>
                <div style={{ maxWidth:"82%",background:m.role==="user"?`linear-gradient(135deg,${P},#5B21B6)`:"white",color:m.role==="user"?"white":"#1F2937",borderRadius:m.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px",padding:"11px 15px",fontSize:13,lineHeight:1.65,boxShadow:"0 2px 8px rgba(0,0,0,.06)",border:m.role==="assistant"?"1px solid #E5E7EB":"none",whiteSpace:"pre-wrap" }}>
                  {m.text}
                </div>
              </div>
            ))}
            {aiLoading && (
              <div style={{ display:"flex",justifyContent:"flex-start" }}>
                <div style={{ background:"white",borderRadius:"18px 18px 18px 4px",padding:"12px 16px",boxShadow:"0 2px 8px rgba(0,0,0,.06)",border:"1px solid #E5E7EB",display:"flex",gap:5,alignItems:"center" }}>
                  {[0,1,2].map(i=><div key={i} style={{ width:8,height:8,borderRadius:"50%",background:P,animation:`bounce 1.2s ${i*.2}s ease infinite` }}/>)}
                </div>
              </div>
            )}
            <div ref={chatEnd}/>
          </div>

          {/* quick chips */}
          <div style={{ padding:"7px 12px",background:"white",borderTop:"1px solid #F1F5F9",display:"flex",gap:6,overflowX:"auto",flexShrink:0 }}>
            {["Explain photosynthesis","Newton's laws?","Career after PCM?","What is integration?"].map(q=>(
              <button key={q} onClick={()=>setInput(q)} style={{ background:"#F8F7FF",border:"1px solid #DDD6FE",borderRadius:100,padding:"5px 12px",fontSize:11,fontWeight:700,color:P,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0 }}>{q}</button>
            ))}
          </div>

          {/* input */}
          <div style={{ padding:"11px 14px",background:"white",borderTop:"1px solid #F1F5F9",display:"flex",gap:9,flexShrink:0 }}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&sendMessage()}
              placeholder="Ask any doubt…"
              style={{ flex:1,background:"#F8FAFC",border:"2px solid #E5E7EB",borderRadius:12,padding:"10px 14px",fontSize:13,outline:"none",color:"#1F2937" }}/>
            <button onClick={sendMessage} disabled={aiLoading||!input.trim()}
              style={{ background:input.trim()&&!aiLoading?`linear-gradient(135deg,${P},#5B21B6)`:"#E5E7EB",color:input.trim()&&!aiLoading?"white":"#94A3B8",border:"none",borderRadius:12,width:42,height:42,cursor:input.trim()&&!aiLoading?"pointer":"not-allowed",fontSize:17,flexShrink:0 }}>
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Small shared components ──────────────────────────────────────────────────

function SectionHeader({ eyebrow, title, sub, dark }) {
  const textColor = dark ? "white" : "#0F0A2E";
  const subColor  = dark ? "#94A3B8" : "#64748B";
  return (
    <div style={{ textAlign:"center",marginBottom:44 }}>
      <div style={{ color: dark ? "#F59E0B" : "#7C3AED",fontWeight:700,fontSize:13,letterSpacing:"2px",textTransform:"uppercase",marginBottom:10 }}>{eyebrow}</div>
      <h2 style={{ fontSize:38,fontWeight:800,color:textColor,letterSpacing:"-1px" }}>{title}</h2>
      {sub && <p style={{ color:subColor,marginTop:10,fontSize:15,maxWidth:500,margin:"10px auto 0" }}>{sub}</p>}
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label style={{ display:"block",fontWeight:700,fontSize:12,color:"#374151",marginBottom:7,textTransform:"uppercase",letterSpacing:".5px" }}>{label}</label>
      <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} type={type}
        style={{ width:"100%",background:"#F8FAFC",border:"2px solid #E5E7EB",borderRadius:12,padding:"11px 14px",fontSize:14,outline:"none",color:"#1F2937" }}/>
    </div>
  );
}
