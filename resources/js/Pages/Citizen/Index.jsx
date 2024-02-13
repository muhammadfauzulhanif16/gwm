import { AppLayout } from "@/Layouts/AppLayout.jsx";
import {
  ActionIcon,
  AspectRatio,
  Button,
  Center,
  Menu,
  Stack,
  Tabs,
  Text,
} from "@mantine/core";
import {
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

ChartJS.register(ArcElement, Tooltip, Legend);

const Index = ({ title, description, meta, citizens, auth }) => {
  const genders = Object.entries(
    citizens.reduce((counts, { gender }) => {
      counts[gender] = (counts[gender] || 0) + 1;
      return counts;
    }, {}),
  ).map(([name, gender_count]) => ({ name, gender_count }));

  const data = {
    labels: genders.map(({ name }) => name),
    datasets: [
      {
        label: "orang",
        data: genders.map(({ gender_count }) => gender_count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
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
              <Button
                h={40}
                radius={8}
                px={20}
                leftSection={<IconPlus />}
                onClick={() => router.get(route("citizens.create"))}
              >
                Tambah
              </Button>
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
            <DataTable
              data={citizens}
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
              renderRowActions={
                auth.user &&
                (({ row }) => (
                  <Menu
                    withArrow
                    trigger="click-hover"
                    styles={{
                      dropdown: {
                        padding: 8,
                        borderRadius: 8,
                      },
                      item: {
                        borderRadius: 8,
                      },
                    }}
                  >
                    <Menu.Target>
                      <ActionIcon
                        size={40}
                        radius={8}
                        variant="subtle"
                        color="gray.9"
                        c="gray.9"
                      >
                        <IconDots />
                      </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown>
                      <Menu.Item
                        leftSection={<IconEdit />}
                        onClick={() =>
                          router.get(route("citizens.edit", row.original.id))
                        }
                      >
                        Ubah
                      </Menu.Item>
                      <Menu.Item
                        leftSection={<IconTrash />}
                        onClick={() =>
                          modals.openConfirmModal({
                            styles: {
                              content: {
                                padding: 20,
                                borderRadius: 8,
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
            />
          </Tabs.Panel>

          <Tabs.Panel value="graphic">
            <AspectRatio ratio={16 / 9}>
              <Center>
                <Pie data={data} />
              </Center>
            </AspectRatio>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </AppLayout>
  );
};

export default Index;
