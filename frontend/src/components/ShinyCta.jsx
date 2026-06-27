import './ShinyCta.css';

const ShinyCta = ({
  children,
  href,
  onClick,
  className = '',
  ...props
}) => {
  const Tag = href ? 'a' : 'button';
  return (
    <Tag
      href={href}
      onClick={onClick}
      className={`shiny-cta ${className}`}
      {...props}
    >
      <span>{children}</span>
    </Tag>
  );
};

export default ShinyCta;
