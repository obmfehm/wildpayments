export default function formatDate(dateString: string) {
  const dateObject = new Date(dateString);
  const formattedDate = `${dateObject.getDate().toString().padStart(2, "0")}-${(
    dateObject.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${dateObject.getFullYear()}`;

  const formattedTime = `${dateObject.getHours()}:${dateObject
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  return `${formattedDate} ${formattedTime}`;
}
