const MarkService = require("../service/MarkService");

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