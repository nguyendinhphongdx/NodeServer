class MobileService{
    converTimeString(schedules){
       return  schedules.map(item=>{
           const start =new Date(item.StartTime);
           const end =new Date(item.EndTime);
            const startTimeFormat =start.toLocaleDateString()+" - "+ start.toLocaleTimeString();
            const endTimeFormat =end.toLocaleDateString()+" - "+ end.toLocaleTimeString();
            return{
                ...item,
                StartTime: startTimeFormat,
                EndTime: endTimeFormat
            }
        })
    }
}
module.exports = new MobileService();