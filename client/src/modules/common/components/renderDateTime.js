import moment from "moment";
export const DATATIME_FORMAT = "HH:mm DD/MM/YYYY";

export const renderDateTime = (time) => {
    return time ? moment(time).format(DATATIME_FORMAT) : "";
};