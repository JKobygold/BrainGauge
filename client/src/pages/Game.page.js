import React, { Component } from "react";
import axios from "axios";
import "./game.css";
import API from "../util/API";


var counter = 0
var click = 0;
function rando() {
  return Math.floor(Math.random() * 375) + 200;
}
function randoInterval() {
  return Math.floor(Math.random() * 4000) + 500;
}

function getRandomColor() {

  var letters = "0123456789ABCDEF".split('');
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.round(Math.random() * 15)];
  } //ends for loop 
  return color;

}

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

                   if (click === 8) {
                     clearTimeout(timeout);
                     axios
                       .post("/api/score", {
                         score: this.state.score / 8,
                         userResult: this.state.userResult,
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

                 gotoresults = () => {
                
                    console.log("we found something")
                    
                    API.performancedata({})
                       .then((res) => {
                         console.log(res, "adsfaafasfa");
                      
                        API.surveydata({})
                       .then((res) => {
                         console.log(res, "adsfaafasfa"); 
                       })
                  
                 }
                       )}

                 render() {
                   console.log("x:", this.state.x);
                   console.log("y:", this.state.y);
                   return (
                     <div>
                       <div
                         className="app"
                         style={{ position: "relative", height: 500 }}
                       >
                         <div
                           style={{
                             position: "absolute",
                             visibility: this.state.hidden
                               ? "hidden"
                               : "visible",
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
                             this.state.userResult[
                               this.state.userResult.length - 1
                             ]
                           }{" "}
                           seconds{" "}
                         </h1>
                         <h2>
                           your composite score: {this.state.score} seconds
                         </h2>
                         {click === 8 ? (
                           <a href="http://localhost:3000/Results">
                             {" "}
                             <img
                               onClick={this.gotoresults}
                               id="resultspage"
                               src="https://www.freepnglogos.com/uploads/button-png/red-button-circle-image-pixabay-20.png"
                               style={{ width: 400, height: 400 }}
                             />{" "}
                           </a>
                         ) : null}
                         {click === 8 ? (
                           <h1>
                             {" "}
                             Please select giant red button to see your results!{" "}
                           </h1>
                         ) : null}
                       </div>
                     </div>
                   );
                 }
               }

