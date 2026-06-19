import { useState } from 'react'
import './App.css'

/* ============================================================
   PLAY SPOT - single-file React app
   All pages live here and are switched using React state,
   so no router or extra packages are needed.
   ============================================================ */

/* ---------- Reusable: Logo ---------- */
function Logo({ onNav }) {
  return (
    <a className="logo" onClick={() => onNav('home')}>
      <div className="dot">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M12 2v20M2 12h20" stroke="#0c1118" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="12" cy="12" r="5.5" stroke="#0c1118" strokeWidth="2.5" />
        </svg>
      </div>
      <span>Play Spot</span>
    </a>
  )
}

/* ---------- Reusable: Navbar ---------- */
function Navbar({ active, user, onNav, onLogout }) {
  const initial = user ? user[0].toUpperCase() : 'U'
  return (
    <nav>
      <Logo onNav={onNav} />
      <div className="links">
        <a className={active === 'home' ? 'active' : ''} onClick={() => onNav('home')}>Home</a>
        <a className={active === 'spots' ? 'active' : ''} onClick={() => onNav('spots')}>Spots</a>
        <a className={active === 'about' ? 'active' : ''} onClick={() => onNav('about')}>About</a>
        <div className="user">
          <div className="avatar">{initial}</div>
          <button className="logout" onClick={onLogout}>Log out</button>
        </div>
      </div>
    </nav>
  )
}

/* ---------- Reusable: Footer ---------- */
function Footer({ onNav }) {
  return (
    <footer>
      <div className="footer-inner">
        <Logo onNav={onNav} />
        <div className="links">
          <a onClick={() => onNav('home')}>Home</a>
          <a onClick={() => onNav('spots')}>Spots</a>
          <a onClick={() => onNav('about')}>About</a>
          <a onClick={() => onNav('login')}>Login</a>
        </div>
        <small>© 2026 Play Spot. Student project.</small>
      </div>
    </footer>
  )
}

/* ---------- Page: Login ---------- */
function Login({ onLogin, onNav }) {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState(false)

  function submit() {
    if (!email.trim() || !pass.trim()) {
      setError(true)
      return
    }
    onLogin(email.trim())
  }
  const onKey = (e) => { if (e.key === 'Enter') submit() }

  return (
    <div className="login-wrap">
      <div className="card">
        <Logo onNav={onNav} />
        <h1>Welcome back</h1>
        <p className="sub">Log in to book your next game.</p>
        {error && <div className="err show">Please fill in both fields.</div>}
        <div className="field">
          <label>Email or username</label>
          <input type="text" placeholder="you@example.com" value={email}
            onChange={(e) => setEmail(e.target.value)} onKeyDown={onKey} />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" placeholder="********" value={pass}
            onChange={(e) => setPass(e.target.value)} onKeyDown={onKey} />
        </div>
        <div className="row">
          <label><input type="checkbox" className="cb" /> Remember me</label>
          <a>Forgot password?</a>
        </div>
        <button className="btn" onClick={submit}>Log In</button>
        <p className="foot">New here? <a className="link" onClick={() => onNav('signup')}>Create an account</a></p>
      </div>
    </div>
  )
}

/* ---------- Page: Signup ---------- */
function Signup({ onLogin, onNav }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState(false)

  function submit() {
    if (!name.trim() || !email.includes('@') || pass.length < 6) {
      setError(true)
      return
    }
    onLogin(email.trim())
  }

  return (
    <div className="login-wrap">
      <div className="card">
        <Logo onNav={onNav} />
        <h1>Create account</h1>
        <p className="sub">Join and start booking spots near you.</p>
        {error && <div className="err show">Please fill in all fields correctly.</div>}
        <div className="field">
          <label>Full name</label>
          <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="field">
          <label>Email</label>
          <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" placeholder="At least 6 characters" value={pass} onChange={(e) => setPass(e.target.value)} />
        </div>
        <button className="btn" onClick={submit}>Sign Up</button>
        <p className="foot">Already have an account? <a className="link" onClick={() => onNav('login')}>Log in</a></p>
      </div>
    </div>
  )
}

