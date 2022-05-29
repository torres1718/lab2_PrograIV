const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Employee = require('../models/employee');


//ruta de login
const loginP = "../views/pages/login";

router.get('/', (req, res) => {
    if (req.user) {
        res.render('pages/employees/AddEdit', {
            title: "Add Employee",
        });
    } else {
        res.render(loginP, {
            message: "Iniciar sesion para continuar",
            messageClass: "alert alert-danger"
        });
    }
});

router.post('/', (req, res) => {
    if (req.user) {
        if (req.body._id == '')
            newEmployee(req, res)
    } else {
        res.render(loginP, {
            message: "Iniciar sesion para continuar",
            messageClass: "alert alert-danger"
        });
    }
});
//funcion para crear un nuevo empleado
function newEmployee(req, res) {
    var employee = new Employee();
    employee.name = req.body.name;
    employee.email = req.body.email;
    employee.password = req.body.password;
    employee.phone = req.body.phone;

    employee.save((error) => {
        if (error)
            console.log("Error" + error)
        else
            res.redirect('employee/list');
    });
}
//funcion para actualizar un empleado
function updateEmployee(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (err) {
            res.redirect('employee/list');
        } else {
            res.render('employee/addEdit', {
                title: "Edit Employee",
                employee: req.body
            })

        }

    });
}

router.get('/list',(req,res)=>{
    if(req.user){
        Employee.find((err,docs)=>{
            if(!err){
                res.render('pages/employee/list',{
                    list:docs,
                    title:"Employee List"

                })
            }else{
                console.log("Error"+err)
            }
        });
    }else{
        res.render(loginP,{
            message:"Iniciar sesion para continuar",
            messageClass:"alert alert-danger"
        });
    }
})

router.get('/:id',(req,res)=>{
    if(req.user){
        Employee.findById(req.params.id,(err,doc)=>{
            if(!err){
                res.render('pages/employee/addEdit',{
                    title:"Edit Employee",
                    employee:doc
                });
            }
        })
    }else{
        res.render(loginP,{
            message:"Iniciar sesion para continuar",
            messageClass:"alert alert-danger"
        });
    }
})

router.get('/delete/:id',(req,res)=>{
    Employee.findByIdAndDelete(req.params.id,(err,doc)=>{
        if(!err){
            res.redirect('/employee/list');
        }else{
            console.log("Error"+err);
        }
    })
})

module.exports = router;
