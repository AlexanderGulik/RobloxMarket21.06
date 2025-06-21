import { MessageI } from '../types/common';
import { useMessagesStore } from './useMessagesStore';
import { useActions } from './useAction';

interface MessagesHookI {
  messages: MessageI[];
  handleRemoveMessage: (id: number) => void;
  handleSetMessage: (messageText: string, messageType: 'error' | 'success') => void;
}

export const useMessages = (timeout: number = 2500): MessagesHookI => {
  const messages = useMessagesStore();
  const { addMessage, removeMessage } = useActions();

  const handleRemoveMessage = (id: number) => {
    removeMessage(id);
  };

  const handleSetMessage = (messageText: string, messageType: 'error' | 'success') => {
    const message: MessageI = {
      id: Date.now(),
      type: messageType,
      text: messageText,
    };
    addMessage(message);

    setTimeout(() => {
      handleRemoveMessage(message.id);
    }, timeout);
  };

  return { messages, handleRemoveMessage, handleSetMessage };
};
