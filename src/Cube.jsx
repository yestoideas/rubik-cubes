/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { Box, Environment, Html, OrbitControls, RenderTexture, Stats, Text } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import TWEEN from '@tweenjs/tween.js'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { FontLoader, TextGeometry } from 'three/examples/jsm/Addons.js'
import { ColorConverter } from 'three/examples/jsm/math/ColorConverter'

// function SingleCube({ position, geometry, onClick }) {
//     const textCanvas = document.createElement('canvas');
//     const contextCanvas = textCanvas.getContext('2d');
//     const x = textCanvas.width / 2;
//     const y = textCanvas.height / 2;
//     contextCanvas.fillRect(0, 0, 600, 600);
//     contextCanvas.fillStyle = "white";
//     contextCanvas.font = 'bold 20px Arial';
//     contextCanvas.strokeStyle = '#ffffff';
//     contextCanvas.textAlign = 'center';
//     contextCanvas.shadowColor = '#ffffff';
//     contextCanvas.fillText('Simple Text', x, y,);

//     //     strDataURI = canvas.toDataURL("image/jpeg");
//     // imag = new Image();
//     // imag.src = strDataURI;
//     // const mesh = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( imag.src ) } );
//     const textTextture = new THREE.CanvasTexture(textCanvas,
//         ColorConverter.setHSV(new THREE.Color('green'), 1, 1, 1)
//     );
//     // const textTextture = new THREE.CanvasTexture(textCanvas);

//     // console.log(contextCanvas)

//     // THREE.ImageUtils.crossOrigin = '';
//     // // var texture = THREE.ImageUtils.loadTexture('./assets/cam.jpg');
//     // let texture = THREE.ImageUtils.loadTexture('./assets/cam.jpg');
//     // texture.anisotropy = Renderer.getMaxAnisotropy();


//     const loaders = new THREE.TextureLoader();
//     const _img_texture = loaders.load('/public/assets/cam.jpg');
//     // const cubeMaterial = new THREE.MeshStandardMaterial({ map: _img_texture });
//     // console.log(texture)

//     // const _imgLoader = useLoader(TextureLoader, '/public/assets/cam.jpg');


//     const textRef = useRef();

//     return (
//         <mesh position={position} geometry={geometry} onClick={onClick} scale={1.5}>
//             {[...Array(6).keys()].map((i) => (
//                 <meshStandardMaterial key={i} attach={`material-${i}`}
//                 // // map={texture}
//                 // // {...cubeMaterial[i]}
//                 // map={textTextture}
//                 // // color={'green'}
//                 // blendColor={'#000000'}
//                 // // aoMapIntensity={10}
//                 //  />
//                 >
//                     <RenderTexture attach="map" anisotropy={1}>
//                         <color attach="background" args={['#ffffff']} />
//                         <ambientLight intensity={0.5} />
//                         <Text ref={textRef} fontSize={4} color="#000000">
//                             hello
//                         </Text>
//                     </RenderTexture>
//                 </meshStandardMaterial>
//             ))}
//         </mesh>
//     )
// }

function Cube({ setStep, setIsLoading }) {
    const ref = useRef();
    const roundedBoxGeometry = useMemo(() => {
        return new RoundedBoxGeometry(1, 1, 1, 1, 0.05)
    }, []);

    // console.log("RoundedBoxGeometry", roundedBoxGeometry)

    const [showSingleCube, setShowSingleCube] = useState(false)
    const [singleCubePosition, setSingleCubePosition] = useState([0, 0, 0]);


    const [dbClickTimer, setDbClickTimer] = useState(null);

    const handlePointerEnter = () => {
        setStep('secondtLayer');
        setIsLoading(true);
    }

    const handleCubeletClick = (position, exactPosition) => {

        console.log("exactPosition", exactPosition);
        // setSingleCubePosition(position);
        if (dbClickTimer) {
            clearTimeout(dbClickTimer);
            setDbClickTimer(null);

            // setShowSingleCube(!showSingleCube);

            setStep('secondtLayer')
        } else {
            const timer = setTimeout(() => {
                setDbClickTimer(null);
            }, 200);
            setDbClickTimer(timer);
        }
    }


    useFrame(() => {
        TWEEN.update()
    });

    useEffect(() => {
        return () => {
            clearTimeout(dbClickTimer);
        };
    }, []);

    return (
        <>
            {/* {showSingleCube ? (
                <SingleCube
                    position={singleCubePosition}
                    geometry={new RoundedBoxGeometry(2, 2, 2, 1, 0.05)}
                    onClick={() => handleCubeletClick(singleCubePosition)}
                />
            ) : ( */}
            <group ref={ref}>
                {[...Array(3).keys()].map((x, i) =>
                    [...Array(3).keys()].map((y, j) =>
                        [...Array(3).keys()].map((z, k) => (
                            <Cubelet
                                indexes={[i, j, k]}
                                positionss={[x, y, z]}
                                key={x + y * 3 + z * 9}
                                position={[x - 1, y - 1, z - 1]}
                                geometry={roundedBoxGeometry}
                                onPointerEnter={handlePointerEnter}
                                onClick={() => handleCubeletClick([x - 1, y - 1, z - 1], [x, y, z])}
                            />
                        ))
                    )
                )}
            </group>
            {/* )} */}
        </>
    )
}

function Cubelet({ position, geometry, onPointerEnter, onClick, indexes, positionss }) {
    // console.log('position', positionss, "indexes", indexes);
    // console.log('position', position, "indexes", indexes);


    return (

        <mesh position={position} geometry={geometry} onPointerEnter={onPointerEnter}  onClick={onClick} scale={[1, 1, 1]}>
            {[...Array(6).keys()].map((i) => (
                <meshStandardMaterial key={i} attach={`material-${i}`} />
            ))}
            {/* <Html occlude distanceFactor={3.5} position={[0, 0, 0.51]} transform>
        <span>xc1</span>
      </Html> */}
            {/* <Text
        position={[-1, 0.5, 0.5]} // Adjust for each face
        fontSize={0.1}
        anchorX="center"
        anchorY="middle"
        color={"black"}
        // material={{ color: 'black' }} // Adjust material properties
      >
        Bangladesh
      </Text> */}
            {/* <Text
        position={[0.5, 0.5, 0.1]} // Adjust for each face
        fontSize={0.1}
        anchorX="center"
        anchorY="middle"
        color={"black"}
        // material={{ color: 'black' }} // Adjust material properties
      >
        Bangladesh
      </Text> */}
            {/* <boxGeometry args={[1, 1, 1]} />
      */}

            {/* <meshStandardMaterial color="white" />
      <CubeLabel text="Front" position={[0, 0, 0.51]} rotation={[0, 0, 0]} />
      <CubeLabel text="Back" position={[0, 0, -0.51]} rotation={[0, Math.PI, 0]} />
      <CubeLabel text="Top" position={[0, 0.51, 0]} rotation={[Math.PI / 2, 0, 0]} />
      <CubeLabel text="Bottom" position={[0, -0.51, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      <CubeLabel text="Left" position={[-0.51, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
      <CubeLabel text="Right" position={[0.51, 0, 0]} rotation={[0, Math.PI / 2, 0]} />  */}
            {/* <meshStandardMaterial color="white" />
      <CubeLabel text="Front" position={[-3, 0, 0.51]} rotation={[0, 0, 0]} /> */}
            {/* <CubeLabel text="Back" position={[0, 0, -0.51]} rotation={[0, Math.PI, 0]} />
      <CubeLabel text="Top" position={[0, 0.51, 0]} rotation={[Math.PI / 2, 0, 0]} />
      <CubeLabel text="Bottom" position={[0, -0.51, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      <CubeLabel text="Left" position={[-0.51, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
      <CubeLabel text="Right" position={[0.51, 0, 0]} rotation={[0, Math.PI / 2, 0]} />  */}
        </mesh>
    )
}
// const colorGrades = {
//     XA1:[-8,-5,-3,-2,-1,2,0,3,1,-4,1],
//     XB1:[-7,-4,-2,-1,0,3,1,4,2,-2,2],
//     XC1:[-6,-3,-1,0,1,4,2,5,3,-1,3],
//     YA1:[-6,-3,-1,0,1,3,2,4,2,2,3],
//     YB1:[-5,-2,0,1,2,4,3,5,3,3,4],
//     YC1:[-4,-1,1,2,3,5,4,6,4,4,5],
//     ZA1:[-8,-4,-2,-1,0,2,1,3,1,-3,2],
//     ZB1:[-7,-3,-1,0,1,3,2,4,2,-1,3],
//     ZC1:[-6,-2,0,1,2,4,3,5,3,0,4],
// };

