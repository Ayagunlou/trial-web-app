import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  // ฟังก์ชันเพิ่มค่า count แบบ async
  const incrementAsync = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // รอ 1 วิ (จำลอง async)
    setCount(count => count + 1);
  };

  // ฟังก์ชันลดค่า count แบบ async
  const decrementAsync = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // รอ 1 วิ (จำลอง async)
    setCount(count => count - 1);
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={incrementAsync}>
          count is + {count}
        </button>
        <button onClick={decrementAsync}>
          count is - {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}


export default App
