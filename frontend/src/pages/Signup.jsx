import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { BeatLoader } from 'react-spinners'
import toast from 'react-hot-toast'

const SignUp = () => {

    const [isSignUpForm, setIsSignForm] = useState(true)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const username = useRef(null)
    const email = useRef(null)
    const password = useRef(null)
    const userLoggedIn = Cookies.get("userLoggedIn")

    const handleUserSignUp = () => {
        const validUsername = username.current && username.current.value ? /^[0-9A-Za-z]{6,16}$/.test(username.current.value) : '';
        const validEmail = /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/.test(email.current.value);
        const validPassword = /^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$/.test(password.current.value);

        if (isSignUpForm && !validUsername || !validEmail || !validPassword) {
            toast.error('Invalid details')
            return
        }

        else if(!isSignUpForm && !validEmail || !validPassword) {
            toast.error('Invalid detials')
            return
        }

        setLoading(true)
        if (isSignUpForm) {
            let response = fetch(`http://localhost:4000/user/signup`, {
                method: 'POST',
                credentials: 'include',
                mode: 'cors',
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ username: username.current.value, email: email.current.value, password: password.current.value })
            })

            response = response.then(response => response.json())
            response
                .then(data => {
                    if (data.msg === "Registered SuccessFully") {
                        toast.success(data.msg)
                        setTimeout(() => {
                            navigate('/home')
                        }, 1000)
                        Cookies.set("userLoggedIn", true)
                    }
                    else if (data.msg === "User already present")
                        toast.error(data.msg)
                })
                .catch(error => console.log(error))
                .finally(() => {
                    setLoading(false)
                })
        }
        else {
            let response = fetch(`http://localhost:4000/user/login`, {
                method: 'POST',
                credentials: 'include',
                mode: 'cors',
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ email: email.current.value, password: password.current.value })
            })

            response = response.then(response => response.json())
            response
                .then(result => {
                    if (result.msg === 'Login SuccessFul') {
                        toast.success(result.msg)
                        setTimeout(() => {
                            navigate('/home')
                        }, 1000)
                        Cookies.set("userLoggedIn", true)
                    }
                    else {
                        toast.error(result.msg)
                    }
                })
                .catch((error) => console.error(error))
                .finally(() => {
                    setLoading(false)
                })
        }
    }


    if (userLoggedIn) {
        navigate('/home')
        return
    }

    return (
        <>
            <div className={`${loading ? 'blur-md' : ''}`}>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className='flex flex-col w-1/3 mx-auto mt-40 gap-y-6'>
                        <h1 className='text-3xl font-semibold text-[#f7daa1]'>{!isSignUpForm ? "SignIn" : "SignUp"} to start your journey</h1>
                        {isSignUpForm && <input ref={username} type='text' placeholder='Username' className='border-2 border-[#f5f5fa] bg-[#f5f5fa] p-3 rounded-lg outline-none' />}
                        <input ref={email} type='email' placeholder='Email' className='border-2 border-[#f5f5fa] bg-[#f5f5fa] p-3 rounded-lg outline-none' />
                        <input ref={password} type='password' placeholder='Password' className='border-2 border-[#f5f5fa] bg-[#f5f5fa] p-3 rounded-lg outline-none' />
                        <div className='w-1/4'>
                            <button onClick={handleUserSignUp} className='border-2 border-[#5fb2ed] bg-[#5fb2ed] text-white text-lg font-semibold py-2 px-5 rounded-lg'>{!isSignUpForm ? "SignIn" : "SignUp"}</button>
                        </div>
                        {!isSignUpForm ? <p>Not registered yet? <span className='text-blue-400 text-lg underline cursor-pointer' onClick={() => setIsSignForm(true)}>SignUp</span></p> : <p className='text-lg text-gray-700'>Already a user? <span className='text-blue-400 text-lg underline cursor-pointer' onClick={() => setIsSignForm(false)}>SignIn</span></p>}
                    </div>
                </form>
            </div>

            <div>
                {loading && <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', top: '43%', marginLeft: '37%' }}><BeatLoader size={30} color="#5fedb4" speedMultiplier={0.8} />
                    <p className='text-xl font-semibold text-[#5fedb4]'>Thanks for your patience</p></div>}
            </div>
        </>
    )
}

export default SignUp