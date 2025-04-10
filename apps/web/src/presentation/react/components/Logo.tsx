import logo from '/image/crypto-chords.svg';
import { twitterUrl } from 'hemi-socials';

export const Logo = function () {
  const url = twitterUrl;
  return (
    <a
      href={url ?? '#'}
      target={url ? '_blank' : '_self'}
      className={`
        h-auto
        ${url ? 'pointer' : 'cursor-default'}
      `}
    >
      <img src={logo} alt="Crypto Chords" />
    </a>
  );
};
