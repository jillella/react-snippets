import styles from './button.module.css';

interface ButtonProps {
  primary?: boolean;
  secondary?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({
  primary,
  secondary,
  children,
  onClick,
  disabled,
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${secondary ? styles.secondary : styles.primary}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

