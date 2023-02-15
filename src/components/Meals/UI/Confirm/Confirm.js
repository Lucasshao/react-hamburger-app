import React from "react";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Confirm.module.css";

const Confirm = (props) => {
  return (
    <Backdrop onClick={props.onCancel} className={classes.ConfirmOuter}>
      <div className={classes.Confirm}>
        <p className={classes.ConfirmText}>{props.confirmText}</p>

        <div>
          <button
            // 这里写e是为了从父获取事件对象，然后把事件传到这里后面
            onClick={(e) => {
              props.onCancel(e);
            }}
            className={classes.Cancel}
          >
            Cancel
          </button>
          <button
            onClick={(e) => {
              props.onOk(e);
            }}
            className={classes.Ok}
          >
            Confirm
          </button>
        </div>
      </div>
    </Backdrop>
  );
};

export default Confirm;
