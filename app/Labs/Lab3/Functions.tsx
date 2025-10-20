export default function Functions() {
  function add(a: number, b: number) {
    return a + b;
  }
  function subtract(a: number, b: number) {
    return a - b;
  }
  const a = 2, b = 3;
  const twoPlusThree = add(a, b);
  const threeMinusOne = subtract(3, 1);
  return (
    <div id="wd-functions">
      <h4>Functions</h4>
      a = {a}, b = {b}<br />
      add(a, b) = {twoPlusThree}<br />
      subtract(3, 1) = {threeMinusOne}
      <hr />
    </div>
  );
}
