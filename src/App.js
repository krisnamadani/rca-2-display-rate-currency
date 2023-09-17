import './App.css'
import React, {useState, useEffect} from 'react'

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://api.currencyfreaks.com/v2.0/rates/latest?apikey=83a0a22cfff74352984006964a233373&symbols=CAD,IDR,JPY,CHF,EUR,GBP')
    .then(res => res.json())
    .then(item => {
      setData(item.rates)
      setLoading(false)
    })
  }, [])
  
  return (
    <div className='bg-orange-400 h-screen w-screen flex justify-center items-center flex-col'>
      <table className='mb-10'>
        <thead>
          <tr className='text-white'>
            <th className='border border-white p-2'>Currency</th>
            <th className='border border-white p-2'>We Buy</th>
            <th className='border border-white p-2'>Exchange Rate</th>
            <th className='border border-white p-2'>We Sell</th>
          </tr>
        </thead>
        <tbody>
          {loading ? <tr><td className='text-white text-center border border-white p-2' colSpan={4}>Loading...</td></tr> : Object.keys(data).map((item, index) => {
            return (
              <tr key={index} className='text-white'>
                <td className='border border-white p-2'>{item}</td>
                <td className='border border-white p-2'>{Number(data[item]*1.05).toFixed(4)}</td>
                <td className='border border-white p-2'>{Number(data[item]).toFixed(4)}</td>
                <td className='border border-white p-2'>{Number(data[item]*0.95).toFixed(4)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div>
        <p className='text-white text-center'>Rates are based from 1 USD<br/>This application uses API from https://currencyfreaks.com.</p>
      </div>
    </div>
  );
}

export default App;
