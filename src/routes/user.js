const express = require('express')
const route = express.Router()

const UserRepository = require('../database/repository/user')

let uRepo = new UserRepository()

// Buscar todos os Users
route.get('/', async(req, res) => {
    const users = await uRepo.findAll()
    let resp = {
        status: 'OK',
        data: users
    }
    res.status(200).json(resp)
})

// Buscar um User pelo id
route.get('/:id', async (req, res) => {
    let uid = req.params.id

    let user = await uRepo.find(uid)

    if(user.length > 0){
        let resp = {
            status: 'OK',
            data: user
        }
        res.status(200).json(resp)
    } else{
        let resp = {
            status: 'Error',
            description:`User id ${uid} was not found.`
        }
        res.status(404).json(resp)
    }


})

// Cadastrar um novo User
route.post('/', async (req, res) => {
    let u = req.body

    if(u.name === undefined || u.email === undefined){
        let resp = {
            status: 'Error',
            description:`User JSON with id, name and email fields must be provided.`
        }
        res.status(400).json(resp)
        return
    }

    const user = await uRepo.insert(u)
    let resp = {
        status: 'OK',
        data: `User id ${user.id} created successfully`
    }
    res.status(200).json(resp)
})

// Atualizar um User já criado
route.put('/:id', async (req, res) => {
    let uid = req.params.id
    let u = req.body

    if(u.name === undefined || u.email === undefined){
        let resp = {
            status: 'Error',
            description:`User JSON must be provided.`
        }
        res.status(400).json(resp)
        return
    }

    let user = await uRepo.find(uid)

    if(user.length > 0){

        await uRepo.update(u, uid)

        let resp = {
            status: 'OK',
            data: `User id ${uid} updated successfully`
        }
        res.status(200).json(resp)
    } else{
        let resp = {
            status: 'Error',
            description:`User id ${uid} was not found.`
        }
        res.status(404).json(resp)
    }
})

// Excluir um usuário
route.delete('/:id', async(req, res) => {
    let uid = req.params.id
    let user = await uRepo.find(uid)

    if(user.length > 0){
        await uRepo.delete(uid)

        let resp = {
            status: 'OK',
            data: `User id ${uid} deleted successfully`
        }
        res.status(200).json(resp)
    } else{
        let resp = {
            status: 'Error',
            description:`User id ${uid} was not found.`
        }
        res.status(404).json(resp)
    }
})

module.exports = route
