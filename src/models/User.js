const Model = require('./Model')

class User extends Model {
    static table = "Users"
    static fillable = ['email', 'username', 'password']
    
    table = "Users"
    fillable = ['email', 'username', 'password']

    constructor(cols){
        super(cols)
    }

}

module.exports = User