const getInitials = (name: string): string => {
  const [lastName, ...rest] = name.split(" ").reverse();

  const initials = rest.reverse().map((segment) => {
    return segment.slice(0, 1) + ".";
  });

  return initials.join("") + lastName;
};

export default getInitials;
