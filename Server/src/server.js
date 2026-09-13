import app from "./app.js";
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import dns from 'dns'

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
]) 

dotenv.config()
const PORT = process.env.PORT || 4000;

console.log(process.env.URI)

mongoose.connect(process.env.URI).then(()=>{
    console.log("Connection is stablished with Database.")
}
).catch((err)=>{
    console.error("Error Message: ",err)
})

app.listen(PORT, ()=> {
    console.log(`Running on PORT ${PORT}`)
})