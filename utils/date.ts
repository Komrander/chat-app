export function getDateString(date: Date) {
    var time = new Date().getTime() - new Date(date).getTime();

    const minutes = Math.floor(time/60000);
    const hours = Math.floor(minutes/60);
    const days = Math.floor(hours/24);
    const weeks = Math.floor(days/7);
    const months = Math.floor(days/30);
    const years = Math.floor(days/365);
    
    if (years >= 1) {
        if (years == 1) {
            return(years + " year ago")
        } else {
            return(years + " years ago");
        }
    } else if (months >= 1) {
        if (months == 1) {
            return(months + " month ago")
        } else {
            return(months + " months ago");
        }
    } else if (weeks >= 1) {
        if (weeks == 1) {
            return(weeks + " week ago")
        } else {
            return(weeks + " weeks ago");
        }
    } else if (days >= 1) {
        if (days == 1) {
            return(days + " day ago")
        } else {
            return(days + " days ago");
        }
    } else if (hours >= 1) {
        if (hours == 1) {
            return(hours + " hour ago")
        } else {
            return(hours + " hours ago");
        }
    } else {
        if (minutes < 3) {
            return("now")
        } else {
            return(minutes + " minutes ago");
        }
    }
}

export function getTimeString(date: Date) {
    date = new Date(date);
    const currentDate = new Date();
    const today = currentDate.setUTCHours(0,0,0,0);
    const yesterday = currentDate.setDate(currentDate.getDate() -1);

    const day = date.getDate().toString();
    const month = (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString();

    const hour = date.getHours().toString();
    const minute = (date.getMinutes()<10?"0":"") + date.getMinutes().toString();
    
    if (today < date.getTime()) {
        return ("today at " + hour + ":" + minute);
    } else if (yesterday < date.getTime()) {
        return ("yesterday at " + hour + ":" + minute);
    } else {
        return (day + "." + month + "." + year + " " + hour + ":" + minute);
    }
}