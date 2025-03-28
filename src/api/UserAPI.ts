export type UserRole = 'admin' | 'devops' | 'developer'

export interface User {
  id: string
  firstName: string
  lastName: string
  role: UserRole
}

const mockUsers: User[] = [
  {
    id: 'user1',
    firstName: 'Jan',
    lastName: 'Kowalski',
    role: 'admin',
  },
  {
    id: 'user2',
    firstName: 'Ewa',
    lastName: 'Nowak',
    role: 'developer',
  },
  {
    id: 'user3',
    firstName: 'Adam',
    lastName: 'Zielinski',
    role: 'devops',
  },
]

export class UserAPI {
    static getCurrentUser(): Promise<User> {
      const token = localStorage.getItem('token')
      return fetch('http://localhost:3000/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json())
    }
  
    static getAll(): User[] {
      return mockUsers
    }
  
    static getById(id: string): User | undefined {
      return mockUsers.find((u) => u.id === id)
    }
  
    static getAssignableUsers(): User[] {
      return mockUsers.filter((u) => u.role === 'developer' || u.role === 'devops')
    }
    static getCachedUser(): User | null {
        const json = localStorage.getItem('user')
        if (!json) return null
        return JSON.parse(json)
    }
      
  }
  