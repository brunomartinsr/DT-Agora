import React, { useState, useEffect } from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import { useParams } from 'react-router-dom'
import {languageColor, areaColor, typeColor} from '../utils/colors.js'

const Challenge = () => {

  const [challenge, setChallenge] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const {id} = useParams()


  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await fetch(`http://localhost:3000/challenge/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        
        if(!response.ok) {
          throw new Error("Desafio nao encontrado")
        }

        const details = await response.json()
        setChallenge(details[0])
        
      } catch(error) {
        setError(error.message)
        console.log(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchChallenge()
  }, [id])

  if(loading) {
    return <div>Carregando...</div>
  }

  if(error) {
    return <div>{error}</div>
  }
    

  return (
    <div className='bg-gray-700 flex flex-col min-h-screen'>
        <Header/>
        <main className=''>
        
        <div className='bg-white rounded-2xl w-[80%] mx-auto mt-20 p-4 flex justify-between'>
          <div className='w-[55%]'>
            <div>
              <h1 className='text-2xl pb-4 text-blue-900 font-bold'>{challenge.title}</h1>
              <p className='text-lx text-gray-500 font-bold text-justify'>{challenge.description}</p>
            </div>
          </div>

          <div className='w-[40%] flex flex-col items-end'>
            <div className='flex justify-end space-x-4'>
              <span className={`text-white text-1sm py-1 px-2 pr-2 rounded-2xl flex-shrink-0  ${languageColor[challenge.language] || languageColor.Default}`}
              >
                {challenge.language}
              </span>
              <span className={`text-white text-1sm py-1 px-2 rounded-2xl flex-shrink-0 ${areaColor[challenge.area] || areaColor.Default}`}
              >
                {challenge.area}
              </span>
              <span className={`text-white text-1sm py-1 px-2 rounded-2xl flex-shrink-0 ${typeColor[challenge.type] || typeColor.Default}`}
              >
                {challenge.type}
              </span>
            </div>  
            <div className='bg-gray-200 flex flex-col items-center  space-x-2 w-full mt-10 h-[55%] rounded-2xl'>
              <h2 className='py-5 px-5 text-gray-600 text font-bold text-center'>O desafio possui um GitHub com mais detalhes, la você poderá ler mais sobre e baixar o arquivo</h2>
              <p className='pb-5 text-gray-800 text-xl font-bold'>Detalhes do Desafio:</p>
              <a href={challenge.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className='bg-yellow-500 text-white font-bold  block mb-5 h-10 p-2 rounded-2xl mx-auto hover:bg-yellow-700 transition'
              >
                GitHub do desafio
              </a>
            </div>
          </div>
        </div>
        </main>
        <Footer/>
    </div>
)
}

export default Challenge