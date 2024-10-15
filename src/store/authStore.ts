import create from 'zustand';

interface User {
  id: number;
  name: string;
  role: 'admin' | 'employee';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
  register: (username: string, password: string, role: 'admin' | 'employee') => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (username, password) => {
    // Simulación de autenticación
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: User) => u.name === username && u.password === password);
    if (user) {
      set({ user: { id: user.id, name: user.name, role: user.role }, isAuthenticated: true });
    } else {
      alert('Credenciales inválidas');
    }
  },
  logout: () => set({ user: null, isAuthenticated: false }),
  register: (username, password, role) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const newUser = { id: users.length + 1, name: username, password, role };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Usuario registrado con éxito');
  },
}));

export default useAuthStore;