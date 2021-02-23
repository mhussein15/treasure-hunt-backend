const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Thing = sequelize.define("Thing", {
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    isTreasure: {
      type: DataTypes.BOOLEAN,
    },
    image: {
      type: DataTypes.STRING,
    },
  });
  SequelizeSlugify.slugifyModel(Thing, {
    source: ["name"],
  });
  return Thing;
};
