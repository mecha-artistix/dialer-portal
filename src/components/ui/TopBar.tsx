import React from "react";

function TopBar() {
  const user = process.env.NEXT_PUBLIC_DIALER_USER;
  return <div>User: {user}</div>;
}

export default TopBar;
