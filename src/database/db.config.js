//Imports
const db = require("./db")
//const tables = require("./db.tables")
const path = require("path");
const fs = require("fs");

const migrate = () => {
    const migrationdir = path.join(__dirname, "../migrations")
    fs.readdir(migrationdir, (err, files) => {
        if (err) {
            console.error("Could not list the directory.", err);
            process.exit(1);
        }
        files.forEach(file => {
            const migration = fs.readFileSync(migrationdir+"/"+file).toString();
            db.query(migration);
            console.log("Successful migration!!")
        })
    })
}



module.exports = {
    migrate
}