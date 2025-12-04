import React, { useEffect } from 'react';
import SellerAuthority from './pages/SellerAuthority';
import headshot from './assets/selfie.jpg';

const App: React.FC = () => {
  useEffect(() => {
    let favicon = document.querySelector<HTMLLinkElement>("link[rel*='icon']");
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      document.head.appendChild(favicon);
    }
    favicon.type = 'image/jpeg';
    favicon.href = headshot;
  }, []);

  return <SellerAuthority />;
};

export default App;