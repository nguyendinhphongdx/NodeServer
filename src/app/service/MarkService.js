class MarkService{
    avgMark(mark){
        var test= mark.test?mark.test.mark:1;
        console.log(test);
        var middle= mark.middle?mark.middle.mark:1;
        console.log(middle);
        var final= mark.final?mark.final.mark:1;
        console.log(final);
        console.log(((Number(test)+Number(middle)+Number(final))/3).toFixed(2));
        return ((Number(test)+Number(middle)+Number(final))/3).toFixed(2)
    }
}
module.exports = new MarkService();