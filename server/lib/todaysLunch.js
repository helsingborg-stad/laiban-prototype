const dateFns = require('date-fns');

const todaysLunch = () => {
    const todaysMenuKey = Object.keys(LUNCH_MENU).filter(date =>
        dateFns.isSameDay(new Date(), new Date(date))
    );

    const todaysMenu = [];

    if (
        todaysMenuKey.length === 1 &&
        Array.isArray(LUNCH_MENU[todaysMenuKey[0]]) &&
        LUNCH_MENU[todaysMenuKey[0]].length > 0
    ) {
        todaysMenu.push('På matsedeln står det ..');

        LUNCH_MENU[todaysMenuKey[0]].forEach(item => {
            todaysMenu.push(item);
        });
    }

    if (todaysMenu.length <= 0) {
        todaysMenu.push('Idag ska köket överraska oss så jag vet inte vad det blir för mat.');
    }

    return todaysMenu;
};

const LUNCH_MENU = {
    '05 02 2019': [
        'Köttbullar med potatis och brunsås. Lingonsylt och grönsaker till det.',
        'Morotsbullar med potatis. Kryddig sås, lingonsylt och grönsaker till det.',
    ],
    '05 03 2019': [
        'Korv stroganoff med matvete eller pasta och grönsaker.',
        'Soja stroganoff med matvete eller pasta och grönsaker.',
    ],
    '05 06 2019': [
        'Köttbullar med potatis och brunsås. Lingonsylt och grönsaker till det.',
        'Morotsbullar med potatis. Kryddig sås, lingonsylt och grönsaker till det.',
    ],
    '05 07 2019': [
        'Korv stroganoff med matvete eller pasta och grönsaker.',
        'Soja stroganoff med matvete eller pasta och grönsaker.',
    ],
    '05 08 2019': [
        'Kyckling och potatis med sås och grönsaker.',
        'Quornfilé och potatis med sås och grönsaker',
    ],
    '05 09 2019': [
        'Fiskpinnar och potatis med remouladsås och grönsaker.',
        'Grönsaksmedaljong och potatis med kryddig sås och grönsaker.',
    ],
    '05 10 2019': [
        'Falafel med Tortillabröd, vitlökssås och grönsaker.',
        'Sojakebab med tortillabröd, vitlökssås och grönsaker.',
    ],
    '05 13 2019': [
        'Potatisbullar med blodpudding, skinktärningar och grönsaker.',
        'Potatisbullar med facon och grönsaker.',
    ],
    '05 14 2019': [
        'Fiskgratäng med potatismos och grönsaker.',
        'Grönsaksgratäng med potatismos och grönsaker.',
    ],
    '05 15 2019': ['Gryta med matvete eller risoni och grönsaker.'],
    '05 16 2019': ['Pasta carbonara och grönsaker.', 'Pasta carbonara med linser och grönsaker.'],
    '05 17 2019': [
        'Köttfärslimpa med potatis, sås och grönsaker.',
        'Sojafärslimpa med potatis kryddig sås och grönsaker.',
    ],
    '05 20 2019': [
        'Chili con carne med matvete eller risoni och grönsaker.',
        'Grönsaksgryta med linser och matvete eller risoni och grönsaker.',
    ],
    '05 21 2019': [
        'Torskfilé med kall sås, kokt potatis och grönsaker.',
        'Grönsaksvegett med kall sås, potatis och grönsaker.',
    ],
    '05 22 2019': [
        'Thaigryta med fläskkött, nudlar och grönsaker.',
        'Thaigryta med quorn, nudlar och grönsaker.',
    ],
    '05 23 2019': [
        'Falukorv med potatismos och grönsaker.',
        'Vegoprinskorv med potatismos och grönsaker.',
    ],
    '05 24 2019': ['Lasagne och grönsaker.'],
    '05 27 2019': [
        'Köttbullar med potatis, sås och grönsaker.',
        'Morotsbullar med potatis. kryddig sås, lingonsylt och grönsaker.',
    ],
    '05 28 2019': [
        'Tikka Masala med matvete eller risoni och grönsaker.',
        'Tikka Masala på sojastrimlor med matvete eller risoni och grönsaker.',
    ],
    '05 29 2019': [
        'Fiskpinnar och potatis med remouladsås och grönsaker.',
        'Grönsaksmedaljong och potatis med kryddig sås och grönsaker.',
    ],
    '05 31 2019': [
        'Finns ingen matsedel för den räknas som lovdag. Förslag: Idag ska köket överraska oss så jag vet inte vad det blir för mat.',
    ],
    '06 03 2019': [
        'Korv med potatismos och grönsaker.',
        'Vegoprinskorvar med potatismos och grönsaker.',
    ],
    '06 04 2019': ['Ugnspannkaka och grönsaker.', 'Grönsaksomelett och grönsaker.'],
};

module.exports = { todaysLunch };
