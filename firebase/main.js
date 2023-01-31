// importamos dependencias
import { dir, log } from 'console'
import admin from 'firebase-admin'
import fs from 'fs'

// leer private key
const serviceAccount = JSON.parse(fs.readFileSync('./db/ecommerce-96f5d-firebase-adminsdk-jc63b-fcb4dc9f1d.json', 'utf-8'))

//inicializar aplicacion
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https:ecooerce-96f5d.firebaseio.com'
})

const asObj = doc => ({id: doc.id, ...doc.data()})

console.log('Base de datos conectada con exito!');

//conectarmos el administrador de firebase y nos posicionamos en la coleccion productos
const db = admin.firestore();
const dbProductos = db.collection('productos')

// ingresamos datos a la coleccion productos
const guardar = await dbProductos.add(
   { 
    nombre: "papa",
    precio: "1000",
    imagen: "imagenes/papa.jpg",
    stock: "5"
})
console.log(guardar.id);

const doc = await dbProductos.doc(guardar.id).get();
console.dir(asObj(doc))

const result = []
const snapshot = await dbProductos.get()
snapshot.forEach(doc => {
    result.push(asObj(doc))
})
console.dir(result)

await dbProductos.doc(guardar.id).set(
    {
    nombre: "bernjena",
    precio: "1200",
    imagen: "imagenes/berenjena.jpg",
    stock: "5"
})

console.dir(asObj(await dbProductos.doc(guardar.id).get()))

await dbProductos.doc(guardar.id).delete();
/* 

_id
63d88ab94bc41b6821a27bad
nombre
"pepino"
precio
"900"
imagen
"imagenes/pepino.jpg"
stock
"5"
_id
63d88afa4bc41b6821a27bae
nombre
"tomate"
precio
"1000"
imagen
"imagenes/tomate.jpg"
stock
"5"
_id
63d89a717493b72abc9f7423
nombre
"papa"
precio
"1000"
imagen
"imagenes/papa.jpg"
stock
"5"
__v
0
}) */