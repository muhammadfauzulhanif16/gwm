import { AppLayout } from "@/Layouts/AppLayout.jsx";
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Group,
  Kbd,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconCornerDownLeft, IconPlus, IconTrash } from "@tabler/icons-react";
import { useForm } from "@inertiajs/react";
import { PageHeader } from "@/Components/PageHeader.jsx";

const Edit = ({ title, description, prayers, prayer }) => {
  const form = useForm({
    name: prayer.name || "",
    choices: prayer.choices || [
      {
        id: "",
        name: "",
      },
    ],
  });

  const addChoice = () => {
    form.setData("choices", [
      ...form.data.choices,
      {
        name: "",
      },
    ]);
  };

  const removeChoice = (choiceId) => {
    form.setData(
      "choices",
      form.data.choices.filter((_, index) => index !== choiceId),
    );
  };

  return (
    <AppLayout title={title}>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 40,
        }}
        onSubmit={(e) => {
          e.preventDefault();

          form.put(route("prayers.update", prayer.id));
        }}
      >
        <PageHeader title={title} description={description} />

        <Box
          bg="gray.0"
          p={20}
          style={{
            borderRadius: 8,
          }}
        >
          <TextInput
            mb={20}
            label="Nama"
            autoFocus
            radius={8}
            variant="filled"
            placeholder="Masukkan nama ibadah"
            value={form.data.name}
            styles={{
              input: {
                padding: 20,
                height: 40,
              },
              label: {
                marginBottom: 8,
                color: "#495057",
              },
            }}
            onChange={(e) => {
              const value = e.target.value;
              let errorMessage = "";

              if (!value) {
                errorMessage = "Nama ibadah tidak boleh kosong";
              } else if (
                prayers.some((prayer) =>
                  new RegExp(`^${value}$`, "i").test(prayer.name),
                )
              ) {
                errorMessage = "Nama ibadah sudah ada";
              }

              form.data.name = value;
              form.setData("name", value);

              if (errorMessage) {
                form.setError("name", errorMessage);
              } else {
                form.clearErrors("name");
              }
            }}
            error={form.errors.name}
          />
          <Box>
            <Text c="gray.7" fz={14} mb={8} fw={500}>
              Opsi
            </Text>

            <Stack gap={20}>
              {form.data.choices.map((choice, id) => (
                <Group gap={20} key={id}>
                  <TextInput
                    autoFocus
                    radius={8}
                    variant="filled"
                    placeholder={`Masukkan opsi (${id + 1})`}
                    styles={{
                      input: {
                        padding: 20,
                        height: 40,
                      },
                    }}
                    style={{
                      flexGrow: 1,
                    }}
                    onChange={(e) => {
                      const value = e.target.value;
                      let errorMessage = "";

                      if (!value) {
                        errorMessage = "Nama opsi tidak boleh kosong";
                      } else if (
                        form.data.choices.some((choice) =>
                          new RegExp(`^${value}$`, "i").test(choice.name),
                        )
                      ) {
                        errorMessage = "Nama opsi sudah ada";
                      }

                      form.data.choices[id].name = value;
                      form.setData("choices", form.data.choices);

                      if (errorMessage) {
                        form.setError(`choices.${id}.name`, errorMessage);
                      } else {
                        form.clearErrors(`choices.${id}.name`);
                      }
                    }}
                    value={choice.name}
                    error={form.errors.choices?.[id]?.name}
                  />

                  <ActionIcon
                    size={40}
                    radius={8}
                    variant="light"
                    color="red"
                    onClick={() => removeChoice(id)}
                    disabled={form.data.choices.length === 1}
                  >
                    <IconTrash />
                  </ActionIcon>
                </Group>
              ))}
            </Stack>
          </Box>
        </Box>

        <Flex
          justify="flex-end"
          direction={{
            base: "column",
            xs: "row",
          }}
          gap={20}
        >
          <Button
            h={40}
            px={20}
            radius={8}
            variant="outline"
            leftSection={<IconPlus />}
            onClick={addChoice}
            disabled={form.processing}
          >
            Tambah Opsi Lainnya
          </Button>

          <Button
            disabled={
              form.hasErrors ||
              !form.data.name ||
              form.data.choices.some((choice) => !choice.name)
            }
            loading={form.processing}
            loaderProps={{ type: "dots" }}
            type="submit"
            h={40}
            px={20}
            radius={8}
            leftSection={<IconCornerDownLeft />}
            rightSection={<Kbd>Enter</Kbd>}
          >
            Simpan
          </Button>
        </Flex>
      </form>
    </AppLayout>
  );
};

export default Edit;
