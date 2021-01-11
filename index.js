//Imports
require("dotenv").config()
const app = require("./app")

//Start Server
async function main(){
    const port = app.get('port')
    await app.listen(port)
    console.log("listening at port: "+port) 
}

//Main Function
main()
