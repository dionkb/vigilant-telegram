const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// finds all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'This category does not exist' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      "category_name": "Sports Equipment"
    }
  */
    if (req.body.category_name) {
      try {
        const categoryData = await Category.create(req.body);
        res.status(200).json(categoryData);
      } catch(err) {
        console.log(err);
        res.status(400).json(err);
      };
    }
    else {
      console.log("You must enter a category_name");
    }
});

// update a category using its id# to locate it
router.put('/:id', (req, res) => {
  /* req.body should look like this...
    {
      "category_name": "Medicine"
    }
  */
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedCategory) => {
      res.json(updatedCategory);
    })
    .catch((err) => res.json(err));
});

// delete a category based on a specific id#
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCategory) => {
      res.json(deletedCategory);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
