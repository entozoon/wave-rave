import { pixi } from "./engines/Pixi";
import Stage from "./stages/Stage";
// import Time from "engines/Time";
const letsDoThis = async () => {
  // await pixi.create();
  const stageTest = await new Stage();
  await stageTest.loop();
};
letsDoThis();

//
//
//
// Oh shit this is like, lost gold. I should learn it up into the game
//
//
//
// const R = require("ramda");
// const { complement, both, either, pipe, filter, map, find, curry, __ } = R;

// const isEven = x => x % 2 === 0;

// //
// // View these learndings here, no need to run:
// //
// console.log(
//   "forEach, map, filter, etc are all ramda functions as well as ES6\n",
//   "Best to use the ramda functions rather than mixing - they promote simplicity and immutability https://github.com/ramda/ramda/issues/2404"
// );

// console.log(
//   "\n find() is like filter(), but the first result",
//   [1, 2, 3, 4].find(isEven), // 2
//   find(isEven, [1, 2, 3, 4])
// ); // rambda styl e**

// console.log(
//   "\n complement() returns the opposite of a given function",
//   [1, 2, 3, 4].filter(isEven), // 2, 4
//   [1, 2, 3, 4].filter(complement(isEven)), // 1, 3
//   filter(complement(isEven), [1, 2, 3, 4]) // ramda style **
// );
// // i.e.
// // const isOdd = x => !isEven(x);
// const isOdd = complement(isEven);

// console.log(
//   "\n both() is a functional equivalent of &&, and either() for || - which are for values"
// );
// const isOver18 = person => person.age > 18;
// const isCitizen = person => person.country === "UK";
// // const isEligibleToVote = person => isOver18(person) && isCitizen(person);
// const isEligibleToVote = both(isOver18, isCitizen);
// console.log(
//   "allPass() and anyPass() are the same but for an array of functions"
// );

// console.log("\n pipe() let's you run a bunch of functions sequentially");
// const multiply = (a, b) => a * b;
// const addOne = x => x + 1;
// const square = x => x * x;

// const operations = pipe(
//   multiply, // only first function can take multiple args!
//   addOne,
//   square
// );
// console.log(operations(2, 3));

// console.log(
//   "\n compose() is the same as pipe() but the opposite order #dontBother"
// );

// // Higher order function, returning a function based on given year
// const publishedInYear = year => book => book.year === year;
// // Which you'd run like
// // publishedInYear(2019)('asimov');
// // But isn't very readable. You can use partial or partialRight(publishedInYear, [2019]), book)

// // Using a higher order function as a filter (kinda bollocking my mind)
// const titlesForYear = (books, year) => {
//   // const selected = books.filter(publishedInYear(year));
//   const selected = filter(publishedInYear(year), books);

//   return map(book => book.title, selected);
// };

// console.log(
//   "\n Currying is a sequence of functions each with a single argument"
// );
// // const add = (a, b) => a + b; // no!
// const add = a => b => a + b;
// const adds = a => b => c => a + b + c;
// const minus = a => b => a - b;
// console.log(add(1)); // returns function where it adds 1
// console.log(add(1)(2)); // 3 (performing the addition)
// const bhuna = curry(adds);
// console.log("bhuna", bhuna(1)(2)(3)); // I'm not getting this.. same as using adds
// console.log("bhuna__", bhuna(1)(__)(3)); // I'm not getting this.. same as using adds

// const publishedInYear_ = curry((year, book) => book.year === year);
// // Or like, a curry is a function that you can pass the params in any order
// // publishedInYear(year)(book);
// // publishedInYear(book)(year); // right? maybe?

// const titlesForYear_ = (books, year) => {
//   const selected = filter(publishedInYear_(year), books);

//   return map(book => book.title, selected);
// };

// // Placeholders, oh boy
// const bakedChicken = chicken =>
//   chicken === "fresh chicken" ? "cooked chicken" : null;
// const coconutMilk = coconut =>
//   coconut === "fresh coconut" ? "coconut milk" : null;
// // console.log(bakedChicken("fresh chicken"));
// const korma = curry(
//   (bakedChicken, coconutMilk) =>
//     "korma curry! with " + bakedChicken + " " + coconutMilk
// );
// console.log(korma("fresh chicken")("bloop"));
// console.log(korma("bloop")("fresh chicken"));
// // console.log(korma("fresh chicken")("fresh coconut"));
