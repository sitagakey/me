import {
  TwitterShareButton,
  XIcon,
  FacebookShareButton,
  FacebookIcon,
  HatenaShareButton,
  HatenaIcon
} from 'react-share';

interface Props {
  url: string;
  title: string;
}

export const ShareLinkListCore = ({ url, title }: Props) => {
  const rootStyle = {
    display: 'flex',
    gap: 24
  };

  return (
    <div style={rootStyle}>
      <TwitterShareButton url={url} title={title}>
        <XIcon size={32} round />
      </TwitterShareButton>
      <FacebookShareButton url={url}>
        <FacebookIcon round size={32} />
      </FacebookShareButton>
      <HatenaShareButton url={url} title={title}>
        <HatenaIcon round size={32} />
      </HatenaShareButton>
    </div>
  );
};
