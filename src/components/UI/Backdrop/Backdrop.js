import React from 'react';
import classes from './Backdrop.module.css';
import ReactDOM from "react-dom";

const backdropRoot = document.getElementById('backdrop-root');

const Backdrop = (props) => {
    return ReactDOM.createPortal(<div
        {...props} //这里展开，这样后面设置什么属性都会自动应用到div上
        className={`${classes.Backdrop} ${props.className}`}>
        {props.children}
    </div>, backdropRoot);
};

export default Backdrop;
