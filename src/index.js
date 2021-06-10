//Imports
require("dotenv").config()
const app = require("./app")
const {migrate} = require("./database/db.config")
const seeder = require("./database/db.seeder")
//Start Server
async function main(){
    const port = app.get('port')
    await app.listen(port)
    //await migrate()
    //await seeder()
    console.log("listening at port: "+port) 
    console.log
}

//Main Function
main()
