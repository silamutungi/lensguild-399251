import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Lesson, LessonProgress } from '../types'

const SKILL_LABELS: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced'
}

const MOCK_LESSONS: Lesson[] = [
  { id: '1', title: 'Understanding Exposure Triangle', description: 'Master aperture, shutter speed, and ISO — and how they interact in every shooting condition.', video_url: '', duration_minutes: 28, skill_level: 'beginner', created_at: '', deleted_at: null },
  { id: '2', title: 'Natural Light Portraits', description: 'Use window light, open shade, and golden hour to create flattering, mood-rich portraits.', video_url: '', duration_minutes: 35, skill_level: 'intermediate', created_at: '', deleted_at: null },
  { id: '3', title: 'Building a Cohesive Portfolio', description: 'Edit down your best work, establish a visual voice, and present a portfolio that gets you hired.', video_url: '', duration_minutes: 42, skill_level: 'advanced', created_at: '', deleted_at: null },
  { id: '4', title: 'Composition Principles', description: 'Rule of thirds, leading lines, negative space — make deliberate choices that strengthen every frame.', video_url: '', duration_minutes: 22, skill_level: 'beginner', created_at: '', deleted_at: null }
]

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [completed, setCompleted] = useState<Set<string>>(new Set())
  const [progressLoading, setProgressLoading] = useState(true)
  const [progressError, setProgressError] = useState('')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUserEmail(data.user.email ?? '')
        setDisplayName(data.user.user_metadata?.display_name ?? data.user.email ?? 'Member')
      }
    })
  }, [])

  useEffect(() => {
    async function loadProgress() {
      setProgressLoading(true)
      setProgressError('')
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data, error } = await supabase
        .from('lesson_progress')
        .select('lesson_id')
        .eq('user_id', user.id)
        .eq('completed', true)
        .is('deleted_at', null)
      if (error) {
        setProgressError('Could not load your progress. Please refresh to try again.')
      } else {
        setCompleted(new Set((data ?? []).map((r: { lesson_id: string }) => r.lesson_id)))
      }
      setProgressLoading(false)
    }
    loadProgress()
  }, [])

  async function toggleComplete(lessonId: string) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const isCompleted = completed.has(lessonId)
    if (isCompleted) {
      await supabase
        .from('lesson_progress')
        .update({ deleted_at: new Date().toISOString() })
        .eq('user_id', user.id)
        .eq('lesson_id', lessonId)
      setCompleted((prev) => { const s = new Set(prev); s.delete(lessonId); return s })
    } else {
      await supabase
        .from('lesson_progress')
        .upsert({ user_id: user.id, lesson_id: lessonId, completed: true, deleted_at: null })
      setCompleted((prev) => new Set(prev).add(lessonId))
    }
  }

  return (
    <div className="bg-paper min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <p className="font-mono text-sm text-ink/50 mb-1">Signed in as {userEmail}</p>
          <h1 className="font-serif text-4xl font-bold text-ink">Welcome back, {displayName}.</h1>
          <p className="font-mono text-sm text-ink/60 mt-2">
            {completed.size} of {MOCK_LESSONS.length} lessons complete
          </p>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-semibold text-ink">Your Lessons</h2>
          <span className="font-mono text-xs text-ink/40 uppercase tracking-widest">Current curriculum</span>
        </div>

        {progressError && (
          <div role="alert" className="font-mono text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3 mb-6">
            {progressError}
            <button onClick={() => window.location.reload()} className="ml-4 underline">Retry</button>
          </div>
        )}

        {progressLoading ? (
          <div className="flex items-center gap-3 py-12">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="font-mono text-sm text-ink/50">Loading your progress...</span>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {MOCK_LESSONS.map((lesson) => {
              const done = completed.has(lesson.id)
              return (
                <div
                  key={lesson.id}
                  className={`border p-6 flex flex-col sm:flex-row sm:items-center gap-4 transition-colors ${
                    done ? 'border-primary/30 bg-primary/5' : 'border-ink/15 bg-white'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-xs text-ink/40 uppercase tracking-wider">
                        {SKILL_LABELS[lesson.skill_level]} · {lesson.duration_minutes} min
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-ink">{lesson.title}</h3>
                    <p className="font-mono text-sm text-ink/60 mt-1 leading-relaxed">{lesson.description}</p>
                  </div>
                  <button
                    onClick={() => toggleComplete(lesson.id)}
                    className={`shrink-0 font-mono text-xs px-5 py-2 min-h-[44px] border focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                      done
                        ? 'bg-primary text-white border-primary hover:bg-primary-dark'
                        : 'bg-white text-primary border-primary hover:bg-primary/10'
                    }`}
                  >
                    {done ? 'Completed' : 'Mark complete'}
                  </button>
                </div>
              )
            })}
          </div>
        )}

        <div className="mt-16 border border-ink/10 bg-white p-8">
          <h2 className="font-serif text-2xl font-semibold text-ink mb-2">Next live workshop</h2>
          <p className="font-mono text-sm text-ink/60 mb-4">Editing for Emotion — with guest photographer Maria Suarez</p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-ink/50">Saturday, 2 PM UTC</span>
            <button className="font-mono text-xs bg-primary text-white px-5 py-2 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary hover:bg-primary-dark transition-colors">
              Add to calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
