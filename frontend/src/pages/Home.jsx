import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import GameCard from '../components/GameCard'

const Home = () => {

    const [games, setGames] = useState([])
    const navigate = useNavigate()

    const handleLogout = () => {
        let response = fetch(`http://localhost:4000/user/logout`, {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({})
        })

        response = response.then(response => response.json())
        response
            .then(data => {
                if (data.msg === 'Logout successful') {
                    toast.success(data.msg)
                    Cookies.remove("userLoggedIn")
                    navigate('/')
                }
            })
    }



    const getAllGames = () => {
        let response = fetch(`http://localhost:4000/admin/getallgames`, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
            headers: {
                "Content-type": "application/json",
            }
        })

        response = response.then(response => response.json())
        response.then(data => {
            if (data.msg === 'Error in getting the games') {
                toast.error(data.msg)
                return
            }
            setGames(data.msg)
        })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        getAllGames()
    }, [])


    return (
        <div className='p-7'>
            <div className='flex justify-end'>
                <button className='border rounded-lg bg-red-400 border-red-400 text-white px-3 py-1' onClick={handleLogout}>Logout</button>
            </div>
            <div className='grid grid-cols-3 mt-10'>
                {
                    games.map(game => (
                        <GameCard key={game._id} game={game} />
                    ))
                }
            </div>
        </div>
    )
}

export default Home