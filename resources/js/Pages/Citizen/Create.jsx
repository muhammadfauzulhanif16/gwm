import { AppLayout } from "@/Layouts/AppLayout.jsx";
import {
  Accordion,
  ActionIcon,
  Box,
  Button,
  Center,
  Fieldset,
  Flex,
  Grid,
  Kbd,
  MultiSelect,
  NumberInput,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { IconCornerDownLeft, IconPlus, IconTrash } from "@tabler/icons-react";
import { PageHeader } from "@/Components/PageHeader.jsx";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

const Create = ({
  title,
  description,
  professions,
  consumptions,
  prayers,
  socialMedias,
  auth,
}) => {
  const form = useForm({
    citizens: [
      {
        personal: {
          name: "",
          gender: "",
          age: "",
          phone_number: "",
          neighborhood: "",
          hamlet: "",
          urban_village: "",
          sub_district: "",
          latitude: "",
          longitude: "",
        },
        job: {
          profession_id: "",
          income: "",
          dependents: "",
          workplace: "",
          field: "",
          scale: "",
          description: "",
        },
        consumptions: [],
        prayers: [],
        social_medias: [],
      },
    ],
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        form.data.citizens[0].personal.latitude = position.coords.latitude;
        form.data.citizens[0].personal.longitude = position.coords.longitude;
      });
    }
  }, [form]);

  console.log(form.data);

  const addConsumption = (value, citizenId, timePeriod) => {
    let errorMessage = "";

    if (!value || value.length === 0) {
      errorMessage = `Konsumsi tidak boleh kosong`;
    }

    form.data.citizens[citizenId].consumptions = value.map((val) => ({
      time_period: timePeriod,
      value: val,
    }));
    form.setData("citizens", form.data.citizens);

    if (errorMessage) {
      form.setError(
        `citizens.${citizenId}.consumptions.${timePeriod}`,
        errorMessage,
      );
    } else {
      form.clearErrors(`citizens.${citizenId}.consumptions.${timePeriod}`);
    }
  };

  const addPrayer = (value, citizenId, prayerId) => {
    let errorMessage = "";

    if (!value || value.length === 0) {
      errorMessage = `Prayer option cannot be empty`;
    }

    // Find the prayer object in the prayers array
    const prayer = form.data.citizens[citizenId].prayers.find(
      (prayer) => prayer.prayer_id === prayerId,
    );

    // If the prayer object exists, update the choice_id
    if (prayer) {
      prayer.choice_id = value;
    } else {
      // If the prayer object does not exist, create a new one
      form.data.citizens[citizenId].prayers.push({
        prayer_id: prayerId,
        choice_id: value,
      });
    }

    form.setData("citizens", form.data.citizens);

    if (errorMessage) {
      form.setError(`citizens.${citizenId}.prayers.${prayerId}`, errorMessage);
    } else {
      form.clearErrors(`citizens.${citizenId}.prayers.${prayerId}`);
    }
  };

  const addCitizen = () => {
    form.setData("citizens", [
      ...form.data.citizens,
      {
        personal: {
          name: "",
          gender: "",
          age: "",
          phone_number: "",
          neighborhood: "",
          hamlet: "",
          urban_village: "",
          sub_district: "",
          latitude: "",
          longitude: "",
        },
        job: {
          profession: "",
          income: "",
          dependents: "",
          workplace: "",
          field: "",
          scale: "",
          description: "",
        },
        consumptions: [],
        prayers: [],
        social_medias: [],
      },
    ]);
  };

  const removeCitizen = (index) => {
    form.setData(
      "citizens",
      form.data.citizens.filter((_, id) => id !== index),
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

          form.post(route("citizens.store"));
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
            {form.data.citizens.map((citizen, citizenId) => (
              <Accordion.Item key={citizenId} value={`citizen-${citizenId}`}>
                <Center gap={20} px={20} py={10}>
                  <Accordion.Control pr={20} c="gray.8">
                    <Text fw={500}>
                      {citizen.personal.name} (Warga {citizenId + 1})
                    </Text>
                  </Accordion.Control>

                  <ActionIcon
                    size={40}
                    radius={8}
                    variant="light"
                    color="red"
                    onClick={() => removeCitizen(citizenId)}
                    disabled={form.data.citizens.length === 1}
                  >
                    <IconTrash />
                  </ActionIcon>
                </Center>

                <Accordion.Panel>
                  <Stack gap={20}>
                    <Fieldset
                      legend="Pribadi"
                      styles={{
                        root: {
                          padding: 20,
                          margin: 0,
                          backgroundColor: "#F8F9FA",
                        },
                      }}
                    >
                      <Stack gap={20}>
                        <SimpleGrid
                          cols={{
                            base: 1,
                            xs: 2,
                          }}
                          gap={20}
                        >
                          <TextInput
                            label="Nama"
                            autoFocus
                            radius={8}
                            variant="filled"
                            placeholder="Masukkan nama"
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
                                errorMessage = "Nama tidak boleh kosong";
                              }

                              form.data.citizens[citizenId].personal.name =
                                value;
                              form.setData("citizens", form.data.citizens);

                              if (errorMessage) {
                                form.setError(
                                  `citizens.${citizenId}.personal.name`,
                                  errorMessage,
                                );
                              } else {
                                form.clearErrors(
                                  `citizens.${citizenId}.personal.name`,
                                );
                              }
                            }}
                            error={
                              form.errors[`citizens.${citizenId}.personal.name`]
                            }
                          />

                          <Select
                            label="Jenis Kelamin"
                            autoFocus
                            checkIconPosition="right"
                            radius={8}
                            nothingFoundMessage="Tidak ada jenis kelamin"
                            searchable
                            clearable
                            variant="filled"
                            placeholder="Pilih jenis kelamin"
                            data={["Laki-laki", "Perempuan"]}
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
                            onChange={(value) => {
                              let errorMessage = "";

                              if (!value) {
                                errorMessage =
                                  "Jenis kelamin tidak boleh kosong";
                              }

                              form.data.citizens[citizenId].personal.gender =
                                value;
                              form.setData("citizens", form.data.citizens);

                              if (errorMessage) {
                                form.setError(
                                  `citizens.${citizenId}.personal.gender`,
                                  errorMessage,
                                );
                              } else {
                                form.clearErrors(
                                  `citizens.${citizenId}.personal.gender`,
                                );
                              }
                            }}
                            error={
                              form.errors[
                                `citizens.${citizenId}.personal.gender`
                              ]
                            }
                          />

                          <NumberInput
                            label="Usia"
                            autoFocus
                            radius={8}
                            hideControls
                            clampBehavior="strict"
                            min={0}
                            variant="filled"
                            placeholder="Masukkan usia"
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
                            onChange={(value) => {
                              let errorMessage = "";

                              if (!value) {
                                errorMessage = "Usia tidak boleh kosong";
                              }

                              form.data.citizens[citizenId].personal.age =
                                value;
                              form.setData("citizens", form.data.citizens);

                              if (errorMessage) {
                                form.setError(
                                  `citizens.${citizenId}.personal.age`,
                                  errorMessage,
                                );
                              } else {
                                form.clearErrors(
                                  `citizens.${citizenId}.personal.age`,
                                );
                              }
                            }}
                            error={
                              form.errors[`citizens.${citizenId}.personal.age`]
                            }
                          />

                          <NumberInput
                            label="Nomor Telepon"
                            clampBehavior="strict"
                            hideControls
                            min={0}
                            autoFocus
                            radius={8}
                            variant="filled"
                            placeholder="Masukkan nomor telepon"
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
                            onChange={(value) => {
                              let errorMessage = "";

                              if (!value) {
                                errorMessage =
                                  "Nomor telepon tidak boleh kosong";
                              }

                              form.data.citizens[
                                citizenId
                              ].personal.phone_number = value;
                              form.setData("citizens", form.data.citizens);

                              if (errorMessage) {
                                form.setError(
                                  `citizens.${citizenId}.personal.phone_number`,
                                  errorMessage,
                                );
                              } else {
                                form.clearErrors(
                                  `citizens.${citizenId}.personal.phone_number`,
                                );
                              }
                            }}
                            error={
                              form.errors[
                                `citizens.${citizenId}.personal.phone_number`
                              ]
                            }
                          />
                        </SimpleGrid>

                        <SimpleGrid
                          cols={{
                            base: 1,
                            xs: 2,
                          }}
                          gap={20}
                        >
                          <NumberInput
                            label="RT"
                            autoFocus
                            radius={8}
                            hideControls
                            clampBehavior="strict"
                            min={0}
                            variant="filled"
                            placeholder="Masukkan RT"
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
                            onChange={(value) => {
                              let errorMessage = "";

                              if (!value) {
                                errorMessage = "RT tidak boleh kosong";
                              }

                              form.data.citizens[
                                citizenId
                              ].personal.neighborhood = value;
                              form.setData("citizens", form.data.citizens);

                              if (errorMessage) {
                                form.setError(
                                  `citizens.${citizenId}.personal.neighborhood`,
                                  errorMessage,
                                );
                              } else {
                                form.clearErrors(
                                  `citizens.${citizenId}.personal.neighborhood`,
                                );
                              }
                            }}
                            error={
                              form.errors[
                                `citizens.${citizenId}.personal.neighborhood`
                              ]
                            }
                          />

                          <NumberInput
                            label="RW"
                            clampBehavior="strict"
                            hideControls
                            min={0}
                            autoFocus
                            radius={8}
                            variant="filled"
                            placeholder="Masukkan RW"
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
                            onChange={(value) => {
                              let errorMessage = "";

                              if (!value) {
                                errorMessage = "RW tidak boleh kosong";
                              }

                              form.data.citizens[citizenId].personal.hamlet =
                                value;
                              form.setData("citizens", form.data.citizens);

                              if (errorMessage) {
                                form.setError(
                                  `citizens.${citizenId}.personal.hamlet`,
                                  errorMessage,
                                );
                              } else {
                                form.clearErrors(
                                  `citizens.${citizenId}.personal.hamlet`,
                                );
                              }
                            }}
                            error={
                              form.errors[
                                `citizens.${citizenId}.personal.hamlet`
                              ]
                            }
                          />

                          <TextInput
                            label="Desa/Kelurahan"
                            autoFocus
                            radius={8}
                            variant="filled"
                            placeholder="Masukkan desa/kelurahan"
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
                                errorMessage =
                                  "Desa/kelurahan tidak boleh kosong";
                              }

                              form.data.citizens[
                                citizenId
                              ].personal.urban_village = value;
                              form.setData("citizens", form.data.citizens);

                              if (errorMessage) {
                                form.setError(
                                  `citizens.${citizenId}.personal.urban_village`,
                                  errorMessage,
                                );
                              } else {
                                form.clearErrors(
                                  `citizens.${citizenId}.personal.urban_village`,
                                );
                              }
                            }}
                            error={
                              form.errors[
                                `citizens.${citizenId}.personal.urban_village`
                              ]
                            }
                          />

                          <TextInput
                            label="Kecamatan"
                            autoFocus
                            radius={8}
                            variant="filled"
                            placeholder="Masukkan kecamatan"
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
                                errorMessage = "Kecamatan tidak boleh kosong";
                              }

                              form.data.citizens[
                                citizenId
                              ].personal.sub_district = value;
                              form.setData("citizens", form.data.citizens);

                              if (errorMessage) {
                                form.setError(
                                  `citizens.${citizenId}.personal.sub_district`,
                                  errorMessage,
                                );
                              } else {
                                form.clearErrors(
                                  `citizens.${citizenId}.personal.sub_district`,
                                );
                              }
                            }}
                            error={
                              form.errors[
                                `citizens.${citizenId}.personal.sub_district`
                              ]
                            }
                          />
                        </SimpleGrid>
                      </Stack>
                    </Fieldset>

                    <Fieldset
                      legend="Pekerjaan"
                      styles={{
                        root: {
                          padding: 20,
                          margin: 0,
                          backgroundColor: "#F8F9FA",
                        },
                      }}
                    >
                      <Grid grow gutter={20}>
                        <Grid.Col
                          span={{
                            base: 12,
                            xs: 6,
                          }}
                        >
                          <Select
                            label="Profesi"
                            autoFocus
                            checkIconPosition="right"
                            radius={8}
                            nothingFoundMessage="Tidak ada profesi"
                            searchable
                            clearable
                            variant="filled"
                            placeholder="Pilih profesi"
                            data={professions.map(({ id, name }) => ({
                              value: id,
                              label: name,
                            }))}
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
                            onChange={(value) => {
                              let errorMessage = "";

                              if (!value) {
                                errorMessage = "Profesi tidak boleh kosong";
                              }

                              form.data.citizens[citizenId].job.profession_id =
                                value;
                              form.setData("citizens", form.data.citizens);

                              if (errorMessage) {
                                form.setError(
                                  `citizens.${citizenId}.job.profession_id`,
                                  errorMessage,
                                );
                              } else {
                                form.clearErrors(
                                  `citizens.${citizenId}.job.profession_id`,
                                );
                              }
                            }}
                            error={
                              form.errors[
                                `citizens.${citizenId}.job.profession_id`
                              ]
                            }
                          />
                        </Grid.Col>

                        <Grid.Col
                          span={{
                            base: 12,
                            xs: 6,
                          }}
                        >
                          <NumberInput
                            label="Jumlah Penghasilan"
                            autoFocus
                            radius={8}
                            hideControls
                            clampBehavior="strict"
                            min={0}
                            variant="filled"
                            placeholder="Masukkan jumlah penghasilan"
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
                            onChange={(value) => {
                              let errorMessage = "";

                              if (!value) {
                                errorMessage =
                                  "Jumlah penghasilan tidak boleh kosong";
                              }

                              form.data.citizens[citizenId].job.income = value;
                              form.setData("citizens", form.data.citizens);

                              if (errorMessage) {
                                form.setError(
                                  `citizens.${citizenId}.job.income`,
                                  errorMessage,
                                );
                              } else {
                                form.clearErrors(
                                  `citizens.${citizenId}.job.income`,
                                );
                              }
                            }}
                            error={
                              form.errors[`citizens.${citizenId}.job.income`]
                            }
                          />
                        </Grid.Col>

                        <Grid.Col
                          span={{
                            base: 12,
                            xs: 6,
                          }}
                        >
                          <NumberInput
                            label="Jumlah Tanggungan"
                            autoFocus
                            radius={8}
                            hideControls
                            clampBehavior="strict"
                            min={0}
                            variant="filled"
                            placeholder="Masukkan jumlah tanggugan"
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
                            onChange={(value) => {
                              let errorMessage = "";

                              if (!value) {
                                errorMessage =
                                  "Jumlah tanggungan tidak boleh kosong";
                              }

                              form.data.citizens[citizenId].job.dependents =
                                value;
                              form.setData("citizens", form.data.citizens);

                              if (errorMessage) {
                                form.setError(
                                  `citizens.${citizenId}.job.dependents`,
                                  errorMessage,
                                );
                              } else {
                                form.clearErrors(
                                  `citizens.${citizenId}.job.dependents`,
                                );
                              }
                            }}
                            error={
                              form.errors[
                                `citizens.${citizenId}.job.dependents`
                              ]
                            }
                          />
                        </Grid.Col>

                        <Grid.Col
                          span={{
                            base: 12,
                            xs: 6,
                          }}
                        >
                          <TextInput
                            label="Tempat Kerja"
                            autoFocus
                            radius={8}
                            variant="filled"
                            placeholder="Masukkan tempat kerja"
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
                                errorMessage =
                                  "Tempat kerja tidak boleh kosong";
                              }

                              form.data.citizens[citizenId].job.workplace =
                                value;
                              form.setData("citizens", form.data.citizens);

                              if (errorMessage) {
                                form.setError(
                                  `citizens.${citizenId}.job.workplace`,
                                  errorMessage,
                                );
                              } else {
                                form.clearErrors(
                                  `citizens.${citizenId}.job.workplace`,
                                );
                              }
                            }}
                            error={
                              form.errors[`citizens.${citizenId}.job.workplace`]
                            }
                          />
                        </Grid.Col>

                        <Grid.Col
                          span={{
                            base: 12,
                            xs: 6,
                          }}
                        >
                          <TextInput
                            label="Bidang Pekerjaan"
                            autoFocus
                            radius={8}
                            variant="filled"
                            placeholder="Masukkan bidang pekerjaan"
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
                                errorMessage =
                                  "Bidang pekerjaan tidak boleh kosong";
                              }

                              form.data.citizens[citizenId].job.field = value;
                              form.setData("citizens", form.data.citizens);

                              if (errorMessage) {
                                form.setError(
                                  `citizens.${citizenId}.job.field`,
                                  errorMessage,
                                );
                              } else {
                                form.clearErrors(
                                  `citizens.${citizenId}.job.field`,
                                );
                              }
                            }}
                            error={
                              form.errors[`citizens.${citizenId}.job.field`]
                            }
                          />
                        </Grid.Col>

                        <Grid.Col
                          span={{
                            base: 12,
                            xs: 6,
                          }}
                        >
                          <TextInput
                            label="Skala Pekerjaan"
                            autoFocus
                            radius={8}
                            variant="filled"
                            placeholder="Masukkan skala pekerjaan"
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
                                errorMessage =
                                  "Skala pekerjaan tidak boleh kosong";
                              }

                              form.data.citizens[citizenId].job.scale = value;
                              form.setData("citizens", form.data.citizens);

                              if (errorMessage) {
                                form.setError(
                                  `citizens.${citizenId}.job.scale`,
                                  errorMessage,
                                );
                              } else {
                                form.clearErrors(
                                  `citizens.${citizenId}.job.scale`,
                                );
                              }
                            }}
                            error={
                              form.errors[`citizens.${citizenId}.job.scale`]
                            }
                          />
                        </Grid.Col>

                        <Grid.Col span={12}>
                          <Textarea
                            label="Deskripsi Pekerjaan"
                            autoFocus
                            autosize
                            resize="vertical"
                            radius={8}
                            variant="filled"
                            placeholder="Masukkan deskripsi pekerjaan"
                            styles={{
                              input: {
                                padding: 20,
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
                                errorMessage =
                                  "Deskripsi pekerjaan tidak boleh kosong";
                              }

                              form.data.citizens[citizenId].job.description =
                                value;
                              form.setData("citizens", form.data.citizens);

                              if (errorMessage) {
                                form.setError(
                                  `citizens.${citizenId}.job.description`,
                                  errorMessage,
                                );
                              } else {
                                form.clearErrors(
                                  `citizens.${citizenId}.job.description`,
                                );
                              }
                            }}
                            error={
                              form.errors[
                                `citizens.${citizenId}.job.description`
                              ]
                            }
                          />
                        </Grid.Col>
                      </Grid>
                    </Fieldset>

                    <Fieldset
                      legend="Konsumsi"
                      styles={{
                        root: {
                          padding: 20,
                          margin: 0,
                          backgroundColor: "#F8F9FA",
                        },
                      }}
                    >
                      <SimpleGrid gap={20} cols={{ base: 1, xs: 2 }}>
                        <MultiSelect
                          autosize
                          label="Harian"
                          autoFocus
                          checkIconPosition="right"
                          radius={8}
                          nothingFoundMessage="Tidak ada konsumsi"
                          searchable
                          clearable
                          variant="filled"
                          placeholder="Pilih konsumsi"
                          data={consumptions
                            .filter(
                              ({ name }) =>
                                !form.data.citizens[
                                  citizenId
                                ].consumptions.some(
                                  (consumption) => consumption.value === name,
                                ),
                            )
                            .map(({ name }) => name)}
                          styles={{
                            input: {
                              display: "flex",
                              alignItems: "center",
                              padding: "8px 20px",
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
                          onChange={(value) =>
                            addConsumption(value, citizenId, "daily")
                          }
                          error={
                            form.errors[
                              `citizens.${citizenId}.consumptions.daily`
                            ]
                          }
                        />

                        <MultiSelect
                          label="Mingguan"
                          autoFocus
                          checkIconPosition="right"
                          radius={8}
                          nothingFoundMessage="Tidak ada konsumsi"
                          searchable
                          clearable
                          variant="filled"
                          placeholder="Pilih konsumsi"
                          data={consumptions
                            .filter(
                              ({ name }) =>
                                !form.data.citizens[
                                  citizenId
                                ].consumptions.some(
                                  (consumption) => consumption.value === name,
                                ),
                            )
                            .map(({ name }) => name)}
                          styles={{
                            input: {
                              display: "flex",
                              alignItems: "center",
                              padding: "8px 20px",
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
                          onChange={(value) =>
                            addConsumption(value, citizenId, "weekly")
                          }
                          error={
                            form.errors[
                              `citizens.${citizenId}.consumptions.weekly`
                            ]
                          }
                        />

                        <MultiSelect
                          label="Bulanan"
                          autoFocus
                          checkIconPosition="right"
                          radius={8}
                          nothingFoundMessage="Tidak ada konsumsi"
                          searchable
                          clearable
                          variant="filled"
                          placeholder="Pilih konsumsi"
                          data={consumptions
                            .filter(
                              ({ name }) =>
                                !form.data.citizens[
                                  citizenId
                                ].consumptions.some(
                                  (consumption) => consumption.value === name,
                                ),
                            )
                            .map(({ name }) => name)}
                          styles={{
                            input: {
                              display: "flex",
                              alignItems: "center",
                              padding: "8px 20px",
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
                          onChange={(value) =>
                            addConsumption(value, citizenId, "monthly")
                          }
                          error={
                            form.errors[
                              `citizens.${citizenId}.consumptions.monthly`
                            ]
                          }
                        />

                        <MultiSelect
                          label="Tahunan"
                          autoFocus
                          checkIconPosition="right"
                          radius={8}
                          nothingFoundMessage="Tidak ada konsumsi"
                          searchable
                          clearable
                          variant="filled"
                          placeholder="Pilih konsumsi"
                          data={consumptions
                            .filter(
                              ({ name }) =>
                                !form.data.citizens[
                                  citizenId
                                ].consumptions.some(
                                  (consumption) => consumption.value === name,
                                ),
                            )
                            .map(({ name }) => name)}
                          styles={{
                            input: {
                              display: "flex",
                              alignItems: "center",
                              padding: "8px 20px",
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
                          onChange={(value) =>
                            addConsumption(value, citizenId, "yearly")
                          }
                          error={
                            form.errors[
                              `citizens.${citizenId}.consumptions.yearly`
                            ]
                          }
                        />
                      </SimpleGrid>
                    </Fieldset>

                    <Fieldset
                      legend="Ibadah"
                      styles={{
                        root: {
                          padding: 20,
                          margin: 0,
                          backgroundColor: "#F8F9FA",
                        },
                      }}
                    >
                      <Grid grow>
                        {prayers.map((prayer) => (
                          <Grid.Col
                            key={prayer.id}
                            span={{
                              base: 12,
                              xs: 6,
                            }}
                          >
                            <Select
                              label={prayer.name}
                              autoFocus
                              checkIconPosition="right"
                              radius={8}
                              nothingFoundMessage="Tidak ada opsi"
                              searchable
                              clearable
                              variant="filled"
                              placeholder="Pilih opsi"
                              data={prayer.choices.map(({ id, name }) => ({
                                value: id,
                                label: name,
                              }))}
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
                              onChange={(value) =>
                                addPrayer(value, citizenId, prayer.id)
                              }
                              error={
                                form.errors[
                                  `citizens.${citizenId}.prayers.${prayer.id}`
                                ]
                              }
                            />
                          </Grid.Col>
                        ))}
                      </Grid>
                    </Fieldset>

                    <Fieldset
                      legend="Media Sosial"
                      styles={{
                        root: {
                          padding: 20,
                          margin: 0,
                          backgroundColor: "#F8F9FA",
                        },
                      }}
                    >
                      <MultiSelect
                        label="Aplikasi"
                        autoFocus
                        hidePickedOptions
                        checkIconPosition="right"
                        radius={8}
                        nothingFoundMessage="Tidak ada aplikasi"
                        searchable
                        clearable
                        variant="filled"
                        placeholder="Pilih aplikasi"
                        data={socialMedias.map(({ id, name }) => ({
                          value: id,
                          label: name,
                        }))}
                        styles={{
                          input: {
                            display: "flex",
                            alignItems: "center",
                            padding: "8px 20px",
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
                        onChange={(value) => {
                          let errorMessage = "";

                          if (!value) {
                            errorMessage = "Aplikasi tidak boleh kosong";
                          }

                          form.data.citizens[citizenId].social_medias = value;
                          form.setData("citizens", form.data.citizens);

                          if (errorMessage) {
                            form.setError(
                              `citizens.${citizenId}.social_medias`,
                              errorMessage,
                            );
                          } else {
                            form.clearErrors(
                              `citizens.${citizenId}.social_medias`,
                            );
                          }
                        }}
                        error={
                          form.errors[`citizens.${citizenId}.csocial_medias`]
                        }
                      />
                    </Fieldset>
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
            onClick={addCitizen}
            disabled={form.processing}
          >
            Tambah Warga Lainnya
          </Button>

          <Button
            disabled={form.hasErrors}
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
