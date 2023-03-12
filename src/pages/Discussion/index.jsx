import React from "react";
import { Helmet } from "react-helmet";
import { useRPCContext } from "../../contexts/WalletRPC/RPCContext";
import "./styles/style.css";
import { Orbis } from "@orbisclub/orbis-sdk";
let orbis = new Orbis();
import moment from "moment";
import ScrollToBottom from "react-scroll-to-bottom";
import { toast } from "react-toastify";
import axios from "axios";
 

const Discussion = () => {
  const [groupData, setGroupData] = React.useState({});
  const [discussionData, setDiscussionData] = React.useState([]);
  const [activeChannel, setActiveChannel] = React.useState([]);
  const [{ userPublicAddress, username }] = useRPCContext();
  const [showNotification, setShowNotification] = React.useState(false);
  const [groupMembers, setGropMembers] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [follow, setFollow] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [edited, setEdited] = React.useState(false);

  // const [reactions, setReactions] = React.useState({
  //   like: 0,
  //   haha: 0,
  //   downvote: 0,
  // });
  const [like, setLike] = React.useState(0);
  const [haha, setHaha] = React.useState(0);
  const [downvote, setDownvote] = React.useState(0);
  const [discussionreaction, setDiscussionreaction] = React.useState();
  const [showmore, setShowMore] = React.useState(false);
  const [active, setActive] = React.useState(0);

  const prevInputValue = React.useRef("");

  const [post, setPost] = React.useState("");
  React.useEffect(() => {
    (async () => {
      let { data } = await orbis.getGroup(import.meta.env.VITE_ORBIS_GROUP);
      setGroupData(data);
      setActiveChannel(data.channels[0].stream_id);
      // console.log(data);
      let _res = await orbis.isConnected();
      if (_res.status !== 200) {
        let res = await orbis.connect_v2({
          provider: window.ethereum,
          lit: true,
        });
        /** Check if connection is successful or not */
        if (res.status == 200) {
          console.log(res);
        } else {
          console.log("Error connecting to Ceramic: ", res);
          alert("Error connecting to Ceramic.");
        }
      }
    })();
  }, []);

  window.onclick = (e) => {
    if (e.target.classList[1] !== "showmore") {
      setShowMore(false);
    }
  };

  React.useEffect(() => {
    if (activeChannel) {
      getPosts(activeChannel);
    }
  }, [activeChannel]);

  // create channel post
  const handleCreatePost = async (context, post) => {
    if (post !== "") {
      await orbis.createPost({ body: post, context });
      setPost("");
    } else {
      toast("post cannot be empty", "error");
    }
  };

  React.useEffect(() => {
    handleCreatePost;
  }, [post, activeChannel]);

  React.useEffect(() => {
    getGroupMembers();
  }, []);

  // get channels posts
  const getPosts = async (context) => {
    const { data, error } = await orbis.getPosts({ context });
    setDiscussionData(data.reverse());
    // console.log(data);
  };

  const getMinutes = (time) => {
    return moment.unix(time).startOf("minutes").fromNow();
  };

  const getGroupMembers = async () => {
    const res = await orbis.getGroupMembers(import.meta.env.VITE_ORBIS_GROUP);
    console.log(res);
    setGropMembers(res.data);
  };
  React.useEffect(() => {
    handleLikeReaction();
  }, [like]);

  const handleLikeReaction = async (context, like) => {
    const res = await orbis.react(context, like);
    console.log(res);
    // setLike(like + res.data.count_likes);
    // console.log(res.data);
    // console.log(res);
  };

  const handleDeletePost = async (stream_id) => {
    const res = await orbis.deletePost(stream_id);
    if (res.status === 200) {
      const remainingItemsAfterDeletion = discussionData.filter(
        (item) => item.stream_id !== stream_id
      );
      setDiscussionData(remainingItemsAfterDeletion);
    }
  };

  const handlePostRefresh = () => {
    if (!refresh) {
      setRefresh(true);
      setTimeout(() => {
        setRefresh(false);
      }, 500);
    }
  };

  const getUserAddressFromDiscussion = async () => {
    if (discussionData.length > 0) {
      const address = discussionData.map((data) => {
        return data.creator_details.metadata.address;
      });
      console.log(address);
    }
  };

  React.useEffect(() => {
    getUserAddressFromDiscussion();
  }, []);

  const handleFollowAccount = async (did) => {
    const res = await orbis.setFollow(did, true);
    if (res.status === 200) {
      setFollow(true);
    }
  };

  const handleUnfollowAccount = async (did) => {
    const res = await orbis.setFollow(did, false);
    if (res.status === 200) {
      setFollow(false);
    }
  };

  const handleShowMore = (index) => {
    setShowMore((prev) => !prev);
    localStorage.setItem("active", index);
    setActive(index);
  };
  // React.useEffect(() => {
  //   handleShowMore()
  // },[])
  // console.log(active)

  const handleSaveEditedPost = async (stream_id, post) => {
    if (post !== "") {
      const res = await orbis.editPost(stream_id, { body: post });
      if (res.status === 200) {
        localStorage.setItem("edited", true);
        setEditMode(false);
        setEdited(localStorage.getItem("edited") || true);
      }
    } else {
      setEditMode(false);
    }
  };

  React.useEffect(() => {
    handleSaveEditedPost();
  }, [editMode, edited]);

  return (
    <div className="discussion__container">
      <Helmet>
        <title>Playpoint | Discussion</title>
      </Helmet>
      <div className="menu__container">
        <div className="menuLists">
          <div className="userdetails">
            <p>User details</p>
            <div className="image_container">
              <img
                src="https://robohash.org/1"
                alt="user image"
                height={"80"}
                width={"80"}
              />
            </div>
            <h2>{username}</h2>
            <div className="userAddress_container">
              <p className="userAddress">
                {`${userPublicAddress}`.substring(0, 5)}...
                {`${userPublicAddress}`.substring(userPublicAddress.length - 5)}
              </p>
            </div>
          </div>
          <div className="menus">
            {groupData?.channels &&
              groupData?.channels.map((channel, key) => (
                <button
                  id={channel.content.group_id}
                  className={`${
                    activeChannel === channel.stream_id ? "active" : ""
                  } `}
                  key={key}
                  onClick={() => setActiveChannel(channel.stream_id)}
                >
                  {channel.content.name}
                </button>
              ))}
          </div>
        </div>
        <div className="notification__container">
          <div className="notification__icon">
            <p onClick={() => setShowNotification((prev) => !prev)}>
              <i className="ri-notification-line"></i>
            </p>
          </div>
          {showNotification && (
            <div className={`notifications ${showNotification ? "show" : ""}`}>
              <div className="refresh__divider "></div>
              {[0, 1, 2, 3, 4].map((_, i) => {
                return (
                  <div className="notification" key={i}>
                    <img
                      src="https://www.robohash.org/1"
                      alt="robohash_img"
                      height={"50"}
                      width={"50"}
                    />
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Vel, consequatur?
                    </p>
                    <p>
                      <i className="ri-more-2-fill"></i>
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="discussions">
        <div className="wrapper">
          <div className="refresh">
            {!refresh ? (
              <p
                role={"button"}
                onClick={() => {
                  handlePostRefresh(), getPosts(activeChannel);
                }}
              >
                <i className="ri-refresh-line"></i>
                Refresh
              </p>
            ) : (
              <p>
                <span className="loader"></span>
              </p>
            )}

            <div className="refresh__divider"></div>
          </div>
          <ScrollToBottom
            className="discussions__container__chats"
            followButtonClassName="scroll_to_bottom"
            initialScrollBehavior="smooth"
          >
            {discussionData.map((data, index) => {
              return (
                <div className="userDetails__container" key={index}>
                  <div className="userdetails">
                    <div className="userimage__container">
                      <img
                        src="https://www.robohash.org/1"
                        alt="robohash_img"
                      />
                      <div className="user">
                        <div className="userInfo">
                          <div>
                            <p>
                              {`${data.creator}`.split(":")[4].substring(0, 5)}
                              ...
                              {`${data.creator}`
                                .split(":")[4]
                                .substring(
                                  `${data.creator}`.split(":")[4].length - 5
                                )}
                              {edited && index === active && (
                                <span>(edited)</span>
                              )}
                            </p>
                          </div>
                          <p>{getMinutes(data.timestamp)}</p>
                        </div>
                        {!editMode ? (
                          <p>{data.content.body}</p>
                        ) : (
                          index === active && (
                            <div className="edit__user">
                              <input
                                type="text"
                                value={post}
                                onChange={(e) => setPost(e.target.value)}
                              />
                              <div className="buttons">
                                <button onClick={() => setEditMode(false)}>
                                  cancel
                                </button>
                                <button
                                  onClick={() =>
                                    handleSaveEditedPost(data.stream_id, post)
                                  }
                                >
                                  save
                                </button>
                              </div>
                            </div>
                          )
                        )}
                        <div className="icons_container">
                          <div className="left">
                            <p>
                              <i className="ri-discuss-line"></i>
                              {discussionreaction}
                            </p>
                            <p>
                              <i
                                className="ri-heart-fill"
                                value={like}
                                onClick={() => {
                                  setLike(like + 1),
                                    handleLikeReaction(data.context, like);
                                }}
                              ></i>
                              {like}
                            </p>
                            <p>
                              <i className="ri-emotion-laugh-line"></i>
                              {haha}
                            </p>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                            }}
                          >
                            {data.creator_details.did.split(":")[4] ===
                              userPublicAddress && (
                              <div className="more__wrapper">
                                <p>
                                  <i
                                    className="ri-more-2-fill showmore"
                                    onClick={() => {
                                      handleShowMore(index);
                                    }}
                                  ></i>
                                </p>
                                {active === index && showmore && (
                                  <div className="more__container">
                                    <button
                                      onClick={() => {
                                        setEditMode(true),
                                          (prevInputValue.current = post);
                                      }}
                                    >
                                      Edit Post
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleDeletePost(data.stream_id)
                                      }
                                      className="delete"
                                    >
                                      Delete Post
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="refresh__divider"></div>
                </div>
              );
            })}
          </ScrollToBottom>
          <div className="textarea__container">
            <textarea
              name=""
              id=""
              cols="30"
              rows="5"
              placeholder="share your post here..."
              onChange={(e) => setPost(e.target.value)}
            ></textarea>
            <button
              onClick={() => {
                handleCreatePost(activeChannel, post);
              }}
            >
              share
            </button>
          </div>
        </div>
      </div>

      <div className="active__users">
        <p className="active_title">Active users</p>
        {groupMembers.map((data, index) => {
          return (
            <div className="user" key={index}>
              <div>
                <img src="https://www.robohash.org/1" alt="robohash_img" />
                <p>
                  {data.profile_details.did.split(":")[4].substring(0, 5)}...
                  {data.profile_details.did
                    .split(":")[4]
                    .substring(
                      data.profile_details.did.split(":")[4].length - 5
                    )}
                </p>
              </div>
              {data.profile_details.did.split(":")[4] !== userPublicAddress &&
                (!follow ? (
                  <button
                    onClick={() =>
                      handleFollowAccount(data.profile_details.did)
                    }
                  >
                    <i className="ri-user-follow-fill"></i> Follow
                  </button>
                ) : (
                  <button
                    className="following"
                    onClick={() =>
                      handleUnfollowAccount(data.profile_details.did)
                    }
                  >
                    <i className="ri-check-line"></i> Following
                  </button>
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Discussion;
