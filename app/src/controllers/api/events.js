import DataSource from '../../lib/DataSource.js'

export const postEvent = async (req, res, next) => {
  try {
    const eventRepository = DataSource.getRepository("events");
    const event = await eventRepository.findOneBy({
      datum: req.body.datum,
    });
    if (event) {
      res.status(200).json({
        status: "event already exists in database",
      });
    } else {
      await eventRepository.save(req.body);
      res.status(201).json({
        status: "We create a new event in the database!",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: error.message,
    });
  }
};
