const express = require("express")
const cors = require("cors")

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "https://yashgithubexplorer.vercel.app/"
];

const githubRoutes = require("./routes/githubRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/github", githubRoutes);

app.get("/", (req, res) => {
    res.send("Backend Running...")
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});