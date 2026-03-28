import { useNavigate } from 'react-router-dom'

const HERO_URL = 'https://loremflickr.com/1600/900/photography,camera,darkroom'

const features = [
  {
    emoji: '🎞',
    title: 'Structured Lessons',
    body: 'Work through a curated curriculum built by working photographers — from exposure fundamentals to editorial lighting.'
  },
  {
    emoji: '🔍',
    title: 'Peer Critique Circles',
    body: 'Share a photo. Get honest, structured feedback. Give critique and sharpen your own eye in the process.'
  },
  {
    emoji: '📅',
    title: 'Live Monthly Workshops',
    body: 'Join live sessions with guest photographers covering genres, business, and portfolio editing.'
  },
  {
    emoji: '🤝',
    title: 'A Community That Shows Up',
    body: 'Connect with members at every skill level who are actively shooting, learning, and growing — not just lurking.'
  }
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <>
      <section
        style={{
          backgroundImage: `url(${HERO_URL})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-32">
          <p className="font-mono text-sm text-white/60 uppercase tracking-widest mb-6">LensGuild Membership</p>
          <h1 className="font-serif text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 max-w-3xl">
            The photography community that makes you better.
          </h1>
          <p className="font-mono text-lg text-white/80 mb-10 max-w-xl">
            Lessons, critiques, and live workshops — with peers who take the craft as seriously as you do.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/signup')}
              className="bg-primary text-white font-mono text-sm font-medium px-8 py-4 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-white hover:bg-primary-dark transition-colors"
            >
              Join LensGuild
            </button>
            <button
              onClick={() => navigate('/login')}
              className="border border-white/60 text-white font-mono text-sm px-8 py-4 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-white hover:bg-white/10 transition-colors"
            >
              Sign in
            </button>
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-ink text-center mb-4">
            Everything you need to grow.
          </h2>
          <p className="font-mono text-ink/60 text-center mb-16 max-w-xl mx-auto">
            LensGuild brings together the tools, feedback, and community that help photographers at every level move forward.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {features.map((f) => (
              <div key={f.title} className="flex flex-col gap-4">
                <span className="text-4xl" role="img" aria-label={f.title}>{f.emoji}</span>
                <h3 className="font-serif text-xl font-semibold text-ink">{f.title}</h3>
                <p className="font-mono text-sm text-ink/70 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-paper mb-6">
            Ready to take your photography further?
          </h2>
          <p className="font-mono text-paper/60 mb-10 max-w-lg mx-auto">
            Join a growing membership of photographers who show up, share their work, and keep improving.
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="bg-paper text-ink font-mono text-sm font-medium px-10 py-4 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-paper hover:bg-paper/80 transition-colors"
          >
            Start your membership
          </button>
        </div>
      </section>
    </>
  )
}
