import { AppLayout } from "@/Layouts/AppLayout.jsx";
import {
  ActionIcon,
  AspectRatio,
  Box,
  Button,
  Center,
  Group,
  List,
  Menu,
  Stack,
  Tabs,
  Text,
  ThemeIcon,
} from "@mantine/core";
import {
  IconApps,
  IconBriefcase2,
  IconDots,
  IconEdit,
  IconGraph,
  IconHome2,
  IconPackages,
  IconPlus,
  IconPray,
  IconTable,
  IconTrash,
  IconUsers,
} from "@tabler/icons-react";
import { PageHeader } from "@/Components/PageHeader.jsx";
import { DataTable } from "@/Components/DataTable.jsx";
import { router } from "@inertiajs/react";
import { modals } from "@mantine/modals";
import { Pie } from "react-chartjs-2";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Index = ({ title, description, meta, citizens, auth, genders }) => {
  // console.log(citizens);
  const data = {
    labels: genders.map(({ name }) => name),
    datasets: [
      {
        label: "orang",
        data: genders.map(({ citizen_genders_count }) => citizen_genders_count),
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
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
                  onClick={() => router.get(route("citizens.create"))}
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
                  onClick={() => router.get(route("citizens.create"))}
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
            {citizens.length ? (
              <DataTable
                data={citizens}
                columns={[
                  {
                    accessorKey: "name",
                    header: "Nama",
                  },
                  {
                    accessorKey: "gender",
                    header: "Jenis Kelamin",
                  },
                  {
                    accessorKey: "age",
                    header: "Usia",
                  },
                  {
                    accessorKey: "phone_number",
                    header: "Nomor Telepon",
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
                renderRowActions={
                  auth.user &&
                  (({ row }) => (
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
                            router.get(route("citizens.edit", row.original.id))
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
                                  route("citizens.destroy", row.original.id),
                                ),
                            })
                          }
                        >
                          Hapus
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  ))
                }
                renderDetailPanel={({ row }) => {
                  console.log(row.original);

                  return (
                    <Stack gap={20}>
                      <Stack gap={8}>
                        <Group gap={8} align="center">
                          <IconHome2 size={24} />

                          <Text fw={500} fz={14}>
                            Alamat
                          </Text>
                        </Group>

                        <List spacing="xs" size="sm" center>
                          <List.Item>
                            RT : {row.original.neighborhood}
                          </List.Item>
                          <List.Item>RW : {row.original.hamlet}</List.Item>
                          <List.Item>
                            Desa/Kelurahan : {row.original.urban_village}
                          </List.Item>
                          <List.Item>
                            Kecamatan : {row.original.sub_district}
                          </List.Item>
                        </List>
                      </Stack>

                      <Stack gap={8}>
                        <Group gap={8} align="center">
                          <IconBriefcase2 size={24} />

                          <Text fw={500} fz={14}>
                            Pekerjaan
                          </Text>
                        </Group>

                        <List spacing="xs" size="sm" center>
                          <List.Item>
                            Profesi : {row.original.job.name}
                          </List.Item>
                          <List.Item>
                            Jumlah Penghasilan : {row.original.income}
                          </List.Item>
                          <List.Item>
                            Jumlah Tanggungan : {row.original.dependents}
                          </List.Item>
                          <List.Item>
                            Tempat Kerja : {row.original.workplace}
                          </List.Item>
                          <List.Item>
                            Bidang Kerja : {row.original.field}
                          </List.Item>
                          <List.Item>
                            Skala Pekerjaan : {row.original.scale}
                          </List.Item>
                          <List.Item>
                            Deskripsi Pekerjaan : {row.original.description}
                          </List.Item>
                        </List>
                      </Stack>

                      <Stack gap={8}>
                        <Group gap={8} align="center">
                          <IconPackages size={24} />

                          <Text fw={500} fz={14}>
                            Konsumsi
                          </Text>
                        </Group>

                        <List spacing="xs" size="sm" center>
                          {row.original.consumptions.map((consumption, id) => (
                            <List.Item key={id}>
                              {consumption.time_period} : {consumption.items}
                            </List.Item>
                          ))}
                        </List>
                      </Stack>

                      <Stack gap={8}>
                        <Group gap={8} align="center">
                          <IconPray size={24} />

                          <Text fw={500} fz={14}>
                            Ibadah
                          </Text>
                        </Group>

                        <List spacing="xs" size="sm" center>
                          {row.original.prayers.map((prayer, id) => (
                            <List.Item key={id}>
                              {prayer.name} : {prayer.choice}
                            </List.Item>
                          ))}
                        </List>
                      </Stack>

                      <Stack gap={8}>
                        <Group gap={8} align="center">
                          <IconApps size={24} />

                          <Text fw={500} fz={14}>
                            Media Sosial
                          </Text>
                        </Group>

                        <List spacing="xs" size="sm" center>
                          <List.Item>
                            Aplikasi : {row.original.social_medias}
                          </List.Item>
                        </List>
                      </Stack>
                    </Stack>
                  );
                }}
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
                  <IconUsers />
                </ThemeIcon>

                <Text fw={500} c="gray.7">
                  Belum ada data warga
                </Text>
              </Center>
            )}
          </Tabs.Panel>

          <Tabs.Panel value="graphic">
            {genders.length ? (
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
                  <IconUsers />
                </ThemeIcon>

                <Text fw={500} c="gray.7" align="center">
                  Belum ada data warga
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
