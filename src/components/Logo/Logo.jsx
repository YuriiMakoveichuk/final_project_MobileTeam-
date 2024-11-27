import css from "./Logo.module.css";

const Logo = ({className}) => {
  return (
    <div className={className}>
      <p className={css.logo}>AQUATRACK</p>
    </div>
  );
};

export default Logo;
