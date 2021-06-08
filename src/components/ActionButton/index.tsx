import React from "react";
import "./style.css";

interface Props {
  actionList: any;
  currentShowing: string;
}

const ActionButton: React.FC<Props> = ({ actionList, currentShowing }) => {
  return (
    <div className="action-button">
      {actionList?.length > 0 &&
        actionList.map((item: any, index: number) => {
          return (
            <button
              className={
                item.value === currentShowing ? "action-button__active" : ""
              }
              key={index}
              onClick={item.action}
              disabled={item.isDisabled}
              title={item.tooltip}
            >
              {item.value}
            </button>
          );
        })}
    </div>
  );
};

export default ActionButton;
