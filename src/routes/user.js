const express = require('express')
const router = express.Router()

const User = require('../model/user')
const UserRepository = require('../repository/user')

let uRepo = new UserRepository()

// Buscar todos os Users
router.get('/', (req, res) => {

    resp = {
        status: 'OK',
        data: uRepo.findAll()
    }

    res.status(200).send(JSON.stringify(resp))
})
// Buscar um User pelo id
router.get('/:id', (req, res) => {

    let uid = req.params.id

    user = uRepo.find(uid)

    if(user == undefined){
        resp = {
            status: 'Error',
            description:`User id ${uid} was not found.`
        }
        res.status(404).send(JSON.stringify(resp))
        return
    }

    resp = {
        status: 'OK',
        data: uRepo.find(uid)
    }

    res.status(200).send(JSON.stringify(resp))
})
// Cadastrar um novo User
router.post('/',(req, res) => {
    let u = req.body

    if(u.id == undefined || u.name == undefined || u.email == undefined){
        resp = {
            status: 'Error',
            description:`User JSON with id, name and email fields must be provided.`
        }
        res.status(400).send(JSON.stringify(resp))
        return
    }

    uRepo.insert(new User(u.id, u.name, u.email))
    resp = {
        status: 'OK',
        data: `User id ${u.id} created successfully`
    }
    res.status(200).send(JSON.stringify(resp))
})
// Atualizar um User já criado
router.put('/:id', (req, res) => {

    let uid = req.params.id
    let u = req.body

    if(u.name == undefined || u.email == undefined){
        resp = {
            status: 'Error',
            description:`User JSON must be provided.`
        }
        res.status(400).send(JSON.stringify(resp))
        return
    }

    user = uRepo.find(uid)
    if(user == undefined){
        resp = {
            status: 'Error',
            description:`User id ${uid} was not found.`
        }
        res.status(404).send(JSON.stringify(resp))
        return
    }
    user.name = u.name
    user.email = u.email

    uRepo.update(user)

    resp = {
        status: 'OK',
        data: `User id ${uid} updated successfully`
    }
    res.status(200).send(JSON.stringify(resp))
})
// Excluir um usuário
router.delete('/:id', (req, res) => {

    let uid = req.params.id
    user = uRepo.find(uid)

    if(user == undefined){
        resp = {
            status: 'Error',
            description:`User id ${uid} was not found.`
        }
        res.status(404).send(JSON.stringify(resp))
        return
    }

    uRepo.delete(user)

    resp = {
        status: 'OK',
        data: `User id ${uid} deleted successfully`
    }
    res.status(200).send(JSON.stringify(resp))
})
module.exports = router
