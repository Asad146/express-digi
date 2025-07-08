import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Asad");
});

app.get("/ice-tea", (req, res) => {
  res.send("What ice tea would you prefer?");
});

app.get("/twitter", (req, res) => {
  res.send("Asadkhanghallibb");
});

app.use(express.json());
let teaData = [];
let nextId = 1;

// Add a new Tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

//Get All Tea
app.get('/teas', (req, res) =>{
    res.status(200).send(teaData)
})

// Get a Tea with Id
app.get('/teas/:id', (req, res) =>{
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('Tea not found')
    }
    res.status(200).send(tea)
})

// update Tea
app.put('/teas/:id', (req, res) =>{
    const tea = teaData.find((t) => t.id === parseInt(req.params.id))
    if (!tea) {
      return res.status(404).send("Tea not found");
    }
    const {name, price} = req.body
    tea.name = name
    tea.price = price
    res.send(200).send(tea)
})

// Delete Tea
app.delete('/teas/:id', (req, res) =>{
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if (index === -1) {
        return res.status(404).send('Tea not Found')
    }
    teaData.splice(index, 1)
    return res.status(204).send("Deleted");
})
const port = 3000;
app.listen(port, () => {
  console.log(`server is running at port:${port}...`);
});
