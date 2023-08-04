if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const router = require("./routes");
const app = express();
const port = process.env.PORT || 3000;

var cors = require("cors");
// console.log(process.env.SECRET)
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// console.log("ihza");
app.use("/", router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App success runnning on port : ${port}`);
});

// module.exports = app;
