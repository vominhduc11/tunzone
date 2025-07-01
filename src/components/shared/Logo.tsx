import Image from 'next/image';
import Link from 'next/link';
import { theme } from '@/config/theme';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  href?: string;
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16'
};

const textSizeClasses = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
  xl: 'text-3xl'
};

export default function Logo({ 
  size = 'md', 
  showText = true, 
  href = '/', 
  className = '' 
}: LogoProps) {
  const logoContent = (
    <div className={`flex items-center gap-3 group ${className}`}>
      <div className={`relative ${sizeClasses[size]} group-hover:scale-105 transition-transform duration-300`}>
        <Image
          src={theme.logo.main}
          alt={theme.logo.alt}
          fill
          className="object-contain"
          priority
        />
      </div>
      {showText && (
        <span className={`font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent ${textSizeClasses[size]}`}>
          TuneZone
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="flex-shrink-0">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
