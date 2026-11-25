import { useEffect } from "react";
import { useNotification, useNotificationControls } from "../store";

function Notification() {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };
  const notification = useNotification();
  const { clearNotification } = useNotificationControls();

  useEffect(() => {
    if (!notification) return;
    const timer = window.setTimeout(() => {
      clearNotification();
    }, 5000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [notification, clearNotification]);

  if (!notification) return;

  return (
    <div style={style} data-testid="notification">
      {notification.message}
    </div>
  );
}

export default Notification;
