import { v4 as uuidv4 } from 'uuid'

export type TaskStatus = 'todo' | 'doing' | 'done'
export type TaskPriority = 'low' | 'medium' | 'high'

export interface Task {
  id: string
  name: string
  description: string
  priority: TaskPriority
  storyId: string
  estimatedHours: number
  status: TaskStatus
  createdAt: string
  startedAt?: string
  finishedAt?: string
  assigneeId?: string
}

export class TaskAPI {
  static getAll(): Task[] {
    return JSON.parse(localStorage.getItem('tasks') || '[]')
  }

  static saveAll(tasks: Task[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  static getByStory(storyId: string): Task[] {
    return this.getAll().filter((t) => t.storyId === storyId)
  }

  static getByStatus(status: TaskStatus): Task[] {
    return this.getAll().filter((t) => t.status === status)
  }

  static add(task: Omit<Task, 'id' | 'createdAt'>): Task {
    const newTask: Task = {
      ...task,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    }
    const all = this.getAll()
    all.push(newTask)
    this.saveAll(all)
    return newTask
  }

  static update(updated: Task) {
    const all = this.getAll().map((t) => (t.id === updated.id ? updated : t))
    this.saveAll(all)
  }

  static delete(id: string) {
    const all = this.getAll().filter((t) => t.id !== id)
    this.saveAll(all)
  }

  static assignUser(id: string, userId: string) {
    const task = this.getAll().find((t) => t.id === id)
    if (!task) return
    task.assigneeId = userId
    task.status = 'doing'
    task.startedAt = new Date().toISOString()
    this.update(task)
  }

  static markDone(id: string) {
    const task = this.getAll().find((t) => t.id === id)
    if (!task || !task.assigneeId) return
    task.status = 'done'
    task.finishedAt = new Date().toISOString()
    this.update(task)
  }
}
