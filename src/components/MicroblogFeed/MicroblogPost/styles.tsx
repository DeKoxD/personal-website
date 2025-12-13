import styled from "styled-components";

export const Post = styled.div`
  padding: 5px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  :nth-child(2) {
    max-width: 200px;
  }
  gap: 5px;
  @media (max-width: 600px) {
    flex-direction: column;
    :nth-child(2) {
      max-width: 100%;
    }
  }
`;
