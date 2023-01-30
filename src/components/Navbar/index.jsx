import * as React from "react";
import { Drawer, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./styles/style.css";
import { useRPCContext } from "../../contexts/WalletRPC/RPCContext";
import { ACTIONS } from "../../contexts/WalletRPC/RPCReducer";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import ERC20BasicAPI from "../../utils/ERC20BasicABI.json";
import { useTranslation } from "react-i18next";
import useWindowDimensions from "../../helpers/UseWindowDimension";
import DrawerList from "../DrawerList";
const { ethereum } = window;

export default function Navbar({ toggleAuthenticationDrawer }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [
    {
      isWalletConnected,
      username,
      userPublicAddress,
      network,
      isNonWalletUser,
    },
    dispatchRPCData,
  ] = useRPCContext();
  const [balance, setBalance] = React.useState({
    ethBalance: 0,
    ppttBalance: 0,
  });
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!isNonWalletUser) {
      if (isWalletConnected && network === "arbitrum") {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const contract = new ethers.Contract(
          import.meta.env.VITE_BETA_PPTT_CONTRACT_ADDRESS,
          ERC20BasicAPI,
          provider
        );
        (async () => {
          const ethBalance = await provider.getBalance(userPublicAddress);
          const PPTTBalance = await contract.balanceOf(userPublicAddress);
          setBalance({
            ethBalance: ethers.utils.formatEther(ethBalance),
            ppttBalance: ethers.utils.formatEther(PPTTBalance),
          });
          const data = {
            isWalletConnected,
            username,
            userPublicAddress,
            network,
            userPPTTBalance: ethers.utils.formatEther(PPTTBalance),
            userETHBalance: ethers.utils.formatEther(ethBalance),
          };

          await dispatchRPCData({
            type: ACTIONS.WALLET_CONNECT,
            payload: data,
          });
        })();
      }

      if (isWalletConnected && network === "shasta") {
        setBalance({
          ethBalance: 0,
          ppttBalance: 0,
        });

        (async () => {
          const data = {
            isWalletConnected,
            username,
            userPublicAddress,
            userPPTTBalance: 0,
            userETHBalance: 0,
            network,
          };

          await dispatchRPCData({
            type: ACTIONS.WALLET_CONNECT,
            payload: data,
          });
        })();
      }
    } else {
      if (isWalletConnected && network === "arbitrum") {
        (async () => {
          const ethBalance = 100 * 10 ** 12;
          const PPTTBalance = 100 * 10 ** 18;
          setBalance({
            ethBalance: ethers.utils.formatEther(ethBalance),
            ppttBalance: ethers.utils.formatEther(PPTTBalance),
          });
          const data = {
            isWalletConnected,
            username,
            userPublicAddress,
            network,
            userPPTTBalance: ethers.utils.formatEther(PPTTBalance),
            userETHBalance: ethers.utils.formatEther(ethBalance),
          };

          await dispatchRPCData({
            type: ACTIONS.WALLET_CONNECT,
            payload: data,
          });
        })();
      }

      if (isWalletConnected && network === "shasta") {
        setBalance({
          ethBalance: 0,
          ppttBalance: 0,
        });

        (async () => {
          const data = {
            isWalletConnected,
            username,
            userPublicAddress,
            userPPTTBalance: 0,
            userETHBalance: 0,
            network,
          };

          await dispatchRPCData({
            type: ACTIONS.WALLET_CONNECT,
            payload: data,
          });
        })();
      }
    }
  }, [isWalletConnected, userPublicAddress, network]);

  const handleLogout = () => {
    dispatchRPCData({ type: ACTIONS.WALLET_DISCONNECT });
    toast.error("Wallet Disconnected!");
  };

  /**
   * @dev NavbarSM Devices drawer utilsLogin
   */
  const [navSMState, setnavSMState] = React.useState({
    right: false,
  });

  const [showmore, setShowMore] = React.useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setnavSMState({ ...navSMState, [anchor]: open });
  };

  const { width } = useWindowDimensions();

  return (
    <>
      <div className="navbar__container">
        <div className="logo__container">
          <img
            onClick={(e) => {
              e.stopPropagation();
              navigate("/");
            }}
            src="https://ik.imagekit.io/domsan/Logo_0vBSw9piY.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1662803005580"
          />
          <h3
            onClick={(e) => {
              e.stopPropagation();
              navigate("/");
            }}
          >
            Playpoint
          </h3>

          <div className="navLinks">
            <div
              onClick={(e) => {
                e.stopPropagation();
                navigate("/");
              }}
            >
              {t("Home")}
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                window.open("https://docs.playpoint.ai/");
              }}
            >
              {t("Documentation")}
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                navigate("/leaderboards");
              }}
            >
              {t("Leaderboards")}
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                navigate("/marketplace");
              }}
            >
              {t("Marketplace")}
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                navigate("/challenges");
              }}
            >
              {t("Challenges")}
            </div>
          </div>
        </div>

        <div className="navbar__authentication">
          {isWalletConnected && (
            <div className="more">
              <div
                className="tooltip"
                style={{ cursor: "pointer" }}
                onClick={() => setShowMore((prev) => !prev)}
              >
                <i className="ri-more-2-line"></i>
              </div>
              <div className={`balance__container ${showmore ? "show" : ""} ?`}>
                <div
                  className="balance"
                  onClick={(e) => {
                    if (!isNonWalletUser) {
                      e.stopPropagation();
                      ethereum
                        .request({
                          method: "wallet_watchAsset",
                          params: {
                            type: "ERC20",
                            options: {
                              address: import.meta.env
                                .VITE_BETA_PPTT_CONTRACT_ADDRESS,
                              symbol: "PPTT",
                              decimals: 18,
                              image: "https://ik.imagekit.io/lexworld/Logo.png",
                            },
                          },
                        })
                        .then((success) => {
                          if (success) {
                            toast("PPTT successfully added to wallet!");
                          } else {
                            throw new Error("Something went wrong.");
                          }
                        })
                        .catch(console.error);
                    }
                  }}
                >
                  <img
                    src="https://ethereum.org/static/4f10d2777b2d14759feb01c65b2765f7/69ce7/eth-glyph-colored.webp"
                    alt="ethereum"
                    loading="lazy"
                  />
                  <p>{parseFloat(balance.ppttBalance).toFixed(2)} PPTT</p>
                </div>
                <div className="balance">
                  <img
                    src="https://ethereum.org/static/c48a5f760c34dfadcf05a208dab137cc/3a0ba/eth-diamond-rainbow.webp"
                    alt="ethereum"
                    loading="lazy"
                  />
                  <p>{parseFloat(balance.ethBalance).toFixed(2)} ETH</p>
                </div>
                <button
                  onClick={() => window.open("https://app.playpoint.ai/")}
                  className="buyButton"
                >
                  <i className="ri-coin-fill"></i>
                  {t("BuyPPTT")}
                </button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/profile");
                  }}
                >
                  <i className="ri-user-line"></i>{" "}
                  {isWalletConnected === true && <span>{username}</span>}
                </Button>
              </div>
            </div>
          )}

          {width > 1537 && isWalletConnected && (
            <>
              <div
                className="balance"
                onClick={(e) => {
                  if (!isNonWalletUser) {
                    e.stopPropagation();
                    ethereum
                      .request({
                        method: "wallet_watchAsset",
                        params: {
                          type: "ERC20",
                          options: {
                            address: import.meta.env
                              .VITE_BETA_PPTT_CONTRACT_ADDRESS,
                            symbol: "PPTT",
                            decimals: 18,
                            image: "https://ik.imagekit.io/lexworld/Logo.png",
                          },
                        },
                      })
                      .then((success) => {
                        if (success) {
                          toast("PPTT successfully added to wallet!");
                        } else {
                          throw new Error("Something went wrong.");
                        }
                      })
                      .catch(console.error);
                  }
                }}
              >
                <img
                  src="https://ethereum.org/static/4f10d2777b2d14759feb01c65b2765f7/69ce7/eth-glyph-colored.webp"
                  alt="ethereum"
                  loading="lazy"
                />
                <p>{parseFloat(balance.ppttBalance).toFixed(2)} PPTT</p>
              </div>
              <div className="balance">
                <img
                  src="https://ethereum.org/static/c48a5f760c34dfadcf05a208dab137cc/3a0ba/eth-diamond-rainbow.webp"
                  alt="ethereum"
                  loading="lazy"
                />
                <p>{parseFloat(balance.ethBalance).toFixed(2)} ETH</p>
              </div>
            </>
          )}
          {width > 1537 && (
            <button
              onClick={() => window.open("https://app.playpoint.ai/")}
              className="buyButton"
            >
              <i className="ri-coin-fill"></i>
              {t("BuyPPTT")}
            </button>
          )}
          {isWalletConnected === false ? (
            <Button
              disabled={loading}
              onClick={() => toggleAuthenticationDrawer()}
            >
              👛 {t("ConnectWallet")}
            </Button>
          ) : (
            <>
              {width > 1537 && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/profile");
                  }}
                >
                  <i className="ri-user-line"></i>{" "}
                  {isWalletConnected === true && <span>{username}</span>}
                </Button>
              )}
              <Button onClick={() => handleLogout()}>
                <i className="ri-logout-box-line"></i>
                {t("Logout")}
              </Button>
            </>
          )}
        </div>

        <div className="drawer">
          <div onClick={toggleDrawer("right", true)}>
            <i className="ri-menu-3-line"></i>
          </div>
          <Drawer
            anchor={"right"}
            open={navSMState["right"]}
            onClose={toggleDrawer("right", false)}
          >
            <DrawerList
              anchor={"right"}
              toggleDrawer={toggleDrawer}
              isWalletConnected={isWalletConnected}
              username={username}
              balance={balance}
              handleLogout={handleLogout}
              loading={loading}
              toggleAuthenticationDrawer={toggleAuthenticationDrawer}
            />
          </Drawer>
        </div>
      </div>
    </>
  );
}
