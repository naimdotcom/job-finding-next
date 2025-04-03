import moment from "moment";

export const fromNow = (date: string) => {
  return moment(date).fromNow();
};

export const format = (date: string) => {
  return moment(date).format("DD/MM/YYYY");
};