const sectors = [
    {
        title: "Energy",
        overviews: [
            {
                title: 'XA',
                details: `Risk Reduction Actions: The energy sector, comprising companies involved in the exploration, production, and marketing of oil, gas, and renewable energy sources, has historically been one of the largest contributors to greenhouse gas (GHG) emissions. The score reflects the sector's significant negative impact on climate mitigation efforts, primarily due to the reliance on fossil fuels, which are major sources of carbon dioxide (CO2) and methane (CH4) emissions.

                Factors Influencing Score:
                
                High Carbon Footprint: The extraction and burning of fossil fuels for energy production are the primary sources of CO2 emissions worldwide, contributing significantly to global warming.
                Risk Exposure: Energy companies are exposed to high levels of physical and transition risks. Physical risks include the direct impacts of climate change, such as extreme weather events affecting infrastructure. Transition risks involve the shift towards a low-carbon economy, potentially rendering fossil fuel investments and assets obsolete.
                Regulatory and Policy Challenges: The sector faces increasing scrutiny from governments and regulatory bodies, pushing for a reduction in emissions and a transition to cleaner energy sources. Compliance with these policies requires substantial investment in technology and infrastructure, presenting financial and operational risks.
                Technological Transition: The slow pace of transition to renewable energy sources and the adoption of carbon capture and storage (CCS) technologies also contribute to the sector's negative score. While there is progress, the scale and speed of transformation are not yet sufficient to mitigate climate risks effectively.`,
            },
            {
                title: 'XB',
                details: `Transition Efforts: The energy sector's transition score reflects the inherent challenge of shifting from high-carbon fossil fuel-based energy sources to low-carbon renewable energies. The sector's efforts are critical for global climate mitigation, given its substantial contribution to global greenhouse gas emissions.

                Factors Influencing Score:
                
                Fossil Fuel Dependence: The sector's current heavy reliance on fossil fuels is a significant barrier to climate mitigation. Transitioning requires a substantial shift in investment towards renewable energy sources such as wind, solar, and hydroelectric power.
                Renewable Energy Investment: While there is growing investment in renewable energy, the scale and pace are insufficient to meet global climate targets. The transition is further complicated by existing infrastructure, capital sunk into fossil fuel assets, and fluctuating policy support.
                Innovation and Technology Adoption: The development and deployment of new technologies, including carbon capture and storage (CCS) and green hydrogen, are crucial for reducing emissions from this sector. However, these technologies face challenges in scalability, cost, and technology maturity.`,
            },
            {
                title: 'XC',
                details: `Solutions Contribution: The energy sector's score reflects its central role in addressing climate change through the transition to renewable energy sources and the development of technologies to reduce carbon intensity. Despite its historical association with high emissions, the sector's shift towards renewables and other clean energy solutions is pivotal.

                Factors Influencing Score:
                
                Renewable Energy Deployment: Significant investments in solar, wind, hydro, and other renewable energy technologies are crucial for reducing global GHG emissions. The sector's efforts to scale up these resources are essential, though the transition pace needs to accelerate.
                Innovative Technologies: Beyond traditional renewables, the exploration and implementation of next-generation solutions like advanced biofuels, geothermal energy, and green hydrogen play into the sector's solutions score. Their development and commercial viability are key to future impacts.
                Carbon Capture, Utilization, and Storage (CCUS): Efforts to develop and deploy CCUS technologies aim to mitigate emissions from fossil fuel use, particularly in sectors where decarbonization is challenging. The effectiveness and scalability of these technologies are still under scrutiny.`,
            },
            {
                title: 'YA',
                details: `Risk Reduction Actions: The energy sector's involvement in risk reduction revolves around adapting its operations and infrastructure to minimize the adverse impacts of climate change on energy production and distribution systems.

                Factors Influencing Score:
                
                Infrastructure Resilience: Investments to make energy infrastructure more resilient to extreme weather events, such as reinforcing power lines and waterproofing facilities, are critical for maintaining energy supply during climate-induced disasters.
                Diversification of Energy Sources: By diversifying into renewable energy sources, the sector reduces its vulnerability to climate change impacts, ensuring a more stable and reliable energy supply.
                Emergency Preparedness Plans: Developing comprehensive emergency response strategies to quickly restore services after extreme weather events, minimizing the downtime and its cascading effects on other sectors and communities.`,
            },
            {
                title: 'YB',
                details: `Transition Efforts: The energy sector is pivotal in transitioning towards supporting global adaptation efforts, mainly by shifting away from fossil fuels towards renewable energy sources that have less impact on climate change, thereby reducing the need for adaptation in the first place.

                Factors Influencing Score:
                
                Renewable Energy Investments: Significantly increasing investments in renewable energy to decrease dependency on fossil fuels, directly contributing to mitigation efforts and reducing the global burden of adaptation.
                Energy Efficiency Programs: Implementing and promoting energy efficiency across industries and households to reduce overall energy demand and the associated environmental impact.
                Support for Community Resilience Projects: Engaging in and supporting projects that increase the resilience of communities to climate change impacts, such as improving the reliability and accessibility of clean energy sources in vulnerable areas.`,
            },
            {
                title: 'YC',
                details: `Solutions Contribution: The energy sector can offer adaptation solutions by providing reliable, sustainable, and adaptable energy sources to communities affected by climate change, and by innovating in energy technologies that support resilient infrastructure.

                Factors Influencing Score:
                
                Renewable and Distributed Energy Solutions: Offering energy solutions that are less susceptible to climate disruptions, such as solar microgrids in rural or disaster-prone areas, enhances community resilience.
                Energy Storage Innovations: Developing and deploying energy storage technologies to ensure energy reliability during extreme weather events or other climate impacts.
                Cooling Solutions: Providing efficient cooling technologies or renewable-powered air conditioning systems to mitigate the health and productivity impacts of heatwaves.`,
            },
            {
                title: 'ZA',
                details: `Risk Reduction Actions: The energy sector's activities, particularly in fossil fuel extraction and power generation, pose significant risks to biodiversity. Efforts to reduce these risks involve minimizing habitat disruption, reducing pollution, and transitioning towards less impactful forms of energy.

                Factors Influencing Score:
                
                Minimizing Habitat Disruption: Implementing measures to reduce the physical footprint of energy projects on natural habitats, such as directional drilling and platform sharing in oil and gas extraction.
                Pollution Control: Enhancing pollution control measures to prevent spills, leaks, and emissions harmful to local ecosystems, particularly in sensitive or protected areas.
                Renewable Energy Shift: Increasing investment in renewable energy sources that have a lower overall impact on biodiversity, while recognizing the need to carefully site solar and wind projects to avoid critical habitats.`,
            },
            {
                title: 'ZB',
                details: `Transition Efforts: The energy sector is moving towards more sustainable practices that have less impact on biodiversity, primarily through the adoption of renewable energy sources and the implementation of stricter environmental safeguards in operations.

                Factors Influencing Score:
                
                Shift to Renewable Energy: Transitioning from fossil fuels to renewable energy sources reduces habitat disruption, pollution, and climate change impacts, all of which benefit biodiversity.
                Environmental Safeguards: Implementing enhanced environmental safeguards and restoration practices in both renewable and non-renewable projects to minimize and mitigate direct impacts on biodiversity.
                Investment in Biodiversity Projects: Some energy companies are investing in biodiversity projects, such as habitat restoration and species protection initiatives, as part of their environmental responsibility and offset strategies.`,
            },
            {
                title: 'ZC',
                details: `Solutions Contribution: The energy sector's contributions to biodiversity solutions involve restoring habitats affected by energy projects, investing in green energy technologies that have minimal impacts on biodiversity, and supporting conservation efforts.

                Factors Influencing Score:
                
                Habitat Restoration Projects: Initiating projects to restore habitats disturbed by energy development, such as replanting vegetation and creating artificial wetlands.
                Renewable Energy: Promoting the use of solar, wind, and hydroelectric power, which, when carefully sited and managed, have lower impacts on biodiversity than fossil fuels.
                Conservation Partnerships: Partnering with environmental organizations to support biodiversity conservation projects, such as protecting endangered species and preserving critical habitats.`,
            },
        ],
    },
    {
        title: "Materials",
        overviews: [
            {
                title: 'XA',
                details: `Risk Reduction Actions: The materials sector includes companies involved in the discovery, development, and processing of raw materials, such as metals, chemicals, and forestry products. This sector is a significant contributor to emissions due to energy-intensive manufacturing processes and the use of non-renewable resources.

                Factors Influencing Score:
                
                Energy Intensive Processes: Many processes in the materials sector, such as chemical production, metal smelting, and cement manufacturing, require large amounts of energy, typically sourced from fossil fuels, leading to substantial GHG emissions.
                Resource Extraction Impact: The extraction of raw materials can have severe environmental impacts, including deforestation, biodiversity loss, and soil and water pollution, further exacerbating climate risks.
                Transition Challenges: While the sector is exploring more sustainable practices and materials, such as recycling and the use of lower-impact raw materials, these efforts are in the early stages and face technical, economic, and regulatory hurdles.
                Innovation and Regulation: The sector is subject to increasing regulatory pressures to reduce its environmental footprint, requiring investments in cleaner technologies and processes. However, the pace of innovation and adoption of these technologies varies widely across the sector.`,
            },
            {
                title: 'XB',
                details: `Transition Efforts: The materials sector, including industries like metals, chemicals, and building materials, is pivotal in the climate mitigation transition due to its role in supplying essential materials for renewable energy technologies and infrastructure while needing to drastically reduce its own emissions.

                Factors Influencing Score:
                
                High Emissions Intensity: Many processes in the materials sector are energy-intensive and carbon-heavy, especially in steel and cement production, which are among the largest industrial sources of CO2 emissions.
                Circular Economy and Recycling: Transitioning towards a circular economy, where materials are reused and recycled, reduces the need for raw material extraction and lowers emissions. Progress in this area is essential but uneven across the sector.
                Innovation in Production Processes: Efforts to innovate and adopt lower-emission production technologies are underway, such as electrification of processes and use of alternative, less carbon-intensive materials. The pace of adoption and the technological challenges involved impact the sector's transition score.`,
            },
            {
                title: 'XC',
                details: `Solutions Contribution: The materials sector is crucial for providing the raw materials needed for renewable energy technologies and energy-efficient infrastructure, making it integral to climate mitigation solutions. Efforts to innovate in material efficiency and recycling also contribute to reducing the sector's carbon footprint.

                Factors Influencing Score:
                
                Sustainable Materials: Development of lighter, stronger, and more recyclable materials for use in various industries, including construction and automotive, which can lead to significant emissions reductions.
                Circular Economy Initiatives: Advancements in recycling technologies and the implementation of circular economy principles help reduce demand for virgin materials, lowering the sector's environmental impact.
                Low-Carbon Production Processes: Innovations in reducing the carbon intensity of material production, such as electrification of industrial processes and use of renewable energy, are vital. The sector's efforts in this area are growing but need to scale significantly.`,
            },
            {
                title: 'YA',
                details: `Risk Reduction Actions: In the materials sector, risk reduction is centered on minimizing the environmental impact of material extraction and processing, thereby reducing the sector's contribution to climate change and its impacts on biodiversity and ecosystem services.

                Factors Influencing Score:
                
                Sustainable Resource Extraction: Implementing more environmentally friendly extraction methods to minimize land use and preserve biodiversity, thus maintaining ecosystem resilience against climate change.
                Pollution Control: Enhancing pollution control measures in material processing to reduce emissions and effluents that can exacerbate climate impacts on local ecosystems.
                Ecosystem Rehabilitation: Committing to the rehabilitation of mining sites and other areas of extraction post-operation to restore them to natural or near-natural states, aiding in ecosystem recovery and resilience.`,
            },
            {
                title: 'YB',
                details: `Transition Efforts: The materials sector is making strides in becoming a positive contributor to adaptation efforts by innovating in the production of sustainable materials that require fewer resources and by implementing practices that minimize environmental degradation.

                Factors Influencing Score:
                
                Sustainable Production Practices: Adopting production practices that reduce water use, energy consumption, and pollution, thereby mitigating the indirect effects of climate change that necessitate adaptation.
                Recycling and Circular Economy: Enhancing efforts in recycling and circular economy initiatives to reduce waste and the demand for raw materials, supporting ecosystems' ability to adapt naturally.
                Eco-friendly Materials Development: Developing and promoting the use of materials that are more durable and require less frequent replacement, reducing environmental stress and the need for resource-intensive adaptation measures.`,
            },
            {
                title: 'YC',
                details: `Solutions Contribution: By developing new materials and products designed to withstand climate impacts, the materials sector supports adaptation across various industries, including construction, agriculture, and manufacturing.

                Factors Influencing Score:
                
                Durable and Resilient Materials: Innovating in materials that are resistant to extreme weather conditions, such as heat-resistant alloys and waterproof fabrics, for use in construction and consumer goods.
                Sustainable Packaging Solutions: Creating packaging solutions that reduce waste and are resilient to transportation and storage challenges exacerbated by climate change.
                Water-efficient Products: Developing products that help in conserving water in agriculture and industry, crucial for adaptation in water-scarce regions.`,
            },
            {
                title: 'ZA',
                details: `Risk Reduction Actions: The materials sector, including mining, chemicals, and forestry, directly impacts biodiversity through resource extraction and pollution. Efforts are being made to mitigate these impacts through more sustainable practices and technologies.

                Factors Influencing Score:
                
                Sustainable Resource Extraction: Adopting sustainable extraction practices, such as certified mining and responsible forestry operations, to protect biodiversity and reduce ecosystem degradation.
                Waste Management and Pollution Control: Implementing advanced waste management and pollution control technologies to minimize environmental contamination and protect local flora and fauna.
                Rehabilitation and Reforestation: Committing to land rehabilitation and reforestation projects post-extraction to restore biodiversity and ecosystem services.`,
            },
            {
                title: 'ZB',
                details: `Transition Efforts: The materials sector, encompassing industries like mining, chemicals, and lumber, is adopting more sustainable practices and technologies to reduce its impact on natural habitats and to support biodiversity conservation.

                Factors Influencing Score:
                
                Sustainable Resource Extraction: Emphasizing sustainable extraction methods and responsible sourcing to minimize habitat destruction and ensure the conservation of biodiversity.
                Circular Economy Initiatives: Promoting recycling and the circular economy to reduce demand for raw materials and lessen the pressure on natural ecosystems.
                Biodiversity Conservation Partnerships: Engaging in partnerships and collaborations for biodiversity conservation, including supporting protected areas and funding conservation research.`,
            },
            {
                title: 'ZC',
                details: `Solutions Contribution: Companies in the materials sector, including those involved in mining, chemicals, and lumber, are contributing to biodiversity solutions through sustainable resource management practices and rehabilitation of degraded ecosystems.

                Factors Influencing Score:
                
                Sustainable Sourcing Practices: Implementing sustainable sourcing standards to minimize the impact of material extraction on ecosystems and promote the conservation of biodiversity.
                Ecosystem Rehabilitation: Committing to the rehabilitation of extraction sites, such as reforesting mined areas and restoring natural water flows affected by operations.
                Biodiversity Research and Development: Investing in R&D to develop materials and chemicals that are less harmful to the environment and support the preservation or enhancement of biodiversity.`,
            },
        ],
    },
    {
        title: "Industrials",
        overviews: [
            {
                title: 'XA',
                details: `Risk Reduction Actions: The industrials sector, encompassing a broad range of companies, including construction, machinery, aerospace, and transportation, has a significant environmental footprint due to its diverse activities. Its score reflects both the challenges in reducing emissions and the potential for implementing risk reduction strategies through innovation and efficiency improvements.

                Factors Influencing Score:
                
                Diverse Emissions Sources: Emissions stem from various sources, including manufacturing processes, logistics, and the use of the sector's products. This diversity makes broad mitigation strategies complex to implement.
                Efficiency Gains: There is potential for risk reduction through energy efficiency improvements, lean manufacturing, and the adoption of green technologies. However, the scale and pace of these changes are critical factors.
                Transition Risks: The sector is undergoing a transition towards more sustainable practices, but faces challenges in balancing operational efficiency, cost, and environmental considerations. Investments in cleaner technologies are essential but come with financial and technological risks.
                Regulatory Compliance: Compliance with environmental regulations and standards can drive improvements but also imposes additional costs and operational challenges.`,
            },
            {
                title: 'XB',
                details: `Transition Efforts: The industrials sector, encompassing construction, machinery, aerospace, and other heavy industries, plays a dual role in climate mitigation: it must reduce its own operational emissions and produce the technology and infrastructure necessary for a low-carbon economy.

                Factors Influencing Score:
                
                Energy Efficiency and Process Improvements: There is significant potential for reducing emissions through energy efficiency improvements in manufacturing processes and facilities.
                Contribution to Renewable Energy Infrastructure: The sector is instrumental in building the physical infrastructure for renewable energy, such as wind turbines and solar panels, which is essential for the transition.
                Innovation and Clean Technology: The development of electric vehicles, energy-efficient buildings, and other green technologies are areas where the industrials sector is contributing to climate mitigation. However, the transition also involves overcoming substantial emissions from existing operations and supply chains.`,
            },
            {
                title: 'XC',
                details: `Solutions Contribution: The industrials sector plays a dual role in climate mitigation solutions: improving its own energy efficiency and emissions profile, and manufacturing the equipment and infrastructure necessary for a low-carbon economy, such as renewable energy components and electric vehicles.

                Factors Influencing Score:
                
                Energy Efficiency Technologies: Development and production of advanced energy efficiency solutions for buildings, transportation, and industrial processes contribute to reducing global energy demand and emissions.
                Infrastructure for Renewables: The sector's role in producing turbines for wind farms, solar panels, and other renewable energy infrastructure is critical for the energy transition.
                Innovative Solutions: Contributions to green buildings, sustainable transportation, and smart cities, including the development of electric and hydrogen fuel cell vehicles, are essential elements of the sector's solutions portfolio.`,
            },
            {
                title: 'YA',
                details: `Risk Reduction Actions: The industrials sector focuses on integrating climate resilience into its diverse range of activities, from manufacturing to construction, to reduce the risk climate change poses to its operations and the broader environment.

                Factors Influencing Score:
                
                Resilient Infrastructure Development: Building infrastructure with enhanced resilience to withstand climate-related stresses, ensuring the continuity of industrial activities and services.
                Efficiency Improvements: Increasing operational efficiency, particularly in water and energy use, to lessen the strain on natural resources and reduce vulnerability to scarcity exacerbated by climate change.
                Supply Chain Management: Strengthening supply chains against climate-induced disruptions through diversification of suppliers and investment in local production capabilities.`,
            },
            {
                title: 'YB',
                details: `Transition Efforts: Companies within the industrials sector are crucial to adaptation efforts, as they are involved in building the infrastructure necessary for a resilient future. Transitioning involves adopting sustainable and adaptive design principles and technologies.

                Factors Influencing Score:
                
                Resilient Infrastructure Construction: Focusing on the construction of infrastructure that is resilient to climate impacts, such as flood defenses and heat-resistant buildings.
                Innovative Solutions for Adaptation: Developing technologies and products that enable other sectors to adapt to climate change, including water conservation systems and efficient transportation solutions.
                Supply Chain Resilience: Strengthening supply chains against climate-related disruptions through diversification and investment in robust logistics solutions.`,
            },
            {
                title: 'YC',
                details: `Solutions Contribution: Industrials provide essential machinery, infrastructure, and technologies that enable societies to adapt to climate change, from water management systems to construction equipment for resilient infrastructure.

                Factors Influencing Score:
                
                Climate-Resilient Infrastructure Equipment: Supplying the technology and equipment necessary for constructing resilient infrastructure, including flood defenses and storm-resistant buildings.
                Water Management and Purification: Offering solutions for efficient water management, treatment, and purification to ensure water security in the face of changing precipitation patterns.
                Disaster Response and Recovery Tools: Providing specialized machinery and logistics support for disaster response efforts, critical for recovery in the aftermath of climate-related events.`,
            },
            {
                title: 'ZA',
                details: `Risk Reduction Actions: The industrials sector, encompassing manufacturing, construction, and transportation, can impact biodiversity through emissions, waste, and land use. Risk reduction focuses on minimizing these impacts through cleaner production processes and sustainable development practices.

                Factors Influencing Score:
                
                Emissions Reduction: Actively reducing emissions from industrial processes that can contribute to habitat degradation and climate change, affecting biodiversity.
                Sustainable Construction Practices: Utilizing sustainable construction methods and materials to minimize impacts on biodiversity, including green building standards and habitat-friendly urban planning.
                Waste Management Improvements: Enhancing waste management practices to prevent pollution of natural habitats and waterways, crucial for preserving aquatic and terrestrial biodiversity.`,
            },
            {
                title: 'ZB',
                details: `Transition Efforts: Companies in the industrials sector are incorporating biodiversity considerations into their operations and products, from sustainable construction practices to the development of eco-friendly materials and technologies.

                Factors Influencing Score:
                
                Eco-Friendly Infrastructure: Developing infrastructure that is less invasive to natural habitats, using technologies and designs that minimize ecological footprints.
                Biodiversity Impact Assessments: Conducting thorough biodiversity impact assessments for new projects and using the findings to inform sustainable planning and mitigation strategies.
                Green Technology Development: Investing in green technologies that have positive implications for biodiversity, such as pollution control equipment and waste reduction innovations.`,
            },
            {
                title: 'ZC',
                details: `Solutions Contribution: The industrials sector, which includes construction, engineering, and manufacturing, contributes to biodiversity solutions by integrating green infrastructure into projects and developing technologies that help protect ecosystems.

                Factors Influencing Score:
                
                Green Infrastructure: Building infrastructure that supports biodiversity, such as green roofs, living walls, and constructed wetlands, to enhance urban ecosystems.
                Pollution Control Technologies: Developing and deploying technologies that reduce industrial pollution, protecting aquatic and terrestrial habitats from contamination.
                Biodiversity-Friendly Products: Manufacturing products that are designed to have minimal environmental impact or that actively contribute to ecosystem health, such as biodegradable materials.`,
            },
        ],
    },
    {
        title: "Consumer Discretionary",
        overviews: [
            {
                title: 'XA',
                details: `Risk Reduction Actions: This sector includes companies related to non-essential goods and services, such as automotive, retail, and hospitality. The score reflects the sector's potential to influence consumer behavior towards more sustainable practices, though it also faces challenges related to production processes and product lifecycles.

                Factors Influencing Score:
                
                Product Design and Use: Opportunities for mitigating climate risks include designing products with lower environmental impacts and promoting sustainable consumption patterns.
                Supply Chain Emissions: The sector can reduce its carbon footprint by adopting sustainable supply chain practices, though this requires coordination across multiple stakeholders.
                Consumer Engagement: Companies in this sector can play a significant role in educating consumers about sustainability, although changing consumer behavior is a long-term challenge.
                Innovation in Materials and Processes: There is potential for significant risk reduction through the use of sustainable materials and more efficient production processes. However, these innovations must be scaled up to have a meaningful impact.`,
            },
            {
                title: 'XB',
                details: `Transition Efforts: This sector includes automotive, retail, consumer durables, and apparel industries. It faces the challenge of transitioning to sustainable practices and products, including reducing emissions across supply chains and in the use of its products, particularly in the automotive sub-sector with the shift to electric vehicles (EVs).

                Factors Influencing Score:
                
                Automotive Transition to EVs: A key area of transition in this sector is the automotive industry's shift from internal combustion engine vehicles to EVs. This transition is critical for reducing transportation emissions but requires significant changes in manufacturing processes, supply chains, and consumer adoption.
                Sustainable Manufacturing and Products: Efforts to incorporate sustainable materials, reduce waste, and improve product lifecycle emissions are essential for this sector's transition. The variability in how effectively companies adopt these practices affects the overall score.
                Supply Chain Decarbonization: The sector is also tasked with decarbonizing its extensive global supply chains, a complex process involving coordination with numerous suppliers to reduce emissions.`,
            },
            {
                title: 'XC',
                details: `Solutions Contribution: This sector influences climate mitigation through the production of sustainable consumer goods, including electric vehicles (EVs), which are central to decarbonizing the transportation sector, one of the largest sources of CO2 emissions globally.

                Factors Influencing Score:
                
                Electric Vehicles (EVs): The automotive industry's pivot to designing, manufacturing, and selling EVs is a significant contribution to climate solutions, reducing reliance on fossil fuels.
                Sustainable Products: Efforts to create more sustainable, durable, and recyclable products across retail, apparel, and home goods reduce waste and environmental impact, contributing to broader mitigation efforts.
                Consumer Engagement: Promoting and facilitating sustainable consumption patterns, including the shift to more energy-efficient appliances and systems in homes, plays a role in the sector's solutions impact.`,
            },
            {
                title: 'YA',
                details: `Risk Reduction Actions: Companies in the consumer discretionary sector are reducing risks by developing products and services that help consumers adapt to climate change impacts, while also working to minimize their operational vulnerabilities to those same impacts.

                Factors Influencing Score:
                
                Adaptive Products Development: Creating products that are either more durable or specifically designed to function in altered climate conditions, such as heat-resistant materials for clothing and outdoor equipment.
                Sustainable Business Practices: Adopting sustainable business practices that not only reduce environmental impacts but also prepare the company for stricter environmental regulations and changing consumer preferences in response to climate change.
                Consumer Awareness Programs: Engaging in programs that raise consumer awareness about the importance of sustainability and adaptation, encouraging shifts in consumer behavior that can collectively reduce climate risks.`,
            },
            {
                title: 'YB',
                details: `Transition Efforts: The consumer discretionary sector is transitioning by offering products and services that enable individuals and communities to better adapt to changing climate conditions, such as energy-efficient appliances and adaptive clothing.

                Factors Influencing Score:
                
                Sustainable Product Offerings: Expanding the range of products designed with sustainability in mind, helping reduce the environmental impact and the subsequent need for adaptation.
                Consumer Engagement on Adaptation: Raising awareness and educating consumers about climate adaptation through marketing and product development, encouraging adaptive behaviors.
                Adaptive Leisure and Travel Services: Innovating in the provision of leisure and travel options that are mindful of changing climate realities, promoting sustainability and resilience in tourism.`,
            },
            {
                title: 'YC',
                details: `Solutions Contribution: This sector contributes through the development of products and services that help individuals and communities adapt to climate change, including adaptive clothing, housing solutions, and recreational products suited for new climate realities.

                Factors Influencing Score:
                
                Adaptive and Resilient Products: Offering products designed for changing environmental conditions, such as UV-protective clothing and all-weather durable goods.
                Innovations in Housing: Providing housing solutions that are adaptable to climate impacts, such as modular homes that can be quickly relocated in response to environmental threats.
                Leisure and Recreation Adaptations: Adapting leisure products and services to changing climate conditions, ensuring they remain viable and accessible.`,
            },
            {
                title: 'ZA',
                details: `Risk Reduction Actions: Companies in the consumer discretionary sector, including automotive, apparel, and leisure goods, impact biodiversity through resource use and waste generation. Efforts to reduce these impacts include sustainable sourcing and product lifecycle management.

                Factors Influencing Score:
                
                Sustainable Sourcing: Adopting sustainable sourcing policies for raw materials that prioritize biodiversity conservation, such as using certified timber and organic cotton.
                Product Lifecycle Management: Designing products with an emphasis on durability, reparability, and recyclability to reduce waste and decrease the demand for raw materials extraction.
                Eco-Friendly Packaging: Minimizing packaging or using biodegradable and recyclable materials to reduce waste and its impact on natural habitats.`,
            },
            {
                title: 'ZB',
                details: `Transition Efforts: The consumer discretionary sector is making strides in reducing its biodiversity impact through sustainable product design, ethical sourcing, and support for conservation efforts.

                Factors Influencing Score:
                
                Sustainable Sourcing: Transitioning towards ethically sourced materials that do not contribute to habitat destruction or biodiversity loss, such as certified sustainable timber and organic textiles.
                Product Design and Lifecycle: Designing products with lower environmental impacts and longer lifecycles to reduce waste and demand on natural resources.
                Conservation Support: Some companies within the sector are directly supporting biodiversity conservation projects or initiatives, enhancing their brand reputation and contributing to ecosystem health.`,
            },
            {
                title: 'ZC',
                details: `Solutions Contribution: The consumer discretionary sector, including automotive, apparel, and entertainment, contributes to biodiversity solutions by offering products that encourage sustainable consumption and supporting conservation initiatives.

                Factors Influencing Score:
                
                Sustainable Products: Designing and selling products made from sustainable or recycled materials that reduce the demand on natural resources, supporting biodiversity conservation.
                Corporate Conservation Initiatives: Engaging in or funding conservation projects that aim to protect endangered species and habitats, often as part of corporate social responsibility programs.
                Eco-Tourism: Developing and promoting eco-tourism experiences that support conservation efforts and raise awareness about biodiversity, benefiting both local economies and ecosystems.`,
            },
        ],
    },
    {
        title: "Consumer Staples",
        overviews: [
            {
                title: 'XA',
                details: `Risk Reduction Actions: The consumer staples sector covers essential goods such as food, beverage, and household products. It is positioned slightly better due to its essential nature and the growing consumer demand for sustainable products, but it still faces significant challenges in agricultural practices, packaging, and distribution.

                Factors Influencing Score:
                
                Sustainable Agriculture: Transitioning to sustainable agricultural practices can significantly reduce the sector's environmental impact, though challenges remain in scalability and cost.
                Packaging Innovations: Reducing packaging waste and innovating with biodegradable materials can contribute to climate mitigation, with many companies already making strides in this area.
                Supply Chain Optimization: Energy efficiency in supply chains and reducing food waste are critical areas for risk reduction, requiring investments in technology and process improvements.
                Consumer Preferences: The sector benefits from a shift towards sustainable products, but balancing cost and accessibility is a crucial challenge.`,
            },
            {
                title: 'XB',
                details: `Transition Efforts: The consumer staples sector, covering food, beverage, and household products, has a direct impact on land use, agriculture, and packaging. Its transition score reflects efforts to reduce emissions through sustainable sourcing, packaging innovations, and improving energy efficiency in production.

                Factors Influencing Score:
                
                Sustainable Sourcing: Transitioning towards sustainable agricultural practices and reducing deforestation linked to commodity production are key mitigation strategies. This includes adopting certified sustainable sourcing for key commodities like palm oil, soy, and cocoa.
                Packaging and Waste Reduction: Innovations in packaging to reduce plastic use, increase recyclability, and innovate with compostable materials are crucial for lowering the sector's environmental footprint. The shift towards more sustainable packaging solutions is essential but challenging, given the global scale of operations and consumer expectations.
                
                Energy Efficiency in Production: Implementing energy-efficient technologies and processes in manufacturing facilities contributes to reducing emissions. There is progress in this area, yet the extent and speed of implementation vary across companies and regions, reflecting in the neutral score.`,
            },
            {
                title: 'XC',
                details: `Solutions Contribution: The consumer staples sector's contributions to climate solutions focus on sustainable sourcing, reducing waste through better packaging solutions, and improving the efficiency of food production and distribution to reduce emissions.

                Factors Influencing Score:
                
                Sustainable Agriculture: Efforts to improve the sustainability of agricultural practices, including reducing methane emissions from livestock and enhancing carbon sequestration in soils, are key contributions to climate solutions.
                Packaging Innovations: Developing and implementing more sustainable packaging solutions, including reducing plastic use and increasing the use of recycled and biodegradable materials, helps mitigate environmental impacts.
                Food Waste Reduction: Initiatives to reduce food waste throughout the supply chain, from production to consumption, can significantly lower emissions associated with decomposing food waste and the unnecessary production of food.`,
            },
            {
                title: 'YA',
                details: `Risk Reduction Actions: The consumer staples sector is addressing risk reduction by focusing on sustainable sourcing, production, and distribution practices to ensure the availability of essential goods even as climate impacts intensify.

                Factors Influencing Score:
                
                Climate-Resilient Sourcing: Securing supply chains through the sourcing of ingredients and materials from climate-resilient regions or through the adoption of agricultural practices that are more tolerant of changing climate conditions.
                Water Usage Efficiency: Implementing water-saving technologies in production processes to mitigate the risk of water scarcity impacting operations.
                Sustainable Packaging: Innovating in packaging to reduce waste and improve the recyclability and compostability of packaging materials, minimizing environmental impacts and reducing the burden on waste management systems in a changing climate.`,
            },
            {
                title: 'YB',
                details: `Transition Efforts: The consumer staples sector is integral to global adaptation efforts by ensuring the stability and sustainability of food and other essential goods through practices that minimize environmental impact and enhance supply chain resilience.

                Factors Influencing Score:
                
                Climate-Resilient Agriculture: Investing in and promoting agricultural practices that are resilient to climate variabilities, such as drought-resistant crops and efficient irrigation techniques.
                Sustainable Supply Chains: Building resilient supply chains that can withstand climate-induced disruptions, ensuring the continuous availability of essential consumer goods.
                Eco-friendly Packaging and Distribution: Reducing the environmental impact of packaging and distribution, decreasing the overall carbon footprint and supporting broader climate adaptation efforts.`,
            },
            {
                title: 'YC',
                details: `Solutions Contribution: The consumer staples sector plays a key role in ensuring food and water security through the development of climate-resilient food products and sustainable water usage practices, critical for adaptation globally.

                Factors Influencing Score:
                
                Climate-Resilient Food Products: Innovating in the development and distribution of food products that are produced using resilient agricultural practices, ensuring food security despite climate challenges.
                Sustainable Water Usage: Implementing and promoting water-efficient practices in the production of consumer staples, contributing to water conservation and security.
                Supply Chain Resilience: Enhancing the resilience of supply chains to ensure the continuous availability of essential goods, adapting to potential disruptions from climate impacts.`,
            },
            {
                title: 'ZA',
                details: `Risk Reduction Actions: The consumer staples sector, particularly through food production and household products, affects biodiversity via land use changes, water use, and pollution. Risk reduction focuses on sustainable agricultural practices and reducing the environmental footprint of products.

                Factors Influencing Score:
                
                Sustainable Agriculture: Implementing agricultural practices that conserve water, soil, and biodiversity, such as integrated pest management and polyculture farming.
                Water Use Efficiency: Increasing water efficiency in product manufacturing to reduce withdrawal from natural sources, protecting aquatic ecosystems.
                Sustainable Packaging and Distribution: Emphasizing sustainable packaging solutions and efficient distribution networks to minimize habitat disruption and pollution.`,
            },
            {
                title: 'ZB',
                details: `Transition Efforts: The consumer staples sector, particularly food and beverage companies, is focusing on sustainable agricultural practices and supply chain management to reduce its impact on biodiversity.

                Factors Influencing Score:
                
                Regenerative Agriculture: Adopting regenerative agricultural practices that enhance soil health, conserve water, and support pollinators and other aspects of agricultural biodiversity.
                Sustainable Supply Chains: Building supply chains that are transparent and sustainable, minimizing deforestation and habitat conversion for agricultural purposes.
                Biodiversity-Friendly Products: Offering products that promote biodiversity, such as organic foods or products that support sustainable farming practices.`,
            },
            {
                title: 'ZC',
                details: `Solutions Contribution: Companies in the consumer staples sector, particularly those in food and beverage, are enhancing biodiversity through sustainable agricultural practices and by supporting initiatives that preserve genetic diversity and ecosystem health.

                Factors Influencing Score:
                
                Regenerative Agriculture: Promoting farming practices that restore soil health, conserve water, and increase biodiversity on agricultural lands.
                Support for Biodiversity Projects: Funding or participating in projects aimed at conserving biodiversity, such as seed banks for crop diversity and initiatives to protect pollinators.
                Ecosystem Services: Investing in natural ecosystem services that support agriculture, such as maintaining buffer zones around farms to protect wild habitats and natural pollinators.`,
            },
        ],
    },
    {
        title: "Health Care",
        overviews: [
            {
                title: 'XA',
                details: `Risk Reduction Actions: The health care sector, comprising companies providing medical services, equipment, and pharmaceuticals, receives a more positive score due to its lower direct environmental impact compared to other sectors and opportunities for contributing to public health resilience against climate change impacts.

                Factors Influencing Score:
                
                Operational Efficiencies: Implementing energy-efficient practices in healthcare facilities and reducing waste in medical supplies can contribute to risk reduction.
                Research and Development: Innovations in pharmaceuticals and medical technologies can reduce the environmental impact of health care and improve public health resilience to climate change.
                Sustainable Practices: There is a growing movement within the sector to adopt greener practices, though the pace and consistency of these efforts vary.
                Climate-Related Health Challenges: The sector plays a critical role in addressing health issues related to climate change, such as increased disease prevalence and heat-related illnesses, representing a form of indirect climate risk mitigation.`,
            },
            {
                title: 'XB',
                details: `Transition Efforts: The health care sector's transition score reflects its relatively lower direct environmental impact and the significant role it can play in developing and implementing technologies and practices that contribute to climate mitigation, such as green chemistry in pharmaceuticals and energy-efficient health care facilities.

                Factors Influencing Score:
                
                Green Chemistry: Innovation in pharmaceutical manufacturing, adopting principles of green chemistry, reduces hazardous waste and emissions. This is a growing area of focus but requires industry-wide adoption to make a substantial impact.
                Sustainable Health Care Facilities: Efforts to make health care facilities more energy-efficient and to use renewable energy sources are crucial. Many health care providers are investing in green building certifications and energy efficiency projects.
                Supply Chain Management: Managing the environmental impact of the supply chain, from medical devices to pharmaceuticals, involves transitioning to more sustainable materials and reducing waste, which is complex given the stringent regulatory environment of the sector.`,
            },
            {
                title: 'XC',
                details: `Solutions Contribution: The health care sector contributes to climate mitigation solutions through innovations in pharmaceuticals and medical technologies that reduce the environmental footprint of health care operations and supply chains, as well as through public health initiatives that address climate-related health risks.

                Factors Influencing Score:
                
                Sustainable Operations: Implementing sustainable practices in healthcare facilities, including energy efficiency, waste reduction, and green procurement, contributes to lowering emissions.
                Innovation in Treatment and Delivery: Development of more efficient and less resource-intensive medical treatments and the adoption of telemedicine reduce the sector's carbon footprint and improve access to care, reducing indirect emissions associated with healthcare delivery.
                Climate Health Resilience: Contributions to enhancing public health resilience to climate change, such as developing treatments for climate-related diseases and health conditions, represent an indirect but vital aspect of climate solutions.`,
            },
            {
                title: 'YA',
                details: `Risk Reduction Actions: In the health care sector, risk reduction is primarily focused on preparing for and mitigating the health impacts of climate change, ensuring that health care services remain robust and accessible.

                Factors Influencing Score:
                
                Research on Climate-related Health Issues: Increasing research and development efforts aimed at understanding and treating health conditions exacerbated by climate change, such as heat-related illnesses and diseases spread by mosquitoes and ticks expanding into new areas.
                Healthcare Infrastructure Resilience: Enhancing the resilience of healthcare facilities to ensure they can continue to operate during extreme weather events, including floods, heatwaves, and hurricanes.
                Public Health Preparedness: Supporting initiatives aimed at improving public health preparedness for climate-related health risks, including vaccination campaigns and public education programs on preventive measures.`,
            },
            {
                title: 'YB',
                details: `Transition Efforts: Health care's transition towards positive adaptation contributions is seen in its responsiveness to emerging climate-related health challenges, investment in resilient health infrastructure, and support for global public health initiatives.

                Factors Influencing Score:
                
                Addressing Climate-Related Health Risks: Developing treatments and preventive measures for diseases exacerbated by climate change, ensuring societies are better prepared and resilient.
                Resilient Health Care Facilities: Enhancing the resilience of health care infrastructure to ensure service continuity during climate-related events, from heatwaves to natural disasters.
                Supporting Public Health Adaptation: Engaging in public health initiatives that address the broader impacts of climate change on community health and well-being, from mental health services to emergency preparedness training.`,
            },
            {
                title: 'YC',
                details: `Solutions Contribution: The health care sector is integral to adaptation solutions by researching and developing treatments for climate-related health issues, ensuring the resilience of health services, and supporting public health strategies that address climate impacts.

                Factors Influencing Score:
                
                Treatments for Climate-related Health Conditions: Developing treatments and preventive measures for health issues exacerbated by climate change, such as heat stress and vector-borne diseases.
                Resilient Health Infrastructure: Investing in making health care facilities resilient to climate impacts, ensuring they can continue to operate during extreme events.
                Public Health Initiatives: Leading public health initiatives that focus on adaptation to climate change, including vaccination programs for diseases whose spread is affected by climate change and educational campaigns on heatwave preparedness.`,
            },
            {
                title: 'ZA',
                details: `Risk Reduction Actions: The healthcare sector's impact on biodiversity primarily comes from pharmaceutical pollution and waste management. Efforts to reduce these risks focus on responsible production, waste disposal practices, and reducing the environmental footprint of healthcare facilities.

                Factors Influencing Score:
                
                Pharmaceutical Waste Management: Developing and implementing safe disposal practices for pharmaceuticals to prevent contamination of waterways and soil.
                Sustainable Healthcare Practices: Encouraging the use of sustainable materials and practices in healthcare facilities to reduce waste and energy use, mitigating indirect impacts on biodiversity.
                Green Procurement Policies: Adopting procurement policies that prioritize products and services with minimal impacts on biodiversity, promoting industry-wide shifts towards sustainability.`,
            },
            {
                title: 'ZB',
                details: `Transition Efforts: The health care sector's transition towards supporting biodiversity includes reducing pollution from pharmaceuticals and medical waste, as well as integrating green spaces into health care facility design for patient and environmental benefits.

                Factors Influencing Score:
                
                Pharmaceutical Stewardship: Implementing programs to reduce environmental contamination from pharmaceuticals, including take-back programs and environmentally sensitive disposal methods.
                Green Health Care Facilities: Designing health care facilities with green spaces and environmentally friendly materials, contributing to local biodiversity and patient well-being.
                Sustainable Sourcing for Products: Ensuring that natural products used in medicines or health care products are sustainably sourced, preserving biodiversity.`,
            },
            {
                title: 'ZC',
                details: `Solutions Contribution: The health care sector contributes to biodiversity solutions through research on the impacts of environmental change on health, developing medicines from natural products in sustainable ways, and green hospital initiatives.

                Factors Influencing Score:
                
                Sustainable Sourcing of Medicinal Ingredients: Ensuring that natural ingredients used in pharmaceuticals are sourced sustainably, supporting the conservation of medicinal plants and their habitats.
                Research on Environmental Health: Conducting research on the connections between biodiversity and human health, contributing to broader understanding and policy development for conservation.
                Green Health Care Facilities: Designing and operating health care facilities in ways that minimize environmental impact and promote green spaces, contributing to local biodiversity.`,
            },
        ],
    },
    {
        title: "Financials",
        overviews: [
            {
                title: 'XA',
                details: `Risk Reduction Actions: The financial sector, including banks, insurance companies, and investment firms, is central to funding the transition to a low-carbon economy. Its score reflects the sector's unique position to influence climate mitigation through investment decisions, despite having a minimal direct environmental impact.

                Factors Influencing Score:
                
                Green Financing: Increasing investments in sustainable projects and companies can significantly reduce climate risks. The sector's ability to direct capital towards green initiatives is a critical factor in its score.
                Risk Management: Financial institutions are developing sophisticated models to assess climate risks and adjust their portfolios accordingly, promoting climate risk reduction across the economy.
                Regulatory Compliance and Disclosure: The sector is subject to growing regulatory requirements for disclosing climate-related risks and integrating sustainability into financial decision-making.
                Sustainable Insurance Products: Insurance companies can contribute to risk reduction by offering products that incentivize sustainable practices among businesses and homeowners.`,
            },
            {
                title: 'XB',
                details: `Transition Efforts: The financial sector is integral to the climate mitigation transition, primarily through its influence on funding and investments. It can direct substantial resources towards sustainable projects and companies, playing a crucial role in financing the low-carbon transition across all economic sectors.

                Factors Influencing Score:
                
                Green Financing and Investments: A growing focus on sustainable finance, including green bonds and loans, ESG (Environmental, Social, and Governance) investing, and climate risk assessment in investment decisions, is driving the transition. The variability in commitment and implementation across the sector impacts its score.
                Divestment from Fossil Fuels: Some financial institutions are beginning to divest from fossil fuel projects and companies, a critical step in supporting the climate transition. However, the pace and scope of divestment actions are still limited compared to the sector's overall investment portfolio.
                Sustainable Banking Practices: Incorporating sustainability criteria into lending decisions and offering financial products that incentivize sustainable practices among consumers and businesses are areas of progress. Yet, the comprehensive adoption of these practices across the sector is ongoing.`,
            },
            {
                title: 'XC',
                details: `Solutions Contribution: The financial sector enables climate mitigation solutions by financing renewable energy projects, sustainable infrastructure, and companies engaged in developing low-carbon technologies. It plays a critical role in allocating capital towards climate-positive investments.

                Factors Influencing Score:
                
                Green Finance: Providing funding for renewable energy projects, green buildings, and other sustainable infrastructure through green bonds, loans, and investment funds is a direct contribution to climate solutions.
                ESG Investing: The growth of ESG (Environmental, Social, and Governance) investing criteria integrates climate considerations into investment decisions, directing capital towards companies that contribute positively to climate mitigation.
                Innovative Financial Products: Developing financial products that incentivize sustainability practices among businesses and consumers, including insurance products that promote resilience to climate impacts, supports broader climate mitigation efforts.`,
            },
            {
                title: 'YA',
                details: `Risk Reduction Actions: The financial sector plays a crucial role in risk reduction related to climate adaptation by financing projects that enhance resilience and by developing financial products that manage and transfer risks related to climate impacts.

                Factors Influencing Score:
                
                Climate Resilience Financing: Increasing investments and financing for projects aimed at enhancing climate resilience across various sectors, such as sustainable agriculture, water conservation, and resilient infrastructure.
                Risk Management Products: Offering insurance products and derivatives that help businesses and governments manage financial risks associated with climate impacts, ensuring economic stability and continuity.
                Sustainability Indices and ESG Integration: Developing and promoting sustainability indices and integrating Environmental, Social, and Governance (ESG) criteria that include climate resilience as key factors in investment decisions, directing capital towards more resilient companies and projects.`,
            },
            {
                title: 'YB',
                details: `Transition Efforts: Financial institutions are transitioning to become enablers of global adaptation by directing capital towards projects and companies that enhance climate resilience, developing financial products that support adaptation, and integrating climate risks into their investment decisions.

                Factors Influencing Score:
                
                Adaptation Financing: Providing funding for adaptation projects, such as resilient infrastructure and sustainable agriculture, to communities and regions most vulnerable to climate change.
                Risk Assessment for Adaptation: Incorporating climate adaptation considerations into financial risk assessments, ensuring investments contribute to resilience.
                Innovative Insurance Products: Offering insurance products that mitigate the financial risks of climate impacts, supporting businesses and communities in their adaptation efforts.`,
            },
            {
                title: 'YC',
                details: `Solutions Contribution: The financial sector enables adaptation solutions through targeted funding, investment in climate-resilient infrastructure and businesses, and the development of financial products that support adaptation efforts across various sectors.

                Factors Influencing Score:
                
                Climate Resilience Financing: Specialized funds and lending programs dedicated to supporting projects that build resilience to climate change, such as sustainable agriculture, water conservation, and resilient urban planning.
                Risk Insurance Products: Innovative insurance products designed to mitigate financial risks associated with climate impacts, including crop insurance for farmers in drought-prone areas and flood insurance for coastal communities.
                Support for Adaptation Innovation: Investing in startups and technologies focused on creating solutions for climate adaptation, from early warning systems for extreme weather events to technologies enhancing water and food security.`,
            },
            {
                title: 'ZA',
                details: `Risk Reduction Actions: Financial institutions influence biodiversity indirectly through their investment and lending practices. Risk reduction involves integrating biodiversity considerations into financial decision-making and supporting projects that have a positive impact on biodiversity conservation.

                Factors Influencing Score:
                
                Biodiversity-Sensitive Investing: Incorporating biodiversity risk assessments into investment decisions to avoid financing projects that harm biodiversity.
                Conservation Finance: Providing funding for conservation projects that protect or restore habitats and support sustainable natural resource management.
                Sustainability Guidelines for Lending: Implementing lending guidelines that require borrowers to demonstrate commitments to biodiversity conservation and sustainable practices.`,
            },
            {
                title: 'ZB',
                details: `Transition Efforts: Financial institutions are increasingly recognizing the importance of biodiversity for long-term economic sustainability and are incorporating biodiversity considerations into their lending, investing, and insurance practices.

                Factors Influencing Score:
                
                Green Financing: Offering green bonds and other financial products that fund projects with positive impacts on biodiversity, such as habitat restoration and sustainable agriculture.
                Biodiversity Risk Assessments: Including biodiversity considerations in environmental risk assessments for lending and investment decisions, avoiding financing projects that harm biodiversity.
                Conservation Funding: Directly funding conservation projects or providing financial support to organizations working on biodiversity preservation and sustainable land management.`,
            },
            {
                title: 'ZC',
                details: `Solutions Contribution: Financial institutions are increasingly recognizing the value of biodiversity for sustainable development and are financing projects that protect or restore ecosystems, alongside incorporating biodiversity criteria into their investment decisions.

                Factors Influencing Score:
                
                Conservation Financing: Providing loans, grants, or investments for conservation projects that aim to protect or restore biodiversity, such as protected area management and species recovery programs.
                Sustainable Investment Criteria: Integrating biodiversity considerations into investment analysis and decision-making processes, promoting capital flows to biodiversity-positive projects.
                Environmental Risk Management: Developing risk management frameworks that consider biodiversity loss as a financial risk, encouraging businesses to adopt more sustainable practices.`,
            },
        ],
    },
    {
        title: "Information Technology",
        overviews: [
            {
                title: 'XA',
                details: `Risk Reduction Actions: The information technology sector, encompassing software, hardware, and services, is seen as a positive force for climate mitigation and risk reduction. This is due to its role in enabling efficiencies, developing innovative solutions, and the potential to significantly influence other sectors' sustainability practices.

                Factors Influencing Score:
                
                Energy Efficiency: The sector drives improvements in energy efficiency both within its operations and through the products and services it offers, such as cloud computing and data analytics for optimizing energy use.
                Innovative Solutions: IT companies are at the forefront of developing solutions that contribute to climate mitigation, including renewable energy technologies, smart grids, and environmental monitoring systems.
                Digitalization and Dematerialization: Advancements in IT facilitate the transition to a digital economy, reducing the need for physical materials and associated environmental impacts.
                Sustainable Practices: The sector is increasingly adopting sustainable operational practices, such as using renewable energy sources and designing energy-efficient data centers.`,
            },
            {
                title: 'XB',
                details: `Transition Efforts: The information technology sector plays a pivotal role in the climate mitigation transition through innovation and the provision of solutions that enable other sectors to reduce emissions. This includes advancements in energy efficiency, data analytics for environmental monitoring, and the development of smart grid technologies.

                Factors Influencing Score:
                
                Energy Efficiency Technologies: IT companies are leading in the development of energy-efficient hardware and software solutions, significantly contributing to emissions reductions across sectors.
                Smart Technologies: The deployment of smart technologies, including IoT (Internet of Things) devices and AI (Artificial Intelligence) for optimizing energy use in buildings, industries, and transportation, is a key area where the IT sector contributes to the transition.
                Cloud Computing: Transitioning from traditional data centers to cloud-based services can lead to more efficient use of computing resources, reducing energy consumption and emissions. Cloud providers are increasingly using renewable energy to power their data centers.`,
            },
            {
                title: 'XC',
                details: `Solutions Contribution: The IT sector is pivotal in developing and deploying the technologies that enable significant reductions in GHG emissions across all sectors of the economy. This includes innovations in software and hardware that optimize energy use, enhance efficiency, and support the deployment of renewable energy.

                Factors Influencing Score:
                
                Energy Efficiency Solutions: Advanced computing technologies and algorithms that improve energy efficiency in various sectors, from optimizing building energy management systems to enhancing the aerodynamics of vehicles, are key contributions.
                Renewable Energy Integration: Technologies that facilitate the integration of renewable energy sources into the grid, such as battery storage systems and smart grid solutions, are critical for the transition to a sustainable energy system.
                Data Analytics and AI: Leveraging big data analytics and artificial intelligence to monitor and reduce emissions, predict energy demand, and enhance environmental protection efforts contributes to global climate mitigation solutions.`,
            },
            {
                title: 'YA',
                details: `Risk Reduction Actions: The information technology sector contributes to reducing climate adaptation risks through the development of technologies and platforms that enhance monitoring, prediction, and management of climate impacts.

                Factors Influencing Score:
                
                Climate Data Analytics: Leveraging big data and analytics to provide actionable insights into climate risks and adaptation needs, enabling more informed decision-making for businesses, governments, and communities.
                Smart Infrastructure Technologies: Creating smart infrastructure solutions that improve the resilience of urban and rural areas to climate impacts, such as intelligent water management systems and energy-efficient buildings.
                Remote Sensing and Monitoring: Advancing remote sensing technologies that monitor environmental changes and ecosystem health, providing early warnings for climate-related risks and facilitating targeted adaptation strategies.`,
            },
            {
                title: 'YB',
                details: `Transition Efforts: The IT sector contributes to adaptation transitions by developing technologies that support climate resilience efforts across sectors, from data analysis tools for climate risk assessment to platforms that facilitate remote work and reduce the need for physical infrastructure.

                Factors Influencing Score:
                
                Climate Analytics and Modeling: Providing advanced analytics and modeling capabilities to predict climate impacts and inform adaptation strategies.
                Smart Infrastructure Technologies: Offering solutions that make cities and communities more resilient to climate change, such as smart grids and intelligent transportation systems.
                Remote Work and Digital Services: Enabling a transition to digital services and remote work, reducing the need for physical infrastructure that may be vulnerable to climate impacts and supporting social adaptation to new work and life patterns.`,
            },
            {
                title: 'YC',
                details: `Solutions Contribution: IT plays a pivotal role in developing and implementing technologies that allow for effective adaptation to climate change, from monitoring and predicting climate impacts to enhancing the resilience of critical infrastructure.

                Factors Influencing Score:
                
                Climate Monitoring and Forecasting Technologies: Advanced sensors, satellites, and data analytics tools that provide accurate climate and weather forecasting, crucial for preparing for and adapting to extreme weather events.
                Smart Infrastructure Solutions: IoT and smart technologies that enhance the resilience of urban infrastructure to climate impacts, including smart water management systems and adaptive energy grids.
                Remote Sensing for Agriculture: Technologies that support precision agriculture, helping farmers adapt to changing climate conditions by optimizing water use, improving soil health, and increasing crop yields.`,
            },
            {
                title: 'ZA',
                details: `Risk Reduction Actions: The IT sector's impact on biodiversity is mainly through energy consumption, e-waste, and the lifecycle management of products. Risk reduction efforts focus on sustainable operations, e-waste recycling, and developing technologies that support biodiversity conservation.

                Factors Influencing Score:
                
                Energy Efficiency and Renewable Energy: Increasing energy efficiency in data centers and IT operations and sourcing renewable energy to reduce the carbon footprint and associated impacts on climate change and biodiversity.
                E-Waste Recycling Programs: Implementing programs for the recycling and responsible disposal of electronic waste to minimize environmental contamination and resource extraction.
                Conservation Technology Development: Creating technologies that aid in monitoring and protecting biodiversity, such as satellite imaging for habitat monitoring and AI for tracking wildlife populations.`,
            },
            {
                title: 'ZB',
                details: `Transition Efforts: The IT sector contributes to biodiversity transition by developing technologies that help monitor and manage natural resources more effectively, as well as by reducing its own environmental footprint.

                Factors Influencing Score:
                
                Environmental Monitoring Technologies: Offering products and services for environmental monitoring, wildlife tracking, and habitat management, supporting conservation efforts.
                Sustainable Operations: Reducing the environmental impact of data centers and IT products through energy efficiency, renewable energy use, and recycling programs.
                Support for Conservation Efforts: Engaging in partnerships with conservation organizations to use technology in protecting endangered species and habitats.`,
            },
            {
                title: 'ZC',
                details: `Solutions Contribution: The IT sector aids biodiversity solutions through the development of technologies for monitoring biodiversity, managing natural resources more effectively, and raising public awareness about conservation issues.

                Factors Influencing Score:
                
                Biodiversity Data Platforms: Creating platforms that collect and analyze data on biodiversity, supporting conservation research and policy-making.
                Technology for Conservation: Developing technology solutions, such as drones for monitoring wildlife populations and blockchain for tracking sustainable supply chains, enhancing efforts to protect biodiversity.
                Awareness and Engagement Apps: Designing applications and games that educate users about biodiversity and encourage engagement with conservation efforts, raising public awareness and support.`,
            },
        ],
    },
    {
        title: "Communication Services",
        overviews: [
            {
                title: 'XA',
                details: `Risk Reduction Actions: This sector includes telecommunications, media, and entertainment companies. While the direct environmental impact of this sector is relatively low, it plays a crucial role in promoting sustainability through digital connectivity and content dissemination.

                Factors Influencing Score:
                
                Enabling Remote Work and Connectivity: The sector reduces the need for travel and transportation, indirectly contributing to emissions reductions.
                Content and Awareness: Media companies have the power to influence public opinion and raise awareness about climate change and sustainability issues, promoting behavioral change.
                Infrastructure Efficiency: Telecommunications companies are investing in more energy-efficient network infrastructure, although the energy consumption of data centers and networks remains a concern.
                Digital Access and Inclusion: Expanding access to digital services can support education and innovation in sustainability, though this requires managing electronic waste and the environmental impact of digital infrastructure.`,
            },
            {
                title: 'XB',
                details: `Transition Efforts: The communication services sector, encompassing telecommunications, media, and internet companies, contributes to the climate mitigation transition by enabling digital connectivity that reduces the need for physical travel and by promoting digital solutions for environmental management.

                Factors Influencing Score:
                
                Digital Connectivity: By facilitating remote work, teleconferencing, and online education, the sector reduces emissions associated with commuting and business travel. The widespread adoption of these services during the COVID-19 pandemic highlighted their potential to contribute to emissions reductions.
                Content Delivery Networks (CDNs) and Efficiency: Innovations in how digital content is delivered, including the use of CDNs, optimize bandwidth usage and reduce energy consumption. Telecommunications companies are also investing in more energy-efficient network infrastructure.
                Environmental Awareness: Through media platforms, the sector has the potential to raise awareness about climate change and promote sustainable behaviors among consumers. The effectiveness of these initiatives varies, but they represent a critical channel for influencing public opinion and behavior towards sustainability.`,
            },
            {
                title: 'XC',
                details: `Solutions Contribution: The communication services sector contributes to climate mitigation through the provision of digital technologies and platforms that facilitate the reduction of emissions, including telecommuting tools, digital media for environmental awareness, and the optimization of networks to reduce energy use.

                Factors Influencing Score:
                
                Telecommunications Infrastructure: Improving the energy efficiency of telecommunications infrastructure, including data centers and network operations, directly reduces the sector's carbon footprint.
                Enabling Remote Work and Services: Providing services that enable remote work, telehealth, and online education reduces the need for transportation, contributing to emissions reductions.
                Content and Awareness: Media companies can play a significant role in climate change mitigation by raising awareness about environmental issues, promoting sustainable lifestyles, and advocating for climate action through their platforms.`,
            },
            {
                title: 'YA',
                details: `Risk Reduction Actions: Communication services support climate adaptation risk reduction by ensuring reliable communication channels during climate events and by spreading awareness and information on climate adaptation strategies.

                Factors Influencing Score:
                
                Emergency Communication Systems: Maintaining robust and resilient communication networks that can function during extreme weather events, providing a critical lifeline for affected populations.
                Information Dissemination on Adaptation: Using media and telecommunications platforms to disseminate knowledge about climate adaptation practices, helping communities understand and reduce their climate-related risks.
                Support for Telecommuting: Promoting and facilitating telecommuting options that can reduce the need for travel, thereby lowering exposure to climate risks and contributing to broader climate adaptation efforts.`,
            },
            {
                title: 'YB',
                details: `Transition Efforts: Communication services facilitate global adaptation efforts by ensuring robust and resilient communication networks that can withstand climate impacts, providing platforms for disseminating information on adaptation strategies, and supporting remote and digital ways of living and working.

                Factors Influencing Score:
                
                Network Resilience and Reliability: Strengthening communication infrastructure to ensure it remains operational during extreme weather events, critical for emergency responses and maintaining connectivity.
                Awareness and Education Campaigns: Utilizing media and communication platforms to promote understanding of climate adaptation needs and strategies, helping societies to adjust to changing conditions.
                Enabling Digital Access: Expanding digital access to services and information, facilitating adaptation to climate impacts by supporting education, telemedicine, and remote work options.`,
            },
            {
                title: 'YC',
                details: `Solutions Contribution: Communication services facilitate adaptation by ensuring the flow of critical information before, during, and after climate-related events and by providing platforms for sharing adaptation strategies and solutions.

                Factors Influencing Score:
                
                Emergency Alert Systems: Robust communication networks that support emergency alert systems, providing timely warnings about extreme weather and other climate-related hazards to at-risk populations.
                Information Dissemination on Adaptation Practices: Media and telecommunications platforms that distribute information on adaptation best practices, educating the public and policymakers on effective strategies to cope with climate change.
                Connectivity for Remote Communities: Enhancing access to communication services for remote or vulnerable communities, ensuring they remain connected during climate-induced disruptions and can access vital adaptation information and resources.`,
            },
            {
                title: 'ZA',
                details: `Risk Reduction Actions: Communication companies, through their infrastructure development and operations, can pose risks to biodiversity. Efforts to reduce these risks include minimizing the environmental impact of network infrastructure and promoting biodiversity awareness through their platforms.

                Factors Influencing Score:
                
                Infrastructure Siting and Development: Carefully planning the location and construction of communication infrastructure to avoid sensitive habitats and minimize ecological impacts.
                Promoting Biodiversity Awareness: Utilizing communication platforms to raise public awareness about biodiversity issues and conservation efforts, contributing to a broader understanding and action.
                Digital Solutions for Conservation: Offering digital solutions that support conservation efforts, such as apps for citizen science and platforms for sharing conservation research and successes.`,
            },
            {
                title: 'ZB',
                details: `Transition Efforts: Communication service providers are transitioning by leveraging their platforms to raise awareness about biodiversity issues and by adopting practices that reduce their environmental impact.

                Factors Influencing Score:
                
                Awareness and Educational Campaigns: Using media platforms to educate the public on biodiversity conservation, climate change, and the importance of natural habitats.
                Infrastructure Development: Developing communication infrastructure in a way that minimizes environmental disruption and promotes coexistence with natural habitats.
                Support for Remote Services: Promoting services that reduce the need for travel, thereby decreasing pressure on natural environments and supporting biodiversity indirectly.`,
            },
            {
                title: 'ZC',
                details: `Solutions Contribution: Communication service providers support biodiversity solutions by spreading awareness about environmental issues, offering platforms for conservation initiatives to share their work, and ensuring resilient communication networks that can aid in disaster response in biodiversity-rich areas.

                Factors Influencing Score:
                
                Awareness Campaigns: Utilizing media and communication platforms to run awareness campaigns on biodiversity conservation, highlighting the importance of protecting ecosystems for climate resilience and human well-being.
                Support for Conservation Organizations: Providing communication services at reduced rates or pro bono for conservation organizations, enabling them to reach wider audiences and mobilize resources.
                Disaster Response and Resilience: Maintaining and enhancing communication infrastructure resilience, particularly in biodiverse regions prone to natural disasters, to aid in rapid response and recovery efforts.`,
            },
        ],
    },
    {
        title: "Utilities",
        overviews: [
            {
                title: 'XA',
                details: `Risk Reduction Actions: The utilities sector, providing electricity, gas, and water services, is critical for the transition to a sustainable energy future. Its negative score primarily reflects the ongoing dependence on fossil fuels in many regions, though there is significant potential for positive impact through the adoption of renewable energy sources.

                Factors Influencing Score:
                
                Renewable Energy Transition: The sector's shift towards renewable energy sources, such as wind, solar, and hydroelectric power, is essential for climate mitigation and reducing carbon emissions.
                Grid Modernization: Investing in smart grid technologies can improve energy efficiency and reliability, facilitating the integration of renewable sources and demand response initiatives.
                Regulatory Environment: Utilities are heavily regulated, with policies that can either accelerate or hinder the transition to cleaner energy sources. Compliance and adaptation to these regulations are key challenges.
                Energy Efficiency Programs: Utilities can offer programs to help consumers reduce their energy use, contributing to overall emissions reductions. However, the effectiveness of these programs varies.`,
            },
            {
                title: 'XB',
                details: `Transition Efforts: The utilities sector is at the forefront of the climate mitigation transition, given its role in generating and distributing electricity. The transition involves shifting from fossil fuel-based power generation to renewable energy sources, a challenging but essential process for reducing global emissions.

                Factors Influencing Score:
                
                Renewable Energy Expansion: Utilities are increasingly investing in renewable energy sources like wind, solar, and hydroelectric power. The pace of this transition is critical and varies widely by region and company.
                Grid Modernization: Upgrading the electrical grid to accommodate renewable energy, improve efficiency, and enhance resilience is a significant part of the sector's transition efforts. This includes investments in smart grid technologies and energy storage solutions.
                Decarbonization Strategies: Beyond renewables, utilities are exploring other decarbonization strategies, such as nuclear power and CCS for existing fossil fuel plants. The sector's overall transition score is moderated by the technical and financial challenges associated with these strategies and the continued operation of high-emission power plants in many areas.`,
            },
            {
                title: 'XC',
                details: `Solutions Contribution: Utilities are at the heart of climate mitigation solutions, given their role in transitioning energy systems towards low-carbon sources. The sector's efforts to increase the share of renewable energy, improve grid efficiency, and invest in energy storage are crucial for reducing global emissions.

                Factors Influining Score:
                
                Renewable Energy Capacity: Expanding the generation of electricity from renewable sources such as wind, solar, and hydroelectric power is a direct contribution to climate mitigation.
                Grid Modernization and Efficiency: Investments in upgrading the electric grid to accommodate renewable energies, improve transmission efficiency, and reduce losses contribute significantly to emissions reductions.
                Energy Storage Solutions: Developing and deploying energy storage technologies enable the more effective use of renewable energy by balancing supply and demand, crucial for replacing fossil fuel-based power generation.`,
            },
            {
                title: 'YA',
                details: `Risk Reduction Actions: Utilities are on the front lines of climate adaptation risk reduction, tasked with ensuring the continuous provision of essential services like water and electricity in the face of increasing climate variability and extreme events.

                Factors Influencing Score:
                
                Strengthening Infrastructure Resilience: Upgrading utility infrastructure to withstand extreme weather events, such as reinforcing electrical grids and waterproofing water treatment facilities, to ensure uninterrupted services.
                Diversifying Water Sources: Exploring and investing in alternative water sources, including rainwater harvesting and desalination, to reduce vulnerability to droughts and water scarcity.
                Energy Grid Flexibility: Enhancing the flexibility and redundancy of energy grids, incorporating renewable energy sources and energy storage solutions to maintain power supply during and after climate-induced disruptions.`,
            },
            {
                title: 'YB',
                details: `Transition Efforts: Utilities play a direct role in adaptation by ensuring the reliability of water and energy services in the face of climate change, investing in infrastructure that can withstand extreme weather events, and adopting practices that conserve resources and protect ecosystems.

                Factors Influencing Score:
                
                Water Conservation and Management: Implementing advanced water management strategies to adapt to the changing availability of water resources, critical for both human use and ecosystem health.
                Energy Grid Adaptation: Upgrading and adapting energy grids to be more flexible and resilient to the impacts of climate change, ensuring continuous and reliable energy supply.
                Sustainable Resource Use: Focusing on sustainable resource use practices to minimize the environmental impact of utility services, contributing to the overall resilience of communities to climate change.`,
            },
            {
                title: 'YC',
                details: `Solutions Contribution: Utilities contribute to climate adaptation by ensuring the reliability and resilience of water and energy supplies in the face of climate variability and change, and by implementing solutions that protect these critical services from climate impacts.

                Factors Influencing Score:
                
                Resilient Water Services: Implementing advanced water management and conservation technologies to ensure stable water supplies during droughts or floods, including rainwater harvesting systems and desalination plants.
                Energy Supply Adaptation: Adapting energy generation and distribution practices to account for climate impacts, ensuring continuous service despite extreme weather conditions, and transitioning to more resilient renewable energy sources.
                Infrastructure Protection Measures: Investing in protective measures for utility infrastructure, such as flood defenses for power plants and reinforced pipelines, to prevent service disruptions during climate-related events.`,
            },
            {
                title: 'ZA',
                details: `Risk Reduction Actions: Utilities impact biodiversity through water and energy resource management and infrastructure development. Efforts to reduce these impacts focus on sustainable resource use, pollution control, and infrastructure planning that considers ecological values.

                Factors Influencing Score:
                
                Sustainable Water Management: Implementing water management practices that protect water sources and aquatic biodiversity, such as reducing water withdrawals and treating wastewater.
                Renewable Energy Development: Developing renewable energy projects in ways that minimize impacts on wildlife and natural habitats, including careful site selection and impact assessments.
                Pollution Reduction: Reducing emissions and discharges from utility operations to minimize their impact on local ecosystems and biodiversity.`,
            },
            {
                title: 'ZB',
                details: `Transition Efforts: Utilities are essential in the transition towards reducing biodiversity impact through the sustainable management of water and energy resources and by implementing practices that protect and support ecosystems.

                Factors Influencing Score:
                
                Sustainable Water Use: Implementing sustainable water management practices to ensure the health of aquatic ecosystems and the conservation of water resources.
                Renewable Energy Development: Developing renewable energy projects with consideration for wildlife and habitat conservation, minimizing impact on biodiversity.
                Habitat Protection Measures: Incorporating habitat protection and enhancement measures in the planning and operation of utility infrastructure, such as creating green corridors and avoiding sensitive areas.`,
            },
            {
                title: 'ZC',
                details: `Solutions Contribution: Utilities contribute to biodiversity solutions by adopting practices that reduce their ecological footprint, such as sustainable water and waste management, and by participating in habitat conservation and restoration projects.

                Factors Influencing Score:
                
                Sustainable Resource Management: Implementing sustainable water use and waste disposal practices to minimize impacts on aquatic ecosystems and protect water quality.
                Renewable Energy Projects: Carefully planning and implementing renewable energy projects to minimize impacts on wildlife and natural habitats, incorporating biodiversity considerations from the outset.
                Habitat Restoration Initiatives: Engaging in or supporting habitat restoration initiatives to compensate for any unavoidable impacts from utility infrastructure, such as replanting vegetation around reservoirs and along utility corridors.`,
            },
        ],
    },
    {
        title: "Real Estate",
        overviews: [
            {
                title: 'XA',
                details: `Risk Reduction Actions: The real estate sector, including residential, commercial, and industrial properties, has a significant impact on the environment through energy consumption, construction practices, and urban development. Its score reflects the sector's potential for adopting sustainable building practices and energy efficiency improvements.

                Factors Influencing Score:
                
                Sustainable Building Practices: The adoption of green building standards, such as LEED and BREEAM, can significantly reduce the environmental impact of new and existing buildings.
                Energy Efficiency: Improvements in building insulation, HVAC systems, and lighting can reduce energy consumption and GHG emissions.
                Urban Planning: Sustainable urban development practices that promote density, mixed-use development, and public transportation can reduce the carbon footprint of cities.
                Innovation in Materials: The use of sustainable construction materials and techniques can further mitigate the environmental impact of the sector.`,
            },
            {
                title: 'XB',
                details: `Transition Efforts: The real estate sector's contribution to the climate mitigation transition is through the development and management of buildings that are more energy-efficient and sustainable, reducing the built environment's carbon footprint.

                Factors Influencing Score:
                
                Green Building Practices: Adoption of green building standards (e.g., LEED, BREEAM) for new constructions and retrofits plays a significant role in reducing energy use and emissions. The sector is making progress, but the rate of adoption and the scope of practices vary.
                Energy Efficiency Retrofits: Upgrading existing buildings to improve energy efficiency is crucial for the transition. This includes better insulation, energy-efficient lighting and HVAC systems, and the integration of renewable energy sources.
                Sustainable Urban Development: The sector can contribute to broader climate mitigation efforts by promoting urban development patterns that reduce the need for car travel, enhancing public transportation access, and integrating green spaces to improve carbon sequestration in urban areas.`,
            },
            {
                title: 'XC',
                details: `Solutions Contribution: The real estate sector's role in climate solutions is primarily through the construction and management of buildings that are energy-efficient, powered by renewable energy, and designed with sustainable materials, significantly reducing the built environment's emissions.

                Factors Influining Score:
                
                Green Building Practices: Implementing green building standards and certifications for new and existing buildings reduces energy consumption and emissions. The sector's increasing adoption of these practices contributes positively to climate solutions.
                Renewable Energy Integration: Incorporating renewable energy sources, such as solar panels and geothermal systems, into building designs lowers the reliance on fossil fuel-based electricity.
                Sustainable Urban Development: Promoting developments that enhance energy efficiency, reduce waste, and improve the use of resources, including the integration of green spaces and support for public transportation, contributes to a reduction in urban emissions.`,
            },
            {
                title: 'YA',
                details: `Risk Reduction Actions: The real estate sector addresses climate adaptation risks by developing properties and infrastructure that are resilient to climate change impacts, thereby reducing the vulnerability of built environments.

                Factors Influencing Score:
                
                Climate-Resilient Building Standards: Adopting and promoting building standards and practices that increase the resilience of structures to extreme weather and long-term climate changes.
                Green Infrastructure Integration: Incorporating green infrastructure, such as permeable pavements and urban green spaces, which can help manage stormwater, reduce urban heat island effects, and enhance urban resilience.
                Location and Land Use Planning: Careful selection of development sites and thoughtful land use planning to avoid high-risk areas such as flood plains, while also considering the impacts of future climate conditions on property accessibility and safety.`,
            },
            {
                title: 'YB',
                details: `Transition Efforts: The real estate sector's transition towards positive adaptation contributions is marked by developing properties and infrastructure that are resilient to climate change, employing green building practices that reduce environmental impact, and enhancing the livability of spaces in the face of changing climate conditions.

                Factors Influencing Score:
                
                Climate-Resilient Building Practices: Incorporating climate resilience into building designs and materials, ensuring properties are capable of withstanding extreme weather and changing climates.
                Sustainable Urban Development: Promoting urban development that considers future climate scenarios, integrating green spaces, and enhancing urban mobility to reduce the need for adaptation.
                Community Resilience Projects: Engaging in projects that enhance the resilience of communities to climate impacts, such as flood defenses and heat mitigation initiatives, contributing to safer, more adaptable living environments.`,
            },
            {
                title: 'YC',
                details: `Solutions Contribution: The real estate sector addresses adaptation through the development of buildings and communities that are designed to cope with the changing climate, integrating resilience into new constructions and retrofitting existing structures to withstand climate impacts.

                Factors Influencing Score:
                
                Climate-Resilient Construction: Building designs that incorporate features to resist extreme weather, improve energy and water efficiency, and reduce heat island effects, contributing to the overall resilience of urban areas.
                Green Infrastructure: Incorporating green roofs, permeable pavements, and urban green spaces that help manage stormwater, reduce flooding risks, and enhance urban climate adaptation.
                Adaptive Retrofitting: Initiatives to retrofit existing buildings with climate-resilient features, such as improved insulation, flood barriers, and emergency power systems, ensuring they can better withstand climate impacts and continue to provide safe habitats.`,
            },
            {
                title: 'ZA',
                details: `Risk Reduction Actions: The real estate sector influences biodiversity through land development and building operations. Risk reduction involves adopting green building practices, preserving green spaces, and ensuring developments are planned with biodiversity in mind.

                Factors Influencing Score:
                
                Green Building and Landscaping: Implementing green building standards that include considerations for preserving local biodiversity and using native plants in landscaping to support local ecosystems.
                Conservation of Natural Areas: Preserving and integrating natural areas within development projects to maintain habitat connectivity and biodiversity.
                Sustainable Development Practices: Employing sustainable development practices that minimize land use impacts, reduce pollution, and enhance the resilience of built environments to climate change, indirectly supporting biodiversity conservation.`,
            },
            {
                title: 'ZB',
                details: `Transition Efforts: The real estate sector is increasingly incorporating biodiversity considerations into development projects, recognizing the value of green spaces and ecosystem services in urban and suburban settings.

                Factors Influencing Score:
                
                Biodiversity-Inclusive Planning: Integrating biodiversity considerations into planning and development processes to preserve natural habitats and enhance green spaces.
                Sustainable Development Practices: Employing sustainable development practices that minimize land use impacts and support biodiversity, such as using native plantings and reducing surface runoff.
                Green Building Certifications: Pursuing green building certifications that include criteria for biodiversity, promoting the development of buildings and communities that coexist harmoniously with their natural surroundings.`,
            },
            {
                title: 'ZC',
                details: `Solutions Contribution: The real estate sector supports biodiversity solutions through the development of green spaces within urban areas, sustainable property management practices, and investments in green infrastructure that benefits local ecosystems.

                Factors Influencing Score:
                
                Incorporating Biodiversity in Developments: Designing real estate developments that include green spaces, promote native biodiversity, and contribute to ecological connectivity within urban environments.
                Sustainable Property Management: Adopting property management practices that minimize environmental impacts and support biodiversity, such as eco-friendly landscaping and use of sustainable materials.
                Investment in Green Infrastructure: Investing in green infrastructure, such as green roofs and walls, rain gardens, and permeable pavements, which provide habitat for urban biodiversity and enhance ecosystem services.`,
            },
        ],
    },
];

