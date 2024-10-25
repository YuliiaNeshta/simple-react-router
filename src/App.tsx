import { Router } from './utils/Router/Router.tsx';
import Dashboard from './pages/Dashboard';
import Order from './pages/Order';

//Use this config for structure of path your App
const config = [
    {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/orders/:id',
    element: <Order />,
  },
];

export type AvailablePaths = (typeof config)[number]['path'];

function App() {
  return <Router config={config} />;
}

export default App;
