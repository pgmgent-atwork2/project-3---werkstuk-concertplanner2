import DataSource from '../lib/DataSource.js';

export const postItem = async (req, res, next) => {
  try {
    const inventoryRepository = DataSource.getRepository('inventory');
    const inventory = await inventoryRepository.findOneBy({
      name: req.body.name,
      count: req.body.count,
      width: req.body.width,
      length: req.body.length,
    });

    if (inventory) {
      res.redirect(`/inventory`);
    } else {
      await inventoryRepository.save({
        name: req.body.name,
        count: req.body.count,
        width: req.body.width,
        length: req.body.length,
        image: 'director-chair.png',
        color: '#000000',
      });
      res.redirect(`/inventory`);
    }
  } catch (error) {
    error.message;
  }
};

export const updateItem = async (req, res, next) => {
  try {
    const inventoryRepository = DataSource.getRepository('inventory');
    const inventory = await inventoryRepository.findOneBy({
      id: req.body.changeItem,
    });
    const newItem = {
      ...inventory,
      ...req.body,
    };
    // save the data in the database
    await inventoryRepository.save(newItem);

    // give a response to the client
    res.redirect('/inventory');
  } catch (error) {
    error.message;
  }
};

export const deleteItem = async (req, res, next) => {
  try {
    const id = req.body.delete;
    const inventoryRepository = DataSource.getRepository('inventory');
    const inventory = await inventoryRepository.findOneBy({
      id,
    });

    if (inventory) {
      await inventoryRepository.delete(inventory);
    }

    res.redirect('/inventory');
  } catch (error) {
    error.message;
  }
};
