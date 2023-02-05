import { useEffect, useState } from "react";
import { updateProfile } from "../api/settings";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

import Sidebar from "../features/Sidebar";
import Input from "../components/ui/Input";

const Settings = ({ localUser, setUpdateApp }) => {
  const [username, setUsername] = useState(localUser.username);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(
    `${import.meta.env.VITE_API_URL}/uploads/images/${localUser.profilePicture}`
  );
  const [bannerPreview, setBannerPreview] = useState(
    `${import.meta.env.VITE_API_URL}/uploads/images/${localUser.customBanner}`
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedBanner) {
      // setBannerPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedBanner);
    setBannerPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedBanner]);

  useEffect(() => {
    if (!selectedAvatar) {
      // setAvatarPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedAvatar);
    setAvatarPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedAvatar]);

  const handleSubmitProfile = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("username", username);
      formData.append("password", newPassword);
      formData.append("previousPassword", currentPassword);
      formData.append("profilePicture", selectedAvatar);
      formData.append("customBanner", selectedBanner);

      const response = await updateProfile(formData);

      setCurrentPassword("");
      setNewPassword("");

      dispatch({ type: "SET_USER", payload: response.data.user });
      setUpdateApp((prev) => !prev);

      toast.success("Profile updated successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="flex w-screen h-screen">
      <Sidebar />

      <div className="flex w-[calc(100vw-6rem)] flex-col gap-6 bg-[#0e0e0f] h-screen px-40 py-20">
        <div className="flex flex-col self-center gap-6">
          <h1 className="text-3xl font-['Poppins]' text-zinc-200 uppercase">
            Settings
          </h1>

          <h2 className="text-zinc-300 mt-12 text-2xl">Profile</h2>

          <form
            onSubmit={handleSubmitProfile}
            className="w-full h-full flex flex-col gap-2"
          >
            <div
              style={{
                backgroundImage: `linear-gradient(
                  rgba(0, 0, 0, 0.4),
                  rgba(0, 0, 0, 0.4)
                ),url(${bannerPreview})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="relative flex gap-6 bg-zinc-800 p-4 rounded"
            >
              <div
                style={{
                  backgroundImage: `url(${avatarPreview || "logo.svg"})`,
                  backgroundSize:
                    localUser.profilePicture || avatarPreview ? "cover" : "40%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                className="relative flex w-20 rounded-full overflow-hidden justify-center h-20 bg-rose-500"
              >
                <label htmlFor="userAvatarInput">
                  <Icon
                    onMouseEnter={() => {
                      setIsHoveringAvatar(true);
                    }}
                    onMouseLeave={() => {
                      setIsHoveringAvatar(false);
                    }}
                    style={{
                      color: isHoveringAvatar ? "#fff" : "transparent",
                      backgroundImage: isHoveringAvatar
                        ? `linear-gradient(
                        rgba(0, 0, 0, 0.4),
                        rgba(0, 0, 0, 0.4)
                      )`
                        : "none",
                    }}
                    className="transition absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full w-full h-full p-7 cursor-pointer"
                    color="#ccc"
                    icon="material-symbols:edit"
                  />
                </label>
              </div>

              <p className="drop-shadow-2xl text-2xl text-zinc-300 self-center ">
                <span className="font-semibold text-white">{username}</span>#
                {localUser.tag}
              </p>

              <label htmlFor="userBannerInput">
                <Icon
                  className="transition absolute top-2 right-2 hover:bg-zinc-700 rounded-full h-8 w-8 p-2 cursor-pointer"
                  color="#ccc"
                  icon="material-symbols:edit"
                />
              </label>

              <input
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setSelectedBanner(e.target.files[0]);
                  }
                }}
                type="file"
                accept="image/png, image/gif, image/jpeg, image/jpg"
                id="userBannerInput"
                className="hidden"
              />

              <input
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setSelectedAvatar(e.target.files[0]);
                  }
                }}
                type="file"
                accept="image/png, image/gif, image/jpeg, image/jpg"
                id="userAvatarInput"
                className="hidden"
              />
            </div>
            <div className="flex w-full gap-2 h-36">
              <div className="w-full flex flex-col">
                <Input
                  type="password"
                  className={"w-full"}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  value={newPassword}
                />
                {newPassword.length > 0 && (
                  <Input
                    type="password"
                    className={"w-full"}
                    onChange={(e) => setNewPasswordConfirm(e.target.value)}
                    placeholder="Confirm Password"
                    value={newPasswordConfirm}
                  />
                )}
                <Input
                  type="password"
                  className={"w-full"}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Current Password"
                  value={currentPassword}
                />
              </div>
              <div className="flex flex-col">
                <Input
                  type="text"
                  className={"w-full"}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  value={username}
                />
                <Input
                  type="submit"
                  className="cursor-pointer bg-rose-500 w-full"
                  value={"Save"}
                />
              </div>
            </div>
          </form>

          <h2 className="text-zinc-300 mt-12 text-2xl">Authentication</h2>

          <div className="flex flex-col gap-2">
            <button
              disabled
              className="w-1/2 flex text-zinc-500 font-semibold gap-2 justify-center bg-zinc-800 p-2 rounded"
            >
              Enable 2FA
            </button>
            <Link
              to="/signout"
              className="w-1/2 flex text-white font-semibold gap-2 justify-center bg-rose-500 p-2 rounded"
            >
              Sign out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
