export const Trime = (text: string) => {
  if (text.length > 10) {
    let minifytext = text.slice(0, 8);
    return `${minifytext}...`;
  } else {
    return text;
  }
};
