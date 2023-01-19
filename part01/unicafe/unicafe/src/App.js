import { useState } from "react";
const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};
const StasticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};
const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = all > 0 ? (good - bad) / all : 0;
  const positive = all > 0 ? (good / all) * 100 : 0;
  if (all !== 0) {
    return (
      <table>
        <tbody>
          <StasticLine text="good" value={good}/>
          <StasticLine text="neutral" value={neutral}/>
          <StasticLine text="bad" value={bad}/>
          <StasticLine text="all" value={all}/>
          <StasticLine text="average" value={average}/>
          <StasticLine text="positive" value={positive +"%"}/>

        </tbody>
      </table>
    );
  }
  else{
    return(
      <div>No feedback given</div>
    )
    
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const handleGood = () => {
    setGood(good + 1);
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };
  const handleBad = () => {
    setBad(bad + 1);
  };
  
  return (
    <div>
      <h3>Give feedback</h3>
      <Button onClick={handleGood} text="Good" />
      <Button onClick={handleNeutral} text="Neutral" />
      <Button onClick={handleBad} text="Bad" />
      <h3>Statistics</h3>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  );
};

export default App;
