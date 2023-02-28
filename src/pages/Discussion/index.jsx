import React from "react";
import "./styles/style.css";
import  {Orbis}  from "@orbisclub/orbis-sdk";
let orbis = new Orbis();

const Discussion = () => {
  const [groupData, setGroupData] = React.useState({});
  const [discussionData, setDiscussionData] = React.useState([]);
  const [activeChannel, setActiveChannel] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      let {data} = await orbis.getGroup(import.meta.env.VITE_ORBIS_GROUP);
      setGroupData(data);
      setActiveChannel(data.channels[0].stream_id);
    // console.log(data);

        // let res = await orbis.connect_v2({ 
        //   provider: window.ethereum,
        //   lit: true
        // });

        // /** Check if connection is successful or not */
        // if(res.status == 200) {
        //   console.log(res);
        //   // let res2 = await orbis.createPost({
        //   //   body: "gm!",
        //   //   context: "playpoint-app"
        //   // });
        //   // console.log(res2);
        // } else {
        //   console.log("Error connecting to Ceramic: ", res);
        //   alert("Error connecting to Ceramic.");
        // }
    })();
  },[])

  React.useEffect(() => {
    if(activeChannel){
      getPosts(activeChannel)
    }
  }, [activeChannel])

  // get channels posts
  const getPosts = async (context) => {
    const {data,error} = await orbis.getPosts({ context });
    setDiscussionData(data);
    console.log(data);

  }

  return (
    <div className="discussion__container">
      <div className="menuLists">
        <div className="menus">
          {
            groupData?.channels && groupData?.channels.map((channel, key) =>  <button id={channel.content.group_id} key={key} onClick={()=>setActiveChannel(channel.stream_id)}>{channel.content.name}</button>)
          }
         
          
        </div>
      </div>
      <div className="discussions">
        <div className="wrapper">
          <div className="connect">
            <p>
              You can connect using <span>Metamask</span> or <span>Tron</span>{" "}
              wallet to share content.
            </p>
            <button>Connect</button>
          </div>
          <div className="refresh">
            <p role={"button"}>
              <i className="ri-refresh-line"></i>
              Refresh
            </p>
            <div className="refresh__divider"></div>
          </div>
          {discussionData.map((data, index) => {
            return (
              <div className="userDetails__container" key={index}>
                <div className="userdetails">
                  <div className="userimage__container">
                    <img src="https://www.robohash.org/1" alt="robohash_img" />
                    <div className="user">
                      <div className="userInfo">
                        {/* <p>Suraj Gaire</p> */}
                        <p>{data.creator}</p>
                      </div>
                      <p>{data.content.body}</p>
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
        <p>Active users</p>
        <div className="user">
          <div>
            <img src="https://www.robohash.org/1" alt="robohash_img" />
            <p>username</p>
          </div>
          <button>follow</button>
        </div>
      </div>
    </div>
  );
};

export default Discussion;
