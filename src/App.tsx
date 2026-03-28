import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-paper font-mono">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
                <h1 className="font-serif text-4xl text-ink mb-4">Page not found</h1>
                <p className="text-ink/60 mb-8">That page does not exist or has moved.</p>
                <a href="/" className="bg-primary text-white font-mono text-sm px-6 py-3 min-h-[44px] flex items-center focus:outline-none focus:ring-2 focus:ring-primary">
                  Back to home
                </a>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
