const { Thing } = require("../db/models");

exports.fetchThing = async (thingID, next) => {
  try {
    const foundThing = await Thing.findByPk(thingID);
    return foundThing;
  } catch (error) {
    next(error);
  }
};

exports.randomThing = async (req, res) => {
  try {
    const randomThing = await Thing.findAll({
      where: { isTreasure: false },
    });
    res.status(200).json(randomThing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.treasureThing = async (req, res) => {
  try {
    const treasureThing = await Thing.findAll({
      where: { isTreasure: true },
    });
    res.status(200).json(treasureThing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createThing = async (req, res) => {
  console.log(req.file);
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newThing = await Thing.create(req.body);
    res.status(201).json(newThing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateThing = async (req, res) => {
  console.log(req.file);
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    await req.thing.update(req.body);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteThing = async (req, res) => {
  try {
    await req.thing.destroy();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