console.log('first datas', sectors)



const cubeData = [
    // Front side data
    {
        text: 'XC1',
        anchorX: 'center',
        position: [-1, 1, 1.53],
        rotation: [0, 0, 0],
    },
    {
        text: 'XB1',
        anchorX: 'center',
        position: [-1, 0, 1.53],
        rotation: [0, 0, 0],
    },
    {
        text: 'XA1',
        anchorX: 'center',
        position: [-1, -1, 1.53],
        rotation: [0, 0, 0],
    },

    {
        text: 'YC1',
        anchorX: 'center',
        position: [0, 1, 1.53],
        rotation: [0, 0, 0],
    },
    {
        text: 'YB1',
        anchorX: 'center',
        position: [0, 0, 1.53],
        rotation: [0, 0, 0],
    },
    {
        text: 'YA1',
        anchorX: 'center',
        position: [0, -1, 1.53],
        rotation: [0, 0, 0],
    },

    {
        text: 'ZC1',
        anchorX: 'center',
        position: [1, 1, 1.53],
        rotation: [0, 0, 0],
    },
    {
        text: 'ZB1',
        anchorX: 'center',
        position: [1, 0, 1.53],
        rotation: [0, 0, 0],
    },

    {
        text: 'ZA1',
        anchorX: 'center',
        position: [1, -1, 1.53],
        rotation: [0, 0, 0],
    },


    // Left side data
    {
        text: 'C:\nSolutions',
        anchorX: 'right',
        position: [-1.8, 1, 1.5],
        rotation: [0, 0, 0],
    },
    {
        text: 'B:\nTransition',
        anchorX: 'right',
        position: [-1.8, 0, 1.5],
        rotation: [0, 0, 0],
    },
    {
        text: 'A:\nRisk\nreduction',
        anchorX: 'right',
        position: [-1.8, -1, 1.5],
        rotation: [0, 0, 0],
    },

    // Front-Down side data
    {
        text: 'X: Climate\nmitigation',
        anchorX: 'center',
        position: [-1, -1.7, 1.5],
        rotation: [0, 0, 0],
    },
    {
        text: 'Y: Climate\nadaptation',
        anchorX: 'center',
        position: [0, -1.7, 1.5],
        rotation: [0, 0, 0],
    },
    {
        text: 'Z: Biodiversity',
        anchorX: 'center',
        position: [1, -1.7, 1.5],
        rotation: [0, 0, 0],
    },

    // Right-Down side data
    {
        text: '3:\nSpend',
        anchorX: 'center',
        position: [2, -1.7, -1],
        rotation: [0, 0, -0.31],
    },
    {
        text: '2:\nLend',
        anchorX: 'center',
        position: [2, -1.7, 0],
        rotation: [0, 0, -0.31],
    },
    {
        text: '1:\nInvest',
        anchorX: 'center',
        position: [2, -1.7, 1],
        rotation: [0, 0, -0.31],
    },
];


