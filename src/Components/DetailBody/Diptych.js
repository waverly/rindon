import React from "react";
import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import { linkResolver } from "Utils/prismic-configuration";

const Wrapper = styled.div`
  width: 100vw;
  margin-top: -4px;
  display: flex;
  img {
    width: 50%;
    align-self: center;
  }
`;

const Diptych = props => {
  const image_left = props.data.image_left.url;
  const image_right = props.data.image_right.url;

  if (image_left && image_right) {
    return (
      <Wrapper>
        <img src={image_left} />
        <img src={image_right} alt="" />
      </Wrapper>
    );
  } else return null;
};

export default Diptych;
