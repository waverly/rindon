import React from "react";
import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import { linkResolver } from "Utils/prismic-configuration";
import { media } from "Styles/style-utils";

const Wrapper = styled.div`
  width: 100vw;
  margin-top: -7px;
  img {
    width: 100%;
  }
`;

const Caption = styled.div`
  margin: 2rem auto 6rem auto;
  ${props => props.theme.blocks.text};
  ${media.handheld_landscape`
    width: 85vw;
  `};
`;

const ImageBlock = props => {
  const image = props.data.image.url;
  const caption = props.data.caption;
  console.log({ image, caption });
  console.log(caption[0].text);
  if (image && caption.length > 0 && caption[0].text != "") {
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
