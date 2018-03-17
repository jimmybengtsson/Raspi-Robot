let camera = require('../controller/Camera');

module.exports = (app) => {

    app.ws('/', (ws, req) => {

        console.log('WS connected');

        camera.connect();

        ws.on('message', msg => {
            ws.send(msg)
        });

        ws.on('close', () => {
            console.log('WebSocket was closed')
            camera.disconnect();
        });
    });


};