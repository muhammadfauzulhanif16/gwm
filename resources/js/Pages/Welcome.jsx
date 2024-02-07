import { AppLayout } from "@/Layouts/AppLayout.jsx";
import { Stats } from "@/Components/Stats/index.jsx";
import { Box, Grid, Select, SimpleGrid, Stack, Text } from "@mantine/core";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const Home = ({
  auth,
  title,
  description,
  citizens,
  jobs,
  consumptions,
  prayers,
  socialMedias,
  citizenSocialMedias,
}) => {
  const [selectedData, setSelectedData] = useState("Warga");
  const [selectedSubData, setSelectedSubData] = useState("");
  const [graphicData, setGraphicData] = useState(null);

  useEffect(() => {
    let data;

    switch (selectedData) {
      case "Warga":
        data = {
          labels: Object.entries(
            citizens.reduce((counts, { gender }) => {
              counts[gender] = (counts[gender] || 0) + 1;
              return counts;
            }, {}),
          )
            .map(([name, citizen_count]) => ({ name, citizen_count }))
            .map(({ name }) => name),
          datasets: [
            {
              label: "orang",
              data: Object.entries(
                citizens.reduce((counts, { gender }) => {
                  counts[gender] = (counts[gender] || 0) + 1;
                  return counts;
                }, {}),
              )
                .map(([name, citizen_count]) => ({ name, citizen_count }))
                .map(({ citizen_count }) => citizen_count),
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
              ],
            },
          ],
        };
        break;
      case "Pekerjaan":
        // Generate data for Pekerjaan
        break;
      case "Konsumsi":
        // Generate data for Konsumsi
        break;
      case "Ibadah":
        // Generate data for Ibadah
        break;
      case "Media Sosial":
        data = {
          labels: citizenSocialMedias.map(
            ({ social_media_name }) => social_media_name,
          ),
          datasets: [
            {
              label: "orang",
              data: citizenSocialMedias.map(
                ({ citizen_count }) => citizen_count,
              ),
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
            },
          ],
        };
        break;
      default:
        data = {};
    }

    setGraphicData(data);
  }, [selectedData]);

  return (
    <AppLayout title={title} description={description} auth={auth}>
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
            <Box
              style={{
                borderRadius: 8,
              }}
              p={20}
              bg="gray.0"
            >
              <Stack gap={20}>
                <Text fw={700} fz={24} c="gray.8">
                  Grafik
                </Text>

                <Grid grow>
                  <Grid.Col span={6}>
                    <Select
                      label="Data"
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
                      defaultValue="Warga"
                      allowDeselect={false}
                      data={[
                        "Warga",
                        "Pekerjaan",
                        "Konsumsi",
                        "Ibadah",
                        "Media Sosial",
                      ]}
                      checkIconPosition="right"
                      onChange={(value) => setSelectedData(value)}
                    />
                  </Grid.Col>

                  {(selectedData === "Konsumsi" ||
                    selectedData === "Ibadah") && (
                    <Grid.Col span={6}>
                      <Select
                        checkIconPosition="right"
                        label="Data"
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
                        defaultValue="Warga"
                        allowDeselect={false}
                        data={[
                          "Warga",
                          "Pekerjaan",
                          "Konsumsi",
                          "Ibadah",
                          "Media Sosial",
                        ]}
                        onChange={(value) => setSelectedData(value)}
                      />
                    </Grid.Col>
                  )}
                </Grid>

                {graphicData ? (
                  <>
                    {selectedData === "Konsumsi" ? (
                      <Bar options={options} data={graphicData} />
                    ) : (
                      <Pie data={graphicData} />
                    )}
                  </>
                )}
              </Stack>
            </Box>

            <Box
              p={20}
              bg="gray.0"
              style={{
                borderRadius: 8,
              }}
            >
              <Stack gap={20}>
                <Text fw={700} fz={24} c="gray.8">
                  Lokasi Warga
                </Text>
                map
              </Stack>
            </Box>
          </SimpleGrid>
        </Stack>
      </Stack>
    </AppLayout>
  );
};

export default Home;
