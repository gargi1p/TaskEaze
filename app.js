const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const app = express();
const path = require("path");
const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static(__dirname));
app.use("/", userRoutes);

app.get("/nyadashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public/nyadashboard.html"));
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
