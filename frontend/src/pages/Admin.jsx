import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'


const Admin = () => {

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const adminEmail = useRef(null)
    const sportName = useRef(null)
    const team1 = useRef(null)
    const team2 = useRef(null)
    const betOnTeam1 = useRef(null)
    const betOnTeam2 = useRef(null)


    const handleCreatingGame = () => {

        if (!adminEmail.current.value || !sportName.current.value || !team1.current.value || !team2.current.value || !betOnTeam1.current.value || !betOnTeam2.current.value) {
            toast.error('All details are required')
            return
        }

        if (adminEmail.current.value !== 'admin@gmail.com') {
            toast.error('Admin can only add the games from here')
            return
        }


        let response = fetch(`http://localhost:4000/admin/creategame`, {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ sportName: sportName.current.value, team1: team1.current.value, team2: team2.current.value, betOnTeam1: betOnTeam1.current.value, betOnTeam2: betOnTeam2.current.value })
        })

        response = response.then(response => response.json())
        response
            .then(data => {
                if (data.msg === "Game created successfully") {
                    toast.success(data.msg)
                    setTimeout(() => {
                        navigate('/home')
                    }, 1000)
                }
                else if (data.msg === "Error in creating the game")
                    toast.error(data.msg)
            })
            .catch(error => console.log(error))
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div>
            <div className={`${loading ? 'blur-md' : ''}`}>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className='flex flex-col w-1/3 mx-auto mt-20 gap-y-6'>
                        <h1 className='text-3xl font-semibold text-[#f7daa1]'>Create the game here</h1>
                        <input ref={adminEmail} type='text' placeholder='Enter admin email' className='border-2 border-[#f5f5fa] bg-[#f5f5fa] p-3 rounded-lg outline-none' />
                        <input ref={sportName} type='text' placeholder='Enter sport name' className='border-2 border-[#f5f5fa] bg-[#f5f5fa] p-3 rounded-lg outline-none' />
                        <input ref={team1} type='text' placeholder='Enter Team 1 name' className='border-2 border-[#f5f5fa] bg-[#f5f5fa] p-3 rounded-lg outline-none' />
                        <input ref={team2} type='text' placeholder='Enter Team 2 name' className='border-2 border-[#f5f5fa] bg-[#f5f5fa] p-3 rounded-lg outline-none' />
                        <input ref={betOnTeam1} type='text' placeholder='Enter bet on team 1' className='border-2 border-[#f5f5fa] bg-[#f5f5fa] p-3 rounded-lg outline-none' />
                        <input ref={betOnTeam2} type='text' placeholder='Enter bet on team 2' className='border-2 border-[#f5f5fa] bg-[#f5f5fa] p-3 rounded-lg outline-none' />
                        <div className='w-1/4'>
                            <button onClick={handleCreatingGame} className='border-2 border-[#5fb2ed] bg-[#5fb2ed] text-white text-lg font-semibold py-2 px-5 rounded-lg'>Create Game</button>
                        </div>
                    </div>
                </form>
            </div>

            <div>
                {loading && <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', top: '43%', marginLeft: '37%' }}><BeatLoader size={30} color="#5fedb4" speedMultiplier={0.8} />
                    <p className='text-xl font-semibold text-[#5fedb4]'>Creating the game...</p></div>}
            </div>
        </div>
    )
}

export default Admin