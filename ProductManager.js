import fs from "fs"

export default class ProductManager {
    constructor() {
        this.path = "./products.json"
        this.currentId = 0
        this.products = []

    }

    static id = 0

    async addProduct(product) {

        for(let i = 0; i < this.products.length; i++ ) {
            if(this.products[i].code === product.code) {
                console.log("Elemento repetido")
                return
            }
        }

        if(Object.values(product).includes("")) {
            console.log("Todos los campos son obligatorios")
            return
        } 

        this.currentId = this.currentId + 1
        product.id = this.currentId
        this.products.push(product)

        console.log("Se agrego el elemento")

        await fs.promises.writeFile(this.path, JSON.stringify(this.products)) // Haciendolo así, si agrego varios objetos de una (Por ejemplo addProduct(1) y addProduct(2)), lo hace bien; pero si luego borro esos llamados y hago uno individual (Por ejemplo addProduct(3)), borra todo lo anterior, entiendo que esto no debería funcionar así. Cómo lo podría arreglar?)
    }

    readProducts = async () => {
        const answer = await fs.promises.readFile(this.path, "utf-8")
        return JSON.parse(answer)
    }

    async getProducts() {
        const productos = await fs.promises.readFile(this.path, "utf-8")
        console.log(JSON.parse(productos))
    }

    async getProductById(id) {

        const answer = await this.readProducts()

        if(!answer.find( item => item.id ===id)){
            console.log("Producto no encontrado")
        } else{
            console.log(answer.find( item => item.id ===id))
        }

/*         const productJson = await fs.promises.readFile(this.path, "utf-8")
        JSON.parse(productJson)
        const filter = productJson.find( item => item.id === id )
        console.log(filter) */

        //No entiendo porque no funciona  usando la porción de codigo comentado. Al usar esa porción de código me dice que productJson.find no es una funcion. Por qué?
    }

    async deleteProductById(id) {
        const answer = await this.readProducts()

        const filter = answer.filter( item => item.id !== id)
        
        await fs.promises.writeFile(this.path, JSON.stringify(filter))
        console.log("Producto Eliminado")
    }

    async updateProducts(productObj) {
        await this.deleteProductById(productObj.id)
        const leftProducts = await this.readProducts()

        const modifiedProducts = [
            {...productObj},
            ...leftProducts
        ]

         await fs.promises.writeFile(this.path, JSON.stringify(modifiedProducts))

        console.log(modifiedProducts)
    }

}

//Productos

const computadora = {
    title:"Computadora",
    description:"PC",
    price:2000,
    thumbnail:"./",
    code:"123",
    stock: 5
}
const celular = {
    title:"Celular",
    description:"Apple",
    price:5000,
    thumbnail:"./",
    code:"1234",
    stock: 5
}
const tv = {
    title:"TV",
    description:"Samsung",
    price:800,
    thumbnail:"./",
    code:"1235",
    stock: 5
}
const auriculares = {
    title:"auriculares",
    description:"JBL",
    price:200,
    thumbnail:"./",
    code:"1236",
    stock: 5
}
const mouse = {
    title:"mouse",
    description:"MSI",
    price:400,
    thumbnail:"./",
    code:"1237",
    stock: 5
}
const teclado = {
    title:"teclado",
    description:"Mecanico",
    price:600,
    thumbnail:"./",
    code:"1238",
    stock: 5
}
const router = {
    title:"router",
    description:"logitech",
    price:900,
    thumbnail:"./",
    code:"1239",
    stock: 5
}
const cargador = {
    title:"cargador",
    description:"huawei",
    price:200,
    thumbnail:"./",
    code:"1231",
    stock: 5
}
const cable = {
    title:"cable",
    description:"USB",
    price:200,
    thumbnail:"./",
    code:"1232",
    stock: 5
}
const funda = {
    title:"funda",
    description:"Once",
    price:200,
    thumbnail:"./",
    code:"1233",
    stock: 5
}

/* const manager = new ProductManager

manager.addProduct(computadora)
manager.addProduct(celular)
manager.addProduct(tv)
manager.addProduct(auriculares)
manager.addProduct(mouse)
manager.addProduct(teclado)
manager.addProduct(router)
manager.addProduct(cargador)
manager.addProduct(cable)
manager.addProduct(funda) */





