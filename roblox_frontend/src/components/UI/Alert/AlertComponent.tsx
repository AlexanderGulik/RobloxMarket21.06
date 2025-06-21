import { Alert } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageI } from '../../../types/common';
import classes from './AlertComponent.module.css';

interface AlertComponentI {
  messages: MessageI[];
  handleRemoveMessage: (id: number) => void;
}

const AlertComponent: React.FC<AlertComponentI> = ({ messages, handleRemoveMessage }) => {
  return (
    <div className={classes.AlertContainer}>
      <AnimatePresence>
        {messages?.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{
              duration: 0.3,
            }}
          >
            <div className={classes.AlertContainerItem}>
              <Alert
                variant="filled"
                severity={item.type}
                onClose={() => handleRemoveMessage(item.id)}
                sx={{
                  backgroundColor: item.type === 'success' ? 'black' : '',
                }}
              >
                {item.text}
              </Alert>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default AlertComponent;
