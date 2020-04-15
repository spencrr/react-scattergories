const categories = require("../data/categories.js");

module.exports = (numCategories) => () => {
  if (numCategories >= categories.length) {
    return categories;
  }
  let tempCategories = Array.from(categories);
  let newCategories = [];
  while (newCategories.length < numCategories) {
    newCategories.push(
      ...tempCategories.splice(
        Math.floor(Math.random() * tempCategories.length),
        1
      )
    );
  }
  return newCategories;
};
