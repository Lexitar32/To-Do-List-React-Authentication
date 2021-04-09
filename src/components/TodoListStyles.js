import styled from "styled-components";

export const Body = styled.main`
  min-height: 100vh;
`;

export const Container = styled.div`
  margin: 0 auto;
  max-width: 1000px;
`;

export const Wrapper = styled.section`
  padding: 4rem;
  margin: 0 auto;
  width: 70%;
  @media (max-width: 768px) {
    padding: 2rem;
    width: 100%;
  }
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;
  color: palevioletred;
`;

export const ListBody = styled.div`
  padding: 1rem;
`;

export const ListItem = styled.li`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Button = styled.button`
  outline: none;
  border: none;
  background: none;
  color: ${props => (props.delete ? "red" : "black")};
`;
