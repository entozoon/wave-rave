const R = require("ramda");
const { complement, both, either, pipe, filter, map, find } = R;

const isEven = x => x % 2 === 0;

let _;

//
// View these learndings here, no need to run:
//
console.log(
  "forEach, map, filter, etc are all ramda functions as well as ES6\n",
  "Best to use the ramda functions rather than mixing - they promote simplicity and immutability https://github.com/ramda/ramda/issues/2404"
);

console.log(
  "\n find() is like filter(), but the first result",
  [1, 2, 3, 4].find(isEven), // 2
  find(isEven, [1, 2, 3, 4])
); // rambda styl e**

console.log(
  "\n complement() returns the opposite of a given function",
  [1, 2, 3, 4].filter(isEven), // 2, 4
  [1, 2, 3, 4].filter(complement(isEven)), // 1, 3
  filter(complement(isEven), [1, 2, 3, 4]) // ramda style **
);
// i.e.
// const isOdd = x => !isEven(x);
const isOdd = complement(isEven);

console.log(
  "\n both() is a functional equivalent of &&, and either() for || - which are for values"
);
const isOver18 = person => person.age > 18;
const isCitizen = person => person.country === "UK";
// const isEligibleToVote = person => isOver18(person) && isCitizen(person);
const isEligibleToVote = both(isOver18, isCitizen);
console.log(
  "allPass() and anyPass() are the same but for an array of functions"
);

console.log("\n pipe() let's you run a bunch of functions sequentially");
const multiply = (a, b) => a * b;
const addOne = x => x + 1;
const square = x => x * x;

const operations = pipe(
  multiply, // only first function can take multiple args!
  addOne,
  square
);
console.log(operations(2, 3));

console.log(
  "\n compose() is the same as pipe() but the opposite order #dontBother"
);

// Higher order function, returning a function based on given year
const publishedInYear = year => book => book.year === year;
// Which you'd run like
// publishedInYear(2019)('asimov');

// Using a higher order function as a filter (kinda bollocking my mind)
const titlesForYear = (books, year) => {
  // const selected = books.filter(publishedInYear(year));
  const selected = filter(publishedInYear(year), books);

  return map(book => book.title, selected);
};
