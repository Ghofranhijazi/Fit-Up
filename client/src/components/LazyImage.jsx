// src/components/LazyImage.jsx
import React, { useState, useEffect, useRef } from 'react';
import LazyLoad from 'react-lazyload';

const LazyImage = ({ src, alt, height = 200, className = '', ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  // ✅ يتحقق ما إذا كانت الصورة مخزنة مسبقًا (من الكاش مثلاً)
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setLoaded(true);
    }
  }, []);

  return (
    <LazyLoad height={height} offset={100} once>
      <div className="relative w-full overflow-hidden" style={{ height }}>
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="w-8 h-8 border-4 border-[#9C2A46] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          className={`
            w-full h-full object-cover rounded-md transition-all duration-700 ease-in-out
            ${loaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-sm scale-105'}
            ${className}
          `}
          {...rest}
        />
      </div>
    </LazyLoad>
  );
};

export default LazyImage;
