export default {
    ROOMS_GET: {
        method: 'GET',
        path: 'http://localhost:8082/v1/rooms',
    },

    MESSAGES_GET: {
        method: 'GET',
        path: (roomLimit) => `http://localhost:8082/v1/messages?roomLimit=${roomLimit}`,
    },
    CURRENT_USER_GET: {
        method: 'GET',
        path: 'http://localhost:8082/v1/users/currentUser',
    },

    CURRENT_USER_POST: {
        method: 'POST',
        path: 'http://localhost:8082/v1/users/currentUser',
    },

    USER_GET: {
        method: 'GET',
        path: (query, roomLimit) => `http://localhost:8082/v1/users/?query=${query}&roomLimit=${roomLimit}`,
    },
}
