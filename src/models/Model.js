const db = require("../database/db")

class Model{
    static table = ""
    static fillable = []

    //Static methods
    constructor(cols){
        this.cols = cols
    }

    //Find All -- Find by all table members
    static findAll(){
        try{
            const rows = db.query(`SELECT * FROM ${this.table}`)
            return rows.map(row => this.prototype.constructor(row))
        } catch(err){
            console.log(err)
        }
        
    }

    //Find -- Find by column id
    static find(id){
        try{
            const rows = db.query(`SELECT * FROM ${this.table} WHERE id = ${id}`)
            return rows.map(row => this.prototype.constructor(row))[0]
        } catch(err){
            console.log(err)
        }
        
    }

    //Where -- Find column by other parameters
    static where(params){
        try{
            const rows = db.query(`SELECT * FROM ${this.table} WHERE ${params}`)
            return rows.map(row => this.prototype.constructor(row))
        } catch(err){
            console.log(err)
        }
        
    }

    //Instance methods

    //Delete -- Deleting column
    delete(){
        try{
            db.query(`DELETE FROM ${this.table} WHERE id = ${this.cols.id}`)
        } catch(err){
            console.log(err)
        }
    }

    //Save -- Saving new column  to table or updating existing one
    save(){
        try{
            const values = this.fillable.map(field => `${this[field]}`).join() + `,${this.cols.id}`
            db.query(`INSERT INTO ${this.table} (${this.fillable.join()}) VALUES (${values})
            ON DUPLICATE KEY UPDATE `)
        } catch(err){
            console.log(err)
        }
    }
}

module.exports = {Model}