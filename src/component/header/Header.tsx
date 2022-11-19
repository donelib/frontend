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
    <header className={styles.Header}>
      <div className={styles.title}>Donelib</div>
      <img src={props.imgSrc} alt="tag settings" onClick={onClick} />
    </header>
  );
};

export default Header;