// Spread Operator ES6 - JavaScript

// 1 העתקת מערך
const phones = ["galaxy", "iphone", "oneplus"];
// const phones2 = phones;
// phones2.push("xiaomi");
// console.log(phones);
const newArray = [...phones];
newArray.push("xiaomi");
// console.log(newArray);
// console.log(phones2);

// 2 שרשור מערכים
const tablets = ["ipad", "phablet", "note"];
// const electricProducts = phones.concat(tablets);
const electricProducts = [...phones, ...tablets];
// console.log(electricProducts);

// 3 פריסת אלמנטים במערך עם אלמנטים
const allPhones = ["nokia", "motorola", ...phones];
// console.log(allPhones);

// 4 פריסת אלמנטים בקריאה לפונקציות
const getTablets = (t1, t2, t3) => {
  console.log(`Tablets: ${t1}, ${t2}, ${t3}`);
};

// getTablets(...tablets);

// 5 פריסת אובייקטים
const obj1 = { id: 982, name: "Eden" };
const obj2 = { age: 25, location: "Israel" };

const employee = { ...obj1, ...obj2 };
// console.log(employee);

// 6 שימושים נפוצים

const prices = [10, 982, 176, 7, 57, 96];
const minPrice = Math.max(...prices);

// console.log(minPrice);

const alphabets = ["a", "b", "c", ..."def", "g", "h"];
console.log(alphabets);
