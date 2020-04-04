import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    try {
      const recipients = await Recipient.findAll();

      return res.json(recipients);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async get(req, res) {
    try {
      const { id } = req.params;
      const {
        name,
        street,
        number,
        complement,
        city,
        uf,
        cep,
      } = await Recipient.findByPk(id);

      return res.json({
        id,
        name,
        street,
        number,
        complement,
        city,
        uf,
        cep,
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async store(req, res) {
    try {
      const {
        id,
        name,
        street,
        number,
        complement,
        city,
        uf,
        cep,
      } = await Recipient.create(req.body);

      return res.json({
        id,
        name,
        street,
        number,
        complement,
        city,
        uf,
        cep,
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const recipient = await Recipient.findByPk(id);
      if (!recipient) {
        return res.status(404).json({ message: 'Recipient not found.' });
      }

      const {
        name,
        street,
        number,
        complement,
        city,
        uf,
        cep,
      } = await recipient.update(req.body);

      return res.json({
        id,
        name,
        street,
        number,
        complement,
        city,
        uf,
        cep,
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const recipient = await Recipient.destroy({ where: { id } });
      if (!recipient) {
        return res.status(404).json({ message: 'Recipient not found.' });
      }

      return res.status(204);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default new RecipientController();
