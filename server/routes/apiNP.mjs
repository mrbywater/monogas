import express from "express";

const api = express.Router();

const apiKey = "db724e44715117789cd062d65b5a3de0";
const uri = "https://api.novaposhta.ua/v2.0/json/";

api.get("/", async (req, res) => {
    const test = (url) => {
    const headers = {
        "apiKey": apiKey,
        "modelName": "Address",
        "calledMethod": "searchSettlements",
        "methodProperties": {
            "CityName" : "київ",
            "Limit" : "50",
            "Page" : "2"
        }
    }

        return fetch(url, {
        type: 'POST',
        dataType: 'json',
        headers : headers
    })
}

test(uri)
    .then(data =>  res.send(data).status(200))
    .catch(err =>  console.log(err))
});

export default api





