import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { signOut } from "../../store/slices/authSlice";
import { NavLink } from "react-router-dom";
import { ROLES } from "../../constants/app.constants";

const ProfileBadge = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth || {});

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const notAdmin = user.roles !== ROLES.ADMIN;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    dispatch(signOut());
    handleClose();
  };

  const getInitials = (name) => {
    if (!name) return "U";
    const names = name.split(" ");
    return names
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleClick} sx={{ ml: "auto" }}>
        <Avatar sx={{ bgcolor: "#fff", color: "#1976d2" }}>
          {getInitials(user?.firstName)}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem disabled>
          <Typography variant="body1">{user?.name || "User"}</Typography>
        </MenuItem>
        {notAdmin && (
          <MenuItem onClick={handleClose}>
            <NavLink to="profile">Profile</NavLink>
          </MenuItem>
        )}
        <MenuItem onClick={handleSignOut}>
          <Typography variant="body1" color="error">
            Sign Out
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileBadge;
