//Set up current date

 let Today = function setDate(){
    // full date of today
    let today = new Date();
    // what day of week is it
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
    } //what month is it

    let time = {
        hours: today.getHours(),
        minutes: today.getMinutes()
    }
    
    //Get previous 4 days before today's date
    let week = {
        yersterday: new Date(today),
        twoDaysAgo: new Date(today),
        threeDaysAgo: new Date(today),
    }

    //for loop for week dates
    let i = 1;
    for (const day in week){
        week[day].setDate(week[day].getDate() - i);
        i++;
    }

    return [today, time, week, todayMonth];
}


export  default Today

