import express, {RequestHandler} from "express";

const app = express();

const port: string = process.env.PORT ?? "3000";

const middleware = (req: Request, res: any, next: any) => {
    console.log(`PATH: ${req.url}`);
    next();
}

app.use(middleware);

app.get("/get-employees", (req, res) => {
    res.status(200).send({status: 200, message: "Employees"});
});

app.get("/", (req, res) => {
    console.log("Home page called!");
    res.send("<h1>API HOME PAGE</h1>");
});

app.listen(port, () => {
    console.log("App is running");
});