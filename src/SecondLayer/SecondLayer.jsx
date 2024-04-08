import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Container, Grid, IconButton, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { red, teal } from '@mui/material/colors';
import { cubeBgColors } from '../utils/cubeColors';


const useStyles = makeStyles({
    container: {
        display: 'flex !important',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    board: {
        width: '336px',
        padding: '4px',
        backgroundColor: "white",
    },
    box: {
        cursor: 'pointer',
        color: "black",
        width: '80px',
        height: '80px',
        alignItems: 'center',
        textAlign: 'center'
        // backgroundColor: 'gray',
    }
})
const secondArr = [
    { value: 'UK', },
    { value: 'US', },
    { value: 'UK', },
    { value: 'UK', },
    { value: 'US', },
    { value: 'UK', },
    { value: 'UK', },
    { value: 'US', },
    { value: 'UK', },
    { value: 'UK', },
    { value: 'US', },
    { value: 'UK', },
    { value: 'UK', },
    { value: 'US', },
    { value: 'UK', },
    { value: 'UK', },
    { value: 'UK', },
    { value: 'US', },
    { value: 'UK', },
    { value: 'UK', },
    { value: 'UK', },
    { value: 'UK', },
    { value: 'UK', },
    { value: 'UK', },
];

// const cubeArr = [

// ]

const cubeObj = {
    titles: [
        "Energy",
        "Materials",
        "Industrials",
        "Consumer Discretionar",
        "Consumer Staples",
        "Health Care",
        "Financials",
        "Information Technolog",
        "Communication Service",
        "Utilities",
        "Real Estate",
    ],
    colorCodes: [-8, -5, -3, -2, -1, 2, 0, 3, 1, -4, 1],
}











const getBackgroundColor = (value) => {
    if (value === 0) {
      return 'transparent';
    }

    const isDark = value < 0;
    const density = Math.abs(value) * 100;
    // const color = isDark ? 'red' : 'green';
    const bgcolor = isDark ? red[density] : teal[density];
    return bgcolor;

    // console.log(color)

    // const finalColor = `linear-gradient(to right, ${color} ${density}%, transparent ${density}%)`;
    // console.log("finalColor", finalColor)
    // return finalColor;
    
  };


const SecondLayer = ({ setStep, setActiveValues }) => {
    const classes = useStyles();
    const [nextLayer, setNextLayer] = useState(true);

    const handleClick = (payload) => {
        setActiveValues(payload);
        setStep('thirdLayer')
    };

    const getBackHandler = () => {
        setStep('firstLayer')
    }
    return (
        <Container className={classes.container}>
            <Box>
                <IconButton onClick={getBackHandler} sx={{ bgcolor: 'gray !important', color: '#ffffff' }}><ArrowBackIcon /> </IconButton>
                <Box className={classes.board} mt={3}>
                    <Grid container spacing={0.5}>
                        {cubeObj.titles.map((item, index) => (
                            <Grid key={index} item xs={3}>
                                <Stack
                                    onClick={() => handleClick(item)}
                                    className={classes.box}
                                    sx={{
                                        //   background: `radial-gradient(circle, hsla(313, 39%, 93%, 1) 0%, ${cubeBgColors[index]?.color} 0%, hsla(193, 81%, 84%, 1) 100%)`,
                                        // background: `${''}`,
                                        background: getBackgroundColor(cubeObj.colorCodes[index]),
                                    }}
                                    alignItems="center"
                                    justifyContent={"center"}
                                >
                                    {item}
                                </Stack>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default SecondLayer