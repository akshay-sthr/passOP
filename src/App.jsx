import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import Manager from './manager'
import Footer from './components/footer'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
    <div className='min-h-[84vh]'>
    <Manager />
    </div>
    <Footer />
    </>
  )
}

export default App
