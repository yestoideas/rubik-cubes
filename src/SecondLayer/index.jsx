import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import SquareBoxes from "../components/SquareBoxes";


const secondLayerData = [
    {
        shortText: "X",
        title: "Climate Mitigation",
        desc_1: "Climate mitigation encompasses the actions and policies aimed at reducing the rate and magnitude of long-term climate change by addressing the root causes, primarily through reducing greenhouse gas emissions and enhancing carbon sinks. The essence of climate mitigation is to alter human activities in ways that will both prevent the release of greenhouse gases and capture existing carbon dioxide in the atmosphere, thereby striving to stabilize or reduce global temperatures.",
        desc_2: "Climate mitigation, therefore, involves a holistic approach that integrates technological, natural, policy, and economic strategies to reduce the drivers of climate change effectively. It is about rethinking how societies operate, from energy production and industrial processes to transportation and land use, aiming for a sustainable future that limits the risks of climate change to ecosystems and human life.",
        sub_data_1: [
            {
                subtitle: "Reduction of Carbon Dioxide Emissions",
                desc: "The most critical and widely recognized aspect of climate mitigation involves significant reductions in carbon dioxide (CO2) emissions. This is primarily achieved by transitioning away from fossil fuels to renewable energy sources. Solar, wind, geothermal, and hydroelectric power are pivotal in this transition, as they produce electricity without emitting CO2. The shift also involves phasing out coal-fired power plants, increasing fuel efficiency in vehicles, and enhancing energy efficiency in buildings and industrial processes."
            },
            {
                subtitle: "Carbon Capture and Sequestration (CCS)",
                desc: "CCS technologies aim to capture CO2 emissions at their source—such as power plants and industrial facilities—and store it underground in geological formations or use it for other industrial processes, effectively removing it from the atmosphere. This technology is crucial for heavy industries like steel and cement production, where decarbonization options are limited.",

            },
            {
                subtitle: "Carbon Sequestration through Natural Processes",
                desc: "",

                child_data_1: [
                    {
                        subtitle: "Forestry",
                        desc: "Reforestation (replanting trees where forests have been depleted) and afforestation (creating new forests in areas previously not forested) are vital natural processes for sequestering atmospheric CO2. Forests act as carbon sinks, absorbing CO2 through photosynthesis.",
                    },
                    {
                        subtitle: "Soil Management",
                        desc: "Agricultural practices such as no-till farming, cover cropping, and organic farming can increase the carbon content in soils, effectively removing CO2 from the atmosphere.",
                    },
                    {
                        subtitle: "Wetlands and Mangroves",
                        desc: "Protecting and restoring wetlands and mangroves, which store large amounts of carbon in both plants and sediment, also contribute to natural carbon sequestration.",
                    },
                ]
            },
            {
                subtitle: "Methane Reduction",
                desc: "Methane is a potent greenhouse gas, and its reduction is a critical component of climate mitigation. Strategies include improving waste management practices to capture methane from landfills, upgrading oil and gas infrastructure to prevent leaks, and changing livestock feeding practices to reduce enteric fermentation in ruminants.",
            },
            {
                subtitle: "Reduction of Nitrous Oxide",
                desc: "Addressing nitrous oxide, primarily emitted through agricultural activities, involves optimizing the use of nitrogen-based fertilizers and promoting better overall management of croplands and livestock.",
            },
            {
                subtitle: "Policy and Regulatory Frameworks",
                desc: "Effective climate mitigation requires robust policy frameworks. This includes implementing carbon pricing mechanisms, such as taxes and cap-and-trade systems, that incentivize the reduction of greenhouse gas emissions. Regulations may also mandate or encourage energy efficiency, set emissions standards for vehicles and industries, and support the development and adoption of clean technologies.",
            },
            {
                subtitle: "International Agreements and Cooperation",
                desc: "Climate change is a global issue that necessitates international cooperation. Agreements like the Paris Agreement under the United Nations Framework Convention on Climate Change (UNFCCC) commit countries to limiting global warming to well below 2, preferably to 1.5 degrees Celsius, compared to pre-industrial levels. These agreements are crucial for coordinating global efforts and ensuring that all countries commit to mitigation.",
            },
            {
                subtitle: "Innovation and Technology Development",
                desc: "Investing in research and development is crucial for finding new and more efficient ways to reduce emissions. Innovations in battery technology, nuclear fusion, and renewable energy technologies are among the advancements that could drastically reduce global dependence on fossil fuels.",
            },
            {
                subtitle: "Promotion of Sustainable Practices",
                desc: "Encouraging sustainable consumption and production patterns is another pillar of climate mitigation. This can be facilitated by raising public awareness about the environmental impacts of consumer choices and by governments and businesses adopting sustainable practices.",
            },
            {
                subtitle: "Economic Transition",
                desc: "10.The shift to a low-carbon economy involves transitioning economic structures away from carbon-intensive industries. This requires support for communities and workers affected by these changes, ensuring a just transition that fosters economic resilience and new opportunities in green sectors.",
            },
        ],
    },


    {
        shortText: "Y",
        title: "Climate adaptation",
        desc_1: "Climate adaptation refers to the strategies, actions, and responses that individuals, communities, organizations, and governments implement to cope with the effects of climate change that are already occurring or are anticipated in the future. Unlike climate mitigation, which aims to address the root causes of climate change by reducing greenhouse gas emissions and increasing carbon sinks, climate adaptation focuses on adjusting practices, processes, and policies to minimize the adverse impacts of climate change on human and natural systems.",
        desc_2: "Climate adaptation is about being proactive and reactive—anticipating likely impacts and preparing for them, while also responding to the changes that are already visible. It's a continuous and evolving process that seeks to safeguard human and natural systems against the current and projected impacts of climate change.",
        sub_data_1: [
            {
                subtitle: "Infrastructure Resilience",
                desc: "Enhancing the resilience of infrastructure is crucial to withstand the increasing frequency and severity of climate-related events such as storms, floods, heatwaves, and sea-level rise. This includes building flood defenses, designing buildings and roads to tolerate extreme weather, and improving water management systems to cope with both droughts and heavy rainfalls."
            },
            {
                subtitle: "Water Resource Management",
                desc: "As climate change often leads to changes in water availability and quality, managing water resources more effectively becomes essential. This can involve developing new water-saving technologies, improving irrigation efficiency in agriculture, and implementing systems for rainwater harvesting and water reuse."
            },
            {
                subtitle: "Agricultural Adaptation",
                desc: "3.Adapting agricultural practices to the changing climate is vital to ensure food security. This can include developing drought-resistant crop varieties, altering planting schedules, and employing soil conservation techniques to combat erosion and maintain fertility in changing weather conditions."
            },
            {
                subtitle: "Ecosystem Adaptation",
                desc: "Protecting and restoring ecosystems can enhance their resilience to climate change while maintaining the benefits they provide to humans and wildlife. Strategies might include managing forests to prevent wildfires, restoring coastal mangroves which protect against storm surges, and creating wildlife corridors to assist species migration in response to climate shifts."
            },
            {
                subtitle: "Public Health Preparedness",
                desc: "Climate change poses significant risks to public health, including increased spread of vector-borne diseases and heat-related illnesses. Preparing for these changes involves enhancing public health surveillance, developing heat action plans, and improving disease control and prevention measures."
            },
            {
                subtitle: "Disaster Risk Reduction",
                desc: "Improving disaster preparedness and response systems is critical as climate change increases the likelihood of extreme weather events. This involves upgrading emergency response services, implementing early warning systems, and community training programs to ensure quick and effective responses to disasters."
            },
            {
                subtitle: "Economic Diversification",
                desc: "Economies, particularly those heavily reliant on climate-sensitive sectors like agriculture and tourism, need to diversify to reduce vulnerability to climate variability. This can involve supporting the development of alternative industries or enhancing the value chain within existing sectors."
            },
            {
                subtitle: "Urban Planning and Development",
                desc: "Cities need to adapt to the challenges posed by climate change by integrating climate risk assessments into urban planning and development strategies. This includes modifying land use plans to consider flood risks, heat effects, and other climate-related factors."
            },
            {
                subtitle: "Insurance and Financial Products",
                desc: "Developing insurance products that cover climate risks and financial instruments that support recovery and resilience can help communities manage the economic impacts of climate events. This includes parametric insurance that pays out based on the occurrence of a specific event (e.g., a hurricane reaching a certain category) and resilience bonds that fund infrastructure improvements."
            },
            {
                subtitle: "Community-Based Adaptation",
                desc: "Involving communities directly in the planning and implementation of adaptation strategies ensures that local knowledge and needs are integrated. Community-based approaches are particularly effective in rural and indigenous communities, where local practices and experiences can significantly inform broader adaptation efforts."
            },
            {
                subtitle: "Legislative and Policy Frameworks",
                desc: "Developing robust legal and policy frameworks that encourage adaptation measures and provide guidelines and resources for implementing them is essential. This may include laws mandating climate risk assessments for new developments or policies that incentivize the adoption of resilient technologies."
            },
            {
                subtitle: "International Cooperation and Capacity Building",
                desc: "12.Climate adaptation is a global challenge that requires international cooperation, especially to support vulnerable regions that may lack the resources to implement effective adaptation strategies. International agreements and cooperation can facilitate the sharing of knowledge, funding, and technology necessary for adaptation efforts."
            },
            {
                subtitle: "Education and Awareness",
                desc: "Raising awareness and understanding of climate impacts and adaptation needs among the public and policymakers is crucial for driving the behavioral and structural changes necessary for effective adaptation."
            },
        ],
    },

    {
        shortText: "Z",
        title: "Biodiversity",
        desc_1: "Biodiversity refers to the variety and variability of life on Earth, encompassing the diversity within species, between species, and of ecosystems. Biodiversity is crucial for the stability and resilience of ecological systems and provides a wealth of resources and services to humans, including food, medicinal resources, and ecological services such as pollination, water purification, and climate regulation.",
        desc_2: "Biodiversity is not only about the richness and variety of life but also about maintaining the resilience and functionality of ecosystems that support all life on Earth, including human life. Its conservation is critical for sustainable development, ecological health, and ensuring our planet remains habitable and vibrant for future generations.",
        subtitle_1: "The Importance of Biodiversity",
        subtitle_2: "Threats to Biodiversity",
        subtitle_3: "Strategies for Biodiversity Conservation",
        sub_data_1: [
            {
                subtitle: "Ecosystem Services",
                desc: "Biodiversity supports fundamental processes that make life viable on Earth. Diverse ecosystems deliver essential services like nutrient cycling, oxygen production, soil formation, and water filtration. These services are crucial for human survival and cannot be replicated through artificial means at a global scale."
            },
            {
                subtitle: "Economic Benefits",
                desc: "2.Many industries such as agriculture, cosmetics, pharmaceuticals, pulp and paper, horticulture, construction, and waste treatment derive directly from biodiversity. Products like food, fiber, wood, and medicine are all obtained from biological resources. Maintaining biodiversity ensures that these industries can sustainably continue to benefit society."
            },
            {
                subtitle: "Health and Medicine",
                desc: "3.Biodiversity is a critical resource for medical research and drug development. Many pharmaceutical products are derived from genetic resources that come from plants, animals, and microorganisms. Moreover, biodiversity in ecosystems can help manage pathogens and diseases. Healthy ecosystems can act as buffers to some diseases by controlling host populations and reducing transmission opportunities."
            },
            {
                subtitle: "Cultural Value",
                desc: "4.Biodiversity holds immense cultural significance for many communities around the world. Plants and animals play key roles in cultural rites and traditions, symbols, and as inspiration for art, music, and literature. Many people attribute deep spiritual meaning to various natural elements and landscapes."
            },
            {
                subtitle: "Adaptation and Resilience",
                desc: "5.Diverse ecosystems are more resilient to disturbances like natural disasters and climate change. A variety of species means that some can maintain ecosystem functions if others fail, a concept known as ecological redundancy. This adaptability is crucial as the climate continues to change unpredictably."
            },
        ],
        sub_data_2: [
            {
                subtitle: "Habitat Destruction",
                desc: "1.The most significant threat to biodiversity is habitat destruction caused by activities such as deforestation, urban expansion, agriculture, and mining. These activities drastically alter landscapes and the natural habitats that wildlife depend on."
            },
            {
                subtitle: "Climate Change",
                desc: "2.Rapid climate changes are outpacing the ability of many species to adapt. Changing temperatures and weather patterns disrupt breeding, feeding, and migration patterns, threatening species survival."
            },
            {
                subtitle: "Pollution",
                desc: "Air, water, and soil pollution directly harm living organisms. For example, water pollution from agricultural runoff can lead to nutrient overloading in water bodies, causing deadly algal blooms and dead zones."
            },
            {
                subtitle: "Overexploitation",
                desc: "Overfishing, hunting, poaching, and the illegal wildlife trade diminish species populations faster than they can replenish, leading to drastic declines and extinctions."
            },
            {
                subtitle: "Invasive Species",
                desc: "5.Species introduced to new environments, whether accidentally or intentionally, can outcompete, prey on, or bring diseases to native species, disrupting local ecosystems and leading to biodiversity loss."
            },
        ],
        sub_data_3: [
            {
                subtitle: "Protected Areas",
                desc: "1.Establishing and enforcing protected areas such as national parks, wildlife reserves, and marine protected areas to conserve natural habitats and endemic species."
            },
            {
                subtitle: "Legislation and Policy",
                desc: "2.Implementing laws and policies that protect biodiversity, regulate resource use, and penalize illegal activities harming ecosystems and species."
            },
            {
                subtitle: "Restoration Ecology",
                desc: "3.Restoring degraded and former habitats to reestablish ecosystem functions and species populations through active human intervention and natural processes."
            },
            {
                subtitle: "Sustainable Practices",
                desc: "4.Promoting sustainable agriculture, forestry, fishing, and urban development practices that maintain ecological balance and conserve biodiversity."
            },
            {
                subtitle: "Education and Awareness",
                desc: "5.Raising public awareness about the importance of biodiversity and the steps individuals can take to protect it. Education empowers communities to participate actively in conservation efforts."
            },
            {
                subtitle: "International Cooperation",
                desc: "Biodiversity conservation is a global issue that requires international collaboration, sharing of knowledge, resources, and strategies, as many ecosystems and species do not recognize national boundaries."
            },
        ],
    },

    {
        shortText: "A",
        title: "Risk reduction",
        desc_1: "Risk reduction in the context of environmental management refers to the strategies and actions aimed at minimizing the potential negative impacts associated with environmental hazards, climate change, and biodiversity loss. Unlike transition strategies, which focus on moving from harmful practices to sustainable ones, or solutions, which provide direct methods to address and solve environmental problems, risk reduction is specifically about lessening the probability or severity of potential negative outcomes. This involves understanding and mitigating risks before they translate into actual damage or loss.",
        desc_2: "Risk reduction is fundamentally about foreseeing potential problems and taking proactive steps to minimize their impact. It is a crucial component of environmental management, ensuring that societies and ecosystems are prepared for and can withstand adverse conditions while maintaining functionality and resilience.",
        sub_data_1: [
            {
                subtitle: "Assessment and Identification of Risks",
                desc: "The first step in effective risk reduction is to identify and assess the potential risks associated with environmental changes and impacts. This involves scientific research and data analysis to understand the extent, probability, and severity of risks posed by various factors such as climate change, natural disasters, pollution, and human activities. Understanding these risks allows for more targeted and effective mitigation strategies."
            },
            {
                subtitle: "Infrastructure Resilience",
                desc: "2.Enhancing the resilience of infrastructure to withstand environmental stresses and shocks is a crucial component of risk reduction. This includes designing and building structures that can resist extreme weather events like hurricanes, floods, and heatwaves. It also involves upgrading existing infrastructure to meet higher standards of resilience and implementing engineering solutions that reduce vulnerability to environmental hazards."
            },
            {
                subtitle: "Early Warning Systems and Preparedness",
                desc: "3.Implementing early warning systems for natural disasters such as tsunamis, earthquakes, and storms can significantly reduce the risk of large-scale human and material losses. These systems are complemented by preparedness plans that detail actions to be taken by governments, communities, and individuals before, during, and after environmental events."
            },
            {
                subtitle: "Preventive Health Measures",
                desc: "4.As climate change can facilitate the spread of diseases (like vector-borne illnesses due to expanded habitats of vectors such as mosquitoes), risk reduction also encompasses public health measures designed to prevent outbreaks. This includes monitoring and controlling disease vectors, improving water quality to prevent waterborne diseases, and public health campaigns to raise awareness about preventive practices."
            },
            {
                subtitle: "Natural Resource Management",
                desc: "5.Sustainable management of natural resources like forests, water bodies, and land can reduce environmental risks by maintaining ecosystem services that buffer against hazards. For example, maintaining healthy forests can mitigate the risk of landslides and floods, while proper water management can prevent droughts and water scarcity."
            },
            {
                subtitle: "Community-Based Risk Reduction",
                desc: "6.Engaging local communities in risk reduction efforts is essential, as these are often the first to face the direct impacts of environmental changes. Community-based approaches can include local surveillance of hazards, participation in natural resource management, and implementation of local adaptation measures."
            },
            {
                subtitle: "Insurance and Financial Instruments",
                desc: "7.Developing financial products that provide a safety net against environmental risks is another method of risk reduction. This includes insurance products that cover damages from natural disasters and financial instruments that support recovery and resilience building."
            },
            {
                subtitle: "Legal and Policy Frameworks",
                desc: "8.Implementing laws and policies that enforce environmental protection standards, regulate land use, control pollution, and mandate risk assessments for new projects helps reduce the overall risk to ecosystems and human communities."
            },
            {
                subtitle: "Biodiversity Conservation",
                desc: "9.Protecting and restoring biodiversity is not only about preserving the natural world but also about reducing risks associated with its loss. Healthy ecosystems are more resilient and can better withstand and recover from environmental stresses, thereby reducing the risk of system collapses and the cascade of effects they would cause."
            },
            {
                subtitle: "Research and Innovation",
                desc: "10.Ongoing research into environmental changes, risks, and mitigation strategies is vital for effective risk reduction. Innovation in technology, from improved monitoring tools to new materials and engineering techniques, can also play a significant role in reducing risks."
            },
        ],
    },

    {
        shortText: "B",
        title: "Transition",
        desc_1: "Transition in the context of environmental management involves shifting from harmful or unsustainable practices towards sustainable and environmentally friendly practices. It is about fundamentally transforming the way societies operate to align with ecological sustainability, addressing the underlying causes of environmental degradation, and moving towards a more balanced relationship with the natural world. Transition strategies are essential for addressing global challenges such as climate change, biodiversity loss, and pollution.",
        desc_2: "Transition is a comprehensive process that involves multi-dimensional changes across technological, economic, social, and political spheres. It requires concerted efforts from all sectors of society, including governments, businesses, civil society, and individuals, to move towards a sustainable future that minimizes environmental impacts and fosters an equitable and resilient global community.",
        sub_data_1: [
            {
                subtitle: "Energy Transition",
                desc: "1.This is one of the most critical components of environmental transition. It involves moving away from fossil fuel-based energy systems to renewable energy sources such as solar, wind, hydro, and geothermal power. The energy transition also includes increasing energy efficiency across all sectors and investing in new technologies such as smart grids and energy storage solutions to enhance the effectiveness and reliability of renewable energy."
            },
            {
                subtitle: "Industrial Transition",
                desc: "2.Industries are major contributors to environmental pollution and resource depletion. Transitioning to sustainable industrial practices includes adopting cleaner and more efficient production technologies, minimizing waste through circular economy principles, and reducing the carbon footprint of manufacturing processes. This also involves the development of green supply chains that prioritize sustainability at every step."
            },
            {
                subtitle: "Transportation Transition",
                desc: "3.Transforming the transportation sector to reduce its environmental impact is essential. This involves increasing the use of public transport, promoting electric and hydrogen fuel cell vehicles, developing cycling and walking infrastructure, and investing in high-speed rail networks. The goal is to reduce dependence on private and fossil-fuel-powered vehicles."
            },
            {
                subtitle: "Agricultural Transition",
                desc: "4.Sustainable agriculture is pivotal in transitioning to environmentally friendly practices. This includes adopting techniques like organic farming, integrated pest management, and agroecological practices that enhance biodiversity, improve soil health, and reduce reliance on chemical inputs such as synthetic fertilizers and pesticides."
            },
            {
                subtitle: "Urban Transition",
                desc: "5.Cities play a crucial role in environmental transition due to their high concentrations of population, resources, and economic activities. Urban transition strategies include developing green infrastructure, promoting green building standards, enhancing waste management systems, and creating sustainable water management practices. It also involves planning and designing cities in ways that reduce environmental footprints, such as incorporating nature-based solutions and improving energy efficiency."
            },
            {
                subtitle: "Financial Transition",
                desc: "6.Redirecting financial flows from harmful activities to sustainable ones is crucial for a broad transition. This includes investing in green technologies and industries, divesting from fossil fuels, and developing financial products that support sustainable practices, such as green bonds and sustainable investment funds."
            },
            {
                subtitle: "Legislative and Policy Transition",
                desc: "7.Effective policies and regulations are necessary to facilitate environmental transitions. This includes implementing laws that enforce environmental protection, support renewable energy, regulate emissions, manage natural resources sustainably, and incentivize conservation efforts."
            },
            {
                subtitle: "Social and Behavioral Transition",
                desc: "8.Changing individual and collective behaviors is fundamental to achieving environmental sustainability. This involves raising awareness about sustainable practices, encouraging shifts in consumption patterns, and promoting lifestyles that are in harmony with the natural environment."
            },
            {
                subtitle: "Technological Transition",
                desc: "9.Leveraging technology to address environmental challenges is another key aspect of transition. This includes the development and deployment of clean technologies, advancements in biotechnology for environmental conservation, and the use of information and communication technologies to improve environmental monitoring and compliance."
            },
            {
                subtitle: "Global Cooperation for Transition",
                desc: "10.Since environmental issues are global, international cooperation is essential for effective transition. This involves sharing knowledge, technologies, and resources across borders and working together on global agreements and initiatives that promote sustainability."
            },
        ],
    },

    {
        shortText: "C",
        title: "Solutions",
        desc_1: "In environmental management, solutions are specific actions, technologies, or strategies implemented to directly address and resolve environmental problems. These solutions are designed to restore, protect, or enhance the natural environment and often focus on repairing damage, improving ecosystem health, or providing sustainable alternatives to harmful practices. Unlike transition strategies which aim to shift away from damaging activities, or risk reduction which seeks to mitigate potential impacts, solutions are practical interventions that provide direct responses to environmental challenges.",
        desc_2: "These solutions span a range of activities and approaches, from localized efforts to global initiatives. They illustrate a commitment to addressing environmental issues through practical, actionable measures that directly enhance, restore, or protect the natural environment.",
        sub_data_1: [
            {
                subtitle: "Pollution Cleanup and Remediation",
                desc: "",
                child_data_1: [
                    {
                        subtitle: "Bioremediation",
                        desc: "Using microorganisms or plants to clean up contaminated soil and water, effectively breaking down pollutants into less harmful substances."
                    },
                    {
                        subtitle: "Chemical Remediation",
                        desc: "Employing chemical methods to remove pollutants from the environment, such as using dispersants to treat oil spills."
                    },
                    {
                        subtitle: "Physical Cleanup",
                        desc: "Directly removing pollution from environments, such as plastic waste from oceans or toxic waste from industrial sites."
                    },
                ],
            },
            {
                subtitle: "Habitat Restoration",
                desc: "",
                child_data_1: [
                    {
                        subtitle: "Wetland Restoration",
                        desc: "Reestablishing the water flow and plant life that are characteristic of wetland ecosystems, which are crucial for biodiversity, flood mitigation, and water quality."
                    },
                    {
                        subtitle: "Forest Restoration",
                        desc: "Replanting native trees and managing forests in a way that restores natural structures and functions to degraded or deforested areas."
                    },
                    {
                        subtitle: "Coral Reef Restoration",
                        desc: "Techniques such as coral farming and transplantation to rehabilitate damaged coral reefs, which are vital for marine life and coastal protection."
                    },
                ],
            },
            {
                subtitle: "Water Management Solutions",
                desc: "",
                child_data_1: [
                    {
                        subtitle: "Rainwater Harvesting",
                        desc: "Collecting and storing rainwater for use in times of drought or water scarcity."
                    },
                    {
                        subtitle: "Desalination Technologies",
                        desc: "Converting seawater into potable water to provide a reliable water source for arid regions."
                    },
                    {
                        subtitle: "Sustainable Irrigation",
                        desc: "Implementing efficient irrigation systems that minimize water use and reduce wastage in agriculture."
                    },
                ],
            },
            {
                subtitle: "Sustainable Energy Solutions",
                desc: "",
                child_data_1: [
                    {
                        subtitle: "Solar Power Installations",
                        desc: "Deploying solar panels in residential, commercial, and industrial areas to generate clean energy."
                    },
                    {
                        subtitle: "Wind Farms",
                        desc: "Constructing wind turbines to harness wind energy, significantly reducing reliance on fossil fuels."
                    },
                    {
                        subtitle: "Energy Storage Solutions",
                        desc: "Developing advanced battery systems to store energy from intermittent renewable sources like solar and wind, ensuring a steady supply."
                    },
                ],
            },
            {
                subtitle: "Waste Management Innovations",
                desc: "",
                child_data_1: [
                    {
                        subtitle: "Zero Waste Systems",
                        desc: "Strategies that redesign product life cycles so that all products are reused, and nothing is sent to landfills or incinerators."
                    },
                    {
                        subtitle: "Composting Programs",
                        desc: "Encouraging organic waste composting to reduce methane emissions from landfills and improve soil health."
                    },
                    {
                        subtitle: "Recycling Advances",
                        desc: "Enhancing recycling technology and systems to increase the efficiency and range of materials that can be recycled."
                    },
                ],
            },
            {
                subtitle: "Biodiversity Conservation Methods",
                desc: "",
                child_data_1: [
                    {
                        subtitle: "Species Reintroduction Programs",
                        desc: "Reintroducing species into their native habitats to restore ecological balance."
                    },
                    {
                        subtitle: "Genetic Conservation",
                        desc: "Using genetic technologies to preserve the genetic diversity of endangered species."
                    },
                    {
                        subtitle: "Protective Legislation",
                        desc: "Enforcing laws to protect endangered species and their habitats from exploitation and destruction."
                    },
                ],
            },
            {
                subtitle: "Climate Change Adaptation and Mitigation Solutions",
                desc: "",
                child_data_1: [
                    {
                        subtitle: "Geoengineering",
                        desc: "Large-scale interventions, such as carbon dioxide removal or solar radiation management, to counteract climate change effects."
                    },
                    {
                        subtitle: "Green Building Technologies",
                        desc: "Incorporating sustainable materials and energy-efficient designs into building construction and retrofitting."
                    },
                    {
                        subtitle: "Urban Cooling Solutions",
                        desc: "Implementing green roofs, urban forests, and reflective surfaces to reduce urban heat island effects."
                    },
                ],
            },
            {
                subtitle: "Educational and Awareness Programs",
                desc: "",
                child_data_1: [
                    {
                        subtitle: "Environmental Education",
                        desc: "Integrating environmental topics into school curriculums and public education campaigns to raise awareness about sustainable practices."
                    },
                    {
                        subtitle: "Community Workshops",
                        desc: "Offering workshops and training sessions to empower communities to undertake local environmental projects."
                    },
                ],
            },
            {
                subtitle: "Technology and Innovation for Conservation",
                desc: "",
                child_data_1: [
                    {
                        subtitle: "Wildlife Monitoring Technology",
                        desc: "Using satellite imagery, drones, and AI to monitor wildlife populations and habitats."
                    },
                    {
                        subtitle: "Pollution Detection Sensors",
                        desc: "Deploying sensors in air and water systems to detect pollutants in real-time, allowing for quick responses."
                    },
                ],
            },
            {
                subtitle: "Policy Solutions and Governance",
                desc: "",
                child_data_1: [
                    {
                        subtitle: "Environmental Impact Assessments",
                        desc: "Requiring assessments before new projects are approved to ensure minimal environmental damage."
                    },
                    {
                        subtitle: "International Environmental Agreements",
                        desc: "Collaborating on global treaties that commit countries to specific environmental protection goals."
                    },
                ],
            },
            {
                subtitle: "",
                desc: "",
                child_data_1: [
                    {
                        subtitle: "",
                        desc: ""
                    },
                    {
                        subtitle: "",
                        desc: ""
                    },
                    {
                        subtitle: "",
                        desc: ""
                    },
                    {
                        subtitle: "",
                        desc: ""
                    },

                ],
            },
        ],
    },

    {
        shortText: "1",
        title: "Invest",
        desc_1: "Investing involves purchasing equity shares in companies or funds that are directly involved in activities designed to improve the environment through climate mitigation, adaptation, and biodiversity efforts. This form of investment allows individuals to financially support businesses that are actively engaged in developing sustainable technologies, enhancing ecosystem resilience, or innovating solutions that address environmental challenges.",
        desc_2: "By choosing to invest in companies and sectors that are actively working towards environmental betterment, individuals not only foster positive change but also potentially benefit financially, making it a strategic approach to contributing to the planet’s health while seeking economic gains.",
        sub_data_1: [
            {
                subtitle: "Supporting Sustainable Companies",
                desc: "By investing in companies that prioritize sustainability, investors help provide the financial resources needed for these companies to grow and expand their environmentally friendly practices. This might include companies developing renewable energy technologies, sustainable agricultural methods, or new recycling technologies."
            },
            {
                subtitle: "Driving Corporate Change",
                desc: "Investment can influence company behavior. Companies are increasingly held accountable by their shareholders for environmental performance, leading to improved sustainability practices across operations. Investors can encourage companies to adopt more sustainable practices by supporting those with strong environmental credentials."
            },
            {
                subtitle: "Funding Innovation",
                desc: "Many environmental solutions come from high-growth startups that require significant capital to bring their innovations to market. Equity investments in these companies enable them to research, develop, and deploy new technologies that can make substantial differences in areas such as energy consumption, resource efficiency, and pollution reduction."
            },
            {
                subtitle: "Sector-Specific Impact",
                desc: "Investors can choose to put their money into specific sectors that align with their environmental priorities. For example, investing in clean energy companies supports climate mitigation by expanding the generation of renewable energy. Similarly, investing in sustainable forestry operations or wildlife conservation initiatives can directly contribute to biodiversity preservation."
            },
            {
                subtitle: "Long-term Returns and Impact",
                desc: "Environmental investing not only supports the planet but can also offer long-term financial returns. As the global economy shifts towards more sustainable practices, companies leading in environmental stewardship are likely to experience growth and stability, providing attractive returns to investors who supported them early."
            },
        ],
    },

    {
        shortText: "2",
        title: "Lend",
        desc_1: "When we talk about lending in the context of supporting environmental goals, we're referring to the provision of capital as loans or bonds, where the lender expects to be repaid with interest. Unlike investing, which we characterise as buying equity in companies, lending does not confer ownership but rather provides necessary funds under the expectation of repayment. This form of financial support is crucial for enabling various projects and initiatives aimed at climate mitigation, adaptation, and biodiversity conservation.        Lending can take many forms in the environmental context, such as providing loans to companies or governments, or purchasing green bonds, which are debt securities issued to finance projects that have positive environmental and/or climate benefits. Here's how lending contributes specifically to environmental improvements:",
        desc_2: "",
        sub_data_1: [
            {
                subtitle: "",
                desc: ""
            },
        ],
    },

    {
        shortText: "",
        title: "",
        desc_1: "",
        desc_2: "",
        sub_data_1: [
            {
                subtitle: "",
                desc: ""
            },
        ],
    },

    {
        shortText: "",
        title: "",
        desc_1: "",
        desc_2: "",
        sub_data_1: [
            {
                subtitle: "",
                desc: ""
            },
        ],
    },
]

