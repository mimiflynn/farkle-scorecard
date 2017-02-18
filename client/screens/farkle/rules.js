import React from 'react';

const rules = () => (
  <div className="container">
    <h2>Who Goes First</h2>
    <p>Each player rolls one die, with the highest roll going first. In the event of a tie, the players who tied for the highest roll roll again. Once the first player is decided, play continues to the left.</p>
    <h2>Getting on the Board</h2>
    <p>Before points can be counted for any player, they must first &quot;get on the board&quot; by rolling at least 500 points in a turn. A player cannot &quot;farkle&quot; until they are on the board. Some believe that it is &quot;more fun&quot; to push the number of points needed to get on the scoreboard to 750 or even 1000, so, keep that in mind, if you want to have &quot;more fun&quot;.</p>
    <h2>Rolling in a Turn</h2>
    <p>To start a turn, roll all six dice. Set aside any dice that are worth points and roll the remaining dice. If you roll and no dice are worth any points, your turn is over. Continue rolling and setting aside scoring dice, adding the score to your total If all six dice are scoring dice, you may roll all six and add the subsequent points to your running total. Keep rolling until you feel you are pressing your luck and have the scorekeeper record your score. </p>
    <p>If a die were to roll off the table or in some other awkward out of play kind of area, re-roll that die.</p>
    <p>A player does not have to set aside all scoring dice in a roll, just at least one.</p>
    <h2>Farkling</h2>
    <p>Let&apos;s say that a player feels don&apos;t want to push their luck and want to record their score and end their turn. This player has a few dice remaining to roll. If the next player is on the board, they can decide roll the remaining dice from the previous player. If they gain points in that roll, they can then add those points to the score the previous player ended on.</p>
    <h2>Winning the Game</h2>
    <p>The first player to get 10,000 points wins only after each other player has a chance to beat their score in one last turn. If someone beats the original winner, each player has another chance to beat the new winner.</p>
  </div>
);

export default rules;