function RubikCube({ setStep, setIsLoading }) {
    const texts = 'Risk\nreduction';
    return (
        <>
            {/* <img style={{width:"500px", height:"500px"}} src="/public/assets/cam.jpg" alt="" /> */}
            {/* <Canvas style={{ width: '100vw', height: '100vh' }} camera={{ position: [3, 3, 3] }}> */}
            {/* <Canvas style={{ width: '100vw', height: '100vh' }} orthographic camera={{ position: [-2, 3, 4], left: -2, right: 2, top: 2, bottom: -2 }}> */}
            {/* <Canvas style={{ width: '100vw', height: '100vh' }} orthographic camera={{ position: [-3, 2, 5], left: -2, right: 2, top: 2, bottom: -2, zoom: 100 }}> */}
            {/* <Canvas style={{ width: '100vw', height: '100vh' }} orthographic camera={{ position: [-3, 2, 5], left: -2, right: 2, top: 2, bottom: -2, zoom: 100 }}> */}
            <Canvas style={{ width: '100vw', height: '100vh', transition:'all 2s ease-in-out' }} orthographic camera={{ position: [2.5, 2, 5], left: -2, right: 2, top: 2, bottom: -2, zoom: 100 }}>
                <ambientLight intensity={0.5} />
                <color attach="background" args={['#818589']} />
                {/* <color attach="background" args={['#ffffff']} /> */}
                <Suspense>
                    <Environment preset="sunset" />
                </Suspense>
                <Cube setStep={setStep} setIsLoading={setIsLoading} />
                <OrbitControls target={[0, 0, 0]} />
                {/* <ContactShadows frames={1} position={[0, -0.5, 0]}  color="orange" /> */}
                <Stats />
                <Box />
                <meshStandardMaterial color="white" />
                <>
                    {/* left */}
                </>
                <>
                    {/* bottom */}
                </>
                <>
                    {/* right */}
                    {/* <CubeLabel anchorX={'right'} text="Solutions" position={[-1.8, 1, 1.5]} rotation={[0, 0, 0]} />
                    <CubeLabel anchorX={'right'} text="Transition" position={[-1.8, 0, 1.5]} rotation={[0, 0, 0]} />
                    <CubeLabel anchorX={'right'} text={texts} position={[-1.8, -1, 1.5]} rotation={[0, 0, 0]} />
                    <CubeLabel anchorX={'center'} text="Climate mitigation" position={[1, -1.7, 1.5]} rotation={[0, 0, 0]} />
                    <CubeLabel anchorX={'center'} text="Climate adaptation" position={[0, -1.7, 1.5]} rotation={[0, 0, 0]} />
                    <CubeLabel anchorX={'center'} text="Biodiversity" position={[-1, -1.7, 1.5]} rotation={[0, 0, 0]} />
                    <CubeLabel anchorX={'center'} text="Spend" position={[2, -1.7, -1]} rotation={[0, 0, -0.31]} />
                    <CubeLabel anchorX={'center'} text="Lend" position={[2, -1.7, 0]} rotation={[0, 0, -0.31]} />
                    <CubeLabel anchorX={'center'} text="Invest" position={[2, -1.7, 1]} rotation={[0, 0, -0.31]} />

                     */}

                </>
                {cubeData.map((cube, index) => (
                    <CubeLabel
                        key={index}
                        anchorX={cube.anchorX}
                        text={cube.text}
                        position={cube.position}
                        rotation={cube.rotation}
                    />
                ))}
            </Canvas>
        </>
    )
}

