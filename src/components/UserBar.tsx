import { useEffect, useState } from 'react';
import { User, UserAPI } from '../api/UserAPI';

export function UserBar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const currentUser = await UserAPI.getCurrentUser();
      setUser(currentUser);
    }
    fetchUser();
  }, []);

  if (!user) return <div>Ładowanie danych użytkownika...</div>;

  return (
    <div>
      Zalogowany: {user.firstName} {user.lastName}
    </div>
  );
}