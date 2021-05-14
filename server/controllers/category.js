const Category = require("../models/category");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    //const category = await new Category({ name, slug: slugify(name) }).save();
    res.json(await new Category({ name, slug: slugify(name) }).save());
  } catch (error) {
    console.log(error);
    res.status(400).send("Create category failed");
  }
};

exports.list = async (req, res) => {
  const categories = await Category.find({}).sort({ createdAt: -1 }).exec();
  res.json(categories); // list all
};
exports.read = async (req, res) => {
  let category = await Category.findOne({ slug: req.params.slug }).exec(); // .slug is same router .put "xxx/:slug"
  res.json(category);
};
exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Category.findOneAndUpdate(
      {
        slug: req.params.slug, // to find
      },
      { name, slug: slugify(name) }, // to update
      {
        new: true, //optional
      }
    );
    res.json(updated);
  } catch (error) {
    console.log(error);
    res.status(400).send("Update category failed");
  }
};
exports.remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (error) {
    res.status(400).send("Create delete failed");
  }
};