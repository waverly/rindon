import React from "react";
import { RichText } from "prismic-reactjs";
import styled from "styled-components";

import { linkResolver } from "Utils/prismic-configuration";

const TextWrap = styled.div`
  margin: 10em auto;
  margin-left: 10vw;
  width: 80vw;
`;

const TextBlock = props => {
  if (props.data.text && props.data.text.length > 0) {
    return (
      <TextWrap>{RichText.render(props.data.text, linkResolver)}</TextWrap>
    );
  } else return null;
};

export default TextBlock;
