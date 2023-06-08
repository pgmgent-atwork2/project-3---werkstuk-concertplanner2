import DataSource from '../../lib/DataSource.js';

export const getItems = async (req, res, next) => {
  try {
    const inventoryRepository = DataSource.getRepository('inventory');
    const inventory = await inventoryRepository.find({ relations: ['chairs'] });
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({
      status: error.message,
    });
  }
};

export const getSpecificItem = async (req, res, next) => {
  try {
    const inventoryRepository = DataSource.getRepository('inventory');

    const { id } = req.params;
    const inventory = await inventoryRepository.findOneBy({
      id,
    });
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({
      status: error.message,
    });
  }
};

export const postItem = async (req, res, next) => {
  try {
    const inventoryRepository = DataSource.getRepository('inventory');
    const inventory = await inventoryRepository.findOneBy({
      name: req.body.name,
      count: req.body.count,
    });

    if (inventory) {
      res.status(200).json({
        status: 'inventory already exists',
      });
    } else {
      await inventoryRepository.save(req.body);
      res.status(201).json({
        status: 'We created a new inventory',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: error.message,
    });
  }
};

export const updateItem = async (req, res, next) => {
  try {
    const inventoryRepository = DataSource.getRepository('inventory');
    const inventory = await inventoryRepository.findOneBy({
      id: req.params.id,
    });

    const newInventory = {
      ...inventory,
      ...req.body,
    };

    await inventoryRepository.save(newInventory);
    res.status(200).json(newInventory);
  } catch (error) {
    res.status(500).json({
      status: error.message,
    });
  }
};

export const deleteItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const inventoryRepository = DataSource.getRepository('inventory');
    const inventory = await inventoryRepository.findOneBy({
      id,
    });
    if (inventory) {
      await inventoryRepository.delete(inventory);
    }

    res.status(204).json({
      status: 'We deleted the record in the database!',
    });
  } catch (error) {
    res.status(500).json({
      status: error.message,
    });
  }
};
