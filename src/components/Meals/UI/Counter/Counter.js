import React, { useContext } from "react";
import classes from "./Counter.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import CartContext from "../../../../store/cart-context";

/*
*   引入FontAwesome
*       - 安装依赖
*           npm i --save @fortawesome/fontawesome-svg-core svg支持
            npm i --save @fortawesome/free-solid-svg-icons
            npm i --save @fortawesome/free-regular-svg-icons 这两个是具体的图标
            npm i --save @fortawesome/react-fontawesome@latest React的模块

            yarn add @fortawesome/react-fontawesome@latest @fortawesome/free-regular-svg-icons @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons

        - 引入组件
               import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
        - 引入图标
                import {faPlus} from "@fortawesome/free-solid-svg-icons";
        - 使用组件
                <FontAwesomeIcon icon={faPlus}/>
*
* */

// 计数器的组件
export default function Counter(props) {
  
  // 获取cartContext
  const ctx = useContext(CartContext)
  // console.log(ctx);

  // 添加购物车的函数
  const addButtonHandler = () => {
    // props.onAdd(props.meal); //onAdd里面需要一个参数，把meal作为参数传到onAdd里
    ctx.addItem(props.meal)
  };

  // 删除食物的函数
  const subButtonHandler = () => {
    // props.onSub(props.meal);
    ctx.removeItem(props.meal)
  };

  return (
    <div className={classes.Counter}>
      {/* 三元运算判断amount有没有，是否等于0（0返回的是false，就打印出0了）, + 的按钮一定有的，—按钮和数量才需要判断 */}
      {props.meal.amount && props.meal.amount !== 0 ? (
        <>
          <button onClick={subButtonHandler} className={classes.Sub}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <span className={classes.count}>{props.meal.amount}</span>
        </>
      ) : null}
      <button onClick={addButtonHandler} className={classes.Add}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
}
