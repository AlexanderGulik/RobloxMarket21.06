import classes from './ClassicButton.module.css';

interface ClassicButtonI {
  children: React.ReactNode;
  type: 1 | 2 | 3;
  isAdding?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ClassicButton: React.FC<ClassicButtonI> = ({ isAdding, children, type, onClick }) => {
  let style;
  switch (type) {
    case 1:
      style = classes.ClassicButton;
      break;
    case 2:
      style = classes.SecondButton;
      break;
    case 3:
      style = classes.BuyButton;
      break;
    default:
      break;
  }

  return (
    <button className={style} disabled={isAdding} onClick={onClick}>
      {children}
    </button>
  );
};

export default ClassicButton;
