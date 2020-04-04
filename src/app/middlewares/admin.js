import User from '../models/User';

export default async (req, res, next) => {
  const { userId } = req;

  const user = await User.findByPk(userId);

  if (!user.is_admin) {
    return res.status(401).json({ message: 'Permission denied.' });
  }

  return next();
};
