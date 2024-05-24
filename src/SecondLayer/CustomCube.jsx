/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
// import cubeBgImg from '../assets/bgImages/alpine tundra.jpg'
// import cubeBgImg from '../assets/bgImages/arctic tundra.jpg'
// import cubeBgImg from '../assets/bgImages/boreal forest.jpg'
// import cubeBgImg from '../assets/bgImages/coral reef.jpg'
// import cubeBgImg from '../assets/bgImages/desert oasis.jpg'
// import cubeBgImg from '../assets/bgImages/fenlands.jpg'
// import cubeBgImg from '../assets/bgImages/glacial valley.jpg'
// import cubeBgImg from '../assets/bgImages/grassy top of cliff.jpg'
// import cubeBgImg from '../assets/bgImages/mangrove.jpg'
// import cubeBgImg from '../assets/bgImages/mountain valley.jpg'
// import cubeBgImg from '../assets/bgImages/sand dunes.jpg'
import cubeBgImg from '../assets/bgImages/tropical rainforest.jpg'

const CubeContainer = styled('div')(({ theme }) => ({
  color: '#eee',
  display: 'flex',
  alignItems: 'center',
  height: '100vh',
  justifyContent: 'center',
  perspective: '10000px',
  width:"100%",
  
}));

const Cube = styled('div')(({ theme }) => ({
  width: '300px',
  height: '300px',
  transformStyle: 'preserve-3d',
//   transform: 'rotateX(-19.7262deg) rotateY(-22.1615deg)',
  transition: 'transform 0.6s ease-out',
}));

// const CubeFace = styled('div')(({ theme }) => ({
//     width: '300px',
//     height: '300px',
//     position: 'absolute',
//     fontSize: '22px',
//     backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
//     color: '#2c3e50', // Dark blue text color
//     fontWeight: 'bold',
//     display: 'grid',
//     gridTemplateColumns: 'repeat(3, 1fr)',
//     padding: '20px', // Add some padding for better readability
//     borderRadius: '10px', // Add rounded corners for a modern look
//   }));
// const CubeFace = styled('div')(({ theme }) => ({
//     width: '300px',
//     height: '300px',
//     position: 'absolute',
//     fontSize: '22px',
//     //   background: 'white',
//     // background: '',
//     color: '#000',
//     fontWeight: 'bold',
//     display: 'grid',
//     gridTemplateColumns: 'repeat(3, 1fr)',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // Add a subtle box shadow
//     backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
  
// }));

// const CubeFace = styled('div')(({ theme }) => ({
//     width: '300px',
//     height: '300px',
//     position: 'absolute',
//     fontSize: '22px',
//     backgroundColor: 'rgba(192, 192, 192, 0.7)', // Semi-transparent silver color
//     color: '#ffffff', // White text color for better contrast
//     fontWeight: 'bold',
//     display: 'grid',
//     gridTemplateColumns: 'repeat(3, 1fr)',
//     padding: '5px',
//     borderRadius: '10px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
//     backdropFilter: 'blur(5px)', // Add a blur effect for glass-like appearance
//     backgroundBlendMode: 'overlay', // Blend mode for a metallic look
//   }));


// const CubeFace = styled('div')(({ theme }) => ({
//     width: '300px',
//     height: '300px',
//     position: 'absolute',
//     fontSize: '22px',
//     backgroundColor: '#c0c0c0', // Solid silver color
//     color: '#ffffff', // White text color for better contrast
//     fontWeight: 'bold',
//     display: 'grid',
//     gridTemplateColumns: 'repeat(3, 1fr)',
//     padding: '20px',
//     borderRadius: '10px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
//     backdropFilter: 'blur(5px)', // Add a blur effect for glass-like appearance
//     backgroundBlendMode: 'overlay', // Blend mode for a metallic look
//   }));

const CubeFace = styled('div')(({ theme }) => ({
    width: '300px',
    height: '300px',
    position: 'absolute',
    fontSize: '22px',
    backgroundColor: 'linear-gradient(to bottom, #add8e6, #cd853f)', // Light blue to golden-bronze gradient
    color: '#ffffff', // White text color for better contrast
    fontWeight: 'bold',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    padding: '5px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(15px)', // Add a blur effect for glass-like appearance
    backgroundBlendMode: 'overlay', // Blend mode for a metallic look
    // position: 'relative',
    overflow: 'hidden',
  
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))',
      mixBlendMode: 'overlay',
    },
  
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0) 70%)',
      mixBlendMode: 'overlay',
    },
  }));


