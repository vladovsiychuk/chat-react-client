export default {
    CHATS_GET: {
        method: 'GET',
        path: 'http://localhost:8082/v1/chats',
    },
    CURRENT_USER_GET: {
        method: 'GET',
        path: 'http://localhost:8082/v1/users/getCurrentUser',
    },

    CURRENT_USER_POST: {
        method: 'POST',
        path: 'http://localhost:8082/v1/users/createCurrentUser',
    },
}
