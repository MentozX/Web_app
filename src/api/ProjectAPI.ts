import { v4 as uuidv4 } from 'uuid'

export interface Project {
  id: string
  name: string
  description: string
}

export class ProjectAPI {
  static getAll(): Project[] {
    return JSON.parse(localStorage.getItem('projects') || '[]')
  }

  static saveAll(projects: Project[]) {
    localStorage.setItem('projects', JSON.stringify(projects))
  }

  static add(project: Omit<Project, 'id'>): Project {
    const newProject = { ...project, id: uuidv4() }
    const all = this.getAll()
    all.push(newProject)
    this.saveAll(all)
    return newProject
  }

  static delete(id: string) {
    const filtered = this.getAll().filter((p) => p.id !== id)
    this.saveAll(filtered)
  }

  static setActiveProject(id: string) {
    localStorage.setItem('activeProjectId', id)
  }

  static getActiveProjectId(): string | null {
    return localStorage.getItem('activeProjectId')
  }

  static getActiveProject(): Project | null {
    const id = this.getActiveProjectId()
    return this.getAll().find((p) => p.id === id) || null
  }
}
