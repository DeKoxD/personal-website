import styled from "styled-components";

const Frame = styled.div`
  border: 5px solid ${(props) => props.theme.secondaryColor};
  padding: 5px;
  width: 100%;
  height: 100%;
`;

export default Frame;
