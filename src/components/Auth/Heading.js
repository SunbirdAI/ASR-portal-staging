import React from "react";
import { AuthHeading, AuthHeadingTitle, AuthHeadingSubTitle } from "./Auth.styles";

const Heading = ({ title, message }) => {
  return (
    <AuthHeading>
      <AuthHeadingTitle>{title}</AuthHeadingTitle>
        <AuthHeadingSubTitle>{message}</AuthHeadingSubTitle>
    </AuthHeading>
  );
};

export default Heading;
