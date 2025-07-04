import { discordUrl } from 'hemi-socials';

export const JoinCommunityButton = (props: { className?: string }) => {
  return (
    <a
      className={`${props.className ?? ''}
      flex
      h-10
      justify-center
      items-center
      text-[#1A1B23]
      text-base
      not-italic
      font-medium
      p-5
      rounded-lg
      bg-white
      pointer
      `}
      href={discordUrl}
      target="_blank"
    >
      Join Community
    </a>
  );
};
