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

const Create = ({ title, description, jobs, auth }) => {
  const form = useForm({
    jobs: [
      {
        name: "",
      },
    ],
  });

  const addJob = () => {
    form.setData("jobs", [...form.data.jobs, { name: "" }]);
  };

  const removeJob = (index) => {
    form.setData(
      "jobs",
      form.data.jobs.filter((_, id) => id !== index),
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

          form.post(route("jobs.store"));
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

          <Stack gap={12}>
            {form.data.jobs.map((job, id) => (
              <Group key={id} mb={form.hasErrors && 20} gap={8}>
                <TextInput
                  autoFocus
                  variant="filled"
                  placeholder={`Masukkan nama pekerjaan (${id + 1})`}
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
                      errorMessage = "Nama pekerjaan tidak boleh kosong";
                    } else if (
                      jobs.some((job) =>
                        new RegExp(`^${value}$`, "i").test(job.name),
                      )
                    ) {
                      errorMessage = "Nama pekerjaan sudah ada";
                    }

                    form.data.jobs[id].name = value;
                    form.setData("jobs", form.data.jobs);

                    if (errorMessage) {
                      form.setError(`jobs.${id}.name`, errorMessage);
                    } else {
                      form.clearErrors(`jobs.${id}.name`);
                    }
                  }}
                  error={form.errors[`jobs.${id}.name`]}
                />

                <ActionIcon
                  size={40}
                  variant="light"
                  color="red"
                  onClick={() => removeJob(id)}
                  disabled={form.data.jobs.length === 1}
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
          gap={8}
        >
          <Button
            h={40}
            px={20}
            variant="outline"
            leftSection={<IconPlus />}
            onClick={addJob}
            disabled={form.processing}
          >
            Tambah Pekerjaan Lainnya
          </Button>

          <Button
            disabled={form.hasErrors || form.data.jobs.some((job) => !job.name)}
            loading={form.processing}
            loaderProps={{ type: "dots" }}
            type="submit"
            h={40}
            px={20}
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
