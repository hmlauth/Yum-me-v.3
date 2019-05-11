// const axios = require("axios");
const router = require("express").Router();
const YTSearch = require('youtube-api-search');
const API_KEY = process.env.API_KEY;
console.log('api key', API_KEY)

// Match "/api/videos"
router.route("/:search")
    .get((req, res) => {
        console.log("req.params.search", req.params.search);
        YTSearch({key: API_KEY, term: req.params.search}, videos => {
            res.send(videos)
        })
    })

    module.exports = router
