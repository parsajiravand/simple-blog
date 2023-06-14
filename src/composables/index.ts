export const transcute = (str: string, length = 20) => {
  return str.length > length ? str.slice(0, length) + "..." : str;
};

export const dateFormat = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
