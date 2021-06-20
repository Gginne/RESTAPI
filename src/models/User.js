const Model = require('./Model')

class User extends Model {
    static get table(){
        return "Users"
    } 

    static get fillable(){
        return ['email', 'username', 'password']
    }
    

    constructor(cols){
        super(cols)
    }

}

module.exports = User