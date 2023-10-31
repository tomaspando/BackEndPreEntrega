import express from "express"
import ProductManager from "../ProductManager.js"

const app = express()
app.use(express.urlencoded({extended:true}))
const manager = new ProductManager()

const PORT = 8080
const server = app.listen( PORT, () => {
    console.log(`Express por Local Host ${server.address().port}`)
})

server.on("error",  (error) => console.log(`Error del servidor ${error}`))


const readProducts = manager.readProducts()


//Endpoints
app.get("/products", async (req,res) => {
    let limit = parseInt(req.query.limit)
    if(!limit) return res.send(await readProducts)
    let allProducts = await readProducts
    let productLimit = allProducts.slice(0, limit)
    res.send(productLimit)
})

app.get("/products/:id", async (req,res) => {
    let id = parseInt(req.params.id)
    let allProducts = await readProducts
    let productById = allProducts.find ( product => product.id === id)
    res.send(productById)
})

