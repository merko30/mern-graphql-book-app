const capitalize = (word: string): string => {
  if (word.split(" ").length > 1) {
    return word
      .split(" ")
      .map((w) => `${w[0].toUpperCase()}${w.slice(1).toLowerCase()}`)
      .join(" ");
  }

  return `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`;
};

export default capitalize;
