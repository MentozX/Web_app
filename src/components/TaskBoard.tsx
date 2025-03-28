import { useEffect, useState } from 'react'
import { Task, TaskAPI } from '../api/TaskAPI'
import { StoryAPI } from '../api/StoryAPI'
import { ProjectAPI } from '../api/ProjectAPI'

export function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const projectId = ProjectAPI.getActiveProjectId()
    if (!projectId) return
    const stories = StoryAPI.getByProject(projectId).map((s) => s.id)
    const projectTasks = TaskAPI.getAll().filter((t) => stories.includes(t.storyId))
    setTasks(projectTasks)
  }, [])

  const columns = {
    todo: tasks.filter((t) => t.status === 'todo'),
    doing: tasks.filter((t) => t.status === 'doing'),
    done: tasks.filter((t) => t.status === 'done'),
  }

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      {(['todo', 'doing', 'done'] as const).map((status) => (
        <div key={status}>
          <h3>{status.toUpperCase()}</h3>
          {columns[status].length === 0 && <p>Brak zadań</p>}
          <ul>
            {columns[status].map((task) => (
              <li key={task.id}>
                <strong>{task.name}</strong> ({task.priority})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
