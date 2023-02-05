const User = require("../../models/User");
const accessToken = require("../../middlewares/accessToken");
const { v4 } = require("uuid");
const fs = require("fs");
const bcrypt = require("bcrypt");
const { comparePassword } = require("../../utils/auth");

module.exports = (app) => {
  app.get("/api/users/:id", (req, res) => {
    const { id } = req.params;

    User.findById(id, (err, user) => {
      if (err) {
        return res.json({ message: "User not found" });
      }

      res.json({ user });
    });
  });

  app.post("/api/users", accessToken, async (req, res) => {
    const { username, password, previousPassword } = req.body;
    const profilePicture = req.files?.profilePicture;
    const customBanner = req.files?.customBanner;

    if (!previousPassword) {
      return res.status(401).json({ message: "Wrong credentials" });
    }

    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return res.json({ message: "User not found" });
      }

      const isPasswordValid = await comparePassword(
        previousPassword,
        user.password
      );

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Wrong credentials" });
      }

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.findByIdAndUpdate(req.user.id, {
          password: hashedPassword,
        });
      }

      if (username && username !== user.username) {
        const userAmountWithSameUsername = await User.find({
          username,
        }).countDocuments();

        const tag = String(userAmountWithSameUsername).padStart(4, "0");

        await User.findByIdAndUpdate(req.user.id, {
          username,
          tag,
        });
      }

      if (profilePicture) {
        user.profilePicture &&
          fs.existsSync(`./uploads/images/` + user.profilePicture) &&
          fs.unlinkSync(`./uploads/images/` + user.profilePicture);

        const fileName = v4() + "." + profilePicture.name.split(".").pop();

        fs.writeFile(
          `./uploads/images/` + fileName,
          profilePicture.data,
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        );

        await User.findByIdAndUpdate(req.user.id, {
          profilePicture: fileName,
        });
      }

      if (customBanner) {
        user.customBanner &&
          fs.existsSync(`./uploads/images/` + user.customBanner) &&
          fs.unlinkSync(`./uploads/images/` + user.customBanner);

        const fileName = v4() + "." + customBanner.name.split(".").pop();

        fs.writeFile(
          `./uploads/images/` + fileName,
          customBanner.data,
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        );

        await User.findByIdAndUpdate(req.user.id, {
          customBanner: fileName,
        });
      }

      const newUser = await User.findById(req.user.id);

      res.json({ message: "Update success", user: newUser });
    } catch (err) {
      console.log(err);
      res.status(401).json({ message: "Update fail" });
    }
  });
};
