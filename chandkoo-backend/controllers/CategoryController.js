const { Category } = require("../models");
const sampleCategories = require("../config/category.json");
const { v4: uuidv4 } = require("uuid");

// Helper: Recursively insert categories into DB
async function insertCategories (categories, parentId = null, idMap = null) {
      // Initialize the id map only on the top-level call
  if (!idMap) {
    idMap = {};
  }
  for (const category of categories) {
    const newId = uuidv4();
    idMap[category.id] = newId;

    await Category.create({
      id: newId,
      title: category.title,
      parentId: parentId ? idMap[parentId] : null,
    });

    if (category.children && category.children.length > 0) {
      await insertCategories(category.children, category.id, idMap);
    }
  }  
}

// Helper: Build nested tree from flat categories
const buildCategoryTree = (categories, parentId = null) => {
  return categories
    .filter((category) => category.parentId === parentId)
    .map((category) => ({
      id: category.id,
      title: category.title,
      children: buildCategoryTree(categories, category.id),
    }));
};

// Seed the DB and return all categories in tree structure
async function GetAllCategories(req, res) {
  try {
      
    //const inputData = req.body.categories || sampleCategories;

    //await Category.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    //await Category.destroy({ where: {}, truncate: true });
    //await Category.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
    //await insertCategories(inputData);

    const flatCategories = await Category.findAll({ raw: true });
    const nestedCategories = buildCategoryTree(flatCategories);

    res.status(200).json(nestedCategories);
  } catch (error) {
   console.error("GetAllCategories error:", error);
    res.status(500).json({ error: "Database error" });
  }
}

// Return flat list of all categories for admin
async function GetAllAdminCategories(req, res) {
  try {
    const categories = await Category.findAll({ raw: true });
    res.status(200).json(categories);
  } catch (error) {
    console.error("GetAllAdminCategories error:", error);
    res.status(500).json({ error: "Database error" });
  }
}

// Add a new category and return updated tree
async function AddCategory(req, res) {
  try {
    const { title, parentId } = req.body;

    if (!title || typeof title !== "string") {
      return res.status(400).json({ error: "Title is required and must be a string." });
    }

    const newCategory = await Category.create({
      title,
      parentId: parentId || null,
    });

    const allCategories = await Category.findAll({ raw: true });
    const tree = buildCategoryTree(allCategories);

    res.status(201).json({ message: "Category added", category: newCategory, tree });
  } catch (error) {
    console.error("AddCategory error:", error);
    res.status(500).json({ error: "Database error" });
  }
}

module.exports = {
  GetAllCategories,
  GetAllAdminCategories,
  AddCategory,
};
