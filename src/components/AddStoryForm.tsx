import { useState } from 'react'
import { StoryAPI, StoryPriority, StoryStatus } from '../api/StoryAPI'
import { ProjectAPI } from '../api/ProjectAPI'
import { UserAPI } from '../api/UserAPI'

export function AddStoryForm() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<StoryPriority>('medium')
  const [status, setStatus] = useState<StoryStatus>('todo')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const projectId = ProjectAPI.getActiveProjectId()
    const user = await UserAPI.getCurrentUser()
  
    if (!projectId || !name.trim() || !user) return
  
    StoryAPI.add({
      name,
      description,
      priority,
      status,
      projectId,
      ownerId: user.id,
    })
  
    setName('')
    setDescription('')
    setPriority('medium')
    setStatus('todo')
    window.location.reload()
  }
  

  return (
    <form onSubmit={handleSubmit}>
      <h3>Dodaj historyjkę</h3>
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
      <label>Priorytet:</label>{' '}
      <select value={priority} onChange={(e) => setPriority(e.target.value as any)}>
        <option value="low">Niski</option>
        <option value="medium">Średni</option>
        <option value="high">Wysoki</option>
      </select>
      <br />
      <label>Status:</label>{' '}
      <select value={status} onChange={(e) => setStatus(e.target.value as any)}>
        <option value="todo">Do zrobienia</option>
        <option value="doing">W trakcie</option>
        <option value="done">Zrobione</option>
      </select>
      <br />
      <button type="submit">Dodaj</button>
    </form>
  )
}
