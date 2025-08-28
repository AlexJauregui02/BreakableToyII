import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Card } from '@/components/UI/card/card'
import ResultPage from './pages/Resultspage'
import SearchPage from './pages/SearchPage'
import DetailsPage from './pages/DetailsPage'


export default function App() {
  return (
    <div className="min-h-screen flex p-3">
      <Card className="flex-1">
        <Router>
          <Routes>
            <Route path='/' element={<SearchPage />}/>
            <Route path='/results' element={<ResultPage/>}/>
            <Route path='/details' element={<DetailsPage/>}/>
          </Routes>
        </Router>
      </Card>
    </div>
  )
}
