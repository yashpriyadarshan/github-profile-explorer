const express = require("express")

const router = express.Router();

const {
    getGithubData
} = require("../service/githubService");

router.get("/:username", async (req, res) => {
    try {

        const username = req.params.username;

        const sort = req.query.sort;

        const page = parseInt(req.query.page) || 1;

        const limit = parseInt(req.query.limit) || 10;

        const data = await getGithubData(
            username,
            sort,
            page,
            limit
        );

        res.status(200).json(data);

    } catch (error) {

        if (error.response?.status === 404) {
            return res.status(404).json({
                message: "GitHub user not found"
            });
        }

        if (error.response?.status === 403) {
            return res.status(429).json({
                message:
                    "GitHub API rate limit exceeded. Please try again later."
            });
        }

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

module.exports = router;