import { AppLayout } from "@/Layouts/AppLayout.jsx";
import {
  Accordion,
  ActionIcon,
  Box,
  Button,
  Center,
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

const Create = ({ title, description, prayers }) => {
  const form = useForm({
    prayers: [
      {
        name: "",
        choices: [
          {
            name: "",
          },
        ],
      },
    ],
  });

  const addPrayer = () => {
    form.setData("prayers", [
      ...form.data.prayers,
      {
        name: "",
        choices: [
          {
            name: "",
          },
        ],
      },
    ]);
  };

  const removePrayer = (index) => {
    form.setData(
      "prayers",
      form.data.prayers.filter((_, id) => id !== index),
    );
  };

  const addChoice = (prayerId) => {
    const newPrayers = [...form.data.prayers];
    newPrayers[prayerId].choices = [
      ...newPrayers[prayerId].choices,
      { name: "" },
    ];
    form.setData("prayers", newPrayers);
  };

  const removeChoice = (prayerId, choiceId) => {
    const newPrayers = [...form.data.prayers];
    newPrayers[prayerId].choices = newPrayers[prayerId].choices.filter(
      (_, id) => id !== choiceId,
    );
    form.setData("prayers", newPrayers);
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

          form.post(route("prayers.store"));
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
          <Accordion
            defaultValue="prayer-0"
            variant="contained"
            radius={8}
            styles={{
              control: {
                padding: 0,
              },
              label: {
                padding: 0,
              },
              content: {
                padding: "0 20px 20px 20px",
              },
            }}
          >
            {form.data.prayers.map((prayer, prayerId) => (
              <Accordion.Item key={prayerId} value={`prayer-${prayerId}`}>
                <Center gap={20} px={20} py={10}>
                  <Accordion.Control pr={20} c="gray.8">
                    <Text fw={500}>
                      {prayer.name} (Ibadah {prayerId + 1})
                    </Text>
                  </Accordion.Control>

                  <ActionIcon
                    size={40}
                    radius={8}
                    variant="light"
                    color="red"
                    onClick={() => removePrayer(prayerId)}
                    disabled={form.data.prayers.length === 1}
                  >
                    <IconTrash />
                  </ActionIcon>
                </Center>

                <Accordion.Panel>
                  <Stack gap={20}>
                    <TextInput
                      label="Nama"
                      autoFocus
                      radius={8}
                      variant="filled"
                      placeholder={`Masukkan nama ibadah (${prayerId + 1})`}
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

                        form.data.prayers[prayerId].name = value;
                        form.setData("prayers", form.data.prayers);

                        if (errorMessage) {
                          form.setError(
                            `prayers.${prayerId}.name`,
                            errorMessage,
                          );
                        } else {
                          form.clearErrors(`prayers.${prayerId}.name`);
                        }
                      }}
                      error={form.errors[`prayers.${prayerId}.name`]}
                    />

                    <Stack gap={40}>
                      <Box>
                        <Text c="gray.7" fz={14} mb={8} fw={500}>
                          Opsi
                        </Text>

                        <Stack gap={20}>
                          {prayer.choices.map((choice, choiceId) => (
                            <Group
                              gap={20}
                              key={choiceId}
                              mb={form.hasErrors && 20}
                            >
                              <TextInput
                                autoFocus
                                radius={8}
                                variant="filled"
                                placeholder={`Masukkan opsi (${choiceId + 1})`}
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
                                    errorMessage =
                                      "Nama opsi tidak boleh kosong";
                                  } else if (
                                    prayer.choices.some((choice) =>
                                      new RegExp(`^${value}$`, "i").test(
                                        choice.name,
                                      ),
                                    )
                                  ) {
                                    errorMessage = "Nama opsi sudah ada";
                                  }

                                  form.data.prayers[prayerId].choices[
                                    choiceId
                                  ].name = value;
                                  form.setData("prayers", form.data.prayers);

                                  if (errorMessage) {
                                    form.setError(
                                      `prayers.${prayerId}.choices.${choiceId}.name`,
                                      errorMessage,
                                    );
                                  } else {
                                    form.clearErrors(
                                      `prayers.${prayerId}.choices.${choiceId}.name`,
                                    );
                                  }
                                }}
                                error={
                                  form.errors[
                                    `prayers.${prayerId}.choices.${choiceId}.name`
                                  ]
                                }
                              />

                              <ActionIcon
                                size={40}
                                radius={8}
                                variant="light"
                                color="red"
                                onClick={() => removeChoice(prayerId, choiceId)}
                                disabled={prayer.choices.length === 1}
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
                          onClick={() => addChoice(prayerId)}
                          disabled={form.processing}
                        >
                          Tambah Opsi Lainnya
                        </Button>
                      </Flex>
                    </Stack>
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
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
            onClick={addPrayer}
            disabled={form.processing}
          >
            Tambah Ibadah Lainnya
          </Button>

          <Button
            disabled={
              form.hasErrors ||
              form.data.prayers.some((prayer) => !prayer.name) ||
              form.data.prayers.some((prayer) =>
                prayer.choices.some((choice) => !choice.name),
              )
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
