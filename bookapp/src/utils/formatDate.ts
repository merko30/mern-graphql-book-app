const formatDate = (date: string): string => {
  const dateObject = new Date(date);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${months[dateObject.getMonth()]} ${dateObject.getFullYear()}`;
};

export default formatDate;
