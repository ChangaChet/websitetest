import { useState } from 'react';

export default function FadeImg({
  src,
  alt,
  className = '',
  loading = 'lazy',
  ...rest
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [on, setOn] = useState(false);
  return (
    <img
      src={src}
      alt={alt ?? ''}
      loading={loading}
      onLoad={() => setOn(true)}
      className={`${className} img-fade ${on ? 'is-on' : ''}`}
      {...rest}
    />
  );
}
