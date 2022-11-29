import { formatDistanceToNow, parseISO } from "date-fns";

export const formatDistance = (date) => {
  return formatDistanceToNow(parseISO(date));
}