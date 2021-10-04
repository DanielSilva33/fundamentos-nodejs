const express = require('express');
const { v4: uuid4 } = require('uuid');

const app = express();
app.use(express.json());

const custumers = [];

app.post("/account", (request, response) => {
    const { cpf, name } = request.body;

    const customerAlreadyExists = custumers.some((customer) => customer.cpf === cpf);

    if(customerAlreadyExists) {
        return response.status(400).json({error: "Customer already exists!"});
    }

    custumers.push({
        cpf,
        name,
        id: uuid4(),
        statement: []
    });

    return response.status(201).send();
});

app.get("/statement", (request, response) => {
    const { cpf } = request.headers;

    const customer = custumers.find(customer => customer.cpf ===cpf);

    if(!customer) {
        return response.status(400).json({error: "Customer not found"});
    }

    return response.json(customer.statement);
});

app.listen(3333, () => {
    console.log("Server is running http://localhost:3333");
});