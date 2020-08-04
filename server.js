const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

if (process.env.NODE_ENV === "production") {
   app.use((req, res, next) => {
      if (req.header("x-forwarded-proto") !== "https")
         res.redirect(`https://${req.header("host")}${req.url}`);
      else next();
   });
}

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", require("./api/v1/users"));
app.use("/api/v1/tasks", require("./api/v1/tasks"));

app.use(express.static("client/build"));
app.get("*", (req, res) => {
   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const port = process.env.PORT || 1985;

app.listen(port, () =>
   console.log(`Server running at http://localhost:${port}`)
);
