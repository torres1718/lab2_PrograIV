const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const PartTimeEmployee = require('../models/partTimeEmployee');

//ruta de login
const loginP = "../views/pages/login";

router.get('/', (req, res) => {
    if (req.user) {
        res.render('pages/partTimeEmployee/AddEdit', {
            title: "Add Part Time Employee",
        });
    } else {
        res.render(loginP, {
            message: "Iniciar sesion para continuar",
            messageClass: "alert alert-danger"
        });
    }
})

router.post('/', (req, res) => {
    if (req.user) {
        if (req.body._id == '')
            newPartTimeEmployee(req, res)
        else
            updatePartTimeEmployee(req, res)
    } else {
        res.render(loginP, {
            message: "Iniciar sesion para continuar",
            messageClass: "alert alert-danger"
        });
    }
})
//funcion para crear un nuevo empleado de tipo part time
function newPartTimeEmployee(req, res) {
    var partTimeEmployee = new PartTimeEmployee();
    partTimeEmployee.name = req.body.name;
    partTimeEmployee.lastName = req.body.lastName;
    partTimeEmployee.HourlyRate = req.body.HourlyRate;
    partTimeEmployee.MaxHoursPerWeek = req.body.MaxHoursPerWeek;

    partTimeEmployee.save((error) => {
        if (error)
            console.log("Error" + error)
        else
            res.redirect('partTimeEmployee/list');
    });
}

//funcion para actualizar un empleado de tipo part time
function updatePartTimeEmployee(req, res) {
    PartTimeEmployee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (err) {
            res.redirect('partTimeEmployee/list');
        } else {
            res.render('partTimeEmployee/AddEdit', {
                title: "Edit Part Time Employee",
                partTimeEmployee: req.body
            })
        }
    });

}
router.get('/list', (req, res) => {
    if (req.user) {
        PartTimeEmployee.find((err, docs) => {
            if (!err) {
                res.render('pages/partTimeEmployee/list', {
                    title: "Part Time Employees",
                    list: docs
                })
            } else {
                console.log("Error" + err);
            }
        });
    } else {
        res.render(loginP, {
            message: "Iniciar sesion para continuar",
            messageClass: "alert alert-danger"
        });
    }
})

router.get('/:id', (req, res) => {
    if (req.user) {
        PartTimeEmployee.findById(req.params.id, (err, doc) => {
            if (!err) {
                res.render('pages/partTimeEmployee/AddEdit', {
                    title: "Edit Part Time Employee",
                    partTimeEmployee: doc
                })
            }
        })
    } else {
        res.render(loginP, {
            message: "Iniciar sesion para continuar",
            messageClass: "alert alert-danger"
        });
    }
})
router.get('/delete/:id', (req, res) => {
    PartTimeEmployee.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/partTimeEmployee/list');
        } else {
            console.log("Error" + err);
        }
    })
})
module.exports = router;



