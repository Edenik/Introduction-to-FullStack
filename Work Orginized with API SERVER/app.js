const express = require("express");
const app = express();

const postsRouter = require("./routes/postsRoute");
const usersRouter = require("./routes/usersRoute");

// MiddleWare
app.use(express.json());

app.use("/posts", postsRouter);
app.use("/users", usersRouter);

// Server run
const port = process.env.PORT || 600;

app.listen(port, () => `Server running on port ${port} 🔥`);
