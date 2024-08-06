import { ArrowBack, Close } from "@mui/icons-material";
import { Button, Divider, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import CustomCube2 from "./CustomCube2";
import CustomCube from "./CustomCube";
import HTMLReactParser from "html-react-parser/lib/index";
import { cubeDetails, sectorsDetails } from "../utils/cubeDetails";
import SecondLayer from "./SecondLayer";
// import SecondLayer from "./SecondLayer";

const SecondLayerLayout = () => {
  const [open, setOpen] = useState(false);
  const [analysisData, setAnalysisData] = useState({});
  const [selectedShortText, setSelectedShortText] = useState("");
  const [cubeData, setCubeData] = useState();
  // const [cubeData, setCubeData] = useState([]);
  const [step, setStep] = useState(0);
  const [countryStep, setCountryStep] = useState(0);
  const [selectedCubeData, setSelectedCubeData] = useState([]);
  const [firstData, setFirstData] = useState({});
  const [secondData, setSecondData] = useState({});
  const [thirdData, setThirdData] = useState({});

  console.log(selectedShortText.length);
  const handleSelectedCube = (payload) => {
    setSelectedShortText(payload.text);
    // setFirstData(payload.text[0]);
    // setSecondData(payload.text[1]);
    // setThirdData(payload.text[2]);
    setOpen(true);
  };

  const handleBackSidebar = () => {
    // setAnalysisData([]);
    setStep((prev) => prev - 1);
    if (countryStep > 0) {
      setCountryStep((prev) => prev - 1);
    }
  };

  const handleCloseSidebar = () => {
    setOpen(false);
    setSelectedCubeData([]);
    setCountryStep(0);
  };

  const handleAnalysisData = () => {
    const newData = [...sectorsDetails].map((sector) => {
      const sectorData = sector.overviews.filter(
        (item) => item.title === selectedShortText.slice(0, 2)
      );
      return {
        ...sector,
        overviews: sectorData[0],
      };
    });

    console.log(newData);

    setAnalysisData(newData);
    setStep((prev) => prev + 1);
  };

  const handleCountryData = () => {
    setCountryStep((prev) => prev + 1);
  };

  const handleSelectAnalysis = (payload) => {
    // if (!selectedShortText || !selectedShortText.text) {
    //     console.error('selectedShortText or selectedShortText.text is undefined');
    //     return;
    // }

    // const sectorData = payload?.overviews?.filter(item => item.title === selectedShortText.text.slice(0, 2));
    console.log(selectedShortText);
    // const sectorData = payload?.overviews?.filter(item => item.title === selectedShortText.text.slice(0, 2));
    // console.log(sectorData)
    const sectorData = payload?.overviews?.filter(
      (item) => item.title === selectedShortText.slice(0, 2)
    );

    setAnalysisData({
      title: payload.title,
      overviews: sectorData[0],
    });

    setStep((prev) => prev + 1);
  };

  const pageContent = [
    {
      type: "html",
      content: "<p>Welcome to this <strong>page</strong></p>",
    },
    {
      type: "html",
      content: "<h2>Another Section</h2><p>This is another section.</p>",
    },
  ];

  return (
    <>
      <Stack direction={"row"} sx={{ height: "100%" }}>
        {/* left side */}
        <Stack
          sx={{
            height: "100%",
            width: open ? "60%" : "100%",
            p: 3,
            transition: "all 0.3s ease-in-out",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <Button onClick={() => setOpen((prev) => !prev)}> click </Button> */}
          {/* <SquareBoxes onClickLabel={handleSelectedCube} /> */}
          {/* <RubikCube setStep={setStep} /> */}
          {/* <CustomCube /> */}
          {/* <CustomCube onClickLabel={handleSelectedCube} /> */}
          <CustomCube2 onClickLabel={handleSelectedCube} />
        </Stack>

        {/* right side */}
        <Stack
          direction={"column"}
          spacing={8}
          sx={{
            bgcolor: "white",
            height: "100%",
            // width: '40%',
            width: open ? "40%" : "0px",
            display: open ? "flex" : "none",
            p: 3,
            // left: 'auto',
            // right: '0',
            overflow: "hidden",
            overflowY: "auto",
            // transition: 'width 0.3s ease-out',
          }}
        >
          <Stack
            direction={"row"}
            justifyContent={"flex-end"}
            sx={{ marginBottom: "-2.5rem !important" }}
          >
            {/* Object.keys(analysisData).length > 0 ? */}
            {step !== 0 ? (
              <IconButton
                onClick={handleBackSidebar}
                sx={{ bgcolor: "gray !important", color: "#ffffff" }}
              >
                <ArrowBack />{" "}
              </IconButton>
            ) : (
              <IconButton
                onClick={handleCloseSidebar}
                sx={{ bgcolor: "gray !important", color: "#ffffff" }}
              >
                <Close />{" "}
              </IconButton>
            )}
          </Stack>

          {/* !Object.keys(analysisData).length > 0 ? */}
          {countryStep === 0 ? (
            <>
              {step === 0 ? (
                <>
                  <Stack direction={"row"} alignItems={"center"} spacing={2}>
                    {selectedShortText?.split("")?.map((item, i) => (
                      <>
                        <Typography
                          lineHeight={1}
                          key={`${item}`}
                          variant="h6"
                          fontWeight={600}
                        >
                          {/* {item} */}
                          {cubeDetails[item]?.title}
                        </Typography>

                        {i < selectedShortText.length - 1 ? (
                          <Divider
                            sx={{
                              borderWidth: "1px",
                              height: "100%",
                              borderColor: "gray",
                            }}
                          />
                        ) : null}
                      </>
                    ))}
                  </Stack>
                  <Stack
                    direction={"row"}
                    spacing={3}
                    justifyContent={"flex-start"}
                    sx={{ marginBottom: "" }}
                  >
                    {/* {!Object.keys(analysisData).length > 0 ? */}
                    {step < 1 ? (
                      <>
                        <Button
                          onClick={handleAnalysisData}
                          variant="contained"
                          color="success"
                          sx={{
                            textTransform: "none",
                            fontWeight: "bold",
                            py: "0.85rem",
                          }}
                        >
                          Run sector analysis
                        </Button>

                        <Button
                          onClick={handleCountryData}
                          variant="contained"
                          color="success"
                          sx={{
                            textTransform: "none",
                            fontWeight: "bold",
                            py: "0.85rem",
                          }}
                        >
                          Run country analysis
                        </Button>
                      </>
                    ) : null}
                  </Stack>

                  <Stack direction={"column"} spacing={2}>
                    {selectedShortText?.split("")?.map((item, i) => (
                      <>{HTMLReactParser(cubeDetails[item]?.text)}</>
                    ))}
                  </Stack>

                  {/* 
                                    <Stack direction={'row'} alignItems={'center'} spacing={2}>
                                        {selectedCubeData.length > 0 ? selectedCubeData.map((item, i) => (
                                            <>
                                                <Typography lineHeight={1} key={`${item.shortText + i}`} variant='h6' fontWeight={600} >
                                                    {item.title}
                                                </Typography>

                                                {i < (selectedCubeData.length - 1) ? <Divider sx={{ borderWidth: "1px", height: "100%", borderColor: "gray" }} /> : null}
                                            </>
                                        )) : null}
                                    </Stack>
                                   {selectedCubeData.length > 0 ? selectedCubeData.map((item, i) => (
                                        <Stack key={`${item.shortText + i}`}>
                                            <Typography variant='h5' fontWeight={600} >
                                                {item.title}
                                            </Typography>
                                            <Typography variant='' fontWeight={500} >
                                                {item.desc_1}
                                            </Typography>
                                            <ol>
                                                {item.sub_data_1.length > 0 ? item.sub_data_1.map((sub_item, j) => (
                                                    <li key={j}><b>{sub_item.subtitle}: </b>
                                                        {sub_item.desc}
                                                        <ul>
                                                            {sub_item?.child_data_1?.length > 0 ? sub_item.child_data_1.map((child_item, k) => (
                                                                <li key={`${k}`} style={{ listStyle: 'disc' }}>
                                                                    <b>{child_item.subtitle}: </b>
                                                                    {child_item.desc}
                                                                </li>
                                                            )) : null}
                                                        </ul>
                                                    </li>
                                                )) : null}
                                            </ol>
                                            <Typography variant='' fontWeight={500} >
                                                {item.desc_2}
                                            </Typography>
                                        </Stack>
                                    )) : null} */}
                </>
              ) : null}

              {/* ? analysisData.map((item, i) => ( */}
              {step === 2 ? (
                <Stack>
                  <Typography variant="h5" fontWeight={600}>
                    {analysisData.title}
                  </Typography>
                  <Typography variant="" fontWeight={500}>
                    {analysisData.overviews.details}
                  </Typography>
                </Stack>
              ) : null}

              {step === 1 ? (
                <SecondLayer
                  setAnalysisData={setAnalysisData}
                  selectedShortText={selectedShortText}
                  onClickNext={handleSelectAnalysis}
                />
              ) : null}
            </>
          ) : (
            <Typography textAlign={"center"}>Coming Soon...</Typography>
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default SecondLayerLayout;
