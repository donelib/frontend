import styles from "./Header.module.scss";

interface HeaderProps {
  imgSrc?: string;
  onClick?: ()=>void;
};

const Header = (props: HeaderProps) => {
  const onClick = () => {
    if (props.onClick)
      props.onClick();
  }

  return (
    <div className={styles.Header}>
        <img src={props.imgSrc} alt="tag settings" onClick={onClick} />
    </div>
  );
};

export default Header;