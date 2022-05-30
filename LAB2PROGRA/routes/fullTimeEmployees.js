const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//llamamos el modelo
const FullTimeEmployee = require('../models/fullTimeEmployee');

//ruta de login
const loginP = "../views/pages/login";

router.get('/',(req,res)=>{
    if(req.user){
        res.render('pages/fullTimeEmployee/AddEdit',{
        title:"Add Full Time Employee",
        });
    }else{
        res.render(loginP,{
        message:"Iniciar sesion para continuar",
        messageClass:"alert alert-danger"
        });
    }
})
router.post('/',(req,res)=>{
    if(req.user){
        if(req.body._id == '')
            newFullTimeEmployee(req, res)
        else
            updateFullTimeEmployee(req, res)

    }else{
        res.render(loginP,{
        message:"Iniciar sesion para continuar",
        messageClass:"alert alert-danger"
        });
    }
})

//funcion para crear un nuevo empleado de tipo Full Time
function newFullTimeEmployee(req, res) {
    var fullTimeEmployee = new FullTimeEmployee();
    fullTimeEmployee.name = req.body.name;
    fullTimeEmployee.lastName = req.body.lastName;
    fullTimeEmployee.AnnualSalary = req.body.AnnualSalary;
    fullTimeEmployee.BenefitsCategory = req.body.BenefitsCategory;

    fullTimeEmployee.save((error) => {
        if (error)
            console.log("Error" + error)
        else
            res.redirect('fullTimeEmployee/list');
    });
}

//funcion para actualizar un empleado de tipo Full Time
function updateFullTimeEmployee(req, res) {
    FullTimeEmployee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('fullTimeEmployee/list');
        } else {
            res.render('fullTimeEmployee/AddEdit', {
                title: "Edit Full Time Employee",
                fullTimeEmployee: req.body
            })

        }

    });
}

router.get('/list',(req,res)=>{
    if(req.user){
        FullTimeEmployee.find((err,doc)=>{
            if(!err){
                res.render('pages/fullTimeEmployee/list',{
                    title:"Full Time Employees",
                    list:doc
                })
            }else{
                console.log("Error" +err);
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
        FullTimeEmployee.findById(req.params.id,(err,doc)=>{
            if(!err){
                res.render('pages/fullTimeEmployee/AddEdit',{
                    title:"Edit Full Time Employee",
                    fullTimeEmployee:doc
                })
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
    FullTimeEmployee.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.redirect('/fullTimeEmployee/list');
        }else{
            console.log("Error"+err);
        }
    })
})
module .exports = router;


