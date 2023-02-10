const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const accessToken = require("../../middlewares/accessToken");

const { comparePassword } = require("../../utils/auth");

module.exports = (app) => {
  // REGISTER
  app.post("/api/users/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
      const userAmountWithSameUsername = await User.find({
        username,
      }).countDocuments();

      const tag = String(userAmountWithSameUsername).padStart(4, "0");

      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
        username,
        email,
        tag,
        password: hashedPassword,
      });

      res.json({ message: "Register success" });
    } catch (err) {
      console.log(err);
      res.status(401).json({ message: "Register fail" });
    }
  });

  // LOGIN
  app.post("/api/users/login", async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (await comparePassword(password, user.password)) {
        const accessToken = jwt.sign(
          {
            username: user.username,
            id: user._id,
            profilePicture: user.profilePicture,
            email: user.email,
            tag: user.tag,
          },
          process.env.ACCESS_TOKEN_SECRET
        );

        return res.json({ message: "Login success", accessToken });
      }

      res.status(401).json({ message: "Invalid credentials" });
    } catch (err) {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });

  // WHO AM I
  app.get("/api/users/whoami", accessToken, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);

      res.json({ user });
    } catch (err) {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
};
