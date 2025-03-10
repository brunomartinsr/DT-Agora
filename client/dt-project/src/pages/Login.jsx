import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { validateEmail } from "../utils/validators"
import { AuthContext } from "../context/AuthContext"

const Login = () => {

  const [emailData, setEmailData] = useState("")
  const [passwordData, setPasswordData] = useState("")
  const navigate = useNavigate()
  const { setUser } = useContext(AuthContext)

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://accounts.google.com/gsi/client"
    script.async = true
    script.defer = true
    document.body.appendChild(script)
  
    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse
        })
  
        window.google.accounts.id.renderButton(
          document.getElementById("googleSignInDiv"),
          { theme: "outline", size: "large" }
        )
      }
    }
  
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleCredentialResponse = (response) => {
    console.log("Google credential response", response);
  
    if (response.credential) {
      const token = response.credential
      sessionStorage.setItem('google_token', token)
      setUser(token)
      navigate("/home")
    }
  };
  

  const handleSubmit = async () => {
    
    if(!validateEmail(emailData)){
      alert("Email inválido")
      return
    }
    
    const loginData = {
      userEmail: emailData,
      userPassword: passwordData
    }

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if(response.ok){
        const result = await response.json()
        const token = result.token
        sessionStorage.setItem('token', token)

        setUser({ token })

        setTimeout(() => {
          navigate('/home')
        }, 600)
      }
      else {
        alert("Usuario inválido")
      }

    }
    catch (error){
      console.log(error)
    }
  }

  return (
    <div className='bg-gray-900 min-h-screen flex items-center justify-center'>
      <div className='bg-gray-600 w-[60%] h-140 flex rounded-2xl'>
        <fieldset className='w-[50%] h-[100%] flex flex-col items-center justify-center'>
          <h1 className="text-5xl mb-10 text-yellow-300 font-bold">Login</h1>
          <div className='bg-white flex flex-col h-100 w-[70%] mx-auto pt-10 px-5 rounded-2xl shadow-2xl'>
            <label htmlFor="email" className="text-xl">Login</label>
            <input 
            type="text" 
            id="email" 
            placeholder="Digite o seu e-mail" 
            className='bg-gray-200 border-gray-800 h-8 rounded-xl'
            value={emailData}
            onChange={(e) => setEmailData(e.target.value)}
            />

            <label htmlFor="password" className="mt-5 text-xl">Senha</label>
            <input 
            type="password" 
            id="password" 
            placeholder="Digite a senha" 
            className='bg-gray-200 border-gray-800 h-8 rounded-xl'
            value={passwordData}
            onChange={(e) => setPasswordData(e.target.value)}
            />

            <button
              type='button'
              className='w-[90%] font-bold mt-10 mx-auto py-2 px-4 rounded-md transition shadow-2xl bg-yellow-500 text-gray-800 hover:bg-yellow-700 hover:text-gray-200 cursor-pointer'
              onClick={handleSubmit}
            >
              Entrar
            </button>
            <div id="googleSignInDiv" className="mt-5 flex justify-center"></div>
            <a href="./Signup.jsx" className="mt-3 mx-auto text-amber-600 underline hover:text-amber-400">Cadastrar-se</a>
          </div>
        </fieldset>

        <fieldset className="bg-gray-700 rounded-r-2xl w-[50%]">
          <h1 className="logo font-sans font-bold text-4xl flex flex-col relative mt-20">
            <span className="text-white text-7xl ml-15 mb-4">{'{'}</span>
            <span className="text-green-600 text-9xl ml-20">DT</span>
            <span className="text-yellow-500 text-7xl ml-30">Agora</span>
            <span className="text-white text-7xl ml-15">{'}'}</span>
          </h1>
        </fieldset>
        
      </div>
    </div>
  )
}

export default Login
