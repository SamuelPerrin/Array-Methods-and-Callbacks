import { fifaData } from './fifa.js';

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note, you may want to filter the data first 😉*/

//(a) Home Team name for 2014 world cup final
const final2014 = fifaData.filter(obj => obj.Year === 2014).filter(obj => obj.Stage === "Final")[0]
console.log(final2014["Home Team Name"])

//(b) Away Team name for 2014 world cup final
console.log(final2014["Away Team Name"])

//(c) Home Team goals for 2014 world cup final
console.log(final2014["Home Team Goals"])

//(d) Away Team goals for 2014 world cup final
console.log(final2014["Away Team Goals"])

//(e) Winner of 2014 world cup final */
console.log(final2014["Home Team Goals"] > final2014["Away Team Goals"] ? final2014["Home Team Name"] : final2014["Away Team Name"])


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive data as a parameter
2. Return an array of objects with the data of the teams that made it to the final stage

hint - you should be looking at the stage key inside of the objects
*/

function getFinals (data) {
   return data.filter(obj => obj.Stage === "Final")
}



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array
2. Receive a callback function getFinals from task 2 
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears (data, getFinals) {
    const years = getFinals(data).map(obj => obj.Year)
    return years
}



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receives an array
2. Receives the callback function getFinals from task 2 
3. Determines the winner (home or away) of each `finals` game. 
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners (data, getFinals) {
    const winners = getFinals(data).map(obj => obj["Home Team Goals"] > obj["Away Team Goals"] ? obj["Home Team Name"] : obj["Away Team Name"])
    return winners
}



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array
2. Receive a callback function getYears from task 3
3. Receive a callback function getWinners from task 4
4. Return an array of strings that say "In {year}, {country} won the world cup!" 

hint: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear (data, getYears, getWinners) {
    return getYears(data).map((year, index) => `In ${year}, ${getWinners(data)[index]} won the world cup!`)
}



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive the callback function getFinals from task 2 ensure you pass in the data as an argument
 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 (Hint: use .reduce and do this in 2 steps) 
 
 Example of invocation: getAverageGoals(getFinals(fifaData));
*/

function getAverageGoals (finals) {
    return (finals.reduce((a, b) => a + b["Home Team Goals"] + b["Away Team Goals"], 0) / finals.length).toFixed(2)
}

console.log(getAverageGoals(getFinals(fifaData)))


/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins (data,teamInitials) {
    const homeWins = data.filter(obj => obj["Home Team Initials"] === teamInitials).filter(obj => obj["Home Team Goals"] > obj["Away Team Goals"]).length;
    const awayWins = data.filter(obj => obj["Away Team Initials"] === teamInitials).filter(obj => obj["Away Team Goals"] > obj["Home Team Goals"]).length;
    return homeWins + awayWins
}



/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals (data) {
    // Get list of teams with WC appearances
    let teams = data.map(obj => obj["Home Team Name"]);
    teams.push(data.map(obj => obj["Away Team Name"]));
    teams = [...new Set(teams)];

    // Make an array of objects with each team's total WC goals, total WC games, and average num of goals per WC game
    let teamData = []
    for (let i = 0; i<teams.length; i++) {
        const homeGoals = data.filter(obj => obj["Home Team Name"] === teams[i]).reduce((a, b) => a+b["Home Team Goals"], 0);
        const awayGoals = data.filter(obj => obj["Away Team Name"] === teams[i]).reduce((a, b) => a+b["Away Team Goals"], 0);
        const homeGames = data.filter(obj => obj["Home Team Name"] === teams[i]).length;
        const awayGames = data.filter(obj => obj["Away Team Name"] === teams[i]).length;
        teamData.push({teamName: teams[i], totalGoals: homeGoals+awayGoals, totalGames: homeGames+awayGames, averageGoals: (homeGoals+awayGoals)/(homeGames+awayGames)});
    }

    // return the teamName of the object in teamData that has the highest average number of goals per game
    return teamData.sort((a,b) => b.averageGoals - a.averageGoals)[0].teamName
}

// console.log(getGoals(fifaData))

/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense (data) {
    // Get list of teams with WC appearances
    let teams = data.map(obj => obj["Home Team Name"]);
    teams.push(data.map(obj => obj["Away Team Name"]));
    teams = [...new Set(teams)];

    // Make an array of objects with each team's total WC goals, total WC games, and average num of goals per WC game
    let teamData = []
    for (let i = 0; i<teams.length; i++) {
        const homeGoalsAgainst = data.filter(obj => obj["Home Team Name"] === teams[i]).reduce((a, b) => a+b["Away Team Goals"], 0);
        const awayGoalsAgainst = data.filter(obj => obj["Away Team Name"] === teams[i]).reduce((a, b) => a+b["Home Team Goals"], 0);
        const homeGames = data.filter(obj => obj["Home Team Name"] === teams[i]).length;
        const awayGames = data.filter(obj => obj["Away Team Name"] === teams[i]).length;
        teamData.push({teamName: teams[i], totalGoalsAgainst: homeGoalsAgainst+awayGoalsAgainst, totalGames: homeGames+awayGames, averageGoalsAgainst: (homeGoalsAgainst+awayGoalsAgainst)/(homeGames+awayGames)});
    }

    // return the teamName of the object in teamData that has the highest average number of goals per game
    return teamData.sort((a,b) => b.averageGoalsAgainst - a.averageGoalsAgainst)[0].teamName
}

// console.log(badDefense(fifaData))


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
export default{
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
