const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const https = require("https");


app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", (req, res) => {
    
const query = req.body.cityName;
const appKey = "8c68a172473304d63ec81d09cc6fdaa7";
const unit = "metric"; 


const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appKey+"&units="+unit;

https.get(url, (response) => {
    console.log(response.statusCode);

    response.on("data", (data) => {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = " https://openweathermap.org/img/wn/"+icon+"@2x.png";

        res.write("<h1>The temperature in "+query+" is "+temp+" degree C</h1>");
        res.write("<p>The Weather in "+query+" is currently "+description+"</p>");
        res.write("<img src=" +imageURL+">");
        res.send();


    })
})
    
    
})


app.listen(3000, () => {
    console.log("Server OK")
})