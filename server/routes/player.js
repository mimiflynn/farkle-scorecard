'use strict';

// players routes use player controller
var players = require('../controllers/player');

module.exports = function(app) {

    app.get('/player', players.all);
    app.post('/player', players.create);
    app.get('/player/:playerId', players.show);
    app.put('/player/:playerId', players.update);
    app.del('/player/:playerId', players.destroy);

    // Finish with setting up the playerId param
    app.param('playerId', players.player);

};