/* ---------- Data used by Home and Spots ---------- */
const STATS = [
  { n: '120+', l: 'Spots listed' },
  { n: '8k', l: 'Games booked' },
  { n: '15', l: 'Sports' },
  { n: '4.8★', l: 'Avg rating' },
]

const FEATURES = [
  { ic: '⚡', h: 'Instant booking', p: 'See real-time availability and confirm your slot in just a couple of taps.' },
  { ic: '📍', h: 'Spots near you', p: 'Discover courts and turfs close by, sorted by distance and price.' },
  { ic: '👥', h: 'Bring your crew', p: 'Create a team, invite friends, and split the booking together.' },
]

const ALL_SPOTS = [
  { bg: 'bg1', icon: '🏀', badge: 'Open now', name: 'City Basketball Court', meta: '2.1 km away · Rs 400/hr', cat: 'basketball' },
  { bg: 'bg2', icon: '⚽', badge: '3 left', name: 'Greenfield Turf', meta: '3.6 km away · Rs 900/hr', cat: 'football' },
  { bg: 'bg3', icon: '🏸', badge: 'Open now', name: 'Smash Badminton Hall', meta: '1.4 km away · Rs 250/hr', cat: 'badminton' },
  { bg: 'bg4', icon: '🎾', badge: 'Popular', name: 'Ace Tennis Club', meta: '5.0 km away · Rs 600/hr', cat: 'tennis' },
  { bg: 'bg5', icon: '🏏', badge: '2 left', name: 'Boundary Cricket Nets', meta: '4.2 km away · Rs 500/hr', cat: 'cricket' },
  { bg: 'bg6', icon: '🏊', badge: 'Open now', name: 'Splash Pool Arena', meta: '2.8 km away · Rs 300/hr', cat: 'swimming' },
  { bg: 'bg2', icon: '🏀', badge: 'Open now', name: 'Hoops Indoor Arena', meta: '6.1 km away · Rs 450/hr', cat: 'basketball' },
  { bg: 'bg1', icon: '⚽', badge: 'Popular', name: 'Striker 5-a-side', meta: '2.9 km away · Rs 800/hr', cat: 'football' },
  { bg: 'bg4', icon: '🏸', badge: '4 left', name: 'Shuttle Zone', meta: '3.3 km away · Rs 220/hr', cat: 'badminton' },
]

const CATEGORIES = ['all', 'basketball', 'football', 'badminton', 'tennis', 'cricket', 'swimming']

/* ---------- Page: Home ---------- */
function Home({ user, onNav, onLogout }) {
  return (
    <>
      <Navbar active="home" user={user} onNav={onNav} onLogout={onLogout} />
      <header className="hero">
        <span className="eyebrow">Book · Play · Repeat</span>
        <h2>Find a <em>spot</em>, grab your crew, just play.</h2>
        <p>Book courts, turfs, and arenas near you in seconds. Real availability, instant confirmation, zero hassle.</p>
        <div className="hero-actions">
          <a className="cta" onClick={() => onNav('spots')}>Browse spots →</a>
          <a className="cta ghost" onClick={() => onNav('about')}>How it works</a>
        </div>
      </header>

      <section className="stats">
        {STATS.map((s, i) => (
          <div className="stat" key={i}>
            <div className="n">{s.n}</div>
            <div className="l">{s.l}</div>
          </div>
        ))}
      </section>

      <div className="section-head"><h3>Why Play Spot</h3></div>
      <section className="features">
        {FEATURES.map((f, i) => (
          <div className="feature" key={i}>
            <div className="ic">{f.ic}</div>
            <h4>{f.h}</h4>
            <p>{f.p}</p>
          </div>
        ))}
      </section>

      <div className="section-head"><h3>Popular spots</h3><a onClick={() => onNav('spots')}>View all →</a></div>
      <section className="grid">
        {ALL_SPOTS.slice(0, 4).map((s, i) => (
          <div className={`spot ${s.bg}`} key={i}>
            <div className="top">{s.icon}<span className="badge">{s.badge}</span></div>
            <div className="body">
              <h3>{s.name}</h3>
              <p className="meta">{s.meta}</p>
              <a className="book" onClick={() => onNav('spots')}>Book now</a>
            </div>
          </div>
        ))}
      </section>

      <Footer onNav={onNav} />
    </>
  )
}

