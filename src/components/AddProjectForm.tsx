import { useState } from 'react'
import { ProjectAPI } from '../api/ProjectAPI'

export function AddProjectForm() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    ProjectAPI.add({ name, description })
    setName('')
    setDescription('')
    window.location.reload() // prosto: odśwież, żeby komponenty się zaktualizowały
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Dodaj nowy projekt</h3>
      <input
        type="text"
        placeholder="Nazwa"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Opis"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <button type="submit">Dodaj projekt</button>
    </form>
  )
}
