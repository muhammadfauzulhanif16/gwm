export const GetRandomColors = (count) => {
  let colors = [
    // "red",
    "pink",
    "grape",
    "violet",
    "indigo",
    // "blue",
    "cyan",
    "teal",
    // "green",
    "lime",
    // "yellow",
    "orange",
  ];

  let result = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * colors.length);
    result.push(colors[randomIndex]);
    colors = colors.filter((color, index) => index !== randomIndex); // remove the selected color from the array
  }

  return result;
};
