import express from 'express';
import path from 'path';
import fs from 'fs';

const app = express();
const Domain = 'localhost';
const port = 3000;


const createPath = (page) => {
    return path.resolve(), "views", `${page}.ejs`;
};

// middleware start //
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(`Incoming ${req.method} request to ${req.url}`);
    next();
});
app.use('/assets', express.static("assets"));
/////////////////////

app.get("/home", (req, res) => {
    if (req.query.error) {
        const title = "Error";
        res.render(createPath("error"), { title });
    }
    const title = "Home";
    res.render(createPath("index"), { title });
});

app.get("/movies", (req, res) => {
    if (req.query.error) {
        const title = "Error";
        res.render(createPath("error"), { title });
    }
    const title = "Movies";
    res.render(createPath("movies"), { title });
});

app.get("/search", (req, res) => {
    if (req.query.error) {
        const title = "Error";
        res.render(createPath("error"), { title });
    }
    const title = "Search";
    res.render(createPath("search"), { title });
});

app.get("/favorites", (req, res) => {
    if (req.query.error) {
        const title = "Error";
        res.render(createPath("error"), { title });
    }
    const title = "Favorites";
    res.render(createPath("favorites"), { title });
});

app.get("/about", (req, res) => {
    if (req.query.error) {
        const title = "Error";
        res.render(createPath("error"), { title });
    }
    const title = "About";
    res.render(createPath("about"), { title });
});

app.get("/contacts", (req, res) => {
    if (req.query.error) {
        const title = "Error";
        res.render(createPath("error"), { title });
    }
    const title = "About";
    res.render(createPath("contacts"), { title });
});

app.get("*", (req, res) => {
    const title = "Error";
    res.render(createPath("error"), { title });
});

//////////////////////////////////////////////////////////////
app.listen(port, () => {
    console.log(`Server started on http://${Domain}:${port}`);
})