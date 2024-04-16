import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Container, Grid, IconButton, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { createRef, useEffect, useRef, useState } from 'react';
import { red, teal } from '@mui/material/colors';
import { cubeBgColors } from '../utils/cubeColors';


const useStyles = makeStyles({
    container: {
        display: 'flex !important',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    board: {
        // width: '336px',
        // padding: '4px',
        // backgroundColor: "white",
        maxWidth: '768px', 
        width: '100%',
    },
    box: {
        cursor: 'pointer',
        color: "black",
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

const cubeObj = [
    { title: 'Energy', value: -8 , overview: `Overview: The energy sector, comprising companies involved in the exploration, production, and marketing of oil, gas, and renewable energy sources, has historically been one of the largest contributors to greenhouse gas (GHG) emissions. The score reflects the sector's significant negative impact on climate mitigation efforts, primarily due to the reliance on fossil fuels, which are major sources of carbon dioxide (CO2) and methane (CH4) emissions.

    Factors Influencing Score:
    
    High Carbon Footprint: The extraction and burning of fossil fuels for energy production are the primary sources of CO2 emissions worldwide, contributing significantly to global warming.
    Risk Exposure: Energy companies are exposed to high levels of physical and transition risks. Physical risks include the direct impacts of climate change, such as extreme weather events affecting infrastructure. Transition risks involve the shift towards a low-carbon economy, potentially rendering fossil fuel investments and assets obsolete.
    Regulatory and Policy Challenges: The sector faces increasing scrutiny from governments and regulatory bodies, pushing for a reduction in emissions and a transition to cleaner energy sources. Compliance with these policies requires substantial investment in technology and infrastructure, presenting financial and operational risks.
    Technological Transition: The slow pace of transition to renewable energy sources and the adoption of carbon capture and storage (CCS) technologies also contribute to the sector's negative score. While there is progress, the scale and speed of transformation are not yet sufficient to mitigate climate risks effectively.`},
    { title: 'Materials', value: -5 , overview: `Overview: The materials sector includes companies involved in the discovery, development, and processing of raw materials, such as metals, chemicals, and forestry products. This sector is a significant contributor to emissions due to energy-intensive manufacturing processes and the use of non-renewable resources.

    Factors Influencing Score:
    
    Energy Intensive Processes: Many processes in the materials sector, such as chemical production, metal smelting, and cement manufacturing, require large amounts of energy, typically sourced from fossil fuels, leading to substantial GHG emissions.
    Resource Extraction Impact: The extraction of raw materials can have severe environmental impacts, including deforestation, biodiversity loss, and soil and water pollution, further exacerbating climate risks.
    Transition Challenges: While the sector is exploring more sustainable practices and materials, such as recycling and the use of lower-impact raw materials, these efforts are in the early stages and face technical, economic, and regulatory hurdles.
    Innovation and Regulation: The sector is subject to increasing regulatory pressures to reduce its environmental footprint, requiring investments in cleaner technologies and processes. However, the pace of innovation and adoption of these technologies varies widely across the sector.`},
    { title: 'Industrials', value: -3 , overview: `Overview: The industrials sector, encompassing a broad range of companies, including construction, machinery, aerospace, and transportation, has a significant environmental footprint due to its diverse activities. Its score reflects both the challenges in reducing emissions and the potential for implementing risk reduction strategies through innovation and efficiency improvements.

    Factors Influencing Score:
    
    Diverse Emissions Sources: Emissions stem from various sources, including manufacturing processes, logistics, and the use of the sector's products. This diversity makes broad mitigation strategies complex to implement.
    Efficiency Gains: There is potential for risk reduction through energy efficiency improvements, lean manufacturing, and the adoption of green technologies. However, the scale and pace of these changes are critical factors.
    Transition Risks: The sector is undergoing a transition towards more sustainable practices, but faces challenges in balancing operational efficiency, cost, and environmental considerations. Investments in cleaner technologies are essential but come with financial and technological risks.
    Regulatory Compliance: Compliance with environmental regulations and standards can drive improvements but also imposes additional costs and operational challenges.`},
    { title: 'Consumer Discretionar', value: -2 , overview: `Overview: This sector includes companies related to non-essential goods and services, such as automotive, retail, and hospitality. The score reflects the sector's potential to influence consumer behavior towards more sustainable practices, though it also faces challenges related to production processes and product lifecycles.

    Factors Influencing Score:
    
    Product Design and Use: Opportunities for mitigating climate risks include designing products with lower environmental impacts and promoting sustainable consumption patterns.
    Supply Chain Emissions: The sector can reduce its carbon footprint by adopting sustainable supply chain practices, though this requires coordination across multiple stakeholders.
    Consumer Engagement: Companies in this sector can play a significant role in educating consumers about sustainability, although changing consumer behavior is a long-term challenge.
    Innovation in Materials and Processes: There is potential for significant risk reduction through the use of sustainable materials and more efficient production processes. However, these innovations must be scaled up to have a meaningful impact.`},
    { title: 'Consumer Staples', value: -1 , overview: `Overview: The consumer staples sector covers essential goods such as food, beverage, and household products. It is positioned slightly better due to its essential nature and the growing consumer demand for sustainable products, but it still faces significant challenges in agricultural practices, packaging, and distribution.

    Factors Influencing Score:
    
    Sustainable Agriculture: Transitioning to sustainable agricultural practices can significantly reduce the sector's environmental impact, though challenges remain in scalability and cost.
    Packaging Innovations: Reducing packaging waste and innovating with biodegradable materials can contribute to climate mitigation, with many companies already making strides in this area.
    Supply Chain Optimization: Energy efficiency in supply chains and reducing food waste are critical areas for risk reduction, requiring investments in technology and process improvements.
    Consumer Preferences: The sector benefits from a shift towards sustainable products, but balancing cost and accessibility is a crucial challenge.`},
    { title: 'Health Care', value: 2 , overview: `Overview: The health care sector, comprising companies providing medical services, equipment, and pharmaceuticals, receives a more positive score due to its lower direct environmental impact compared to other sectors and opportunities for contributing to public health resilience against climate change impacts.

    Factors Influencing Score:
    
    Operational Efficiencies: Implementing energy-efficient practices in healthcare facilities and reducing waste in medical supplies can contribute to risk reduction.
    Research and Development: Innovations in pharmaceuticals and medical technologies can reduce the environmental impact of health care and improve public health resilience to climate change.
    Sustainable Practices: There is a growing movement within the sector to adopt greener practices, though the pace and consistency of these efforts vary.
    Climate-Related Health Challenges: The sector plays a critical role in addressing health issues related to climate change, such as increased disease prevalence and heat-related illnesses, representing a form of indirect climate risk mitigation.`},
    { title: 'Financials', value: 0 , overview: `Overview: The financial sector, including banks, insurance companies, and investment firms, is central to funding the transition to a low-carbon economy. Its score reflects the sector's unique position to influence climate mitigation through investment decisions, despite having a minimal direct environmental impact.

    Factors Influencing Score:
    
    Green Financing: Increasing investments in sustainable projects and companies can significantly reduce climate risks. The sector's ability to direct capital towards green initiatives is a critical factor in its score.
    Risk Management: Financial institutions are developing sophisticated models to assess climate risks and adjust their portfolios accordingly, promoting climate risk reduction across the economy.
    Regulatory Compliance and Disclosure: The sector is subject to growing regulatory requirements for disclosing climate-related risks and integrating sustainability into financial decision-making.
    Sustainable Insurance Products: Insurance companies can contribute to risk reduction by offering products that incentivize sustainable practices among businesses and homeowners.`},
    { title: 'Information Technolog', value: 3 , overview: `Overview: The information technology sector, encompassing software, hardware, and services, is seen as a positive force for climate mitigation and risk reduction. This is due to its role in enabling efficiencies, developing innovative solutions, and the potential to significantly influence other sectors' sustainability practices.

    Factors Influencing Score:
    
    Energy Efficiency: The sector drives improvements in energy efficiency both within its operations and through the products and services it offers, such as cloud computing and data analytics for optimizing energy use.
    Innovative Solutions: IT companies are at the forefront of developing solutions that contribute to climate mitigation, including renewable energy technologies, smart grids, and environmental monitoring systems.
    Digitalization and Dematerialization: Advancements in IT facilitate the transition to a digital economy, reducing the need for physical materials and associated environmental impacts.
    Sustainable Practices: The sector is increasingly adopting sustainable operational practices, such as using renewable energy sources and designing energy-efficient data centers.`},
    { title: 'Communication Service', value: 1 , overview: `Overview: This sector includes telecommunications, media, and entertainment companies. While the direct environmental impact of this sector is relatively low, it plays a crucial role in promoting sustainability through digital connectivity and content dissemination.

    Factors Influining Score:
    
    Enabling Remote Work and Connectivity: The sector reduces the need for travel and transportation, indirectly contributing to emissions reductions.
    Content and Awareness: Media companies have the power to influence public opinion and raise awareness about climate change and sustainability issues, promoting behavioral change.
    Infrastructure Efficiency: Telecommunications companies are investing in more energy-efficient network infrastructure, although the energy consumption of data centers and networks remains a concern.
    Digital Access and Inclusion: Expanding access to digital services can support education and innovation in sustainability, though this requires managing electronic waste and the environmental impact of digital infrastructure.`},
    { title: 'Utilities', value: -4 , overview: `Overview: The utilities sector, providing electricity, gas, and water services, is critical for the transition to a sustainable energy future. Its negative score primarily reflects the ongoing dependence on fossil fuels in many regions, though there is significant potential for positive impact through the adoption of renewable energy sources.

    Factors Influencing Score:
    
    Renewable Energy Transition: The sector's shift towards renewable energy sources, such as wind, solar, and hydroelectric power, is essential for climate mitigation and reducing carbon emissions.
    Grid Modernization: Investing in smart grid technologies can improve energy efficiency and reliability, facilitating the integration of renewable sources and demand response initiatives.
    Regulatory Environment: Utilities are heavily regulated, with policies that can either accelerate or hinder the transition to cleaner energy sources. Compliance and adaptation to these regulations are key challenges.
    Energy Efficiency Programs: Utilities can offer programs to help consumers reduce their energy use, contributing to overall emissions reductions. However, the effectiveness of these programs varies.`},
    { title: 'Real Estate', value: 1, overview: `Overview: The real estate sector, including residential, commercial, and industrial properties, has a significant impact on the environment through energy consumption, construction practices, and urban development. Its score reflects the sector's potential for adopting sustainable building practices and energy efficiency improvements.

    Factors Influencing Score:
    
    Sustainable Building Practices: The adoption of green building standards, such as LEED and BREEAM, can significantly reduce the environmental impact of new and existing buildings.
    Energy Efficiency: Improvements in building insulation, HVAC systems, and lighting can reduce energy consumption and GHG emissions.
    Urban Planning: Sustainable urban development practices that promote density, mixed-use development, and public transportation can reduce the carbon footprint of cities.
    Innovation in Materials: The use of sustainable construction materials and techniques can further mitigate the environmental impact of the sector.`},
]










const getBackgroundColor = (value) => {
    const redValues = ['#FFDADA', '#FFBBBB', '#FF8B8B', '#FF4949', '#FF1111', '#FF0000', '#E70000', '#800000'];
    const greenValues = ['#DFFBCC', '#C0F89E', '#96F066', '#72E338', '#4CBB17', '#3CA10F', '#2F7A11', '#296113'];

    if (value === 0) {
        return '#ffffff';
    } else if (value < 0) {
        return redValues[Math.abs(value) - 1];
    } else {
        return greenValues[value - 1];
    }
    // const isDark = value < 0;
    // const density = Math.abs(value) * 100;
    // // const color = isDark ? 'red' : 'green';
    // const bgcolor = isDark ? red[density] : teal[density];
    // return bgcolor;
};


const SecondLayer = ({ setStep, setActiveValues }) => {
    const classes = useStyles();
    const [nextLayer, setNextLayer] = useState(true);
    const [boxHeight, setBoxHeight] = useState(80);

    const handleClick = (payload) => {
        setActiveValues(payload);
        setStep('thirdLayer')
    };

    const getBackHandler = () => {
        setStep('firstLayer')
    }

    const boxRefs = useRef([]);

    useEffect(() => {
      const widths = boxRefs.current.map((ref) => ref.current.getBoundingClientRect().width);
      const maxBoxWidth = Math.max(...widths);
      console.log(maxBoxWidth)
    //   setMaxWidth(maxBoxWidth);
    }, []);

    return (
        <Container className={classes.container}>
            <Box>
                <IconButton onClick={getBackHandler} sx={{ bgcolor: 'gray !important', color: '#ffffff' }}><ArrowBackIcon /> </IconButton>
                <Box className={classes.board} mt={3}>
                    <Grid container spacing={2}>
                        {cubeObj.map((item, index) => {
                            boxRefs.current[index] = boxRefs.current[index] || createRef();
                            return (
                            <Grid key={index} item xs={3}>
                                <Stack
                                    ref={boxRefs.current[index]}
                                    onClick={() => handleClick(item)}
                                    className={classes.box}
                                    sx={{
                                        background: getBackgroundColor(item.value),
                                        height: boxHeight, minWidth: 80,
                                        width: '100%',
                                        p: 0.5,
                                        display: 'flex',
                                        borderRadius: 2,
                                    }}
                                    alignItems="center"
                                    justifyContent={"center"}
                                >
                                    <Typography variant='body2'>{item.title}</Typography>
                                </Stack>
                            </Grid>
                        )})}
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default SecondLayer