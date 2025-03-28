import { useState } from 'react'

export function LoginForm() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Błąd logowania')
        return
      }

      const { token, refreshToken } = await res.json()
      localStorage.setItem('token', token)
      localStorage.setItem('refreshToken', refreshToken)

      const meRes = await fetch('http://localhost:3000/me', {
        headers: { Authorization: `Bearer ${token}` },
      })

      const user = await meRes.json()
        localStorage.setItem('user', JSON.stringify(user))
        alert(`Zalogowano jako ${user.name} (${user.role})`)
    } catch (err) {
      setError('Błąd połączenia z serwerem')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Logowanie</h3>
      <input
        type="text"
        placeholder="Login"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Hasło"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button type="submit">Zaloguj</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  )
}
