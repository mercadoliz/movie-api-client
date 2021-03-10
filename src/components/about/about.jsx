import React, { Component } from "react";
import Image from "./EM.jpeg"
import "./about.scss"
export default class About extends Component {
  render() {
    return (
      <div>
        <h1>About</h1>
        <img
          src={Image}
          className="profile"
          alt="Elizabeth Mercado Portrait"
        ></img>

        <p>
          Hello, I’m Elizabeth. I’m a developer with a background in social work
          and community organizing. My roles included supporting children and
          adults in their leadership development as they navigated their
          journeys in policy advocacy and change. I’m transitioning to software
          development because I understand the power technology has in the world
          today to make effective and fast change in order to make life more
          just and equitable for all. I am looking for an opportunity to couple
          my social justice lens and my curiosity to use tech for social good.
        </p>
        <p>
          Throughout this project, I learned how to utilize React for frontend
          devlelopment and Node.js for backened development. I also had the
          chance to learn more about databases, such as MongoDB to store all of
          the movie data used for this application. And of course, ensuring that
          all code was pushed to GitHub to for hosting and version control.
        </p>
        <p>
          When I'm not learning how to code or thinking about how to change
          society, I'm:
        </p>
        <ul>
          <li>Learning new recipes</li>
          <li>Spending time in nature</li>
          <li>Shopping</li>
          <li>Eating dessert</li>
        </ul>
      </div>
    );
  }
}
