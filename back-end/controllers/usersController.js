import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const fetchUsers = (req, res) => {};
/**
 * We're using the `bcrypt` library to compare the password that the user entered with the password
 * that's stored in the database. If the passwords match, we create a JSON Web Token (JWT) and send it
 * back to the user
 * @param req - The request object.
 * @param res - the response object
 */
export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(401).json({ message: `User doesn't exist` });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(401).json({ message: `Password is incorrect` });

    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({ token, existingUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * It creates a new user in the database if the email doesn't already exist and the password and
 * confirm password match
 * @param req - The request object.
 * @param res - The response object.
 */
export const signUp = async (req, res) => {
  const { firstName, lastName, password, confirmPassword, email } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(401).json({ message: `User already exist` });

    if (password !== confirmPassword)
      return res.status(400).json({ message: `Passwords don't match` });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      name: `${firstName} ${lastName}`,
      password: hashedPassword,
      email,
    });

    const token = jwt.sign(
      {
        email: result.email,
        id: result._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({ token, result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
