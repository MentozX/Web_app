import { useEffect, useState } from 'react'
import { Task, TaskAPI } from '../api/TaskAPI'
import { StoryAPI } from '../api/StoryAPI'
import { UserAPI } from '../api/UserAPI'

interface Props {
  taskId: string
}

export function TaskDetails({ taskId }: Props) {
  const [task, setTask] = useState<Task | null>(null)

  useEffect(() => {
    const found = TaskAPI.getAll().find((t) => t.id === taskId) || null
    setTask(found)
  }, [taskId])

  if (!task) return <p>Nie znaleziono zadania.</p>

  const story = StoryAPI.getAll().find((s) => s.id === task.storyId)
  const assignees = UserAPI.getAssignableUsers()

  const handleAssign = (e: React.ChangeEvent<HTMLSelectElement>) => {
    TaskAPI.assignUser(task.id, e.target.value)
    window.location.reload()
  }

  const handleMarkDone = () => {
    TaskAPI.markDone(task.id)
    window.location.reload()
  }

  return (
    <div>
      <h3>Szczegóły zadania</h3>
      <p><strong>Nazwa:</strong> {task.name}</p>
      <p><strong>Opis:</strong> {task.description}</p>
      <p><strong>Priorytet:</strong> {task.priority}</p>
      <p><strong>Historia:</strong> {story?.name}</p>
      <p><strong>Szacowany czas:</strong> {task.estimatedHours}h</p>
      <p><strong>Dodano:</strong> {task.createdAt}</p>
      {task.startedAt && <p><strong>Start:</strong> {task.startedAt}</p>}
      {task.finishedAt && <p><strong>Koniec:</strong> {task.finishedAt}</p>}
      {task.assigneeId && (
        <p>
          <strong>Przypisany:</strong>{' '}
          {UserAPI.getById(task.assigneeId)?.firstName}{' '}
          {UserAPI.getById(task.assigneeId)?.lastName}
        </p>
      )}
      {!task.assigneeId && (
        <>
          <label>Przypisz osobę:</label>{' '}
          <select onChange={handleAssign} defaultValue="">
            <option value="" disabled>Wybierz osobę</option>
            {assignees.map((u) => (
              <option key={u.id} value={u.id}>
                {u.firstName} {u.lastName} ({u.role})
              </option>
            ))}
          </select>
        </>
      )}
      {task.status === 'doing' && !task.finishedAt && (
        <>
          <br />
          <button onClick={handleMarkDone}>Oznacz jako zakończone</button>
        </>
      )}
    </div>
  )
}
