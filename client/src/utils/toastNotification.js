import { notification } from "antd";

export const toastNotification = (type, body) => {
  switch (type) {
    case "error":
      return notification.error({
        message: "Error",
        description: body,
        duration: 5,
      });
    case "success":
      return notification.success({
        message: "Success",
        description: body,
        duration: 5,
      });
    case "warn":
      return notification.warn({
        message: "Warn",
        description: body,
        duration: 5,
      });
    default:
      return notification.info({
        message: "Info",
        description: "Oops!, Something went wrong.",
        duration: 5,
      });
  }
};
