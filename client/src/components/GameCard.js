import React from 'react'
import {Button, Card} from 'react-bootstrap';
import { deleteGame } from '../redux/slices/gameSlice';
import { useDispatch, useSelector } from 'react-redux';

const GameCard = ({game}) => {
  const {token, } = useSelector(state => state.users)
  const dispatch = useDispatch()
  return (
    <div >
<Card  style={{ width: '18rem' }}>
    <Card.Img variant="top" src={game.image} height="150" />
    <Card.Body style={{color: "black"}}>
      <Card.Title>{game.game}</Card.Title>
      <Card.Title>{game.userId.name}</Card.Title>
      <p> <span className="categories">Genre: </span> {game.genre}</p>
      <p> <span className="categories">Total Players: </span> {game.totalPlayers}</p>
      <p> <span className="categories">Total Play Time: </span> {game.totalPlayTime}</p>

      <div className="buttons">
        
      <Button variant="success">EDIT</Button>
      <Button variant="danger" onClick={() => dispatch(deleteGame(game._id ))}>DELETE</Button>
      </div>

    </Card.Body>
  </Card>
 </div>
  )
}

export default GameCard