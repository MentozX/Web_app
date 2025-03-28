import { v4 as uuidv4 } from 'uuid'

export type StoryStatus = 'todo' | 'doing' | 'done'
export type StoryPriority = 'low' | 'medium' | 'high'

export interface Story {
  id: string
  name: string
  description: string
  priority: StoryPriority
  projectId: string
  createdAt: string
  status: StoryStatus
  ownerId: string
}

export class StoryAPI {
  static getAll(): Story[] {
    return JSON.parse(localStorage.getItem('stories') || '[]')
  }

  static saveAll(stories: Story[]) {
    localStorage.setItem('stories', JSON.stringify(stories))
  }

  static getByProject(projectId: string): Story[] {
    return this.getAll().filter((s) => s.projectId === projectId)
  }

  static add(story: Omit<Story, 'id' | 'createdAt'>): Story {
    const newStory: Story = {
      ...story,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    }
    const all = this.getAll()
    all.push(newStory)
    this.saveAll(all)
    return newStory
  }

  static update(updated: Story) {
    const all = this.getAll().map((s) => (s.id === updated.id ? updated : s))
    this.saveAll(all)
  }

  static delete(id: string) {
    const all = this.getAll().filter((s) => s.id !== id)
    this.saveAll(all)
  }
}
