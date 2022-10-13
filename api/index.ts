import fs from "fs";
import path from "path";
import express from "express";
import * as openapi from "express-openapi";
import * as dependencies from "../src/dependencies";

const PATHS = path.join(__dirname, "..", "src", "routes");
const API = path.join(__dirname, "..", "src", "openapi.yaml");

const app = express();
const paths = path.resolve(PATHS);
const apiDoc = fs.readFileSync(path.resolve(API), "utf8");

app.disable("x-powered-by");

(async function () {
  await openapi.initialize({
    app,
    paths,
    apiDoc,
    dependencies,
    docsPath: "/api/docs",
    promiseMode: true,
  });
})();

export default app;
