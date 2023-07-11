import express from "express";
const router = express.Router();

router
  .route("/login")
  .post((req, res) => {
    res.send("auth/login post route");
  })
  .get((req, res) => {
    res.send("auth/login get route");
  });

export default router;
