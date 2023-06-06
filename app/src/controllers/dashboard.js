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

export const addOrkestUser = async (req, res) => {
  // errors
  const formErrors = req.formErrors;

  // input fields
  const inputs = [{
      name: "orkestName",
      label: "orkest Name",
      type: "text",
      value: req.body?.orkestName ? req.body.orkestName : "",
      error: req.formErrorFields?.orkestName ? req.formErrorFields.orkestName : null,
    }, {
      name: "email",
      label: "E-mail",
      type: "text",
      value: req.body?.email ? req.body.email : "",
      error: req.formErrorFields?.email ? req.formErrorFields.email : null,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      password: req.body?.password ? req.body.password : "",
      error: req.formErrorFields?.password ?
        req.formErrorFields.password :
        null,
    }
  ];

  const roleRepository = await DataSource.getRepository("Role");
  const roles = await roleRepository.find();

  // render the register page
  res.render("admin", {
    layout: "main",
    inputs,
    formErrors,
    roles,
    activateForm: "activateForm"
  });
};

export const addEvent = async (req, res) => {
  // errors
  const formErrors = req.formErrors;

  // input fields
  const inputs = [
    {
      name: "date",
      label: "datum van optreden",
      type: "date",
      value: req.body?.date ? req.body.date : "",
      error: req.formErrorFields?.date ? req.formErrorFields.date : null,
    }
  ];

  const roleRepository = await DataSource.getRepository("Role");
  const roles = await roleRepository.find();

  // render the register page
  res.render("admin", {
    layout: "main",
    inputs,
    formErrors,
    roles,
    activateForm: "activateForm"
  });
};

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