export default RubikCube;

const CubeLabel = ({ text, position, rotation, anchorX }) => {
    return (
        <Text
            position={position}
            rotation={rotation}
            fontSize={0.13}
            fontWeight={800}
            color="black"
            anchorX={anchorX}
            anchorY="middle"
            remove={true}
            whiteSpace='pre-wrap'
        >
            {text}
        </Text>
    )
}

//? prev code end













// /* eslint-disable react/no-unknown-property */
// /* eslint-disable react/prop-types */
// import { Box, Environment, Html, OrbitControls, RenderTexture, Stats, Text } from '@react-three/drei'
// import { Canvas, useFrame } from '@react-three/fiber'
// import TWEEN from '@tweenjs/tween.js'
// import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
// import * as THREE from 'three'
// import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
// import { FontLoader, TextGeometry } from 'three/examples/jsm/Addons.js'
// import { ColorConverter } from 'three/examples/jsm/math/ColorConverter'

// function Cube({ setStep }) {
//     const ref = useRef();
//     const roundedBoxGeometry = useMemo(() => {
//         return new RoundedBoxGeometry(1, 1, 1, 1, 0.05)
//     }, []);

//     const [animationStep, setAnimationStep] = useState(0); // 0: initial, 1: separated, 2: reposition, 3: zoom in, 4: merged

