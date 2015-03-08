'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '/../..');

module.exports = {
	root: rootPath,
	port: process.env.PORT || 4000,
	db: process.env.MONGOHQ_URL,
    templateEngine: 'swig',

	// The secret should be set to a non-guessable string that
	// is used to compute a session hash
	sessionSecret: 'eidkwilakdoi',
	// The name of the MongoDB collection to store sessions in
	sessionCollection: 'sessions'
};