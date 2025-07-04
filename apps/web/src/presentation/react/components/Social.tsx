import discord from '/image/social/discord.svg';
import x from '/image/social/x.svg';
import { discordUrl, twitterUrl } from 'hemi-socials';

export const Social = function (props: {
  className?: string;
  large?: boolean;
}) {
  return (
    <div
      className={`${props.className ?? ''} flex flex-row md:gap-10 max-md:gap-7`}
    >
      <a href={discordUrl} target="_blank" className="h-auto">
        <img
          src={discord}
          className={`md:w-10 max-md:w-${props.large ? 16 : 7}`}
          alt="Crypto Chords Discord"
        />
      </a>
      <a href={twitterUrl} target="_blank" className="h-auto">
        <img
          src={x}
          className={`md:w-10 max-md:w-${props.large ? 16 : 7}`}
          alt="Crypto Chords X"
        />
      </a>
    </div>
  );
};
