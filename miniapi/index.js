const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

const app = express()
const PORT = 3000
const SECRET = 'tajnyklucz'

app.use(cors())
app.use(bodyParser.json())

const users = [
  { id: 1, login: 'admin', password: 'admin123', role: 'admin', name: 'Jan Kowalski' },
  { id: 2, login: 'dev', password: 'dev123', role: 'developer', name: 'Ewa Nowak' },
  { id: 3, login: 'ops', password: 'ops123', role: 'devops', name: 'Adam Zielinski' },
]

app.post('/auth/login', (req, res) => {
  const { login, password } = req.body
  const user = users.find((u) => u.login === login && u.password === password)

  if (!user) return res.status(401).json({ error: 'Błędny login lub hasło' })

  const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '10m' })
  const refreshToken = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1h' })

  res.json({ token, refreshToken })
})

app.post('/auth/refresh', (req, res) => {
  const { refreshToken } = req.body
  try {
    const data = jwt.verify(refreshToken, SECRET)
    const token = jwt.sign({ id: data.id }, SECRET, { expiresIn: '10m' })
    res.json({ token })
  } catch (e) {
    res.status(401).json({ error: 'Refresh token niepoprawny' })
  }
})

app.get('/me', (req, res) => {
  const auth = req.headers.authorization
  if (!auth) return res.status(401).json({ error: 'Brak tokenu' })

  try {
    const decoded = jwt.verify(auth.replace('Bearer ', ''), SECRET)
    const user = users.find((u) => u.id === decoded.id)
    if (!user) return res.status(404).json({ error: 'Użytkownik nie istnieje' })

    const { password, ...safeUser } = user
    res.json(safeUser)
  } catch (e) {
    res.status(401).json({ error: 'Token niepoprawny' })
  }
})

app.listen(PORT, () => {
  console.log(`API działa na http://localhost:${PORT}`)
})
