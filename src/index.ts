import express from "express";
import auth from "./api/auth/auth_router";
import bodyParser from "body-parser";
import 'dotenv/config'

const app = express();

const port: string = process.env.PORT ?? "3000";

app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, }))
app.use("/api/auth", auth);


app.get("/", (req, res) => {
    console.log("Home page called!");
    res.send("<h1>API HOME PAGE</h1>");
});

const server = app.listen(port, () => {
    console.log("App is running");
});
server.setTimeout(60 * 1000);