const User = require('../model/user')

class UserRepository{
    constructor() {
        this.users = []
    }

    insert(obj){
        return User.create({
            name: obj.name,
            email: obj.email
        })
    }

    update(user){
        for (let i = 0; i < this.users.length; i++) {
            if(this.users[i].id == user.id){
                this.users[i].id = user.id
                this.users[i].name = user.name
                this.users[i].email = user.email
            }
        }
    }

    delete(user){
        for (let i = 0; i < this.users.length; i++) {
            if(this.users[i].id == user.id){
                this.users.splice(i, 1)
            }
        }
    }

    find(uid){
        for (let i = 0; i < this.users.length; i++) {
            if(this.users[i].id == uid){
                return this.users[i]
            }
        }
    }

    findAll(){
        return User.findAll()
    }
}

module.exports = UserRepository