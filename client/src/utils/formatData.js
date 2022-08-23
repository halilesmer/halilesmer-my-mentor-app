function formatDate(date) {
  const convertDateNow = new Date(date);

  return convertDateNow.toLocaleDateString();
}

export { formatDate };
