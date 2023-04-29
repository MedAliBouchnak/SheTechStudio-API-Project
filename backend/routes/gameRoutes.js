const express = require('express')
const router = express.Router()
const { authMiddleware } = require('../middleware/authMiddleware')

const {getGames, createGames, updateGames , deleteGames, select_top_by_playtime , select_top_by_players} = require('../controllers/gameControllers')


router.get('/getgames' , getGames)
router.post('/addgame' , authMiddleware, createGames)
router.put('/updategame/:id' , authMiddleware , updateGames)
router.delete('/deletegame/:id' , authMiddleware , deleteGames)
router.get('/select_top_by_playtime' ,  select_top_by_playtime)
router.get('/select_top_by_players' ,  select_top_by_players)

module.exports = router