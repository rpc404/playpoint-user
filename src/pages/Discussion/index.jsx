import React from "react";
import { Helmet } from "react-helmet";
import { useRPCContext } from "../../contexts/WalletRPC/RPCContext";
import "./styles/style.css";

const Discussion = ({ toggleAuthenticationDrawer }) => {
  const [{ isWalletConnected }] = useRPCContext();

  return (
    <div className="discussion__container">
      <Helmet>
        <title>Playpoint | Discussion</title>
      </Helmet>
      <div className="menuLists">
        <div className="menus">
          <p>Menu</p>
          <h3># Welcome</h3>
          <h3># Announcements</h3>
          <h3>
            <i className="ri-global-line"></i>
            Global
          </h3>
        </div>
      </div>
      <div className="discussions">
        <div className="wrapper">
          {isWalletConnected === false && (
            <div className="connect">
              <p>
                You can connect using <span>Metamask</span> or <span>Tron</span>{" "}
                wallet to share content.
              </p>
              <button onClick={() => toggleAuthenticationDrawer()}>
                Connect
              </button>
            </div>
          )}
          <div className="refresh">
            <p role={"button"}>
              <i className="ri-refresh-line"></i>
              Refresh
            </p>
            <div className="refresh__divider"></div>
          </div>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => {
            return (
              <div className="userDetails__container" key={index}>
                <div className="userdetails">
                  <div className="userimage__container">
                    <img src="https://www.robohash.org/1" alt="robohash_img" />
                    <div className="user">
                      <div className="userInfo">
                        <p>Suraj Gaire</p>
                        <p>Id</p>
                      </div>
                      <p>Testing again</p>
                      <div className="icons_container">
                        <div className="left">
                          <p>
                            <i className="ri-discuss-line"></i>0
                          </p>
                          <p>
                            <i className="ri-heart-fill"></i>3
                          </p>
                        </div>
                        <div className="right"></div>
                      </div>
                    </div>
                  </div>
                  <p>23 Hours Ago</p>
                </div>
                <div className="refresh__divider"></div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="active__users">
        <div className="profile">
          <p className="notification">
            <i className="ri-notification-line"></i>
          </p>
          <div className="account_details">
            <img
              src="https://www.robohash.org/1"
              alt="robohash_img"
              height={"50"}
              width={"50"}
            />
            <div>
              <p>id</p>
              <p>
                <i className="ri-wallet-line"></i>
              </p>
            </div>
            <p>
              <i className="ri-more-2-fill"></i>
            </p>
          </div>
        </div>
        <p className="active_title">Active users</p>
        <div className="user">
          <div>
            <img src="https://www.robohash.org/1" alt="robohash_img" />
            <p>username</p>
          </div>
          <button>
            <i className="ri-user-follow-fill"></i> Follow
          </button>
        </div>
      </div>
    </div>
  );
};

export default Discussion;
