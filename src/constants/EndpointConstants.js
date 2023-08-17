export default {
    ROOMS_LIST: {
        method: 'GET',
        path: 'http://localhost:8082/v1/rooms',
    },

    ROOMS_GET: {
        method: 'GET',
        path: (id) => `http://localhost:8082/v1/rooms/${id}`,
    },

    ROOMS_ADD_MEMBERS: {
        method: 'PUT',
        path: (roomId) => `http://localhost:8082/v1/rooms/${roomId}/members`,
    },

    ROOMS_POST: {
        method: 'POST',
        path: 'http://localhost:8082/v1/rooms',
    },

    MESSAGES_GET: {
        method: 'GET',
        path: (roomLimit) => `http://localhost:8082/v1/messages?roomLimit=${roomLimit}`,
    },

    MESSAGES_ROOMS_GET: {
        method: 'GET',
        path: (roomId) => `http://localhost:8082/v1/messages/rooms/${roomId}`,
    },

    MESSAGES_POST: {
        method: 'POST',
        path: `http://localhost:8082/v1/messages`,
    },

    MESSAGES_PUT: {
        method: 'PUT',
        path: (messageId) => `http://localhost:8082/v1/messages/${messageId}`,
    },

    MESSAGES_READ: {
        method: 'PUT',
        path: (messageId) => `http://localhost:8082/v1/messages/${messageId}/read`,
    },

    CURRENT_USER_GET: {
        method: 'GET',
        path: 'http://localhost:8082/v1/users/currentUser',
    },

    CURRENT_USER_POST: {
        method: 'POST',
        path: 'http://localhost:8082/v1/users/currentUser',
    },

    USER_LIST: {
        method: 'GET',
        path: (query, type) => `http://localhost:8082/v1/users/?query=${query}${type !== null ? `&type=${type}` : ""}`,
    },

    USER_ROOMS_MEMBERS: {
        method: 'GET',
        path: 'http://localhost:8082/v1/users/rooms',
    },

    USER_GET: {
        method: 'GET',
        path: id => `http://localhost:8082/v1/users/${id}`,
    },
}
