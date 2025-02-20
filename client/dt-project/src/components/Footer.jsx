import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className='mt-10 bg-gray-900 flex flex-col gap-5 p-6'>
        <div className='flex'>
            <div className='w-[50%]'>
                <div className='text-white w-full'>
                    <p>©DT Agora. Todos os direitos reservados.</p>
                    <p>Desenvolvido por <a href="https://github.com/brunomartinsr" className="text-blue-500">Bruno Martins</a> | 2025</p>
                </div>
                <div className='text-white flex gap-4 pt-4'>
                    <a href="https://github.com/brunomartinsr" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faGithub} className="text-3xl hover:text-gray-400" />
                    </a>
                    <a href="https://www.linkedin.com/in/bruno-martins-rodrigues-86ba49268/" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faLinkedin} className="text-3xl hover:text-blue-400" />
                    </a>
                </div>
            </div>
            <div className='w-[50%] text-white'>
                <h1 className='text-xl border-b'>Sobre</h1>
                <p className='p-2'>Este site foi desenvolvido com o intuito de facilitar todos os desenvolvedores ou futuros desenvolvedores que, assim como eu, sentem dificuldade em achar, na internet, desafios técnicos para treinar para entrevistas, aqui é possível encontrar, sem dificuldades, diversos testes de diversos tipos e que se adequam ao perfil do usuário</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer