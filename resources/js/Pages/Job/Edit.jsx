import { AppLayout } from "@/Layouts/AppLayout.jsx";
import { Box, Button, Flex, Kbd, TextInput } from "@mantine/core";
import { IconCornerDownLeft } from "@tabler/icons-react";
import { useForm } from "@inertiajs/react";
import { PageHeader } from "@/Components/PageHeader.jsx";

const Edit = ({ title, description, jobs, job ,auth}) => {
  const form = useForm({
    name: job.name || "",
  });

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

          form.put(route("jobs.update", job.id));
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
            label="Nama"
            autoFocus
            radius={8}
            variant="filled"
            placeholder="Masukkan nama pekerjaan"
            styles={{
              label: {
                marginBottom: 8,
              },
              input: {
                padding: 20,
                height: 40,
              },
            }}
            style={{
              flexGrow: 1,
            }}
            value={form.data.name}
            onChange={(e) => {
              const value = e.target.value;
              let errorMessage = "";

              if (!value) {
                errorMessage = "Nama pekerjaan tidak boleh kosong";
              } else if (
                jobs.some((job) => new RegExp(`^${value}$`, "i").test(job.name))
              ) {
                errorMessage = "Nama pekerjaan sudah ada";
              }

              form.data.name = value;
              form.setData("name", form.data.name);

              if (errorMessage) {
                form.setError("name", errorMessage);
              } else {
                form.clearErrors("name");
              }
            }}
            error={form.errors.name}
          />
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
            disabled={form.hasErrors || !form.data.name}
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
