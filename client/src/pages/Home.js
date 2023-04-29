import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from '../redux/slices/userSlices'
import { useNavigate } from 'react-router-dom'
import { getGames } from '../redux/slices/gameSlice'
import Filters from '../components/Filters'
import GameList from '../components/GameList'


const Home = () => {
  const [showGamesByPlayer, setShowGamesByPlayer] = useState(false)
  const [showGamesByPlayTime, setShowGamesByPlayTime] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getGames())
  }, [])

const handleShow = () => {
  setShowGamesByPlayer(!showGamesByPlayer)
}
const handleShowByPlayTime = () => {
  setShowGamesByPlayTime(!showGamesByPlayTime)
}

  return (
<div>
<div className="flex center">
<button onClick={handleShow} >Top Games by Players</button>
 { showGamesByPlayer ? <Filters /> : ""}
<button onClick={handleShowByPlayTime} >Top Games by Play Time</button>
{ showGamesByPlayTime ? <Filters /> : ""}
</div>
 <GameList /> 

<hr />
</div>


  )
}

export default Home