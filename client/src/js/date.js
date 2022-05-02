//Set up current date

 let Today = function setDate(){
    let FullDate = new Date();
    let currentDay = FullDate.getDate();
    //Get week day
    let weekDay = FullDate.getDay();

    let todayWeekDay = function (weekDayN){
        switch(weekDayN){
            case 0: {
                weekDayN = "Sunday";
                break;

            }
            case 1: {
                weekDayN = "Monday";
                break;

            }
            case 2: {
                weekDayN = "Tuesday";
                break;

            }
            case 3: {
                weekDayN = "Wednesday";
                break;

            }
            case 4: {
                weekDayN = "Thursday";
                break;

            }
            case 5: {
                weekDayN = "Friday";
                break;

            }
            case 6: {
                weekDayN = "Saturday";
                break;

            }

            default: {
                weekDayN = "Sunday"
            }
        }
        return weekDayN;
    }
    let currentMonth =FullDate.getMonth()+1;// get month number
    let todayMonth = function(month){
        switch(month){
            case 1: {
                month = "January";
                break;
            }
            case 2:{ 
                month = "February";
                break;
            }   
            case 3:{
                month = "March";
                break;
            } 
            case 4: {
                month = "April";
                break;
            }
            case 5: {
                month = "May";
                break;
            }
            case 6:{ 
                month = "June";
                break;
            }
            case 7:{ 
                month = "July";
                break;
            }
            case 8: {
                month = "August";
                break;
            }
            case 9:{ 
                month = "September";
                break;
            }
            case 10: {
                month = "October";
                break;
            }
            case 11:{ 
                month = "November";
                break;
            }
            case 12: {
                month = "Decemeber";
                break;
            }
        }
        return month;
    }
    let today = todayMonth(currentMonth) + " " + currentDay + ", " + todayWeekDay(weekDay);
    let hours = FullDate.getHours();
    let minutes = FullDate.getMinutes();
    let time = `${hours}:${minutes}`;
    
    //Get previous 4 days before today's date
    let week = {
        yersterday: new Date(FullDate),
        twoDaysAgo: new Date(FullDate),
        threeDaysAgo: new Date(FullDate),
        fourDaysAgo: new Date(FullDate)
    }

    //for loop for week dates
    let i = 1;
    for (const day in week){
        week[day].setDate(week[day].getDate() - i);
        i++;
    }

    return [today, time, FullDate, week, todayMonth];
}


export  default Today

