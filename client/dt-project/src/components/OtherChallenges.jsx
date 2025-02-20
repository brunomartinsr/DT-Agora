import React, {useState, useEffect} from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { languageColor, areaColor, typeColor } from '../utils/colors'

const OtherChallenges = ({filters}) => {

  const [otherChallenges, setOtherChallenges] = useState([])

  useEffect(() => {
    const showOtherChallenges = async () => {
      try {
        const params = new URLSearchParams(filters)
        const queryString = params.toString()

        const response = await fetch(`http://localhost:3000/otherChallenges?${queryString}`,{ 
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })

        if(response.ok){
          const challenges = await response.json()
          setOtherChallenges(challenges)
        }

      } catch(error){
        console.error(error)
      }
    }

    showOtherChallenges()
  }, [filters])

  return (
    <div className='pb-5  ml-10'>
        <h1 className='text-blue-900 font-bold text-2xl border-b-2 border-blue-200 mb-7'>Outros desafios:</h1>
        {otherChallenges.length > 0 ? (
        <ul>
            {otherChallenges.map((challenge, index) => (
              <motion.li 
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}  
                animate={{ opacity: 1, y: 0 }}  
                transition={{ duration: 0.5, delay: index * 0.1 }} 
                className='pb-5'
              >
                <Link to={`/challenge/${challenge.id}`} className='font-bold hover:text-blue-700 bg-gray-100 rounded-md p-1 min-w-[240px] block shadow-md hover:bg-gray-200 hover:shadow transition'
                >
                    <div className='flex items-center justify-between'>
                      <div className="flex flex-col flex-1 ml-6">
                        <span className="text-blue-900 text-lg">{challenge.title}</span>
                        <span className="text-gray-500 text-xs pt-2 pb-2 pr-6">{challenge.sumary}</span>
                      </div>
                      <span className={`text-white text-sm ml-3 py-1 px-2 pr-2 rounded-2xl flex-shrink-0 ${languageColor[challenge.language] || languageColor.Default}`}>
                          {challenge.language}
                      </span>
                      <span className={`text-white text-sm py-1 px-2 rounded-2xl flex-shrink-0 ml-5 ${areaColor[challenge.area] || areaColor.Default}`}>
                          {challenge.area}
                      </span>
                      <span className={`text-white text-sm py-1 px-2 rounded-2xl flex-shrink-0 ml-5 mr-10 ${typeColor[challenge.type] || typeColor.Default}`}>
                          {challenge.type}
                      </span>
                    </div>
                </Link>
              </motion.li>
              ))}
          </ul>
      ) : (
          <p>Nenhum desafio encontrado</p>
      )}
    </div>
  )
}

export default OtherChallenges