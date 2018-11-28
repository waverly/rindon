import React, { useState } from "react";
import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import { linkResolver } from "Utils/prismic-configuration";

const Wrapper = styled.div`
  width: 100vw;
  margin-top: -7px;
  display: flex;
  opacity: ${props => (props.display ? "1" : "0")};
  transition: 3s all;
  img {
    width: 50%;
    align-self: center;
  }
`;

const Diptych = props => {
  const image_left = props.data.image_left.url;
  const image_right = props.data.image_right.url;
  const [imgDisplay, setImgDisplay] = useState(false);

  if (image_left && image_right) {
    return (
      <Wrapper display={imgDisplay}>
        <img onLoad={() => setImgDisplay(!imgDisplay)} src={image_left} />
        <img src={image_right} alt="" />
      </Wrapper>
    );
  } else return null;
};

export default Diptych;
