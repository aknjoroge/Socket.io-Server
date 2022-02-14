let fs = require("fs");

/*
=================================================================
NOT IN USE WITH THE SOCKET SERVER. THIS IS JUST A NODE REST EXAMPLE
=================================================================
 */

let users = fs.readFileSync(
  `${__dirname}/../dev-data/data/users.json`,
  "utf-8"
);

let userObject = JSON.parse(users);

exports.getUsers = function name(req, res, next) {
  res.json({
    status: "success",
    response: userObject.length,
    data: {
      userObject,
    },
  });
};

exports.addUser = function (req, res) {
  let user = req.body;
  let id = { id: Math.random() };
  let newUser = Object.assign(id, user);
  userObject.push(newUser);

  fs.writeFile(
    `${__dirname}/../dev-data/data/users.json`,
    JSON.stringify(userObject),
    function (error) {
      if (error) {
        res.json({
          status: "failed",
          error,
        });
      } else {
        res.status(201).json({
          status: "success",
          data: {
            newUser,
          },
        });
      }
    }
  );
};

exports.getOneUser = function name(req, res, next) {
  let parameter = req.params;
  let user = userObject.find(function (element) {
    return element.id == parameter.id;
  });
  res.json({
    status: "succeszs",
    data: {
      user,
    },
  });
};

exports.deletUser = function (req, res, next) {
  let id = req.params.id;

  let user = userObject.filter(function (element) {
    return element.id != id;
  });

  fs.writeFile(
    `${__dirname}/../dev-data/data/users.json`,
    JSON.stringify(user),
    function (err) {
      if (err) {
        res.json({
          status: "failed",
          error,
        });
      } else {
        res.status(204).json({
          status: "success",
        });
      }
    }
  );
};

exports.updateUser = function (req, res, next) {
  let id = req.params.id;

  res.json({
    status: "success",
    details: "Not yet implemented",
  });
};
