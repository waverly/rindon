import React from "react";
import { RichText } from "prismic-reactjs";
import styled from "styled-components";
import { media } from "Styles/style-utils";

import { linkResolver } from "Utils/prismic-configuration";

const TextWrap = styled.div`
  margin: 10rem auto;
  ${props => props.theme.blocks.text};
  ${media.handheld_landscape`
    margin: 5rem auto;
    width: 85vw;
  `};
`;

const TextBlock = props => {
  if (props.data.text && props.data.text.length > 0) {
    return (
      <TextWrap>{RichText.render(props.data.text, linkResolver)}</TextWrap>
    );
  } else return null;
};

export default TextBlock;
