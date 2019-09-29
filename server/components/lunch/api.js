const express = require('express');
const { getSchoolResourceByDate } = require('../school/getSchoolResourceByDate');
const { getSchool } = require('../school/getSchool');

const routes = () => {
    const router = express.Router();

    router.get('/:schoolId', async (request, response) => {
        const { schoolId } = request.params;
        let todaysLunch = await getSchoolResourceByDate(parseInt(schoolId), 'lunch_menu');

        // Get global lunch menu
        if (todaysLunch.error) {
            const { data } = await getSchool(parseInt(schoolId));

            if (data.enable_global_lunch_menu && data.lunch_menu_global) {
                todaysLunch = await getSchoolResourceByDate(
                    parseInt(schoolId),
                    'lunch_menu_global'
                );
            }
        }

        const todaysLunchScript = [];

        if (typeof todaysLunch.dishes !== 'undefined' && todaysLunch.dishes.length > 0) {
            todaysLunchScript.push('På matsedeln står det ..');

            todaysLunch.dishes
                .map(dish => {
                    // Rename "content" key to "text"
                    return { text: dish.content, image: dish.image };
                })
                .forEach(dish => {
                    if (typeof dish.image !== 'undefined' && dish.image.length > 0) {
                        const extension = dish.image.match(/.(png|jpg|jpeg)$/g);
                        const thumbnailSuffix = '-150x150';
                        if (extension[0]) {
                            dish.image = dish.image.replace(
                                extension[0],
                                `${thumbnailSuffix}${extension[0]}`
                            );
                        }
                        todaysLunchScript.push(dish);
                        return;
                    }

                    todaysLunchScript.push(dish.text);
                });
        }

        if (todaysLunch.error) {
            todaysLunchScript.push(
                'Idag ska köket överraska oss så jag vet inte vad det blir för mat.'
            );
        }

        response.json(todaysLunchScript);
    });

    return router;
};

module.exports = routes;
