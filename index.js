// importar dependencias    
import mongoose from "mongoose";

// apagar el modo estricto
mongoose.set('strictQuery', false)

const productoSchema = new mongoose.Schema({
    nombre: String,
    precio: String,
    imagen: String,
    stock: String
})

const productoModel = mongoose.model('productos', productoSchema)

// conectar a la base de datos Mongo DB Atlas
try {
    await mongoose.connect('mongodb+srv://williamcruzacero:ingridyw86@ecommerce.cgmpmwp.mongodb.net/?retryWrites=true&w=majority', {
        serverSelectionTimeoutMS: 5000,
    })
    console.log('Base de datos conectada')

    try {
        const productoNuevo = new productoModel({nombre: 'papa', precio: '1000', imagen: "imagenes/papa.jpg", stock: '5'})
        await productoNuevo.save()
        console.log('Producto agregado con exito');

        // listar productos
        let productos = await productoModel.find({})
        productos.forEach(producto => {
            console.log(JSON.stringify(producto));
        })
    }catch (error) {
        console.log('Error en opercion de base de datos: ' + error);
    }
} catch (error) {
    console.log('Error en la base de datos: ' + error)
}