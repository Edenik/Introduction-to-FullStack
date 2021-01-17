const arr = ['Hello' , 'friends', 'im', 'your', 'tutor','your', 'tutor'];
console.log(arr)
const string = arr.join().replaceAll(',' , ' ');
console.log(string)
const newArr = string.split(' ');
console.log(newArr)
const newTutor = string.replace('your tutor' , 'Eden Nahum')
console.log(newTutor)
