import { AppBskyEmbedImages } from "@atproto/api";
import { useState } from "react";
import Button from "../../../Button";
import { ImageWrapper, Img } from "./styles";

export interface MicroblogPostEmbedViewImageProps {
  embed: AppBskyEmbedImages.View;
}

const MicroblogPostEmbedViewImage: React.FC<
  MicroblogPostEmbedViewImageProps
> = ({ embed }) => {
  const [index, setIndex] = useState(0);

  return (
    <div>
      {embed.images.length > 1 && (
        <div>
          <Button
            onClick={() => setIndex((state) => (state > 0 ? state - 1 : state))}
          >
            {"<"}
          </Button>
          <Button
            onClick={() =>
              setIndex((state) =>
                state < embed.images.length - 1 ? state + 1 : state
              )
            }
          >
            {">"}
          </Button>
        </div>
      )}
      <Button
        onClick={() => window.open(embed.images[index]?.fullsize, "_blank")}
      >
        full
      </Button>
      <a target="_blank" href={embed.images[index]?.fullsize}>
        <ImageWrapper>
          <Img
            src={embed.images[index]?.thumb}
            alt={embed.images[index]?.alt}
          />
        </ImageWrapper>
      </a>
    </div>
  );
};

export default MicroblogPostEmbedViewImage;