/* ---------- Page: Spots ---------- */
function Spots({ user, onNav, onLogout }) {
  const [filter, setFilter] = useState('all')
  const visible = filter === 'all' ? ALL_SPOTS : ALL_SPOTS.filter((s) => s.cat === filter)

  function book(name) {
    alert('Booked: ' + name + '\n(This is a demo - no real booking is made.)')
  }

  return (
    <>
      <Navbar active="spots" user={user} onNav={onNav} onLogout={onLogout} />
      <header className="hero hero-sm">
        <h2 className="h2-sm">Browse <em>spots</em></h2>
        <p>Pick a sport, find a spot, and book your slot.</p>
      </header>

      <div className="chips">
        {CATEGORIES.map((cat) => (
          <button key={cat} className={`chip ${filter === cat ? 'active' : ''}`} onClick={() => setFilter(cat)}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <section className="grid">
        {visible.map((s, i) => (
          <div className={`spot ${s.bg}`} key={i}>
            <div className="top">{s.icon}<span className="badge">{s.badge}</span></div>
            <div className="body">
              <h3>{s.name}</h3>
              <p className="meta">{s.meta}</p>
              <button className="book" onClick={() => book(s.name)}>Book now</button>
            </div>
          </div>
        ))}
      </section>

      <Footer onNav={onNav} />
    </>
  )
}

/* ---------- Page: About ---------- */
function About({ user, onNav, onLogout }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  const [error, setError] = useState(false)
  const [sent, setSent] = useState(false)

  function send() {
    if (!name.trim() || !email.includes('@') || !msg.trim()) {
      setError(true)
      setSent(false)
      return
    }
    setError(false)
    setSent(true)
    setName('')
    setEmail('')
    setMsg('')
  }

  return (
    <>
      <Navbar active="about" user={user} onNav={onNav} onLogout={onLogout} />
      <header className="hero hero-sm">
        <span className="eyebrow">About us</span>
        <h2 className="h2-md">Sports, made <em>simple</em>.</h2>
      </header>

      <section className="about-grid">
        <div className="prose">
          <p>Play Spot is a simple booking platform that connects players with sports venues nearby. Whether it is a quick game of basketball after class or a weekend football match with friends, we make finding and booking a spot fast and stress-free.</p>
          <p>Pick your sport, see what is available near you, and confirm your slot in seconds. No phone calls, no waiting, no confusion.</p>
          <p>This website was built as a student project using React to demonstrate reusable components, state, and interactivity.</p>
        </div>

        <div className="contact-card">
          <h4>Contact us</h4>
          {error && <div className="err show">Please fill in all fields.</div>}
          <div className="field">
            <label>Name</label>
            <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="field">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="field">
            <label>Message</label>
            <textarea placeholder="How can we help?" value={msg} onChange={(e) => setMsg(e.target.value)} />
          </div>
          <button className="btn" onClick={send}>Send message</button>
          {sent && <p className="ok show">Thanks! Your message has been sent.</p>}
        </div>
      </section>

      <Footer onNav={onNav} />
    </>
  )
}

/* ---------- Root App: controls which page shows ---------- */
export default function App() {
  const [page, setPage] = useState('login')
  const [user, setUser] = useState(null)

  const onNav = (p) => setPage(p)
  const onLogin = (email) => { setUser(email); setPage('home') }
  const onLogout = () => { setUser(null); setPage('login') }

  switch (page) {
    case 'signup': return <Signup onLogin={onLogin} onNav={onNav} />
    case 'home':   return <Home user={user} onNav={onNav} onLogout={onLogout} />
    case 'spots':  return <Spots user={user} onNav={onNav} onLogout={onLogout} />
    case 'about':  return <About user={user} onNav={onNav} onLogout={onLogout} />
    default:       return <Login onLogin={onLogin} onNav={onNav} />
  }
}
