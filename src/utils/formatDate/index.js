const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

export const formatDate = (createdAt) => {
  const date = new Date(createdAt);
  const monthIndex = date.getMonth();
  const month = months[monthIndex];
  const year = date.getFullYear();
  const day = date.getDate();

  return `${month} ${day}, ${year}`;
};

export const sortDateLatest = (comments) => {
  const sorted = comments.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return sorted;
};
