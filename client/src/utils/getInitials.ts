const getInitials = (name: string) => {
  const [lastName, ...rest] = name.split(" ").reverse();

  const initials = rest.reverse().map((name) => {
    return name.slice(0, 1) + ".";
  });

  return initials.join("") + lastName;
};

export default getInitials;
