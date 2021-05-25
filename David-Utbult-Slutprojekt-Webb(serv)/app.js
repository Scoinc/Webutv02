//Inkludera Express.js
const express = require('express')
const { Mongoose } = require('mongoose')
//Inkludera dbModule.js
const dbModule = require('./dBModule')
//Inkludera MessageModel för att kunna spara meddelanden i databasen 
const MessageModel = require('./MessageModel')
//Gör en instans klassen express
const app = express()
//Ange porten som servern kommer att lyssna på.
const port = 3000

//Sökväg till sökväg till en mapp för alla statiska sidor och sätt den som default sökväg.
const staticDir = __dirname + '\\client\\'
app.use(express.static(staticDir))

//Sätt upp servern så att den kan tyda json och urlencoded
app.use(express.json())
app.use(express.urlencoded())

//Ställ in EJS som vymotor för servern. 
app.set('view engine', 'ejs')

//Lyssnar på GET requests på addressen <domain>/
app.get("/messages", async (req, res) => {
  const messages = await MessageModel.getAllMessages();
  res.render('pages/index.ejs', { names: messages });
})

app.get('/index', (req, res) => {
  //rendera sidan index.ejs när klickad på i header
  res.render('pages/index.ejs')
})

app.get('/about', (req, res) => {
  //rendera sidan about.ejs när klickad på i header
  res.render('pages/about.ejs')
})

app.get('/contact', (req, res) => {
  //rendera sidan contact.ejs när klickad på i header
  res.render('pages/contact.ejs')
})

app.get('/keeb1', (req, res) => {
  //rendera sidan keeb1.ejs när klickad på
  res.render('pages/keeb1.ejs')
})

app.get('/keeb2', (req, res) => {
  //rendera sidan keeb2.ejs när klickad på
  res.render('pages/keeb2.ejs')
})

app.get('/keyboards', (req, res) => {
  //rendera sidan keyboards.ejs när klickad på i header
  res.render('pages/keyboards.ejs')
})

app.get('/mice', (req, res) => {
  //rendera sidan mice.ejs när klickad på i header
  res.render('pages/mice.ejs')
})

app.get('/mouse1', (req, res) => {
  //rendera sidan mouse1.ejs när klickad på
  res.render('pages/mouse1.ejs')
})

app.get('/mouse2', (req, res) => {
  //rendera sidan mouse2.ejs när klickad på
  res.render('pages/mouse2.ejs')
})

//Lyssnar på POST requests på addressen <domain>/
app.post('/', async (req, res) => {
  //Skapa ett Message objekt
  const message = await MessageModel.createMessage(req.body.email, req.body.message)

  //spara elementet Message i databasen
  await dbModule.storeElement(message)

  //Ladda om sidan
  res.redirect('/index')
})

//Sätt igång servern så att den kan ta emot requests på vald port.
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
