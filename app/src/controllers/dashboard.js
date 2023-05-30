import DataSource from '../lib/DataSource.js';
export const home = async (req, res) => {
  // get the user repository

  const userRole = req.user.role.label;

  if (userRole === 'admin') {
    res.render('admin');
  } else if (userRole === 'user') {
    res.render('user');
  }
}; // get the user repository

export const inventory = async (req, res) => {
  const inventoryRepo = DataSource.getRepository('inventory');
  const inventoryData = await inventoryRepo.find();

  const userRole = req.user.role.label;

  res.render(`${userRole}/inventory`, {
    inventoryData,
    jsData: JSON.stringify(inventoryData),
  });
};

export const planner = async (req, res) => {
  const inventoryRepo = DataSource.getRepository('inventory');
  const inventoryData = await inventoryRepo.find();

  res.render('planner', {
    inventoryData,
    jsData: JSON.stringify(inventoryData),
  });
};
