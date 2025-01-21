// TypeScript Synchronous Patterns

// 1. Simple Function Execution
// Functions in JavaScript and TypeScript are synchronous by default.
function simpleFunction() {
  console.log("Start of simpleFunction");
  console.log("Processing in simpleFunction");
  console.log("End of simpleFunction");
}
simpleFunction();

// 2. Function with Return Values
// Functions can return values, and execution proceeds in a linear manner.
function add(a: number, b: number): number {
  console.log(`Adding ${a} and ${b}`);
  return a + b;
}
const result = add(3, 4);
console.log(`Result: ${result}`);

// 3. Nested Function Calls
// Nested function calls execute from the innermost to the outermost.
function multiply(a: number, b: number): number {
  console.log(`Multiplying ${a} and ${b}`);
  return a * b;
}
const nestedResult = add(multiply(2, 3), 4); // multiply executes first, then add
console.log(`Nested Result: ${nestedResult}`);

// 4. Loop Execution
// Loops in TypeScript are synchronous and block the thread until completed.
function countToFive() {
  for (let i = 1; i <= 5; i++) {
    console.log(`Counting: ${i}`);
  }
}
countToFive();

// 5. Array Iteration with forEach
// Array methods like forEach execute synchronously.
const numbers = [1, 2, 3, 4, 5];
numbers.forEach((num) => {
  console.log(`Processing number: ${num}`);
});

// 6. Error Handling in Synchronous Code
// Use try-catch to handle errors in synchronous code.
function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error("Division by zero is not allowed.");
  }
  return a / b;
}
try {
  const divisionResult = divide(10, 2);
  console.log(`Division Result: ${divisionResult}`);
} catch (error) {
  console.error(`Error: ${(error as Error).message}`);
}

// 7. Recursion
// Functions can call themselves to solve problems recursively.
function factorial(n: number): number {
  if (n <= 1) return 1; // Base case
  return n * factorial(n - 1); // Recursive call
}
const factorialResult = factorial(5);
console.log(`Factorial of 5: ${factorialResult}`);

// 8. Sequential Function Calls
// Functions can be called sequentially, one after the other.
function first() {
  console.log("First function executed.");
}
function second() {
  console.log("Second function executed.");
}
function third() {
  console.log("Third function executed.");
}
first();
second();
third();

// 9. Blocking the Main Thread (Simulated Heavy Computation)
// Synchronous code that takes a long time can block the main thread.
function heavyComputation() {
  console.log("Starting heavy computation...");
  let sum = 0;
  for (let i = 0; i < 1e7; i++) {
    sum += i;
  }
  console.log(`Heavy computation result: ${sum}`);
}
heavyComputation();

// 10. Using Generators for Controlled Execution
// Generators allow pausing and resuming execution manually.
function* controlledExecution() {
  console.log("Step 1");
  yield;
  console.log("Step 2");
  yield;
  console.log("Step 3");
}
const generator = controlledExecution();
generator.next(); // Step 1
console.log("Paused execution");
generator.next(); // Step 2
generator.next(); // Step 3

// End of File
console.log("Synchronous processing examples complete.");
