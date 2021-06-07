const Model = require('./Model')

class User extends Model {
    table = "Users"
    fillable = ['email', 'username', 'password']

    constructor(cols){
        super(cols)
    }

}

module.exports = User