import Datasource from '../../lib/DataSource.js'

export const getUsers = async (req, res, next) => {
  try {
    const userRepository = Datasource.getRepository('User');
    const users = await userRepository.find({
      relations: ["role", "meta", "events"]
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      status: error.message
    });
  }
};

export const getSpecificUser = async (req, res, next) => {
  try {
    const userRepository = Datasource.getRepository('User');

    const {
      id
    } = req.params;
    const user = await userRepository.findOneBy({
      id,

    });
    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({
      status: error.message
    });
  }
}

export const postUser = async (req, res, next) => {
  try {
    const userRepository = Datasource.getRepository('User');
    const user = await userRepository.findOneBy({
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    });

    if (user) {
      res.status(200).json({
        status: "User already exists"
      });
    } else {
      await userRepository.save(req.body);
      res.status(201).json({
        status: "We created a new user"
      })
    }
  } catch (error) {
    res.status(500).json({
      status: error.message
    });
  }
}

export const updateUser = async (req, res, next) => {
  try {
    const userRepository = Datasource.getRepository('User');
    const user = await userRepository.findOneBy({
      id: req.params.id
    });

    const newUser = {
      ...user,
      ...req.body
    }

    await userRepository.save(newUser);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({
      status: error.message
    });
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const {
      id
    } = req.params;

    const userRepository = Datasource.getRepository('User');
    const user = await userRepository.findOneBy({
      id
    });
    if (user) {
      await userRepository.delete(user);
    }

    res.status(204).json({
      status: "We deleted the record in the database!",
    });

  } catch (error) {
    res.status(500).json({
      status: error.message
    });
  }
}