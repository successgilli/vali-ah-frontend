import sum from "./sample";

it("should pass", () => {
  expect(true).toEqual(true);
});

it("should add two numbers", () => {
  const result = sum(2, 2);
  expect(result).toEqual(4);
});
