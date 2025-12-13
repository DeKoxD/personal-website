import { AppBskyEmbedImages } from "@atproto/api";
import { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import React from "react";
import MicroblogPostEmbedViewImage from "./MicroblogPostEmbedViewImage";
import { Post } from "./styles";

export interface MicroblogPostProps {
  post: PostView;
}

const MicroblogPost: React.FC<MicroblogPostProps> = ({ post }) => {
  return (
    <Post>
      <p>{post.record.text?.toString()}</p>
      {(() => {
        switch (post.embed?.$type) {
          case "app.bsky.embed.images#view":
            return (
              <MicroblogPostEmbedViewImage
                embed={post.embed as AppBskyEmbedImages.View}
              />
            );
          default:
            return <></>;
        }
      })()}
    </Post>
  );
};

export default MicroblogPost;
