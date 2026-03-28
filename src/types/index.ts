export interface UserProfile {
  id: string
  user_id: string
  display_name: string
  bio: string
  specialty: string
  website: string
  created_at: string
  deleted_at: string | null
}

export interface Lesson {
  id: string
  title: string
  description: string
  video_url: string
  duration_minutes: number
  skill_level: 'beginner' | 'intermediate' | 'advanced'
  created_at: string
  deleted_at: string | null
}

export interface LessonProgress {
  id: string
  user_id: string
  lesson_id: string
  completed: boolean
  created_at: string
  deleted_at: string | null
}

export interface CritiquPost {
  id: string
  user_id: string
  title: string
  image_url: string
  description: string
  created_at: string
  deleted_at: string | null
}

export interface AuthState {
  user: { id: string; email: string } | null
  loading: boolean
}
