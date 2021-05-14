const Sub = require("../models/sub");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    //const category = await new Category({ name, slug: slugify(name) }).save();
    res.json(await new Sub({ name, parent, slug: slugify(name) }).save());
  } catch (error) {
    console.log("sub create  error", error);
    res.status(400).send("Create sub failed");
  }
};

exports.list = async (req, res) => {
  const subs = await Sub.find({}).sort({ createdAt: -1 }).exec();
  res.json(subs); // list all
};
exports.read = async (req, res) => {
  let sub = await Sub.findOne({ slug: req.params.slug }).exec(); // .slug is same router .put "xxx/:slug"
  res.json(sub);
};
exports.update = async (req, res) => {
  const { name, parent } = req.body;
  try {
    const updated = await Sub.findOneAndUpdate(
      {
        slug: req.params.slug, // to find
      },
      { name, parent, slug: slugify(name) }, // to update
      {
        new: true, //optional
      }
    );
    res.json(updated);
  } catch (error) {
    console.log(error);
    res.status(400).send("Update sub failed");
  }
};
exports.remove = async (req, res) => {
  try {
    const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (error) {
    res.status(400).send("delete sub failed");
  }
};
