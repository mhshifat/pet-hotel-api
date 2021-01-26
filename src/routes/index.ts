import express from "express";

const routes = express.Router();
routes.use("/", require("./default").default);
routes.use("/auth", require("./auth").default);
routes.use("/users", require("./users").default);
routes.use("/pets", require("./pets").default);
routes.use("/bookings", require("./bookings").default);

export default routes;
