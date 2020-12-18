"use strict";

var Pool = require('pg').Pool;

var pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Charlee',
  password: 'Hallo',
  port: 5432
});
/** USERS */

var getUsers = function getUsers(request, response) {
  pool.query('SELECT * FROM users ORDER BY id ASC', function (error, results) {
    if (error) {
      throw error;
    }

    response.status(200).json(results.rows);
  });
};

var getUserById = function getUserById(request, response) {
  var id = parseInt(request.params.id);
  pool.query('SELECT * FROM users WHERE id = $1', [id], function (error, results) {
    if (error) {
      throw error;
    }

    response.status(200).json(results.rows);
  });
};

var createUser = function createUser(request, response) {
  var _request$body = request.body,
      name = _request$body.name,
      email = _request$body.email;
  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], function (error, results) {
    if (error) {
      throw error;
    }

    response.status(201).send("User added with ID: ".concat(response.insertId));
  });
};

var updateUser = function updateUser(request, response) {
  var id = parseInt(request.params.id);
  var _request$body2 = request.body,
      name = _request$body2.name,
      email = _request$body2.email;
  pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id], function (error, results) {
    if (error) {
      throw error;
    }

    response.status(200).send("User modified with ID: ".concat(id));
  });
};

var deleteUser = function deleteUser(request, response) {
  var id = parseInt(request.params.id);
  pool.query('DELETE FROM users WHERE id = $1', [id], function (error, results) {
    if (error) {
      throw error;
    }

    response.status(200).send("User deleted with ID: ".concat(id));
  });
};
/** /USERS */

/** PICTURES */


var getPictures = function getPictures(request, response) {
  pool.query('SELECT * FROM pictures ORDER BY picture_id ASC', function (error, results) {
    if (error) {
      throw error;
    }

    response.status(200).json(results.rows);
  });
};

var getPicturesByType = function getPicturesByType(request, response) {
  var picture_type = request.params.picture_type;
  console.log(picture_type);
  pool.query('SELECT * FROM pictures WHERE picture_type = $1', [picture_type], function (error, results) {
    if (error) {
      throw error;
    }

    response.status(200).json(results.rows);
  });
};
/** PICTURES */

/**NAVIGATION */


var getNavigation = function getNavigation(request, response) {
  pool.query('SELECT * FROM navigation ORDER BY nav_id ASC', function (error, results) {
    if (error) {
      throw error;
    }

    response.status(200).json(results.rows);
  });
};
/**NAVIGATION */

/**MESSAGES */


var createMessage = function createMessage(request, response) {
  var _request$body3 = request.body,
      name = _request$body3.name,
      email = _request$body3.email,
      msg = _request$body3.msg;
  pool.query('INSERT INTO Messages (name, email, msg ) VALUES ($1, $2, $3 )', [name, email, msg], function (error, results) {
    if (error) {
      throw error;
    }

    response.status(201).send("Message added with ID: ".concat(response.insertId));
  });
};

var getMessages = function getMessages(request, response) {
  pool.query('SELECT * FROM messages ORDER BY msg_id ASC', function (error, results) {
    if (error) {
      throw error;
    }

    response.status(200).json(results.rows);
  });
};
/**MESSAGE */


module.exports = {
  getUsers: getUsers,
  getUserById: getUserById,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  getPictures: getPictures,
  getNavigation: getNavigation,
  createMessage: createMessage,
  getMessages: getMessages,
  getPicturesByType: getPicturesByType
};