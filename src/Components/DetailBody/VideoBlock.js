import React from "react";
import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import { linkResolver } from "Utils/prismic-configuration";

const Wrapper = styled.div`
  width: 100vw;
  margin-top: -4px;
  iframe {
    width: 100%;
  }
`;

const IframeWrapper = styled.div`
  position: relative;
  overflow: hidden;
  padding-top: 56.25%;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const VideoBlock = props => {
  const embed = props.data.embed.embed_url;
  console.log(embed);
  let embed_url;

  // if it is a youtube embed:

  if (embed.indexOf("youtube") !== -1) {
    console.log("YES THIS IS A YOUTUBE LINK");
    const id = embed.split("=")[1];
    embed_url = `https://www.youtube.com/embed/${id}?feature=oembed`;
  } else if (embed.indexOf("vimeo") !== -1) {
    console.log("YES THIS IS A YOUTUBE LINK");
    const id = embed.split(".com/")[1];
    embed_url = `https://player.vimeo.com/video/${id}`;
  }

  if (embed_url) {
    // if it is a vimeo embed:

    return (
      <Wrapper>
        <IframeWrapper>
          <iframe src={embed_url} frameBorder="0" />
        </IframeWrapper>
      </Wrapper>
    );
  } else return null;
};

export default VideoBlock;
