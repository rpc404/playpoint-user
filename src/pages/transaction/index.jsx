import React from "react";
import "./styles/style.css";
export default function Transaction() {
  return (
    <div className="main__container">
      <div className="wrapper">
        <div className="options__container">
          <div className="profile">
            <img src="https://robohash.org/riktriz" alt="profile image" />
            <h3>Riktriz</h3>
          </div>
          <div className="amount">
            <p>Balance</p>
            <h3>$69,999</h3>
          </div>
          <div className="options">
            <div className="links">
              <i class="ri-arrow-left-right-line"></i>
              <a href="#">Transactions</a>
            </div>
            <div className="links">
              <i class="ri-money-dollar-circle-line"></i>
              <a href="#">Payments</a>
            </div>
            <div className="links">
              <i class="ri-bank-card-2-line"></i>
              <a href="#">Cards</a>
            </div>
            <div className="links">
              <i class="ri-account-circle-line"></i>
              <a href="#">Account</a>
            </div>
            <div className="links">
              <i class="ri-user-settings-line"></i>
              <a href="#">Administration</a>
            </div>
          </div>
        </div>

        <div className="transaction__container">
          <div className="top">
            <h1>Transactions</h1>

            <div className="button">
              <div className="search">
                <input type="text" placeholder="Search.." />
                <a href="#">
                  <i class="ri-search-line"></i>
                </a>
              </div>
              <a href="#">
                <i class="ri-notification-3-line"></i>
              </a>{" "}
            </div>
          </div>
          <div className="links">
            <a href="#">History</a>
            <a href="#">Upcoming</a>
          </div>
          <div className="statement">
            <div className="latest">
              <p>19 Dec, 2022 </p>
              <div className="details">
                <div className="left">
                  <div className="left_top">
                    <i class="ri-arrow-left-right-line"></i>
                    <h3>Amazon Support</h3>
                  </div>
                  <div className="left_buttom">
                    <p>9 Dec, 2022 at 7:08 PM</p>
                  </div>
                </div>

                <p>Success</p>
                <i class="ri-link-m"></i>
                <h3>-$2,430.50</h3>
              </div>
              <div className="details">
                <div className="left">
                  <div className="left_top">
                    <i class="ri-arrow-left-right-line"></i>
                    <h3>Amazon Support</h3>
                  </div>
                  <div className="left_buttom">
                    <p>9 Dec, 2022 at 7:08 PM</p>
                  </div>
                </div>

                <p>Success</p>
                <i class="ri-link-m"></i>
                <h3>-$2,430.50</h3>
              </div>
            </div>
          </div>
          <div className="statement">
            <div className="latest">
              <p>2 Dec, 2022 </p>
              <div className="details">
                <div className="left">
                  <div className="left_top">
                    <i class="ri-arrow-left-right-line"></i>
                    <h3>Amazon Support</h3>
                  </div>
                  <div className="left_buttom">
                    <p>2 Dec, 2022 at 8:08 PM</p>
                  </div>
                </div>

                <p>Success</p>
                <i class="ri-link-m"></i>
                <h3>-$2,430.50</h3>
              </div>
              <div className="details">
                <div className="left">
                  <div className="left_top">
                    <i class="ri-arrow-left-right-line"></i>
                    <h3>Riktriz</h3>
                  </div>
                  <div className="left_buttom">
                    <p>2 Dec, 2022 at 8:08 PM</p>
                  </div>
                </div>

                <p>Success</p>
                <i class="ri-link-m"></i>
                <h3>+$2,430.50</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="balance__container">
          <div className="top">
            <img
              src="https://ik.imagekit.io/domsan/Logo_0vBSw9piY.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1662803005580"
              alt=""
            />
            <h3>Amazon Support</h3>
            <div className="mid">
              <h2>-$2,430.50</h2>
              <p>19 Dec, 2022 at 7:08 PM</p>
            </div>
            <div className="invoice">
              <p>Balance</p>
              <div className="balance">
                <i class="ri-wallet-line"></i>
                <h4>$69,999</h4>
              </div>
              <p>Invoice</p>
              <div className="balance">
                <i class="ri-booklet-line"></i>
                <h4>8HXR-HA4A-RAG3</h4>
              </div>
            </div>
            <div className="chart">
              <img
                src="https://lh6.googleusercontent.com/uHU7F0Eq21xjQgotgkOKjjfJnQ4cf049OkJtM0M6NeajnsWfa3P_zrOSpAvp6ynpOSO8cwzeGDOc0YF-mEK7X7njEUGrvg_1r7tOI0TRPh-AshZ6wP98E0AWbETSBhMruDWp3vta"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
