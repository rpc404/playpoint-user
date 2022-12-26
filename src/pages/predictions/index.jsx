import { Button } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getPredictionById } from "../../api/Prediction";
import { useRPCContext } from "../../contexts/WalletRPC/RPCContext";
import "./styles/style.css";

const Prediction = () => {
  const { pid } = useParams();
  const [predictionData, setPredictionData] = React.useState([]);
  const [questions, setquestions] = React.useState([]);
  const [userPredictions, setUsePredictions] = React.useState([]);
  const [{userPublicAddress},] = useRPCContext();
  React.useEffect(() => {
    getPredictionById(pid).then((res) => {
      if (res.data.data) {
        setPredictionData(res.data.data[0]);
        setquestions(res.data.data[1]);
        console.log(res.data);
      }
    });
  }, []);


  React.useEffect(()=>{
    let allp = JSON.parse(sessionStorage.getItem('predictions'));
    allp = allp.filter(prediction=>{
      console.log(userPublicAddress)
      if(prediction.predictedBy===userPublicAddress){
        return prediction
      }
    })
    setUsePredictions(allp);
  },[userPublicAddress])

  return (
    <div className="userprediction_container">
      {predictionData.user && (
        <div className="container">
          <div className="profile_area">
            <img
              src={`https://robohash.org/${
                predictionData.user[0].username || "aa"
              }`}
              loading="lazy"
            />
            <h3>
               <a href="#">
               {predictionData.user[0].username}
                </a></h3>
            <p>
              {" "}
              <>
                {`${predictionData.user[0].walletID}`.substring(0, 15) +
                  `...` +
                  `${predictionData.user[0].walletID}`.substring(
                    predictionData.user[0].walletID.length - 3
                  )}{" "}
                <i className="ri-arrow-right-up-line"></i>
              </>
            </p>
            <p>Prediction Amount: ${predictionData.amount} ~ {predictionData.amount/0.02}PPTT</p>
          </div>
          <div className="answers_area">
            <div>
                <span>Pool: {questions.poolType}</span>
                <span>Price: {questions.questionairePrice}</span>
            </div>
            <h1>Questions & Answers</h1>
            <div className="questions">
              {questions?.questionaires?.questions.map((question, key) => {
                return (
                  <div className="question_answer" key={key}>
                    <h4>
                      Q{key + 1}. {question} 
                      <span>{questions?.questionaires?.points[key]} Points</span>
                    </h4>
                    <p>Answer: {predictionData.answers[key]}</p>
                  </div>
                );
              })}
            </div>
            <div className="btn_area" style={{marginTop:"20px"}}>
            <Button variant="outlined" color="secondary" onClick={()=>toast("Under Maintainance")}>Challenge {predictionData.user[0].username}</Button>
            </div>
          </div>
        </div>
      )}
      <div className="divider"></div>
      <div className="other_prediction">
        <h2>Your Predictions in same pool</h2>
        <div>
        {console.log(userPredictions)}
              {
                userPredictions.map((_pr)=>{
                  return <div>
                    <h4>{_pr.created_at}</h4>
                    <div>
                        {
                          Array(_pr.answers).map(e=>console.log(e[0]))
                        }
                    </div>
                  </div>
                })
              }
        </div>
      </div>
    </div>
  );
};

export default Prediction;
