import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().required().email(),
        password: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ message: 'Invalid json object.' });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res
          .status(401)
          .json({ message: "Email and password don't match." });
      }

      if (!(await user.checkPassword(password))) {
        return res
          .status(401)
          .json({ message: "Email and password don't match." });
      }

      const { id, name } = user;

      return res.json({
        user: {
          id,
          name,
          email,
        },
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default new SessionController();
