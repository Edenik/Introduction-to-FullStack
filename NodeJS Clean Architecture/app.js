const express = require("express");
const mongoose = require("mongoose");
const postsRouter = require("./routes/postsRoute");
const usersRouter = require("./routes/usersRoute");

const app = express();

// MiddleWare
app.use(express.json());

// DB connection
mongoose
  .connect("mongodb://localhost:27017/januarTest", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("DB CONNECTION SUCCESSFUL"));

// Routes
app.use("/posts", postsRouter);
app.use("/users", usersRouter);

// Server run
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
