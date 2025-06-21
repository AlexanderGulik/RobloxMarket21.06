import { useSelector } from 'react-redux';
import { RootSliceI } from '../store/index.ts';

export const useMessagesStore = () => {
  const messages = useSelector((state: RootSliceI) => state.messagesSlice.messages);
  return messages;
};
