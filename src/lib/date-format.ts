const TARGET_24_HOURS = "24 hours";

const getOrdinalSuffix = (day: number): string => {
  if (day % 10 === 1 && day !== 11) return "st";
  if (day % 10 === 2 && day !== 12) return "nd";
  if (day % 10 === 3 && day !== 13) return "rd";
  return "th";
};

export const formatChartTickLabel = (time: string, timeFrame: string): string => {
  const date = new Date(time);
  if (Number.isNaN(date.getTime())) return "";

  if (timeFrame === TARGET_24_HOURS) {
    const timeLabel = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return timeLabel;
  }

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export const formatChartTooltipLabel = (time: string, timeFrame: string): string => {
  const date = new Date(time);
  if (Number.isNaN(date.getTime())) return "";

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const suffix = getOrdinalSuffix(day);
  const baseLabel = `${day}${suffix} ${month}, ${date.getFullYear()}`;

  if (timeFrame === TARGET_24_HOURS) {
    const timeLabel = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return `${timeLabel}\n${baseLabel}`;
  }

  return baseLabel;
};

export const formatDateRangeLabel = (start: string, end: string): string => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return "";
  }

  const formatSingleDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const suffix = getOrdinalSuffix(day);
    return `${day}${suffix} ${month}`;
  };

  return `${formatSingleDate(startDate)} - ${formatSingleDate(endDate)}`;
};
