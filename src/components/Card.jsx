// import React from 'react';
// import styled, {css} from 'styled-components';

// const Card = ({ title, code }) => {
//   return (
//     <StyledWrapper>
//       <div className="card">
//         <div className="header">
//           <div className="top">
//             <div className="circle"><span className="red circle2" /></div>
//             <div className="circle"><span className="yellow circle2" /></div>
//             <div className="circle"><span className="green circle2" /></div>
//             <div className="title">
//               <p id="title2">{title || "Untitled"}</p>
//             </div>
//           </div>
//         </div>
//         <div className="code-container">
//           <textarea
//             className="area"
//             id="code"
//             name="code"
//             readOnly
//             value={code || "// No code provided"}
//           />
//         </div>
//       </div>
//     </StyledWrapper>
//   );
// };


// const StyledWrapper = styled.div`
//   .card {
//     width: 100%;
//     max-width:300px;
//     height: auto;
//     margin: 0 auto;
//     background-color: #24233b;
//     border-radius: 0.5em;
//     z-index: 1;
//     box-shadow: 0 0 0.625rem 0.625rem rgb(73, 70, 92,0.5);
//     transition: all 0.3s;
//   }

//   .card:hover {
//     transform: translateY(-0.4375rem);
//     box-shadow: 0 0 0.625rem 0.625rem rgba(0,0,0,0.5);
//   }

//   .top {
//     display: flex;
//     align-items: center;
//     padding-left: 0.625rem;
//   }

//   .circle {
//     padding: 0 0.25rem;
//   }

//   .circle2 {
//     display: inline-block;
//     align-items: center;
//     width: 10px;
//     height: 10px;
//     padding: 1px;
//     border-radius: 5px;
//   }

//   .red {
//     background-color: #ff605c;
//   }

//   .yellow {
//     background-color: #ffbd44;
//   }

//   .green {
//     background-color: #00ca4e;
//   }

//   .header {
//     margin: 0.3125rem;
//     margin-top: 0.3125rem;
//     border-radius: 0.3125rem;
//   }

//   #title2 {
//     color: white;
//     padding-left: 3.125rem;
//     font-size: 0.9375rem;
//   }

//   .code-container {
//     text-align: center;
//   }
//   #code {
//     width: 100%;
//     height: 21.875rem;
//     resize: none;
//     background-color: rgb(73, 70, 92);
//     border-radius: 0.3125rem;
//     border: none;
//     color: white;
//     padding: 0.625rem;
//   }
//   #code:focus {
//     outline: none !important;
//   }
//     // Media Queries
//     @media (min-width: 768px) and (max-width: 1048px) {
//   .card {
//     max-width: 15.625rem; /* Slightly reduce card width for medium screens */
//   }
// } 
//   @media (min-width: 1049px){
//   .card {
//     max-width: 18.75rem; 
//   }
//   `;

// export default Card;

import React from 'react';
import styled from 'styled-components';

const Card = ({ title, code }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="header">
          <div className="top">
            <div className="circle"><span className="red circle2" /></div>
            <div className="circle"><span className="yellow circle2" /></div>
            <div className="circle"><span className="green circle2" /></div>
            <div className="title">
              <p id="title2">{title || "Untitled"}</p>
            </div>
          </div>
        </div>
        <div className="code-container">
          <textarea
            className="area"
            id="code"
            name="code"
            readOnly
            value={code || "// No code provided"}
          />
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: relative; /* Add this to create positioning context */
  
  .card {
    width: 100%;
    max-width: 300px; /* Fixed missing semicolon here */
    height: auto;
    margin: 0 auto;
    background-color: #24233b;
    border-radius: 0.5em;
    z-index: 1;
    box-shadow: 0 0 0.625rem 0.625rem rgb(73, 70, 92,0.5);
    transition: all 0.3s;
    overflow: hidden; /* Add this to prevent content overflow */
  }

  .card:hover {
    transform: translateY(-0.4375rem);
    box-shadow: 0 0 0.625rem 0.625rem rgba(0,0,0,0.5);
  }

  .top {
    display: flex;
    align-items: center;
    padding-left: 0.625rem;
  }

  .circle {
    padding: 0 0.25rem;
  }

  .circle2 {
    display: inline-block;
    align-items: center;
    width: 10px;
    height: 10px;
    padding: 1px;
    border-radius: 5px;
  }

  .red {
    background-color: #ff605c;
  }

  .yellow {
    background-color: #ffbd44;
  }

  .green {
    background-color: #00ca4e;
  }

  .header {
    margin: 0.3125rem;
    margin-top: 0.3125rem;
    border-radius: 0.3125rem;
  }

  .title {
    width: 100%; /* Add this to control title width */
    overflow: hidden; /* Add this to prevent title overflow */
  }

  #title2 {
    color: white;
    padding-left: 3.125rem;
    font-size: 0.9375rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; /* Add these three lines to truncate long titles */
    max-width: calc(100% - 1rem); /* Leave space for the like button */
  }

  .code-container {
    text-align: center;
  }
  
  #code {
    width: 100%;
    height: 21.875rem;
    resize: none;
    background-color: rgb(73, 70, 92);
    border-radius: 0.3125rem;
    border: none;
    color: white;
    padding: 0.625rem;
  }
  
  #code:focus {
    outline: none !important;
  }
  
  /* Media Queries */
  @media (min-width: 768px) and (max-width: 1048px) {
    .card {
      max-width: 15.625rem; /* Slightly reduce card width for medium screens */
    }
  } 
  
  @media (min-width: 1049px) {
    .card {
      max-width: 18.75rem; 
    }
  }
`;

export default Card;
