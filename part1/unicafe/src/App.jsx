import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
  let total = good + neutral + bad;
  let average = total ? (good - bad) / total : 0;
  let positive = total ? (good / total) * 100 : 0;

  return total === 0 ? (
    <div>
      <p>No feedback given</p>
    </div>
  ) : (
    <div>
      <h2>Statistics</h2>
      <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} isPercentage={true} />
      </table>
    </div>
  );
};

const StatisticLine = ({ text, value, isPercentage }) => (
  <>
    <tr>
      <td>{text}</td>
      <td>{isPercentage ? `${value.toFixed(1)}%` : value}</td>
    </tr>
  </>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onGoodClick = () => setGood(good + 1);

  const onNeutralClick = () => setNeutral(neutral + 1);

  const onBadClick = () => setBad(bad + 1);

  return (
    <>
      <div>
        <h1>Give Feedback</h1>
      </div>
      <div>
        <button type="button" onClick={onGoodClick}>
          good
        </button>
        <button type="button" onClick={onNeutralClick}>
          neutral
        </button>
        <button type="button" onClick={onBadClick}>
          bad
        </button>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
