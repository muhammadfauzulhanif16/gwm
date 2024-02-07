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

const Create = ({ title, description, socialMedias,auth }) => {
  const form = useForm({
    socialMedias: [
      {
        name: "",
      },
    ],
  });

  const addSocialMedia = () => {
    form.setData("socialMedias", [...form.data.socialMedias, { name: "" }]);
  };

  const removeSocialMedia = (index) => {
    form.setData(
      "socialMedias",
      form.data.socialMedias.filter((_, id) => id !== index),
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

          form.post(route("social-medias.store"));
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
            {form.data.socialMedias.map((socialMedia, id) => (
              <Group gap={20} key={id} mb={form.hasErrors && 20}>
                <TextInput
                  autoFocus
                  radius={8}
                  variant="filled"
                  placeholder={`Masukkan nama media sosial (${id + 1})`}
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
                      errorMessage = "Nama media sosial tidak boleh kosong";
                    } else if (
                      socialMedias.some((socialMedia) =>
                        new RegExp(`^${value}$`, "i").test(socialMedia.name),
                      )
                    ) {
                      errorMessage = "Nama media sosial sudah ada";
                    }

                    form.data.socialMedias[id].name = value;
                    form.setData("socialMedias", form.data.socialMedias);

                    if (errorMessage) {
                      form.setError(`socialMedias.${id}.name`, errorMessage);
                    } else {
                      form.clearErrors(`socialMedias.${id}.name`);
                    }
                  }}
                  error={form.errors[`socialMedias.${id}.name`]}
                />

                <ActionIcon
                  size={40}
                  radius={8}
                  variant="light"
                  color="red"
                  onClick={() => removeSocialMedia(id)}
                  disabled={form.data.socialMedias.length === 1}
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
            onClick={addSocialMedia}
            disabled={form.processing}
          >
            Tambah Media Sosial Lainnya
          </Button>

          <Button
            disabled={
              form.hasErrors ||
              form.data.socialMedias.some((socialMedia) => !socialMedia.name)
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
