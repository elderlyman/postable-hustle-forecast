// seatgeekFunction.js
import axios from 'axios';

exports.handler = async (event, context) => {
    const eventLocation = event.queryStringParameters['venue.city'];
    const daysFromNow = event.queryStringParameters['datetime_local.lte'];
    const client_id = event.queryStringParameters.client_id;

    if (!eventLocation || !daysFromNow || !client_id) {
        throw new Error(
            'Missing required parameters.'
            // Show missing parameters in the error message
            + ' eventLocation: ' + eventLocation
            + ' daysFromNow: ' + daysFromNow
            + ' client_id: ' + client_id
        );
    }

    try {
        const response = await axios.get(
            `https://api.seatgeek.com/2/events`,
            {
                params: {
                    client_id: client_id,
                    'venue.city': eventLocation,
                    'datetime_local.lte': daysFromNow,
                    per_page: 1000,
                },
            }
        );

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(response.data),
        };
    } catch (error) {
        console.error('Error:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
