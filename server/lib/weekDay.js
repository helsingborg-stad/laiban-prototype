const dateFns = require('date-fns');
const sv = require('date-fns/locale/sv');

const weekDay = () => {
    const dayOfMonth = dateFns.format(new Date(), 'Do', { locale: sv });
    const weekDay = dateFns.format(new Date(), 'dddd', { locale: sv });
    const month = dateFns.format(new Date(), 'MMMM', { locale: sv });

    return `Idag är det ${weekDay} den ${dayOfMonth} ${month}`;
};

module.exports = { weekDay };
