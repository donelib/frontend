import styles from "./Tab.module.scss";

interface TabProps {
  name: string;
  isSelected?: boolean;
  onClick?:()=>void;
}

const Tab = ({ name, isSelected = false, onClick}: TabProps) => {
  return (
   <div className={`${isSelected && styles.selected}`} onClick={onClick}>
    {
      name
    }
    </div>
  );
};

export default Tab;