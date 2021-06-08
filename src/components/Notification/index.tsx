import React, { useState, useEffect } from "react";
import "./style.css";

interface Props {
  notifyList: any;
  position: string;
  autoDelete: boolean;
  removeNotification: any;
}

const Notification: React.FC<Props> = ({
  notifyList,
  position,
  autoDelete,
  removeNotification,
}) => {
  const [list, setList] = useState(notifyList);

  useEffect(() => {
    setList(notifyList);
  }, [notifyList]);

  // Auto remove the notification
  useEffect(() => {
    const interval = setInterval(() => {
      if (autoDelete && notifyList.length && list.length) {
        deleteNotify(notifyList[0].id);
      }
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [notifyList, list]);

  // Check notification's type
  const handleNotifyType = (type: string) => {
    switch (type) {
      case "Success":
        return "#5cb85c";
      case "Error":
        return "#d9534f";
      default:
        return "#5bc0de";
    }
  };

  // Delete notification by manual
  const deleteNotify = (id: number) => {
    const index = list.findIndex((el: any) => el.id === id);
    list.splice(index, 1);
    removeNotification(id);
    setList([...list]);
  };

  return (
    <div className={`notification-container ${position}`}>
      {list.map((notify: any, i: number) => (
        <div
          key={i}
          className={`notification ${position}`}
          style={{ backgroundColor: handleNotifyType(notify.type) }}
        >
          <span className="closebtn" onClick={() => deleteNotify(notify.id)}>
            &times;
          </span>
          {notify.message}
        </div>
      ))}
    </div>
  );
};

export default Notification;
