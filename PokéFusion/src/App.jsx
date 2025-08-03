import './App.css'
import { useRoutes } from 'react-router-dom'
import Sidebar from './components/Sidebar';  // adjust path if needed

import { Link } from 'react-router-dom'
import Home from './pages/Home';

import CreatePokemon from './pages/CreatePokemon'
import ReadPokemon from './pages/ReadPokemon'
import EditPokemon from './pages/EditPokemon'
import DeletePokemon from './pages/DeletePokemon'


function App() {
  const poke = [
      {'id':'1', 
      'title': 'Cartwheel in Chelsea 🤸🏽‍♀️',
      'author':'Harvey Milian', 
      }
  ]
  // Sets up routes
  let element = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/create', element: <CreatePokemon /> },
    { path: '/read', element: <ReadPokemon /> },
    { path: '/edit/:id', element: <EditPokemon /> },
    { path: '/delete/:id', element: <DeletePokemon /> }
  ]);

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ marginLeft: 200, padding: '1rem', width: '100%' }}>
          {element}
        </main>
      </div>
    </>
  )
}

export default App


