import DataSource from '../lib/DataSource.js'

export const postEvent = async (req, res, next) => {
  try {
    const id = req.body.orkests;
    console.log(id);
    const eventRepository = DataSource.getRepository("events");
    const event = await eventRepository.findOneBy({
      datum: req.body.date,
      user: {
        id: id
      }
    });
    console.log(req.body.date);
    if (event) {
      req.formErrors = [{
        message: "event bestaat al."
      }];
      return next();
    } else {
      await eventRepository.save(
        {
          datum: req.body.date,
          user: {id:id}
        }
      );
     res.redirect("/addEvent");
    }
  } catch (error) {
    res.status(500).json({
      status: error.message,
    });
  }
};