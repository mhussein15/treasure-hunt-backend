const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const passport = require("passport");
const {
  fetchThing,
  randomThing,
  treasureThing,
  createThing,
  updateThing,
  deleteThing,
} = require("../controllers/thing");

router.param("thingID", async (req, res, next, thingID) => {
  const foundThing = await fetchThing(shopId, next);
  if (foundThing) {
    req.thing = foundThing;
    next();
  } else {
    next({
      status: 404,
      message: "Thing Not Found",
    });
  }
});

router.get(
  "/treasure",
  passport.authenticate("jwt", { session: false }),
  treasureThing
);
router.get("/random", randomThing);
router.post("/", upload.single("image"), createThing);
router.put("/:thingID", upload.single("image"), updateThing);
router.delete("/:thingID", deleteThing);

module.exports = router;
