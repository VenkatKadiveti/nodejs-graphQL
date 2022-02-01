var socket = require('socket.io');
var io = null;
var totalConnections = [];
var start = function (server) {
    return new Promise((resolve, reject) => {
        try {
            io = socket.listen(server);
            io.on('connection', connectionStatus);
            return resolve()
        }
        catch (error) {
            return reject(error)
        }
    })
}


var connectionStatus = function (socket) {
    totalConnections.push(socket.id)
    console.log('Socket Connected :)', totalConnections.length, 'user connected to the socket which is having id is ', socket.id)

    socket.emit('connected', { res: 'Connected Successfully :)' });

    socket.on('message', (data) => {
        console.log('daata--,', data.data)
    })

    socket.on("disconnect", function (data) {
        totalConnections.splice(totalConnections.indexOf(socket.id), 1);
        console.log('Socket disconnected :)', totalConnections.length)

    });
   
}

module.exports = {
    start: start
}