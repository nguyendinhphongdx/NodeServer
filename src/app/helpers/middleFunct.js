exports.getDaysInMonth=(month, year) =>{
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      days.push({date:new Date(date).getDate(),day:new Date(date).getDay()+1});
      date.setDate(date.getDate() + 1);
    }
    return days;
  }
exports.getDaysInString=(string)=> {
    const arr = ['1','2','3','4','5','6','7','8']
    var result = 0;
    arr.forEach(item =>{
        if(string.includes(item)){
            console.log(item);
            result =  Number(item)
        }
    })
    return result
}
