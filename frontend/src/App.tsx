import './App.css'
import Card from './components/UI/card/card'
import SearchTable from './components/UI/searchTable/searchTable'

export default function App() {
  return (
    <div className="min-h-screen flex p-3">

      <Card className="flex-1"
        children={
          <SearchTable />
        }
      />

    </div>
  )
}
