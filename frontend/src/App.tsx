import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Card } from '@/components/UI/card/card'
import ResultPage from '@/pages/ResultsPage'
import SearchPage from '@/pages/SearchPage'
import DetailsPage from '@/pages/DetailsPage'
import { FlightResultsProvider } from './context/FlightOffersContext'
import { IataCodeProvider } from './context/IataCodeContext'


export default function App() {
  return (
    <div className="h-screen flex p-3">
      <Card className="flex-1 px-30">
        <FlightResultsProvider>
          <IataCodeProvider>
            <Router>
              <Routes>
                <Route path='/' element={<SearchPage />}/>
                <Route path='/results' element={<ResultPage/>}/>
                <Route path='/results/:flightOfferID' element={<DetailsPage/>}/>
              </Routes>
            </Router>
          </IataCodeProvider>
        </FlightResultsProvider>
      </Card>
    </div>
  )
}
