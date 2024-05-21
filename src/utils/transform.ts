export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const formatDateWithDay = (date: Date): string => {
  // Define options for day and month formatting
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "short",
    day: "numeric",
  };

  // Get formatted date string
  const formattedDate = date.toLocaleDateString("en-US", options).toUpperCase();

  return formattedDate;
};

export const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat("default", {
    hour12: true,
    hour: "2-digit",
    minute: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
};
