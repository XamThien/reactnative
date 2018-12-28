
//đổi ngày sang millisecond
export function convertDateToMillisecond(strDate) {
    var output = new Date(strDate).getTime();
    return output;
}
//đổi millisecond sang date yyy-MM-DD
export function convertMillisecondToDate(duration) {
    let outPut = "";
    var isoFormat = new Date(duration);
    let year = isoFormat.getFullYear();
    let month = (isoFormat.getUTCMonth() + 1);
    let date = isoFormat.getDate();
    if(month < 10)
    {
        month = '0' + month;
    }
    if(date < 10)
    {
        date = '0' + date;
    }
    outPut = year + "-" + month + "-" + date;
    return outPut;
}
//Đổi thời gian sang millisecond
export function convertTimeToMillisecond(time) {
   var output = (Number(time.split(':')[0])*3600*1000) + (Number(time.split(':')[1])*60*1000);
   return output;
}
//đổi millisecond sang thời gian
export function convertMilliToTime(duration) {
   var milliseconds = parseInt((duration % 1000) / 100),
   seconds = parseInt((duration / 1000) % 60),
   minutes = parseInt((duration / (1000 * 60)) % 60),
   hours = parseInt((duration / (1000 * 60 * 60)) % 24);

   hours = (hours < 10) ? "0" + hours : hours;
   minutes = (minutes < 10) ? "0" + minutes : minutes;
   seconds = (seconds < 10) ? "0" + seconds : seconds;

 return hours + ":" + minutes;
}
//lấy ra ngày hiện tại của device
export function getCurrentDate() {
     var date = new Date().getDate();
     var month = new Date().getMonth() + 1;
     var year = new Date().getFullYear();
     var curMonth  = (month < 10 ? '0' : '') + month;
     var curDate  = (date < 10 ? '0' : '') + date;
     var outPut = year + "-" + curMonth + "-" + curDate;

     return outPut;
 }
//lấy ra millisecond thời gian hiện tại của device
export function getTimeMillisecond() {
     var curDate = new Date();
     return curDate.getTime();
 }
//lấy ra thời gian hiện tại của device
 export function getCurrentTime() {
    var date, TimeType, hour, minutes, seconds, fullTime;
    date = new Date();
    hour = date.getHours();
    minutes = date.getMinutes();
    if(minutes < 10)
    {
      minutes = '0' + minutes.toString();
    }
         
    fullTime = hour.toString() + ':' + minutes.toString();
     return fullTime;
}
//lấy ra thời gian hiện tại theo AM, PM của device
 export function getCurrentTimeAMPM() {

     var date, TimeType, hour, minutes, seconds, fullTime;
     date = new Date();
     hour = date.getHours();
     if(hour <= 11)
     {
         TimeType = 'AM';
     }
     else{
         TimeType = 'PM';
     }

     if( hour > 12 )
     {
         hour = hour - 12;
     }

     if( hour == 0 )
     {
         hour = 12;
     }
     minutes = date.getMinutes();
     if(minutes < 10)
     {
         minutes = '0' + minutes.toString();
     }
     seconds = date.getSeconds();
     if(seconds < 10)
     {
         seconds = '0' + seconds.toString();
     }
     fullTime = hour.toString() + ':' + minutes.toString() + ':' + seconds.toString() + ' ' + TimeType.toString();
     return fullTime;
 }
//lấy ra thời gian hiện tại, theo định dạng hour:minutes:seconds
export function getTime() {

     var date, hour, minutes, seconds, fullTime;
     date = new Date();
     hour = date.getHours();

     minutes = date.getMinutes();
     if(minutes < 10)
     {
         minutes = '0' + minutes.toString();
     }
     seconds = date.getSeconds();
     if(seconds < 10)
     {
         seconds = '0' + seconds.toString();
     }
     fullTime = hour.toString() + ':' + minutes.toString() + ':' + seconds.toString();
     return fullTime;
 }
//kiểm tra đối tượng object có rỗng hay không
export function isEmptyObject(obj){
    return JSON.stringify(obj) === '{}';
}

