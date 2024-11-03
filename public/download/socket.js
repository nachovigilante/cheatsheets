const socket = io("http://localhost:3000");

const errorHandlerCallbackDecorator = (callback) => {
    return (data) => {
        if (data.error !== undefined) {
            throw new Error(data.error);
        }
        callback(data);
    };
};

const send = (type, data, callback = () => {}) => {
    socket.emit("realTimeEvent", type, data, callback);
};

const receive = (type, callback) => {
    socket.on("realTimeEvent", (receivedType, data) => {
        if (receivedType === type) return callback(data);
    });
};

const fetchData = (type, callback) => {
    socket.emit("GETEvent", type, errorHandlerCallbackDecorator(callback));
};

const postData = (type, data, callback = () => {}) => {
    socket.emit(
        "POSTEvent",
        type,
        data,
        errorHandlerCallbackDecorator(callback)
    );
};
