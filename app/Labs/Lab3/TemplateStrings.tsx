export default function TemplateStrings() {
  const five = 5, six = 6;
  const result1 = `2 + 3 = ${2 + 3}`;
  const result2 = `${five} + ${six} = ${five + six}`;
  const greeting = (name: string) => `Welcome ${name}!`;
  return (
    <div id="wd-template-strings">
      <h4>Template Strings</h4>
      result1 = {result1}<br />
      result2 = {result2}<br />
      {greeting("Alice")}
      <hr />
    </div>
  );
}