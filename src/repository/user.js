class UserRepository{
    constructor() {
        this.users = []
    }

    insert(user){
        this.users.push(user)
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
        return this.users
    }
}

module.exports = UserRepository