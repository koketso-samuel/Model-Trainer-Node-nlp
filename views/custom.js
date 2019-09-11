let doc = document.getElementById("doc")
let ans = document.getElementById("ans")
let int = document.getElementById("intent")
let btnDoc = document.getElementById("btnDoc")
let btnAns = document.getElementById("btnAns")
let btnSave = document.getElementById("btnSave")
let btnReset = document.getElementById("btnReset")
let msg = document.getElementsByClassName("msg")
let mod = document.getElementById("mod")

async function addDoc() {

  let res = await axios.post("/doc", {lang: "en", doc: doc.value, intent: int.value})
  console.log(res)
  doc.value = ""
  rel()

}

async function addAns() {

  let res = await axios.post("/ans", {lang: "en", ans: ans.value, intent: int.value})
  console.log(res)
  ans.value = ""
  rel()

}

function rel() {

  msg[0].style.display = "inline"
  setTimeout(() => {
    msg[0].style.display = "none"
  }, 2000)

}

async function saveMod() {

  let res = await axios.get("/save/"+mod.value)
  console.log(res)
  rel()

}

async function resetMod() {
  let res = await axios.get("/clear")
  console.log(res)
  rel()
}

btnAns.addEventListener("click", addAns)
btnDoc.addEventListener("click", addDoc)
btnSave.addEventListener("click", saveMod)
btnReset.addEventListener("click", resetMod)