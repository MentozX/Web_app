import { useEffect, useState } from 'react'
import { Project, ProjectAPI } from '../api/ProjectAPI'

export function ProjectSelector() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    const all = ProjectAPI.getAll()
    setProjects(all)
    setSelectedId(ProjectAPI.getActiveProjectId())
  }, [])

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const id = e.target.value
    setSelectedId(id)
    ProjectAPI.setActiveProject(id)
  }

  return (
    <div>
      <label>Aktywny projekt:</label>
      <select value={selectedId || ''} onChange={handleSelect}>
        <option value="">-- wybierz projekt --</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
    </div>
  )
}
