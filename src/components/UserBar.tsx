import { useEffect, useState } from 'react'
import { User, UserAPI } from '../api/UserAPI'

export function UserBar() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const cached = UserAPI.getCachedUser()
    if (cached) {
      setUser(cached)
    } else {
      UserAPI.getCurrentUser().then(setUser)
    }
  }, [])
  

  if (!user) return <div>ładowanie użytkownika...</div>

  return (
    <div>
      zalogowany: {user.firstName} {user.lastName}
    </div>
  )
}
