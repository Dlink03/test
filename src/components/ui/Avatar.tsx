import React from 'react';

interface AvatarProps {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Avatar: React.FC<AvatarProps> = ({ name, src, size = 'md' }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const getSize = () => {
    switch (size) {
      case 'sm':
        return 'h-8 w-8 text-xs';
      case 'lg':
        return 'h-12 w-12 text-lg';
      case 'md':
      default:
        return 'h-10 w-10 text-sm';
    }
  };

  // Generate a deterministic color based on the name
  const getColor = (name: string) => {
    const colors = [
      'bg-blue-500',
      'bg-red-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500',
      'bg-orange-500',
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div 
      className={`rounded-full flex items-center justify-center text-white font-medium ${getSize()}`}
      style={src ? {} : { backgroundColor: 'transparent' }}
    >
      {src ? (
        <img 
          src={src} 
          alt={name} 
          className="rounded-full h-full w-full object-cover"
        />
      ) : (
        <div className={`rounded-full flex items-center justify-center text-white font-medium h-full w-full ${getColor(name)}`}>
          {getInitials(name)}
        </div>
      )}
    </div>
  );
};

export default Avatar;