import React from 'react'
import GameCard from './GameCard'
import { useSelector } from 'react-redux'

const GameList = () => {
    const { gameList, isLoading} = useSelector(state => state.games)

  return (
    <div  className="cards">

{
  isLoading ? <p>Loading ... </p> : <> {
    gameList.map(game => 
    <GameCard   key={game._id} game={game}/>
    )
  } </>
}

</div>
  )
}

export default GameList