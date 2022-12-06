import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'

// Import of Pages Components
import Home from './components/pages/Home'
import Company from './components/pages/Company'
import Contact from './components/pages/Contact'
import NewProject from './components/pages/NewProject'

// Import of Layout Components
import Container from './components/layout/Container'

export default function App() {
  return (
  <Router>
    <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/contact'>Contato</Link></li>
    </ul>

    <Container customClass="min-height">
      <Routes>
        <Route path='/' element={<Home/>} />
          
        <Route path='/company' element={<Company/>} />

        <Route path='/contact' element={<Contact/>} />

        <Route path='/newproject' element={<NewProject/>} />
      </Routes>
    </Container>

    <p>Footer</p>
  </Router> 
);
}

