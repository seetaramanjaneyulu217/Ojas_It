import React from 'react'

const GameCard = ({ game }) => {

    return (
        <div className='flex flex-col border rounded-lg bg-gray-200 border-gray-200 p-3 m-5 gap-y-3'>
            <div>Sportname: {game.sportName}</div>
            <div className='flex justify-between'>
                <div>Team 1: {game.team1}</div>
                <div>Team 2: {game.team2}</div>
            </div>
            <div className='flex justify-between'>
                <div>Bet on team 1: {game.betOnTeam1}</div>
                <div>Bet on team 2: {game.betOnTeam2}</div>
            </div>

            <button className='border rounded-lg bg-blue-400 border-blue-400 text-white px-3 py-1'>Place a bet</button>
        </div>
    )
}

export default GameCard