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

const Create = ({ title, description, consumptions,auth }) => {
  const form = useForm({
    consumptions: [
      {
        name: "",
      },
    ],
  });

  const addConsumption = () => {
    form.setData("consumptions", [...form.data.consumptions, { name: "" }]);
  };

  const removeConsumption = (index) => {
    form.setData(
      "consumptions",
      form.data.consumptions.filter((_, id) => id !== index),
    );
  };

  return (
    <AppLayout title={title} auth={auth}>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 40,
        }}
        onSubmit={(e) => {
          e.preventDefault();

          form.post(route("consumptions.store"));
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
          <Text c="gray.7" fz={14} mb={8} fw={500}>
            Nama
          </Text>

          <Stack gap={20}>
            {form.data.consumptions.map((consumption, id) => (
              <Group gap={20} key={id} mb={form.hasErrors && 20}>
                <TextInput
                  autoFocus
                  radius={8}
                  variant="filled"
                  placeholder={`Masukkan konsumsi (${id + 1})`}
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
                      errorMessage = "Nama konsumsi tidak boleh kosong";
                    } else if (
                      consumptions.some((consumption) =>
                        new RegExp(`^${value}$`, "i").test(consumption.name),
                      )
                    ) {
                      errorMessage = "Nama konsumsi sudah ada";
                    }

                    form.data.consumptions[id].name = value;
                    form.setData("consumptions", form.data.consumptions);

                    if (errorMessage) {
                      form.setError(`consumptions.${id}.name`, errorMessage);
                    } else {
                      form.clearErrors(`consumptions.${id}.name`);
                    }
                  }}
                  error={form.errors[`consumptions.${id}.name`]}
                />

                <ActionIcon
                  size={40}
                  radius={8}
                  variant="light"
                  color="red"
                  onClick={() => removeConsumption(id)}
                  disabled={form.data.consumptions.length === 1}
                >
                  <IconTrash />
                </ActionIcon>
              </Group>
            ))}
          </Stack>
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
            onClick={addConsumption}
            disabled={form.processing}
          >
            Tambah Konsumsi Lainnya
          </Button>

          <Button
            disabled={
              form.hasErrors ||
              form.data.consumptions.some((consumption) => !consumption.name)
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

export default Create;
