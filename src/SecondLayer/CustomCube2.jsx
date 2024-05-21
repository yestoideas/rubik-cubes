/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';

const CubeContainer = styled('div')(({ theme }) => ({
  color: '#eee',
  display: 'flex',
  alignItems: 'center',
  height: '100vh',
  justifyContent: 'center',
  perspective: '10000px',
  width:"100%"
}));

const Cube = styled('div')(({ theme }) => ({
  width: '300px',
  height: '300px',
  transformStyle: 'preserve-3d',
//   transform: 'rotateX(-19.7262deg) rotateY(-22.1615deg)',
  transition: 'transform 0.6s ease-out',
}));

const CubeFace = styled('div')(({ theme }) => ({
  width: '300px',
  height: '300px',
  position: 'absolute',
  fontSize: '22px',
  background: 'white',
  color: '#000',
  fontWeight: 'bold',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
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

    // console.log('first', `rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`)
    return (
        <>
 <CubeContainer
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className='cube-containers'
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