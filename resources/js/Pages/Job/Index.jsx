import { AppLayout } from "@/Layouts/AppLayout.jsx";
import {
  ActionIcon,
  Button,
  Center,
  Menu,
  Stack,
  Tabs,
  Text,
  ThemeIcon,
} from "@mantine/core";
import {
  IconBriefcase2,
  IconDots,
  IconEdit,
  IconGraph,
  IconPlus,
  IconTable,
  IconTrash,
} from "@tabler/icons-react";
import { PageHeader } from "@/Components/PageHeader.jsx";
import { DataTable } from "@/Components/DataTable.jsx";
import { router } from "@inertiajs/react";
import { modals } from "@mantine/modals";
import { Pie } from "react-chartjs-2";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { GetChartColors } from "@/Utilities/GetChartColors.js";

ChartJS.register(ArcElement, Tooltip, Legend);
const Index = ({ title, description, meta, jobs, auth, citizens }) => {
  const colors = GetChartColors(citizens.length);
  const data = {
    labels: citizens.map(({ name }) => name),
    datasets: [
      {
        label: "orang",
        data: citizens.map(({ citizen_jobs_count }) => citizen_jobs_count),
        backgroundColor: colors.map((color) => color[0]), // use the first color in the array (with alpha = 0.5) for background color
        borderColor: colors.map((color) => color[1]), // use the second color in the array (with alpha = 1) for border color
        borderWidth: 1,
      },
    ],
  };

  return (
    <AppLayout title={title} meta={meta} auth={auth}>
      <Stack gap={40}>
        <PageHeader
          title={title}
          description={description}
          actions={
            auth.user && (
              <>
                <ActionIcon
                  display={{
                    base: "block",
                    sm: "none",
                  }}
                  size={40}
                  onClick={() => router.get(route("jobs.create"))}
                >
                  <IconPlus />
                </ActionIcon>

                <Button
                  display={{
                    base: "none",
                    sm: "block",
                  }}
                  h={40}
                  px={20}
                  leftSection={<IconPlus />}
                  onClick={() => router.get(route("jobs.create"))}
                >
                  Tambah
                </Button>
              </>
            )
          }
        />

        <Tabs
          defaultValue="table"
          styles={{
            tab: {
              padding: 20,
            },
            panel: {
              marginTop: 20,
            },
          }}
        >
          <Tabs.List grow>
            <Tabs.Tab
              value="table"
              fw={500}
              fz={16}
              c="gray.8"
              leftSection={<IconTable />}
            >
              Tabel
            </Tabs.Tab>
            <Tabs.Tab
              value="graphic"
              fw={500}
              fz={16}
              c="gray.8"
              leftSection={<IconGraph />}
            >
              Grafik
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="table">
            {jobs.length ? (
              <DataTable
                data={jobs}
                columns={[
                  {
                    accessorKey: "name",
                    header: "Nama",
                  },
                  {
                    accessorKey: "created_at",
                    header: "Dibuat Pada",
                  },
                  {
                    accessorKey: "updated_at",
                    header: "Diperbarui Pada",
                  },
                ]}
                enableRowActions={auth.user}
                renderRowActions={({ row }) => (
                  <Menu
                    position="bottom-end"
                    withArrow
                    trigger="click-hover"
                    styles={{
                      dropdown: {
                        padding: 8,
                      },
                    }}
                  >
                    <Menu.Target>
                      <ActionIcon
                        size={40}
                        variant="subtle"
                        color="gray.9"
                        c="gray.9"
                      >
                        <IconDots />
                      </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown>
                      <Menu.Item
                        color="yellow"
                        leftSection={<IconEdit />}
                        onClick={() =>
                          router.get(route("jobs.edit", row.original.id))
                        }
                      >
                        Ubah
                      </Menu.Item>
                      <Menu.Item
                        color="red"
                        leftSection={<IconTrash />}
                        onClick={() =>
                          modals.openConfirmModal({
                            styles: {
                              content: {
                                padding: 20,
                              },
                              header: {
                                padding: 0,
                                minHeight: 0,
                                backgroundColor: "transparent",
                              },
                              body: {
                                padding: 0,
                              },
                            },
                            title: (
                              <Text fw={500} c="gray.9">
                                Hapus {row.original.name}?
                              </Text>
                            ),
                            centered: true,
                            withCloseButton: false,
                            labels: {
                              confirm: "Hapus",
                              cancel: "Batal",
                            },
                            onConfirm: () =>
                              router.delete(
                                route("jobs.destroy", row.original.id),
                              ),
                          })
                        }
                      >
                        Hapus
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                )}
              />
            ) : (
              <Center
                mih="50vh"
                bg="gray.0"
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
                  <IconBriefcase2 />
                </ThemeIcon>

                <Text fw={500} c="gray.7">
                  Belum ada data media sosial
                </Text>
              </Center>
            )}
          </Tabs.Panel>

          <Tabs.Panel value="graphic">
            {citizens.length ? (
              <Center mih="50vh">
                <Pie data={data} />
              </Center>
            ) : (
              <Center
                p={20}
                h="50vh"
                bg="gray.0"
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
                  <IconBriefcase2 />
                </ThemeIcon>

                <Text fw={500} c="gray.7" align="center">
                  Belum ada data pekerjaan yang dilakukan warga
                </Text>
              </Center>
            )}
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </AppLayout>
  );
};

export default Index;
