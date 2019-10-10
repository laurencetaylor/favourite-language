# Favourite Language

A little website which makes a guess of a user's favourite language using the GitHub API and Axios.

![App Screenshot](./src/imgs/app-screenshot.png)

## How to Run

1. [Hosted online](http://inconclusive-income.surge.sh/), alternatively:
2. Clone this repository
3. Install [node.js](https://nodejs.org/en/) and run `npm install` in the command line to install dependencies
4. Open index.html

To run test, enter `npm test` from the root directory.

![Tests Screenshot](./src/imgs/tests-screenshot.png)

## Approach

- MVC architecture (src/favouriteLanguage.js, index.html, interface.js)
- Tried to follow OOP principles as much as possible
- TDD -> red, green, refactor. Mocked API calls using Jest's `#mockImplementation` methods.
- Refactored at other stages where I felt it was appropriate

## Thoughts/ Next Steps

- I feel there are opportunities to refactor src/favouriteLanguage.js. Not 100% on the use of constants here nor how verbose the calculateMostFrequentLanguages method is.
- I tried to get a more accurate picture of a user's favourite language with commit count/ number of bytes of each language. Quickly hit the API rate limit in this way though, so user authentication would be required. Could be worth considering in future.
- Used Browserify to enable node imports in the browser. Believe Babel could also be used with imports/ exports?
- There may be an in-built method for looping tests within Jest.
- Could use some kind of framework here instead of the current very simple frontend.
