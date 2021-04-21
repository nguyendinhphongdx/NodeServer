class MobileService{
    converTimeString(schedules){
       return  schedules.map(item=>{
           const start =new Date(item.StartTime);
           const end =new Date(item.EndTime);
           var options = { hour12: false };
            const startTimeFormat =start.toLocaleString('en-US',options);
            const endTimeFormat =end.toLocaleDateString('en-US',options);
            return{
                ...item,
                StartTime: startTimeFormat,
                EndTime: endTimeFormat
            }
        })
    }
    sortByTime(schedules){
        const scheduleInComming = schedules.filter(item =>{
            return new Date(item.StartTime).getTime() > new Date().getTime();
        })
        for (let index = 0; index < scheduleInComming.length-1; index++) {
            for(let i = index+1; i <scheduleInComming.length; i++){
                if(scheduleInComming[index].StartTime > scheduleInComming[i].StartTime){
                    const middle = scheduleInComming[index];
                    scheduleInComming[index]= scheduleInComming[i];
                    scheduleInComming[i]=middle;
                }
            }
        }
        return scheduleInComming
     }
}
module.exports = new MobileService();