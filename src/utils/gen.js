const { CAMPUS, CAMPUS_ABBR } = require('../constants/option');

const genBookingNum = (campus) => {
    let prefix = '';
    switch (campus) {
        case CAMPUS.HOBART:
            prefix = CAMPUS_ABBR.HOBART;
            break;
        case CAMPUS.BRISBANE:
            prefix = CAMPUS_ABBR.BRISBANE;
            break;
        case CAMPUS.SYDNEY:
            prefix = CAMPUS_ABBR.SYDNEY;
            break;
        case CAMPUS.MELBOURNE:
            prefix = CAMPUS_ABBR.MELBOURNE;
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