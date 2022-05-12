import flatpickr from "flatpickr";
export const initDatePicker = () => {
  flatpickr(".datepicker", {
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "m-d-Y",

    // minDate: "today",
  });
};

const initTimePicker = () => {
  flatpickr(".timepicker", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "h:i K",
    minuteIncrement: 30,
  });
};

const initAllDatePicker = () => {
  flatpickr(".datepicker", {
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "m-d-Y",
  });
};

export const FlatpickrInit = () => {
  initDatePicker();
  initTimePicker();
};

export const FlatpickrAllDateInit = () => {
  initAllDatePicker();
  initTimePicker();
};
