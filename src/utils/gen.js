const genBookingNum = (campus) => {
    let prefix = '';
    switch (campus) {
        case 'Hobart':
            prefix = 'HBT';
            break;
        case 'Brisbane':
            prefix = 'BNE';
            break;
        case 'Sydney':
            prefix = 'SYD';
            break;
        case 'Melbourn':
            prefix = 'MEL';
            break;
        default:
            break;
    }
    const timeString = Date.now().toString();
    const tail = timeString.substring(timeString.length - 6);
    const bookingNum = prefix + tail;
    return bookingNum;
}

module.exports = {
  genBookingNum
};