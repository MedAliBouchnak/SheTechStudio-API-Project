import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { gamesByTopPlayers } from '../redux/slices/gameSlice';


const Filters = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [getGamesByPlayers, setGetGamesByPlayers] = useState(false)
    const {gameList} = useSelector(state => state.games)

    const dispatch = useDispatch()

    const onSubmit = data =>  {
      console.log("data from submit: ", data);
      dispatch(gamesByTopPlayers(data))
    }
      
      console.log(errors);
    
      useEffect(() => {
       if (getGamesByPlayers && !errors) {dispatch(gamesByTopPlayers())}
      }, [getGamesByPlayers])

  return (
    <div>
        <form action="" onSubmit={handleSubmit(onSubmit)}>

        <select {...register("genre", {required: true})}>
        <option value="FPS">FPS</option>
        <option value="MOBA">MOBA</option>
        <option value="MMORPG">MMORPG</option>
        <option value="Sport">Sport</option>
        <option value="Among Us">Among Us</option>
        <option value="Card Game">Card Game</option>
      </select>
        {/* <input placeholder="genre" type="text" 
        {...register("genre", {required: true})}
        /> */}
    <select {...register("platforms", {required: true})}>
        <option value="PC">PC</option>
        <option value="PS4">PS4</option>
        <option value="Android">Android</option>
        <option value="XBOX">XBOX</option>
      </select>
        <button  >get top games</button>

        </form>


    </div>
  )
}

export default Filters