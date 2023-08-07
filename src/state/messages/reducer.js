import types from "./types";
import MessageActionContansts from "../../constants/MessageActionContansts";

export const initialState = {
    messages: [],
    async: {
        isLoading: null,
        error: null,
    },
    messageAction: null,
};

export default function messagesReducer(state = initialState, action) {
    switch (action.type) {
        case types.MESSAGES_ASYNC: {
            return {
                ...state,
                async: {
                    ...state.async,
                    ...action.data,
                },
            };
        }
        case types.MESSAGES_GET: {
            return {
                ...state,
                async: {
                    ...state.async,
                },
                messages: action.data,
            };
        }
        case types.MESSAGE_UPDATE : {
            // Check if the message already exists in the state
            const existingMessageIndex = state.messages.findIndex(
                (message) => message.id === action.data.id
            );

            if (existingMessageIndex !== -1) {
                // Message with the same ID already exists, replace it
                return {
                    ...state,
                    messages: [
                        ...state.messages.slice(0, existingMessageIndex),
                        action.data,
                        ...state.messages.slice(existingMessageIndex + 1),
                    ],
                };
            } else {
                // Message doesn't exist, add it to the list
                return {
                    ...state,
                    messages: [...state.messages, action.data],
                };
            }
        }
        case types.MESSAGES_UPDATE : {
            const updatedMessages = action.data.reduce((accumulator, message) => {
                const existingMessageIndex = accumulator.findIndex(
                    (existingMessage) => existingMessage.id === message.id
                );

                if (existingMessageIndex !== -1) {
                    // Message with the same ID already exists, replace it
                    accumulator[existingMessageIndex] = message;
                } else {
                    // Message doesn't exist, add it to the list
                    accumulator.push(message);
                }

                return accumulator;
            }, [...state.messages]);

            return {
                ...state,
                messages: updatedMessages,
            };
        }
        case types.MESSAGE_ACTION_EDITING: {
            return {
                ...state,
                messageAction: {
                    type: MessageActionContansts.EDITING,
                    messageId: action.data,
                }
            }
        }
        case types.MESSAGE_ACTION_TRANSLATING: {
            return {
                ...state,
                messageAction: {
                    type: MessageActionContansts.TRANSLATING,
                    messageId: action.data,
                }
            }
        }
        case types.MESSAGE_ACTION_REPLYING: {
            return {
                ...state,
                messageAction: {
                    type: MessageActionContansts.REPLYING,
                    messageId: action.data,
                }
            }
        }
        case types.MESSAGE_ACTION_CANCEL: {
            return {
                ...state,
                messageAction: null,
            }
        }
        default:
            return state;
    }
}
