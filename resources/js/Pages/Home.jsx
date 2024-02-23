import { AppLayout } from "@/Layouts/AppLayout.jsx";
import { Stats } from "@/Components/Stats/index.jsx";
import {
  Box,
  Center,
  Grid,
  Select,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { useEffect, useState } from "react";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { PageHeader } from "@/Components/PageHeader.jsx";
import { Bar, Pie } from "react-chartjs-2";
import { Map } from "@/Components/Map";
import { StatList } from "@/Components/Stats/StatList";
import { GetChartColors } from "@/Utilities/GetChartColors";
import autocolors from "chartjs-plugin-autocolors";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  autocolors,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Konsumsi",
    },
  },
};

const Home = ({
  auth,
  meta,
  title,
  description,
  citizens,
  jobs,
  consumptions,
  prayers,
  socialMedias,
  data,
}) => {
  const [selectedData, setSelectedData] = useState(data[0]?.title);
  const [selectedSubData, setSelectedSubData] = useState("");

  useEffect(() => {
    const subDataName = ["Ibadah", "Konsumsi"].includes(selectedData)
      ? data.find(({ title }) => title === selectedData)?.subData[0]?.name
      : null;
    setSelectedSubData(subDataName);
  }, [selectedData]);

  const selectedDataObj = data.find(({ title }) => title === selectedData);
  const selectedSubDataObj = selectedDataObj?.subData?.find(
    ({ name }) => name === selectedSubData,
  );

  const length =
    selectedData === "Ibadah" && selectedSubData
      ? selectedSubDataObj?.choices?.length
      : selectedData === "Konsumsi" && selectedSubData
        ? selectedSubDataObj?.consumptions?.length
        : selectedDataObj?.subData?.length;

  const colors = GetChartColors(length);

  const labels =
    selectedSubDataObj?.choices?.map(({ name }) => name) ||
    selectedSubDataObj?.consumptions?.map(({ name }) => name) ||
    selectedDataObj?.subData?.map(({ name }) => name);
  const dataValues =
    selectedSubDataObj?.choices?.map(
      ({ citizen_prayers_count }) => citizen_prayers_count,
    ) ||
    selectedSubDataObj?.consumptions?.map(
      ({ citizen_count }) => citizen_count,
    ) ||
    selectedDataObj?.subData?.map(({ citizen_count }) => citizen_count);

  const chartData = {
    labels,
    datasets: [
      {
        label: "orang",
        data: dataValues,
        backgroundColor: colors.map((color) => color[0]),
        borderColor: colors.map((color) => color[1]),
        borderWidth: 1,
      },
    ],
  };

  return (
    <AppLayout title={title} description={description} auth={auth} meta={meta}>
      <Stack gap={40}>
        <PageHeader title={title} description={description} />

        <Stack gap={20}>
          <Stats
            data={{
              citizens: citizens.length,
              jobs: jobs.length,
              consumptions: consumptions.length,
              prayers: prayers.length,
              socialMedias: socialMedias.length,
            }}
          />

          <SimpleGrid
            cols={{
              base: 1,
              md: 2,
            }}
            spacing={20}
          >
            <Stack
              gap={20}
              bg="gray.0"
              style={{
                borderRadius: 8,
              }}
              p={20}
            >
              <Text fw={700} fz={24} c="gray.8">
                Grafik
              </Text>

              <SimpleGrid
                cols={
                  selectedData === "Konsumsi" || selectedData === "Ibadah"
                    ? 2
                    : 1
                }
              >
                <Select
                  styles={{
                    input: {
                      height: 40,
                    },
                    label: {
                      fontSize: 16,
                      color: "#495057",
                      marginBottom: 8,
                    },
                    dropdown: {
                      padding: 8,
                      borderRadius: 8,
                    },
                    option: {
                      borderRadius: 8,
                    },
                  }}
                  radius={8}
                  variant="filled"
                  placeholder="Pilih Data"
                  defaultValue={selectedData}
                  allowDeselect={false}
                  data={data.map(({ title }) => title)}
                  checkIconPosition="right"
                  onChange={(value) => setSelectedData(value)}
                />

                {(selectedData === "Konsumsi" || selectedData === "Ibadah") && (
                  <Select
                    checkIconPosition="right"
                    styles={{
                      input: {
                        height: 40,
                      },
                      label: {
                        fontSize: 16,
                        color: "#495057",
                        marginBottom: 8,
                      },
                      dropdown: {
                        padding: 8,
                        borderRadius: 8,
                      },
                      option: {
                        borderRadius: 8,
                      },
                    }}
                    radius={8}
                    variant="filled"
                    placeholder="Pilih Data"
                    allowDeselect={false}
                    defaultValue={
                      selectedData === "Ibadah"
                        ? data.find(({ title }) => title === selectedData)
                            ?.subData[0]?.name
                        : selectedData === "Konsumsi"
                          ? data.find(({ title }) => title === selectedData)
                              ?.subData[0]?.name
                          : null
                    }
                    data={data
                      ?.find(({ title }) => title === selectedData)
                      ?.subData?.map(({ name }) => name)}
                    onChange={(value) => setSelectedSubData(value)}
                  />
                )}
              </SimpleGrid>

              {data.find(({ title }) => title === selectedData)
                ?.citizen_count ? (
                <Center h="50vh" w="100%">
                  <Pie data={chartData} />
                </Center>
              ) : (
                <Center
                  h="50vh"
                  style={{
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                    color: "gray.0",
                  }}
                >
                  <ThemeIcon variant="light" size={40}>
                    {
                      StatList().find((stat) => stat.label === selectedData)
                        .icon
                    }
                  </ThemeIcon>

                  <Text fw={500} c="gray.7">
                    Belum ada data {selectedData.toLowerCase()}
                  </Text>
                </Center>
              )}
            </Stack>

            <Stack
              gap={20}
              p={20}
              bg="gray.0"
              style={{
                borderRadius: 8,
              }}
            >
              <Text fw={700} fz={24} c="gray.8">
                Lokasi Warga
              </Text>

              <Box
                h={{
                  base: "50vh",
                  md: "60vh",
                }}
              >
                <Map citizens={citizens} />
              </Box>
            </Stack>
          </SimpleGrid>
        </Stack>
      </Stack>
    </AppLayout>
  );
};

export default Home;
