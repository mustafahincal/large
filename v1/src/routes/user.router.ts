import express from "express";
const router = express.Router();

router
  .route("/")
  .post((req, res) => {
    res.send("user/ post route");
  })
  .get((req, res) => {
    res.send("user/ get route");
  });

export default router;
