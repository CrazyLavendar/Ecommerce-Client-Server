import React from "react";
import UserNav from "../../component/nav/UserNav";
const WishList = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="colmd-2">
          <UserNav />
        </div>
        <div className="col"> User WishList Page</div>
      </div>
    </div>
  );
};

export default WishList;