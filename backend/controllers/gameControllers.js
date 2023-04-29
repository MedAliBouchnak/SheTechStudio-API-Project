 
 const Games = require('../models/gameSchema')


 module.exports.getGames = async (req, res) => {
    try {
        const games = await Games.find({}).populate('userId', '-password').sort("-createdAt")
        res.status(200).json({
        msg:" got games with success" , games: games 
        })
    }
    catch (err) {
        res.status(500).json({msg: "something went wrong", error: err.message})
    }
 }


 module.exports.createGames = async (req, res) => {
    try {
        const owner = req.userId
        const games = await Games.create({...req.body, userId:owner})
        res.status(201).json({
        msg:" game is created with success" , games: games
        })
    }
    catch (err) {
        res.status(500).json({msg: "something went wrong", error: err.message})
    }
 }

 module.exports.updateGames = async (req, res) => {
    try {
        const games = await Games.findByIdAndUpdate({_id: req.params.id}, {...req.body})
        res.status(200).json({
        msg:" game is updated with success" , games: {...games._doc}
        })
    }
    catch (err) {
        res.status(500).json({msg: "something went wrong", error: err.message})
    }
 }


 module.exports.deleteGames = async (req, res) => {
    try {
        const userId = req.userId
        console.log("test userId :", userId)
        const games = await Games.findByIdAndDelete( req.params.id)
        console.log("games after delete :", games)
        res.status(200).json({ msg:" game is deleted with success" , games: {...games._doc, userId: req.userId}})
    }
    catch (err) {
        res.status(500).json({msg: "something went wrong", error: err.message})
    }
 }

  // Select top games by playtime with optional genre and platform filters
 module.exports.select_top_by_playtime = async (req, res) =>  {
    try {
            const { genre, platform } = req.query;
            const filters = {};
            if (genre) filters.genre= genre;
            if (platform) filters.platforms = platform;
            
            const games = await Games.find(filters).sort({ totalPlayTime: -1 }).limit(5); // Limiting to top 5 games
            res.status(200).json({msg:" Top 5 players based on playtime " , games: games});
        }
    catch (err) {
        res.status(500).json({msg: "something went wrong", error: err.message})
    }
 }


 module.exports.select_top_by_players = async (req, res) =>  {
    try {
        
            const { genre, platform } = req.query;
            console.log("genre :", genre , "platform : ", platform)
            const filters = {};
            if (genre) filters.genre = genre;
            if (platform) filters.platforms = platform;
            
            const games = await Games.find(filters).sort({ totalPlayers: -1 }).limit(5); // Limiting to top 5 games
              res.status(200).json({msg:" Top 5 players based on total players " , games: games});
    }
    catch (err) {
        res.status(500).json({msg: "something went wrong", error: err.message})
    }
 }

