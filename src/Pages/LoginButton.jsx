import React from 'react';
import styled from 'styled-components';

const LoginButton = () => {
  return (
    <StyledWrapper>
      <button type='submit' className="w-full px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-lg font-medium text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-300 ">
        
        <svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 0-.707-.293H9.414a1 1 0 0 0-.707.293l-2.234 2.234a.5.5 0 0 1-.793-.114l-2.495-4.575a.5.5 0 0 1 .095-.603l1.94-1.832C5.077 14.626 5 13.823 5 13zm1.476 6.696l.817-.817A3 3 0 0 1 9.414 18h5.172a3 3 0 0 1 2.121.879l.817.817.982-1.8-1.1-1.04a2 2 0 0 1-.593-1.82c.124-.664.187-1.345.187-2.036 0-3.87-1.995-7.3-5-8.96C8.995 5.7 7 9.13 7 13c0 .691.063 1.372.187 2.037a2 2 0 0 1-.593 1.82l-1.1 1.039.982 1.8zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="currentColor" />
        </svg>
        <span>Login</span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
//   button {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     font-family: inherit;
//     cursor: pointer;
//     font-weight: 500;
//     font-size: 17px;
//     padding: 0.8em 1.3em 0.8em 0.9em;
//     color: white;
//     background: #ad5389;
//     background: linear-gradient(to right, #0f0c29, #302b63, #24243e);
//     border: none;
//     letter-spacing: 0.05em;
//     border-radius: 16px;
//   }
button {
    width: 100%;
    display: flex;
    justify-content: center; /* Center contents horizontally */
    align-items: center;     /* Center contents vertically */
    gap: 0.5rem;             /* Space between icon and text */
    font-family: inherit;
    cursor: pointer;
    font-weight: 500;
    font-size: 17px;
    padding: 0.8em 1.3em;
    color: white;
    background: linear-gradient(to right, #0f0c29, #302b63, #24243e);
    border: none;
    letter-spacing: 0.05em;
    border-radius: 16px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease-in-out;
  }

  button svg {
    margin-right: 3px;
    transform: rotate(30deg);
    transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
  }

  button span {
    transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
  }

  button:hover svg {
    transform: translateX(5px) rotate(90deg);
  }

  button:hover span {
    transform: translateX(7px);
  }`;

export default LoginButton;
