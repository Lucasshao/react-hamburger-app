// import { keyboard } from "@testing-library/user-event/dist/keyboard";
import React, { useReducer, useState } from "react";
import FilterMeals from "./components/FilterMeals/FilterMeals";
import Meals from "./components/Meals/Meals";
import CartContext from "./store/cart-context";
import Cart from "./components/Cart/Cart";

// 模拟一组食物数据
const MEALS_DATA = [
  {
    id: "1",
    title: "Hamburger",
    desc: "100% pure beef paired with crisp pickles and onions and delicious tomato sauce, the classic taste makes you irresistible!",
    price: 12,
    img: "/img/meals/1.png",
  },
  {
    id: "2",
    title: "Double Cheeseburger",
    desc: "100% pure beef and double-layer fragrant soft cheese, plus soft bread and delicious sauce, the temptation is irresistible!",
    price: 20,
    img: "/img/meals/2.png",
  },
  {
    id: "3",
    title: "Big Mac",
    desc: "Two pieces of 100% pure beef, with lettuce, onion and other fresh ingredients, rich in taste and extremely delicious!",
    price: 24,
    img: "/img/meals/3.png",
  },
  {
    id: "4",
    title: "Spicy Chicken Burger",
    desc: "Golden crispy and spicy skin, tender and smooth chicken thigh meat, multiple flavors, to impress your discerning taste buds at once!",
    price: 21,
    img: "/img/meals/4.png",
  },
  {
    id: "5",
    title: "Grilled Chicken Drumstick Burger",
    desc: "The original boneless chicken steak is tender and juicy, paired with green fresh lettuce and fragrant roast chicken sauce, the taste is rich!",
    price: 22,
    img: "/img/meals/5.png",
  },
  {
    id: "6",
    title: "McSpicy Chicken",
    desc: "Crisp and refreshing lettuce, golden and crispy chicken. Nutritious combination, delicious healthy choice!",
    price: 14,
    img: "/img/meals/6.png",
  },
  {
    id: "7",
    title: "Cheeseburger",
    desc: "百分百纯牛肉与香软芝士融为一体配合美味番茄醬丰富口感一咬即刻涌现！",
    price: 12,
    img: "/img/meals/7.png",
  },
];

// 定义cartReducer
const cartReducer = (state, action) => {
  // 复制购物车
  const newCart = { ...state };

  switch (action.type) {
    default:
      return state;
    case "ADD":
      if (newCart.items.indexOf(action.meal) === -1) {
        newCart.items.push(action.meal);
        action.meal.amount = 1;
      } else {
        action.meal.amount += 1;
      }
      newCart.totalAmount += 1;
      newCart.totalPrice += action.meal.price;
      return newCart;
    case "REMOVE":
      action.meal.amount -= 1;
      if (action.meal.amount === 0) {
        newCart.items.splice(newCart.items.indexOf(action.meal), 1);
      }
      newCart.totalAmount -= 1;
      newCart.totalPrice -= action.meal.price;
      return newCart;
    case 'CLEAR':
      newCart.items.forEach((item) => delete item.amount);
      newCart.items = [];
      newCart.totalAmount = 0;
      newCart.totalPrice = 0;
      return newCart;
  }
};

const App = () => {
  // 创建一个state用来存储食物列表
  const [mealsData, setMealsData] = useState(MEALS_DATA);

  // 创建一个state，用来存储购物车的数据
  /*
   *   1.商品 [] items
   *   2.商品总数（totalAmount）
   *   3.商品总价（totalPrice）
   * */
  // const [cartData, setCartData] = useState({
  //   items: [],
  //   totalAmount: 0,
  //   totalPrice: 0,
  // });

  const [cartData, cartDispatch] = useReducer(cartReducer, {
    items: [],
    totalAmount: 0,
    totalPrice: 0,
  });

  // 创建一个过滤meals的函数
  const filterHandler = (keyword) => {
    const newMealsData = MEALS_DATA.filter(
      (item) => item.title.indexOf(keyword) !== -1
    );
    // 1，过滤整个DATA；2，根据名字.title过滤；3，直接indexOf；4，不等于-1就是有keyword
    setMealsData(newMealsData);
  };

  // 向购物车中添加商品
  // const addItem = (meal) => {
  //   // meal 要添加进购物车的商品
  //   // 对购物车进行复制
  //   const newCart = { ...cartData };

  //   // 判断购物车中是否存在该商品
  //   if (newCart.items.indexOf(meal) === -1) {
  //     // 将meal添加到购物车中
  //     newCart.items.push(meal);
  //     // 修改商品的数量
  //     meal.amount = 1;
  //   } else {
  //     // 增加商品的数量
  //     meal.amount += 1;
  //   }

  //   // 增加总数
  //   newCart.totalAmount += 1;
  //   // 增加总金额
  //   newCart.totalPrice += meal.price;

  //   // 重新设置购物车
  //   setCartData(newCart);
  // };

  //减少商品的数量
  // const removeItem = (meal) => {
  //   // 复制购物车
  //   const newCart = { ...cartData };

  //   // 减少商品的数量
  //   meal.amount -= 1;

  //   // 检查商品数量是否归0
  //   if (meal.amount === 0) {
  //     // 从购物车中移除商品
  //     newCart.items.splice(newCart.items.indexOf(meal), 1);
  //   }

  //   // 修改商品总数和总金额
  //   newCart.totalAmount -= 1;
  //   newCart.totalPrice -= meal.price;

  //   // setCartData(newCart);
  // };

  // const clearCart = () => {
  //   const newCart = { ...cartData };
  //   // 将购物车中商品的数量清0
  //   newCart.items.forEach((item) => delete item.amount);
  //   newCart.items = [];
  //   newCart.totalAmount = 0;
  //   newCart.totalPrice = 0;

  //   // setCartData(newCart);
  // };

  return (
    <CartContext.Provider value={{ ...cartData, cartDispatch }}>
      <div>
        {/* 用onFilter传 */}
        <FilterMeals onFilter={filterHandler} />
        <Meals mealsData={mealsData} />
        <Cart />
      </div>
    </CartContext.Provider>
  );
};

export default App;
