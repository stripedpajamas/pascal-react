export function pascal(lines) {
  let currentLine = [1]; // initial line
  const complete = [];
  const createLine = (el, i) => {
    const father = typeof currentLine[i - 1] === 'undefined' ? 0 : currentLine[i - 1];
    const mother = typeof currentLine[i] === 'undefined' ? 0 : currentLine[i];
    return father + mother;
  };
  while (currentLine.length <= lines) {
    complete.push(currentLine);
    const newLine = new Array(currentLine.length + 1).fill(0);
    currentLine = newLine.map(createLine);
  }
  return complete;
}

export function prepareToDraw(arr) {
  const output = [];
  arr.forEach((line) => {
    const newLine = [];
    line.forEach((el, i) => {
      newLine.push(el);
      if (i !== line.length - 1) newLine.push(0);
    });
    output.push(newLine);
  });
  return output;
}