//     const handleCubeletClick = () => {
//         setAnimationStep((prevStep) => (prevStep + 1) % 5);
//     }

//     useFrame(() => {
//         TWEEN.update()

//         // Separate cubes
//         if (animationStep === 1) {
//             ref.current.children.forEach((child, index) => {
//                 const x = (index % 3) - 1;
//                 const y = Math.floor((index / 3) % 3) - 1;
//                 const z = Math.floor(index / 9) - 1;

//                 const position = new THREE.Vector3(x * 2, y * 2, z * 2);
//                 new TWEEN.Tween(child.position)
//                     .to({ x: position.x, y: position.y, z: position.z }, 1000)
//                     .easing(TWEEN.Easing.Cubic.Out)
//                     .start();
//             });
//         }

//         // Reposition cubes
//         if (animationStep === 2) {
//             ref.current.children.forEach((child, index) => {
//                 const x = Math.random() * 4 - 2;
//                 const y = Math.random() * 4 - 2;
//                 const z = Math.random() * 4 - 2;

//                 const position = new THREE.Vector3(x, y, z);
//                 new TWEEN.Tween(child.position)
//                     .to({ x: position.x, y: position.y, z: position.z }, 1000)
//                     .easing(TWEEN.Easing.Cubic.Out)
//                     .start();
//             });
//         }

