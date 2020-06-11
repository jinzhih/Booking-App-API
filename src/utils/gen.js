const genBookingNum = (campus) => {
    let prefix = '';
    switch (campus) {
        case 'hobart':
            prefix = 'HBT';
            break;
        case 'brisbane':
            prefix = 'BNE';
            break;
        case 'sydney':
            prefix = 'SYD';
            break;
        case 'melbourne':
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