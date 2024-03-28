import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

import Menu from "../../components/Menu/Menu.js";

function UserProfile() {
  const navigate = useNavigate();
  const [state, setState] = useState();

  return (
    <div className="flex">
      <Menu />
    </div>
  );
}

export default UserProfile;
