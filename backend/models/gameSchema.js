const mongoose = require('mongoose')

const gameSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    game : String,
    image : String,
    genre: String,
    platforms: [String],
    totalPlayTime : Number,
    totalPlayers : Number,
    createdAt: {
        type: Date,
        default: new Date()
    }
}) 

const Games = mongoose.model('games', gameSchema)
module.exports = Games