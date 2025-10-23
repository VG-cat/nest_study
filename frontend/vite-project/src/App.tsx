import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useQuery } from '@apollo/client/react'
import { FIND } from './graphql/demo'

function App() {
  const [count, setCount] = useState(0)

  const {loading,data} = useQuery(FIND,{
    variables:{
      id:'8c118431-4215-468a-b19b-4915f7c9007d'
    }
  })
  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        {JSON.stringify(data)}
      </p>
    </>
  )
}

export default App
