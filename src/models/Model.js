const db = require("../database/db")

class Model{
    table = ""
    fillable = []

    //Model constructor 
    constructor(cols){
        this.cols = cols
    }

    //Static methods

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
            const row = db.query(`SELECT * FROM ${this.table} WHERE id = ${id}`)[0]
            return this.prototype.constructor(row)
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
            const values = this.fillable.map(field => this.cols[field])
            if(this.cols.id) {values.push(this.cols.id)}

            const query = `INSERT INTO ${this.table} (${this.fillable.join()}) VALUES (?)
            ON DUPLICATE KEY UPDATE ${this.fillable.map(field => `${field}=VALUES(${field})`).join()}`

            db.query(query, [values], (err, result, fields) => {
                if(err) console.log(err);
                if(result.insertId) this.cols.id = result.insertId;
            })
        } catch(err){
            console.log(err)
        }
    }
}

module.exports = Model