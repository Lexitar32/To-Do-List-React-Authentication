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
  margin: 1rem 0;
  text-align: center;
  color: palevioletred;
`;

export const PrimaryButton = styled.button`
  background: palevioletred;
  outline: none;
  border: none;
  :hover {
    background: #db4a79 !important;
  }
  :active {
    background: #db4a79 !important;
    border: none;
    outline: none;
  }
  :focus {
    background: #db4a79 !important;
    border: none;
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(219, 74, 121, 0.5);
  }
`;

export const Error = styled.div`
  background: #ffc0cb8a;
  text-align: center;
  padding: 0.5rem 0;
`;

export const ErrorMessage = styled.p`
  color: maroon;
`;
