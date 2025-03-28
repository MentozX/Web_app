import { useEffect, useState } from 'react'
import { Story, StoryAPI } from '../api/StoryAPI'
import { ProjectAPI } from '../api/ProjectAPI'

export function StoryList() {
  const [stories, setStories] = useState<Story[]>([])
  const [filter, setFilter] = useState<'all' | 'todo' | 'doing' | 'done'>('all')

  useEffect(() => {
    const projectId = ProjectAPI.getActiveProjectId()
    if (projectId) {
      const filtered = StoryAPI.getByProject(projectId)
      setStories(filtered)
    }
  }, [])

  const filteredStories = stories.filter((story) =>
    filter === 'all' ? true : story.status === filter
  )

  return (
    <div>
      <h3>Historyjki projektu</h3>
      <label>Filtruj:</label>{' '}
      <select value={filter} onChange={(e) => setFilter(e.target.value as any)}>
        <option value="all">Wszystkie</option>
        <option value="todo">Do zrobienia</option>
        <option value="doing">W trakcie</option>
        <option value="done">Zrobione</option>
      </select>
      <ul>
        {filteredStories.map((story) => (
          <li key={story.id}>
            <strong>{story.name}</strong> – {translateStatus(story.status)}, {translatePriority(story.priority)}
          </li>
        ))}
      </ul>
    </div>
  )
}

function translateStatus(status: string) {
  switch (status) {
    case 'todo':
      return 'Do zrobienia'
    case 'doing':
      return 'W trakcie'
    case 'done':
      return 'Zrobione'
    default:
      return status
  }
}

function translatePriority(priority: string) {
  switch (priority) {
    case 'low':
      return 'Niski'
    case 'medium':
      return 'Średni'
    case 'high':
      return 'Wysoki'
    default:
      return priority
  }
}
