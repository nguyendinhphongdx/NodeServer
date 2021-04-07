const MarkService = require("../service/MarkService");
const { getDaysInMonth, getDaysInString } = require("./middleFunct");

exports.countMarkAvgStudent=(student)=>{
    console.log('in  Count Student');
    var markClass =0;
    if(student.mark.length==0){
        return  {
            name:student.name,
            mark:0,
        };
    }else{
        const subjects = student.mark;
        subjects.forEach(subject=>{
            markClass+=Number(MarkService.avgMark(subject));
        })
        markClass=Number(markClass/subjects.length).toFixed(2);
    }
    return {
        name:student.name,
        mark:markClass,
    }
};
exports.getScheduleClass=(_class,length)=>{
    var result = [];
    const year = new Date().getFullYear();
    const month =new Date().getMonth();
    const datesInMonth = getDaysInMonth(month,year);
    const date1 = getDaysInString(_class.schedule1.day);
    const hourStart1 = new Date(_class.schedule1.startTime).getHours();
    const minuteStart1 = new Date(_class.schedule1.startTime).getMinutes();
    const hourEnd1 = new Date(_class.schedule1.endTime).getHours();
    const minuteEnd1 = new Date(_class.schedule1.endTime).getMinutes();
    const schedule1InMonth = datesInMonth.filter(item=>item.day===date1);
    schedule1InMonth.forEach(item=>{
        result.push({
            Id:length,
            Subject:_class.name,
            day:_class.schedule1.day,
            StartTime: new Date(year,month,item.date,hourStart1,minuteStart1),
            EndTime: new Date(year,month,item.date,hourEnd1,minuteEnd1),
            title:_class.subject[0].name,
            type:1,
        })
        length++;
    })
    const date2 = getDaysInString(_class.schedule2.day);
    const hourStart2 = new Date(_class.schedule2.startTime).getHours();
    const minuteStart2 = new Date(_class.schedule2.startTime).getMinutes();
    const hourEnd2 = new Date(_class.schedule2.endTime).getHours();
    const minuteEnd2 = new Date(_class.schedule2.endTime).getMinutes();
    const schedule2InMonth = datesInMonth.filter(item=>item.day===date2);
    schedule2InMonth.forEach(item=>{
        result.push({
            Id:length,
            Subject:_class.name,
            day:_class.schedule2.day,
            StartTime: new Date(year,month,item.date,hourStart2,minuteStart2),
            EndTime: new Date(year,month,item.date,hourEnd2,minuteEnd2),
            title:_class.subject[0].name,
            type:2,
        })
        length++;
    })
    return result;
}