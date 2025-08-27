import './App.css'
import Card from './components/ui/card/card'
import SearchTable from './components/ui/searchTable/searchTable'

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
