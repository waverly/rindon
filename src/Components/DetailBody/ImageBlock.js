import React from "react";
import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import { linkResolver } from "Utils/prismic-configuration";

const Wrapper = styled.div`
  width: 100vw;
  margin-top: -4px;
  img {
    width: 100%;
  }
`;

const Caption = styled.div`
  margin: 2rem 0;
  width: 80vw;
  margin-left: 10vw;
`;

const ImageBlock = props => {
  const image = props.data.image.url;
  const caption = props.data.caption;
  if (image && caption.length > 0) {
    return (
      <Wrapper>
        <img src={image} />
        <Caption>
          {caption ? RichText.render(caption, linkResolver) : null}
        </Caption>
      </Wrapper>
    );
  } else if (image) {
    return (
      <Wrapper>
        <img src={image} />
      </Wrapper>
    );
  } else return null;
};

export default ImageBlock;
