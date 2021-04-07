class MarkService{
    avgMark(mark){
        var test= mark.test?mark.test.mark:1;
        var middle= mark.middle?mark.middle.mark:1;
        var final= mark.final?mark.final.mark:1;
        return ((Number(test)+Number(middle)+Number(final))/3).toFixed(2)
    }
}
module.exports = new MarkService();