const SecondLayerLayout = () => {
    const [open, setOpen] = useState(false);
    const [cubeData, setCubeData] = useState([...secondLayerData]);
    const [selectedCubeData, setSelectedCubeData] = useState([]);


    const handleSelectedCube = (payload) => {
        console.log(payload)
        const filteredData = cubeData.filter((item, i) => payload.text.includes(item.shortText))
        setSelectedCubeData(filteredData);

        setOpen(true);
    }

    console.log(selectedCubeData)

    return (
        <>
            <Stack direction={'row'} sx={{ height: '100%' }}>
                {/* left side */}
                <Stack
                    sx={{
                        height: '100%',
                        width: open ? '60%' : '100%',
                        p: 3,
                        transition: 'all 0.3s ease-in-out',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >f
                    <Button onClick={() => setOpen((prev) => !prev)}> click </Button>
                    <SquareBoxes onClickLabel={handleSelectedCube} />




                </Stack>


                {/* right side */}
                <Stack
                    direction={'column'}
                    spacing={8}
                    sx={{
                        bgcolor: 'white',
                        height: '100%',
                        width: open ? '40%' : '0px',
                        display: open ? 'flex' : 'none',
                        p: 3,
                        // left: 'auto',
                        // right: '0',
                        overflow: 'hidden',
                        overflowY: 'auto',
                        // transition: 'width 0.3s ease-out',
                    }}
                >
                    {selectedCubeData.length > 0 && selectedCubeData.map((item, i) => (
                        <Stack key={`${item.shortText + i}`}>
                            <Typography variant='h5' fontWeight={600} >
                                {item.title}
                            </Typography>
                            <Typography variant='' fontWeight={500} >
                                {item.desc_1}
                            </Typography>
                            <ol>
                                {item.sub_data_1.length > 0 && item.sub_data_1.map((sub_item, j) => (
                                    <li key={j}><b>{sub_item.subtitle}: </b>
                                        {sub_item.desc}
                                        <ul>
                                            {sub_item?.child_data_1?.length > 0 && sub_item.child_data_1.map((child_item, k) => (
                                                <li key={`${k}`}>
                                                    <b>{child_item.subtitle}: </b>
                                                    {child_item.desc}
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ol>
                            <Typography variant='' fontWeight={500} >
                                {item.desc_2}
                            </Typography>
                        </Stack>
                    ))}
                </Stack>
            </Stack>
        </>
    );
};

export default SecondLayerLayout;