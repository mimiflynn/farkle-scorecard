'use strict';

// players routes use player controller
var players = require('../controllers/player');

module.exports = function (Players, app, auth) {

  app.route('/player')
    .get(players.all)
    .post(players.create)
    .options(players.options);

  app.route('/player/:playerId')
    .get(players.show)
    .put(players.update)
    .delete(players.destroy);

  // Finish with setting up the playerId param
  app.param('playerId', players.player);

};