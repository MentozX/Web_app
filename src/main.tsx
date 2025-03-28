import React from 'react'
import ReactDOM from 'react-dom/client'
import { UserBar } from './components/UserBar'
import { ProjectSelector } from './components/ProjectSelector'
import { AddProjectForm } from './components/AddProjectForm'
import { StoryList } from './components/StoryList'
import { AddStoryForm } from './components/AddStoryForm'
import { TaskBoard } from './components/TaskBoard'
import { LoginForm } from './components/LoginForm'

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <LoginForm />
    <UserBar />
    <AddProjectForm />
    <ProjectSelector />
    <AddStoryForm />
    <StoryList />
    <TaskBoard />
  </React.StrictMode>
)





