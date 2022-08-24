function formatDateDdMmYyyy(date) {
  const convertDateNow = new Date(date);

  return convertDateNow.toLocaleDateString();
}

// ----- format date to YYYY-MM-DD starts -------
const formatDataYyMmDd = (date) => {
  let yourDate = new Date(date);
  const offset = yourDate.getTimezoneOffset();
  return (yourDate = new Date(yourDate.getTime() - offset * 60 * 1000)
    .toISOString()
    .split("T")[0]);
};
// ----- format date to YYYY-MM-DD ends -------
export { formatDateDdMmYyyy, formatDataYyMmDd };
