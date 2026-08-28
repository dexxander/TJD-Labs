import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { buttonClasses, type ButtonSize, type ButtonVariant } from './buttonStyles';

interface LinkButtonProps {
  to?: string;
  href?: string;
  external?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  children?: ReactNode;
}

/**
 * Button-styled link. Pass `to` for internal SPA navigation (react-router),
 * or `href` + `external` for links that leave the site (GitHub, live demos).
 */
export function LinkButton({
  to,
  href,
  external = false,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  className,
  children,
}: LinkButtonProps) {
  const classes = buttonClasses(variant, size, className);
  const content = (
    <>
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </>
  );

  if (external || !to) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link to={to} className={classes}>
      {content}
    </Link>
  );
}
