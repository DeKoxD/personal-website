import { FC, IframeHTMLAttributes } from "react";
import { Content } from "./styles";

const IFrameWrapper: FC<IframeHTMLAttributes<HTMLIFrameElement>> = (props) => {
  return (
    <Content>
      <div
        style={{
          height: "100%",
          maxHeight: props.height,
          maxWidth: props.width,
        }}
      >
        <iframe {...props} height="100%" width="100%" />
      </div>
    </Content>
  );
};

export default IFrameWrapper;
