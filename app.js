const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const ejs = require("ejs")
const {NlpManager} = require("node-nlp")
const fs = require("fs")

const upload = require("./upload")

let manager = new NlpManager({languages: ["en"]})

// set up ejs
app.set("view engine", "ejs")

// setup bp
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// save document
app.post("/doc", (req, res) => {

  console.log(req.body)
  manager.addDocument(req.body.lang, req.body.doc, req.body.intent)

  res.json({msg: "ok"})

})

// save answer 
app.post("/ans", (req, res) => {

  manager.addAnswer(req.body.lang, req.body.ans, req.body.intent)
  console.log(req.body)
  res.json({msg: "ok"})

})


// save model
app.get("/save/:name", async (req, res) => {

  await manager.train()
  manager.save()
  fs.copyFile("./model.nlp", "./models/"+req.params.name+".nlp", (err) => console.log(err))
  res.json({msg: "ok"})

})

app.get("/clear", (req, res) => {

  manager = new NlpManager({languages: ["en"], nlu: {log:true}})
  res.json({msg: "ok"})

})

// load model
app.post("/model", upload.single("file"), (req,res) => {

  model.load(req.file.path)
  res.json({msg: "ok"})
  
})

// load excel
app.post("/excel", upload.single("file"), (req,res) => {

  model.loadExcel(req.file.path)
  res.json({msg: "ok"})
  
})

// static 
app.use(express.static("./views"))

// load page
app.get("/", (req, res) => {
  res.render("home")
})

app.listen(3000)