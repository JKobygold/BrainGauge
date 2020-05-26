import React, { Component } from "react";
import "./game.css";
import API from "../util/API";



var click = 0;
function rando() {
  return Math.floor(Math.random() * 375) + 200;
}

function randoInterval() {
  return Math.floor(Math.random() * 4000) + 500;
}

// A function used later to change the color of the box
function getRandomColor() {
  var letters = "0123456789ABCDEF".split("");
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.round(Math.random() * 15)];
  } //ends for loop
  return color;
}

//local storage variables
var email =  window.localStorage.getItem("email");
var question1 =  window.localStorage.getItem("question1");
var question2 =  window.localStorage.getItem("question2");
var question3 =  window.localStorage.getItem("question3");
var question4 =  window.localStorage.getItem("question4");





export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      hidden: false,
      startTime: 0,
      score: 0,
      userResult: [],
    };
  }

  // loadUsers = () => {
  //   API.getUsers()
  //     .then((res) =>
  //       this.setState({
  //         email: ""
  //       })
  //     )
  //     .catch((err) => console.log(err));
  // };





  move() {
    var temparray = this.state.userResult;
    temparray.push((Date.now() - this.state.startTime) / 1000);
    click++;
    console.log(click);
    this.setState((state) => ({
      x: rando(),
      y: rando(),
      userResult: temparray,
      startTime: Date.now(),
      hidden: true,
      score: this.state.score + trackScore,
    }));
    const timeout = setTimeout(() => {
      this.setState((state) => ({
        hidden: false,
      }));
    }, randoInterval());

    console.log("time: ", randoInterval());

    var num = this.state.score / 3
    var SuperNumber = num.toFixed(2)
    console.log(SuperNumber);    

    if (click === 3) {
      clearTimeout(timeout);  
      console.log("email:" , email)
      API.gameData({
        score: this.state.score / 3,
        userResult: this.state.userResult,
        email: email,
        question1: question1,
        question2: question2,
        question3: question3,
        question4: question4,
      }) 
         .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    var trackScore = (Date.now() - this.state.startTime) / 1000;
  }

  componentDidMount() {
    this.setState({
      startTime: Date.now(),
    });
  }



  render() {
    console.log("x:", this.state.x);
    console.log("y:", this.state.y);
    return (
      <div>
        <div className="app" style={{ position: "relative", height: 500 }}>
          <div
            style={{
              position: "absolute",
              visibility: this.state.hidden ? "hidden" : "visible",
              top: this.state.y,
              right: this.state.x,
              height: 100,
              width: 100,
              borderradius: 50,
              backgroundColor: getRandomColor(),
            }}
            onClick={() => {
              this.move();
            }}
          ></div>
          <h1>
            {" "}
            Your reaction speed:{" "}
            {
              this.state.userResult[this.state.userResult.length - 1]
            } seconds{" "}
          </h1>
          <h2>your composite score: {this.state.score} seconds</h2>
          {click === 3 ? (
            <a href="http://localhost:3000/Results" alt="description of image">
              {" "}
              <img
                id="resultspage"
                src="https://www.freepnglogos.com/uploads/button-png/red-button-circle-image-pixabay-20.png"
                alt="description of imag"
                style={{ width: 400, height: 400 }}
              />{" "}
            </a>
          ) : null}
          {click === 3 ? (
            <h1> Please select giant red button to see your results! </h1>
          ) : null}
        </div>
      </div>
    );
  }
}