//         // Zoom in
//         if (animationStep === 3) {
//             ref.current.children.forEach((child) => {
//                 new TWEEN.Tween(child.scale)
//                     .to({ x: 0.5, y: 0.5, z: 0.5 }, 1000)
//                     .easing(TWEEN.Easing.Cubic.Out)
//                     .start();
//             });
//         }

//         // Merge cubes
//         if (animationStep === 4) {
//             ref.current.children.forEach((child, index) => {
//                 const x = (index % 3) - 1;
//                 const y = Math.floor((index / 3) % 3) - 1;
//                 const z = Math.floor(index / 9) - 1;

//                 const position = new THREE.Vector3(x, y, z);
//                 new TWEEN.Tween(child.position)
//                     .to({ x: position.x, y: position.y, z: position.z }, 1000)
//                     .easing(TWEEN.Easing.Cubic.Out)
//                     .start();

//                 new TWEEN.Tween(child.scale)
//                     .to({ x: 1, y: 1, z: 1 }, 1000)
//                     .easing(TWEEN.Easing.Cubic.Out)
//                     .start();
//             });
//         }
//     });

//     return (
//         <>
//             <group ref={ref} onClick={handleCubeletClick}>
//                 {[...Array(3).keys()].map((x, i) =>
//                     [...Array(3).keys()].map((y, j) =>
//                         [...Array(3).keys()].map((z, k) => (
//                             <Cubelet
//                                 key={x + y * 3 + z * 9}
//                                 position={[x - 1, y - 1, z - 1]}
//                                 geometry={roundedBoxGeometry}
//                             />
//                         ))
//                     )
//                 )}
//             </group>
//         </>
//     )
// }

// function Cubelet({ position, geometry }) {
//     return (
//         <mesh position={position} geometry={geometry}>
//             {[...Array(6).keys()].map((i) => (
//                 <meshStandardMaterial key={i} attach={`material-${i}`} />
//             ))}
//         </mesh>
//     )
// }
