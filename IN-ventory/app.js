import express from 'express'; //bring in express, import (ES6)
import path from "path";
import {fileURLToPath} from "url";
import { setupDatabase, getDbConnection } from './database.js';

setupDatabase().catch(console.error);

const app = express(); // Create an instamce of Express
const port = 3000; // use port 3000

const __filename = fileURLToPath(import.meta.url); //get the resolved path to the file
const __dirname = path.dirname(__filename); //get the name of the currect directory
app.use(express.static(__dirname + "/public"));

//Set the view engine with app.set
//express loads the module internally and stores it in app reference 
app.set('view engine', 'ejs')


app.get('/', async (req, res) => {
    const db = await getDbConnection();
    const products = await db.all('SELECT * FROM products');
    res.render('pages/index', { data: products, title: "Product Inventory" });
});

app.get("/about", (req, res) => {
    res.render("pages/about", { title: "About Us"});
});

app.get("/contact", (req, res) => {
    res.render("pages/contact", { title: "Contact Us"});
});

//listen for requests 
app.listen(port, () => {
    console.log(`App listening at port ${port}`)

});
