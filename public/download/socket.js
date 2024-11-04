class SoqueticError extends Error {
    constructor(message) {
        super(message);
        this.name = "SoqueticError";
    }
}

const socket = io("http://localhost:3000", {
    autoConnect: false,
});

socket.on("connect", () => {
    console.log("¡Conectado al backend!");
});

socket.on("connect_error", () => {
    throw new SoqueticError(
        "Error al conectar al backend. Revisá que el servidor no haya crasheado y esté corriendo en el puerto correcto.\nRecargá la página para reconectar."
    );
});

const assertConnection = (socket) => {
    if (!socket.active) {
        throw new SoqueticError(
            "No se puede enviar un evento si no hay conexión al backend.\nRecordá que tenés que llamar a connect2Server() para conectarte al backend."
        );
    }
};

const assertTypeIsString = (type) => {
    if (typeof type !== "string") {
        throw new SoqueticError(
            `El tipo de evento debe ser un string, pero es de tipo ${typeof type}`
        );
    }
};

const assertCallbackIsFunction = (callback) => {
    if (typeof callback !== "function") {
        throw new SoqueticError(
            `El callback debe ser una función, pero es de tipo ${typeof callback}`
        );
    }
};

const RESTCallbackDecorator = (callback) => {
    assertCallbackIsFunction(callback);
    return (response) => {
        if (response.status !== 200) {
            throw new SoqueticError(
                response.message ? response.message : "Error desconocido"
            );
        }
        callback(response.data);
    };
};

const send = (type, data, callback = () => {}) => {
    assertConnection(socket);
    assertTypeIsString(type);
    socket.emit("realTimeEvent", type, data, RESTCallbackDecorator(callback));
};

const receive = (type, callback) => {
    assertConnection(socket);
    assertTypeIsString(type);
    socket.on("realTimeEvent", (receivedType, data) => {
        if (receivedType === type) return callback(data);
    });
};

const fetchData = (type, callback) => {
    assertConnection(socket);
    assertTypeIsString(type);
    socket.emit("GETEvent", type, RESTCallbackDecorator(callback));
};

const postData = (type, data, callback = () => {}) => {
    assertConnection(socket);
    assertTypeIsString(type);
    socket.emit("POSTEvent", type, data, RESTCallbackDecorator(callback));
};

const connect2Server = (PORT = 3000) => {
    socket.io.uri = `http://localhost:${PORT}`;
    socket.connect();
};
