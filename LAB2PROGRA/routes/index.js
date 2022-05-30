var express = require('express');
var router = express.Router();
const async = require('hbs/lib/async');
const User = require('../models/user');
const methods = require('../methods');

//constantes para las rutas de las paginas, login y register
const loginP = "../views/pages/login";
const registerP = "../views/pages/register";
const homeRoute = "../views/pages/home";


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//registro de rutas

router.get('/home', function (req, res) {
  if (req.user) {
    res.render('../views/pages/home', {
      title: 'Home',
      user: req.user.name,

    });

  } else {
    res.render(loginP, {
      message: "Iniciar sesion para continuar",
      messageClass: "alert alert-danger"

    });
  }
});


router.get('/login', (req, res) => {
  res.render(loginP);
});
router.get('/register', (req, res) => {
  res.render(registerP);
});

router.post('/register', async (req, res) => {
  const { name, email, password, password_confirmation } = req.body;
  //validacion
  try {
    if (password === password_confirmation) {
      user = await User.findOne({ email: email })
        .then(user => {
          if (user) {
            res.render(registerP, {
              message: "El usuario ya se ha registrado",
              messageClass: "alert alert-danger"
            });
          }
          else {
            const hashedPassword = methods.getHashedPassword(password);
            const userDB = new User({
              'name': name,
              'email': email,
              'password': hashedPassword,
            });
            userDB.save()

            res.render(loginP, {
              message: "Usuario registrado correctamente",
              messageClass: "alert alert-success"
            });
          }
        })
    } else {
      res.render(registerP, {
        message: "Las contraseñas no coinciden",
        messageClass: "alert alert-danger"
      })
    }
  } catch(error) {
    console.error("Error",error);
  }


});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = methods.getHashedPassword(password);

  user = await User.findOne({ email: email, password: hashedPassword })
    .then(user => {
      if (user) {
        console.log("Usuario encontrado");
        const authToken = methods.generateAuthToken();
        methods.authTokens[authToken] = user;
        res.cookie('AuthToken', authToken);
        res.redirect("/home");
      } else {
        res.render(loginP, {
          message: "Usuario o contraseña incorrectos",
          messageClass: "alert alert-danger"
        });
      }
    })
});

router.get('/logout', (req, res) => {
  res.clearCookie('AuthToken');
  return res.redirect('/login');
});

module.exports = router;
