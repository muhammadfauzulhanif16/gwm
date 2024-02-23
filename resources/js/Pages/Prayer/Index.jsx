import { AppLayout } from "@/Layouts/AppLayout.jsx";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Flex,
  Group,
  List,
  Menu,
  Select,
  Stack,
  Tabs,
  Text,
  ThemeIcon,
} from "@mantine/core";
import {
  IconDots,
  IconEdit,
  IconGraph,
  IconList,
  IconPlus,
  IconPray,
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
import { useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const Index = ({ title, description, meta, prayers, auth, citizens }) => {
  const [selectedPrayer, setSelectedPrayer] = useState(prayers[0]?.name);

  const colors = GetChartColors(
    citizens.find(({ name }) => name === selectedPrayer)?.choices.length,
  );
  const data = {
    labels: citizens
      .find(({ name }) => name === selectedPrayer)
      ?.choices.map(({ name }) => name),
    datasets: [
      {
        label: "orang",
        data: citizens
          .find(({ name }) => name === selectedPrayer)
          ?.choices.map(({ citizen_prayers_count }) => citizen_prayers_count),
        backgroundColor: colors.map((color) => color[0]),
        borderColor: colors.map((color) => color[1]),
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
                  onClick={() => router.get(route("prayers.create"))}
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
                  onClick={() => router.get(route("prayers.create"))}
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
            {prayers.length ? (
              <DataTable
                data={prayers}
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
                          router.get(route("prayers.edit", row.original.id))
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
                                route("prayers.destroy", row.original.id),
                              ),
                          })
                        }
                      >
                        Hapus
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                )}
                renderDetailPanel={({ row }) => (
                  <Stack gap={8}>
                    <Group gap={8} align="center">
                      <IconList size={24} />

                      <Text fw={500} fz={14}>
                        Daftar Opsi
                      </Text>
                    </Group>

                    <List spacing="xs" size="sm" center type="ordered">
                      {row.original.choices.map((choice, id) => (
                        <List.Item key={id}>{choice.name}</List.Item>
                      ))}
                    </List>
                  </Stack>
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
                  <IconPray />
                </ThemeIcon>

                <Text fw={500} c="gray.7">
                  Belum ada data ibadah
                </Text>
              </Center>
            )}
          </Tabs.Panel>

          <Tabs.Panel value="graphic">
            {citizens.length ? (
              <Stack gap={20}>
                <Flex justify="flex-end">
                  <Select
                    w={{
                      base: "100%",
                      xs: "auto",
                    }}
                    autoFocus
                    checkIconPosition="right"
                    radius={8}
                    allowDeselect={false}
                    value={selectedPrayer}
                    variant="filled"
                    placeholder="Pilih ibadah"
                    data={prayers.map(({ name }) => name)}
                    styles={{
                      input: {
                        padding: 20,
                        height: 40,
                      },
                      label: {
                        marginBottom: 8,
                        color: "#495057",
                      },
                      dropdown: {
                        padding: 8,
                        borderRadius: 8,
                      },
                      option: {
                        borderRadius: 8,
                      },
                    }}
                    onChange={(value) => setSelectedPrayer(value)}
                  />
                </Flex>
                <Center mih="100vh">
                  <Pie data={data} />
                </Center>
              </Stack>
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
                  <IconPray />
                </ThemeIcon>

                <Text fw={500} c="gray.7" align="center">
                  Belum ada data ibadah yang dilakukan oleh warga
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
