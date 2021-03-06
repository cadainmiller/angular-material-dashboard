// routes/auth.routes.js

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const dbConfig = require("../database/db");
const mongoose = require("mongoose");
const userSchema = require("../models/User");
const authorize = require("../middlewares/auth");
const { check, validationResult } = require("express-validator");
const { assert } = require("console");

router.post("/add", (req, res) => {
  const user = new userSchema({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  var myData = user;
  mongoose.connect(dbConfig.mongodb.dbURI, function (err, db) {
    assert.equal(null, err);
    db.collection("users").insetOne(user, function (err, result) {
      assert.equal(null, err);
      console.log("User Added");
    });
  });
});

// Sign-up
router.post(
  "/register-user",
  [
    check("name")
      .not()
      .isEmpty()
      .isLength({ min: 3 })
      .withMessage("Name must be atleast 3 characters long"),
    check("email", "Email is required").not().isEmpty(),
    check("password", "Password should be between 5 to 8 characters long")
      .not()
      .isEmpty(),
    //.isLength({ min: , max: 8 }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {
      bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new userSchema({
          name: req.body.name,
          email: req.body.email,
          password: hash,
        });
        console.log(user);
        user
          .save()
          .then((item) => {
            res.send("item saved to database");
          })
          .catch((err) => {
            res.status(400).send("unable to save to database");
          });
      });
    }
  }
);

// Sign-in
router.post("/signin", (req, res, next) => {
  let getUser;
  userSchema
    .findOne({
      email: req.body.email,
    })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Authentication failed",
        });
      }
      getUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((response) => {
      if (!response) {
        return res.status(401).json({
          message: "Authentication failed",
        });
      }
      let jwtToken = jwt.sign(
        {
          email: getUser.email,
          userId: getUser._id,
        },
        "longer-secret-is-better",
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({
        token: jwtToken,
        expiresIn: 3600,
        _id: getUser._id,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Authentication failed",
      });
    });
});

// Get Users
router.route("/").get((req, res) => {
  userSchema.find((error, response) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json(response);
    }
  });
});

// Get Single User
router.route("/user-profile/:id").get(authorize, (req, res, next) => {
  userSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

// Update User
router.route("/update-user/:id").put((req, res, next) => {
  userSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("User successfully updated!");
      }
    }
  );
});

// Delete User
router.route("/delete-user/:id").delete((req, res, next) => {
  userSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = router;
