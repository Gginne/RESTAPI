//Imports
require("dotenv").config()
const app = require("./app")
const {migrate} = require("./database/db.config")

//Start Server
async function main(){
    const port = app.get('port')
    await app.listen(port)
    //sawait migrate()
    console.log("listening at port: "+port) 
}

//Main Function
main()
