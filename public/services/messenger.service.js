import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import axios from 'axios';

let stompClient = null;
let currentSubscription = null;

export default {
    connectSocket(onError) {
        return new Promise((resolve, reject) => {
            if (stompClient) {
                resolve();
                return;
            }

            const socket = new SockJS('http://localhost:9087/ws');
            stompClient = Stomp.over(socket);

            stompClient.connect({}, () => {
                resolve();
            }, (error) => {
                console.error('WebSocket connection error:', error);
                onError(error);
                reject(error);
            });
        });
    },

    subscribeToTopic(projectId, onMessageReceived) {
        if (!stompClient) {
            console.error('Socket is not connected');
            return;
        }
        if (currentSubscription) {
            currentSubscription.unsubscribe();
        }

        currentSubscription = stompClient.subscribe(`/topic/project/${projectId}`, (messageOutput) => {
            onMessageReceived(JSON.parse(messageOutput.body));
        });

        stompClient.send(`/app/chat.join.${projectId}`, {}, JSON.stringify({
            projectId: projectId,
            type: 'JOIN'
        }));
    },

    disconnect() {
        if (stompClient !== null) {
            stompClient.disconnect();
            stompClient = null;
        }
    },

    sendMessage(projectId, username, userId, messageContent) {
        if (stompClient && messageContent) {
            const chatMessage = {
                sender: username,
                senderId: userId,
                content: messageContent,
                type: 'CHAT'
            };

            stompClient.send(`/app/chat.sendMessage.${projectId}`, {}, JSON.stringify(chatMessage));
        }
    },

    async loadChatHistory(projectId) {
        try {
            const response = await axios.get(`/api/v1/chat-messages/messages/${projectId}`);
            return response.data.content || [];
        } catch (error) {
            console.error("Error loading chat history:", error);
            throw error;
        }
    }
};
