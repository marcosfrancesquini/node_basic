const express = require('express');
const server = express();

server.use(express.json()); //sem isso não dá para desestruturar req.body

let customers = [
    { id: 1, name: "Dev Samurai", site: "http://devsamurai.com.br" },
    { id: 2, name: "Google", site: "http://google.com" },
    { id: 3, name: "UOL", site: "http://uol.com.br" }
]

server.get("/customers", (req, res) => {
    return res.json(customers); 
});

server.get("/customers/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const customer = customers.find(item => item.id === id);
    const status = customer ? 200 : 404;
    return res.status(status).json(customer);
});

server.post("/customers", (req, res) => {
    const { name, site } = req.body;
    //const nextId = customers[customers.length -1].id+1;
    const id = customers[customers.length - 1].id + 1;
    const newCustomer = { id, name, site };
    customers.push(newCustomer);
    //console.log(customers);
    return res.status(201).json(newCustomer);
});

server.put("/customers/:id", (req, res) => {
    // console.log("put");
    const id = parseInt(req.params.id);
    const { name, site } = req.body;
    
    const index = customers.findIndex(item => item.id === id)
    const status = index >= 0 ? 200 : 404;

    if (index >= 0) {
        customers[index] = { id: id, name, site };
        // console.log("id: "+id)
        // console.log("parseInt(id): "+parseInt(id));
        // console.log("customers[index]") 
        // console.log(customers[index])
    }

    return res.status(status).json(customers[index]);
});

server.listen(3001, () => {
    console.log("Server on and listening!")
});