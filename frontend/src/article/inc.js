
export function pubDateToStr( pubdate ) {
    const date = new Date(pubdate)
    const date_str = [
        date.getFullYear(), 
        ('0' + date.getMonth()).slice(-2), 
        ('0' + date.getDate()).slice(-2)
    ]. join('-');

    const time_str = [
        ('0' + date.getHours()).slice(-2), 
        ('0' + date.getMinutes()).slice(-2),
        ('0' + date.getSeconds()).slice(-2)
    ]. join(':');
    return date_str + ' ' + time_str;
}

