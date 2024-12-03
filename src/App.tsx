
import './App.css'
import { Main } from './components/MediaPlayer/Main'



function App() {

  const styles = {
    main : 'relative w-full h-screen flex items-center justify-center bg-slate-950'
  }

  return (
    <div className={styles.main}>
      <Main/>
    </div>
  )
}

export default App
