import { useEffect, useState } from 'react';
import './App.css'


function App() {
  const [value, setValue] = useState(0)
  const [num, setNum] = useState(false)
  const [char, setChar] = useState(false)
  const [range, setRange] = useState(8)

  const genrator = () => {
    let variable = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let numbers = '12345678901234567890'
    let characs = "~!@#$%^&*()_=-=!@#$%^&*()_-=[]\\{}+"

    console.log(variable.length)
    console.log(char, num)
  }

  useEffect(() => {
    genrator()
  }, [setValue, num, char, range])

  return (
    <>
      <div className='bg-gray-700 text-white flex flex-col items-center w-full h-screen'>
        <nav className='bg-gray-900 flex w-full p-5'>
          <h1 className='align-middle'>password genrator</h1>
        </nav>
        <main className='bg-blue-600 flex flex-col justify-between items-center p-10 m-10 rounded-lg width-auto '>
          <input
            className='bg-blue-500 m-4 p-2'
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            readOnly />

          <div >
            <input
              className='bg-blue-500 m-4'
              type='range'
              max={100}
              min={0}
              value={range}
              onChange={(prev) => setRange(prev.target.value)} />

            <p>{range}</p>

            <div>
              <p>numbers</p>
              <input
                className='bg-blue-500 p-4'
                type='checkbox'
                value={num}
                onClick={(prev) => setNum(!prev)} />

            </div>

            <div>
              <p>character</p>
              <input
                className='bg-blue-500 p-4'
                type='checkbox'
                value={char}
                onChange={(prev) => setChar(!prev)} />
            </div>
          </div>

        </main>
      </div>
    </>
  );
}

export default App