const CubeFaceContent = styled('div')(({ theme }) => ({
  aspectRatio: '1 / 1',
  border: '2px solid lightgray',
  padding: '15px',
  position: 'relative',
  userSelect: 'none',
  cursor: 'pointer',
}));

const CubeFaceText = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
}));


const CustomCube2 = ({onClickLabel}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [currentX, setCurrentX] = useState(0);
    const [currentY, setCurrentY] = useState(0);
    const [previousX, setPreviousX] = useState(0);
    const [previousY, setPreviousY] = useState(0);
    const [currentRotateX, setCurrentRotateX] = useState(-19.7262);
    const [currentRotateY, setCurrentRotateY] = useState(-22.1615);
  
    const handleMouseDown = (event) => {
      setIsDragging(true);
      setCurrentX(event.clientX);
      setCurrentY(event.clientY);
      setPreviousX(event.clientX);
      setPreviousY(event.clientY);
    };
  
    const handleMouseUp = () => {
      setIsDragging(false);
    };
  
    const handleMouseMove = (event) => {
      if (isDragging) {
        const rotationValue = 560;
        const xDiff = event.clientX - previousX;
        const yDiff = event.clientY - previousY;
        setCurrentRotateX(currentRotateX - (yDiff / window.innerHeight) * rotationValue);
        setCurrentRotateY(currentRotateY + (xDiff / window.innerWidth) * rotationValue);
        setPreviousX(event.clientX);
        setPreviousY(event.clientY);
      }
    };
  
    const handleMouseLeave = handleMouseUp;
  

    const handleSelectBox = (payload) => {
        onClickLabel({text: payload})
    }

    return (
        <>
 <CubeContainer
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className='cube-containers'
      style={{background: `url(${cubeBgImg})`, backgroundPosition: 'center', backgroundSize:'cover', backgroundRepeat: 'no-repeat'}}
    >
      <Cube className='cube-main' style={{ transform: `rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)` }}>
        {/* Front face */}
        <CubeFace className="front common-face" style={{ transform: 'translateZ(150px)' }}>
          <CubeFaceContent onClick={() => handleSelectBox('XC1')}>
            <CubeFaceText>XC1</CubeFaceText>
            <CubeFaceText onClick={(e) => e.stopPropagation()} style={{ left: '-50%', fontSize:'16px', textAlign:'left' }}>C: <br /> Solutions</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('YC1')}>
            <CubeFaceText >YC1</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('ZC1')}>
            <CubeFaceText >ZC1</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('XB1')}>
            <CubeFaceText >XB1</CubeFaceText>
            <CubeFaceText onClick={(e) => e.stopPropagation()} style={{ left: '-50%', fontSize:'16px', textAlign:'left' }}>B: <br /> Transition</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('YB1')}>
            <CubeFaceText >YB1</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('ZB1')}>
            <CubeFaceText >ZB1</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('XA1')}>
            <CubeFaceText >XA1</CubeFaceText>
            <CubeFaceText onClick={(e) => e.stopPropagation()} style={{ left: '-50%', fontSize:'16px', textAlign:'left' }}>A: Risk <br /> reduction</CubeFaceText>
            <CubeFaceText onClick={(e) => e.stopPropagation()} style={{ top: '150%', fontSize:'16px'}}>X: Climate <br /> mitigation</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('YA1')}>
            <CubeFaceText >YA1</CubeFaceText>
            <CubeFaceText onClick={(e) => e.stopPropagation()} style={{ top: '150%', fontSize:'16px' }}>Y: Climate <br /> adaptation</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('ZA1')}>
            <CubeFaceText >ZA1</CubeFaceText>
            <CubeFaceText onClick={(e) => e.stopPropagation()} style={{ top: '150%', fontSize:'16px' }}>Z: Biodiversity</CubeFaceText>
          </CubeFaceContent>
        </CubeFace>

        {/* Back face */}
        <CubeFace className="back common-face" style={{ transform: 'rotateY(180deg) translateZ(150px)' }}>
          <CubeFaceContent onClick={() => handleSelectBox('ZC3')}>
            <CubeFaceText >ZC3</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('YC3')}>
            <CubeFaceText >YC3</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('XC3')}>
            <CubeFaceText >XC3</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('ZB3')}>
            <CubeFaceText >ZB3</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('YB3')}>
            <CubeFaceText >YB3</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('XB3')}>
            <CubeFaceText >XB3</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('ZA3')}>
            <CubeFaceText >ZA3</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('YA3')}>
            <CubeFaceText >YA3</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('XA3')}>
            <CubeFaceText >XA3</CubeFaceText>
          </CubeFaceContent>
        </CubeFace>
          {/* Left face */}
        <CubeFace className="left common-face" style={{ transform: 'rotateY(-90deg) translateZ(150px)' }}>
          <CubeFaceContent onClick={() => handleSelectBox('XC3')}>
            <CubeFaceText >XC3</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('XC2')}>
            <CubeFaceText >XC2</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('XC1')}>
            <CubeFaceText >XC1</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('XB3')}>
            <CubeFaceText >XB3</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('XB2')}>
            <CubeFaceText >XB2</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('XB1')}>
            <CubeFaceText >XB1</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('XA3')}>
            <CubeFaceText >XA3</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('XA2')}>
            <CubeFaceText >XA2</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('XA1')}>
            <CubeFaceText >XA1</CubeFaceText>
          </CubeFaceContent>
        </CubeFace>

        {/* Right face */}
        <CubeFace className="right common-face" style={{ transform: 'rotateY(90deg) translateZ(150px)' }}>
          <CubeFaceContent onClick={() => handleSelectBox('ZC1')}>
            <CubeFaceText >ZC1</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('ZC2')}>
            <CubeFaceText >ZC2</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('ZC3')}>
            <CubeFaceText >ZC3</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('ZB1')}>
            <CubeFaceText >ZB1</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('ZB2')}>
            <CubeFaceText >ZB2</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('ZB3')}>
            <CubeFaceText >ZB3</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('ZA1')}>
            <CubeFaceText>ZA1</CubeFaceText>
            <CubeFaceText onClick={(e) => e.stopPropagation()} style={{ top: '150%', fontSize:'16px' }}>1: Invest</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('ZA2')}>
            <CubeFaceText>ZA2</CubeFaceText>
            <CubeFaceText onClick={(e) => e.stopPropagation()} style={{ top: '150%', fontSize:'16px' }}>2: Lend</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('ZA3')}>
            <CubeFaceText>ZA3</CubeFaceText>
            <CubeFaceText onClick={(e) => e.stopPropagation()} style={{ top: '150%', fontSize:'16px' }}>3: Spend</CubeFaceText>
          </CubeFaceContent>
        </CubeFace>

        {/* Top face */}
        <CubeFace className="top common-face" style={{ transform: 'rotateX(90deg) translateZ(150px)' }}>
          <CubeFaceContent onClick={() => handleSelectBox('XC3')}>
            <CubeFaceText >XC3</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('YC3')}>
            <CubeFaceText >YC3</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('ZC3')}>
            <CubeFaceText >ZC3</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('XC2')}>
            <CubeFaceText >XC2</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('YC2')}>
            <CubeFaceText >YC2</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('ZC2')}>
            <CubeFaceText >ZC2</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('XC1')}>
            <CubeFaceText >XC1</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('YC1')}>
            <CubeFaceText >YC1</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('ZC1')}>
            <CubeFaceText >ZC1</CubeFaceText>
          </CubeFaceContent>
        </CubeFace>

        {/* Bottom face */}
        <CubeFace className="bottom common-face" style={{ transform: 'rotateX(-90deg) translateZ(150px)' }}>
          <CubeFaceContent onClick={() => handleSelectBox('AX1')}>
            <CubeFaceText >AX1</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('AY1')}>
            <CubeFaceText >AY1</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('AZ1')}>
            <CubeFaceText >AZ1</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('AX2')}>
            <CubeFaceText >AX2</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('AY2')}>
            <CubeFaceText >AY2</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('AZ2')}>
            <CubeFaceText >AZ2</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('AX3')}>
            <CubeFaceText >AX3</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('AY3')}>
            <CubeFaceText >AY3</CubeFaceText>
          </CubeFaceContent>
          <CubeFaceContent onClick={() => handleSelectBox('AZ3')}>
            <CubeFaceText >AZ3</CubeFaceText>
          </CubeFaceContent>
        </CubeFace>
      </Cube>
    </CubeContainer>   
        </>
    );
};

export default CustomCube2;