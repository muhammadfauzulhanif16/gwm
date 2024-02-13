import { AppLayout } from "@/Layouts/AppLayout.jsx";
import {
  ActionIcon,
  Box,
  Button,
  List,
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

const Index = ({ title, description, meta, prayers, auth }) => {
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
                      leftSection={<IconEdit />}
                      onClick={() =>
                        router.get(route("prayers.edit", row.original.id))
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
                <Box>
                  <Text fw={500} fz={14} mb={8}>
                    Daftar Opsi
                  </Text>

                  <List spacing="xs" size="sm" center>
                    {row.original.choices.map((choice, id) => (
                      <List.Item key={id}>{choice.name}</List.Item>
                    ))}
                  </List>
                </Box>
              )}
            />
          </Tabs.Panel>

          <Tabs.Panel value="graphic">Messages tab content</Tabs.Panel>
        </Tabs>
      </Stack>
    </AppLayout>
  );
};

export default Index;
