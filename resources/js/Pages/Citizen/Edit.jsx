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
import { useEffect, useState } from "react";

const Edit = ({
  title,
  description,
  professions,
  consumptions,
  prayers,
  socialMedias,
  auth,
  citizen,
}) => {
  console.log(citizen);
  const form = useForm({
    personal: { ...citizen },
    job: {
      profession: citizen.job.name,
      ...citizen,
    },
    consumptions: citizen.consumptions || [],
    prayers: citizen.prayers || [],
    social_medias:  citizen.social_medias ||[],
  });

 

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          form.setData("personal.latitude", latitude);
          form.setData("personal.longitude", longitude);
        },
      );
    }
  }, []);

  const addConsumption = (values, timePeriod) => {
    if (!values || values.length === 0) {
      form.setError(
        `consumptions.${timePeriod}`,
        "Konsumsi tidak boleh kosong",
      );
      return;
    }

    const uniqueValues = [...new Set(values)];

    const updatedConsumptions = form.data.consumptions.filter(
      (consumption) =>
        consumption.time_period !== timePeriod ||
        uniqueValues.includes(consumption.value),
    );

    const newConsumptions = uniqueValues
      .filter(
        (value) =>
          !updatedConsumptions.some(
            (consumption) =>
              consumption.time_period === timePeriod &&
              consumption.value === value,
          ),
      )
      .map((value) => ({ time_period: timePeriod, value: value }));

    const newConsumptionsState = [...updatedConsumptions, ...newConsumptions];
    form.setData("consumptions", newConsumptionsState);

    form.clearErrors(`consumptions.${timePeriod}`);
  };

  const addPrayer = (value, prayerName) => {
    if (!value || value.length === 0) {
      form.setError(`prayers.${prayerName}`, "Ibadah tidak boleh kosong");
      return;
    }

    let prayer = form.data.prayers.find((prayer) => prayer.name === prayerName);

    if (!prayer) {
      prayer = { name: prayerName, choice: "" };
      form.data.prayers.push(prayer);
    }

    if (prayer.choice !== value) {
      prayer.choice = value;
      form.setData("prayers", form.data.prayers);
    }

    form.clearErrors(`prayers.${prayerName}`);
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

          form.put(route("citizens.update", citizen.id));
        }}
      >
        <PageHeader title={title} description={description} />

        <Stack
          gap={20}
          bg="gray.0"
          p={20}
          style={{
            borderRadius: 8,
          }}
        >
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
                  value={form.data.personal.name}
                  onChange={(e) => {
                    const value = e.target.value;
                    let errorMessage = "";

                    if (!value) {
                      errorMessage = "Nama tidak boleh kosong";
                    }

                    form.data.personal.name = value;
                    form.setData("personal", form.data.personal);

                    if (errorMessage) {
                      form.setError("personal.name", errorMessage);
                    } else {
                      form.clearErrors("personal.name");
                    }
                  }}
                  error={form.errors["personal.name"]}
                />

                <Select
                  label="Jenis Kelamin"
                  checkIconPosition="right"
                  radius={8}
                  nothingFoundMessage="Tidak ada jenis kelamin"
                  searchable
                  clearable
                  variant="filled"
                  placeholder="Pilih jenis kelamin"
                  data={["Laki-laki", "Perempuan"]}
                  value={form.data.personal.gender}
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
                      errorMessage = "Jenis kelamin tidak boleh kosong";
                    }

                    form.data.personal.gender = value;
                    form.setData("personal", form.data.personal);

                    if (errorMessage) {
                      form.setError("personal.gender", errorMessage);
                    } else {
                      form.clearErrors("personal.gender");
                    }
                  }}
                  error={form.errors["personal.gender"]}
                />

                <NumberInput
                  label="Usia"
                  autoFocus
                  radius={8}
                  hideControls
                  clampBehavior="strict"
                  min={0}
                  variant="filled"
                  value={form.data.personal.age}
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

                    form.data.personal.age = value;
                    form.setData("personal", form.data.personal);

                    if (errorMessage) {
                      form.setError(`personal.age`, errorMessage);
                    } else {
                      form.clearErrors(`personal.age`);
                    }
                  }}
                  error={form.errors[`personal.age`]}
                />

                <NumberInput
                  label="Nomor Telepon"
                  clampBehavior="strict"
                  hideControls
                  min={0}
                  autoFocus
                  value={form.data.personal.phone_number}
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
                      errorMessage = "Nomor telepon tidak boleh kosong";
                    }

                    form.data.personal.phone_number = value;
                    form.setData("personal", form.data.personal);

                    if (errorMessage) {
                      form.setError(`personal.phone_number`, errorMessage);
                    } else {
                      form.clearErrors(`personal.phone_number`);
                    }
                  }}
                  error={form.errors[`personal.phone_number`]}
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
                  value={form.data.personal.neighborhood}
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

                    form.data.personal.neighborhood = value;
                    form.setData("personal", form.data.personal);

                    if (errorMessage) {
                      form.setError(`personal.neighborhood`, errorMessage);
                    } else {
                      form.clearErrors(`personal.neighborhood`);
                    }
                  }}
                  error={form.errors[`personal.neighborhood`]}
                />

                <NumberInput
                  label="RW"
                  clampBehavior="strict"
                  hideControls
                  min={0}
                  autoFocus
                  value={form.data.personal.hamlet}
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

                    form.data.personal.hamlet = value;
                    form.setData("personal", form.data.personal);

                    if (errorMessage) {
                      form.setError(`personal.hamlet`, errorMessage);
                    } else {
                      form.clearErrors(`personal.hamlet`);
                    }
                  }}
                  error={form.errors[`personal.hamlet`]}
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
                  value={form.data.personal.urban_village}
                  onChange={(e) => {
                    const value = e.target.value;
                    let errorMessage = "";

                    if (!value) {
                      errorMessage = "Desa/kelurahan tidak boleh kosong";
                    }

                    form.data.personal.urban_village = value;
                    form.setData("personal", form.data.personal);

                    if (errorMessage) {
                      form.setError(`personal.urban_village`, errorMessage);
                    } else {
                      form.clearErrors(`personal.urban_village`);
                    }
                  }}
                  error={form.errors[`personal.urban_village`]}
                />

                <TextInput
                  label="Kecamatan"
                  autoFocus
                  radius={8}
                  variant="filled"
                  value={form.data.personal.sub_district}
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

                    form.data.personal.sub_district = value;
                    form.setData("personal", form.data.personal);

                    if (errorMessage) {
                      form.setError(`personal.sub_district`, errorMessage);
                    } else {
                      form.clearErrors(`personal.sub_district`);
                    }
                  }}
                  error={form.errors[`personal.sub_district`]}
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
                  checkIconPosition="right"
                  radius={8}
                  nothingFoundMessage="Tidak ada profesi"
                  searchable
                  clearable
                  value={form.data.job.profession}
                  data={professions.map(({ name }) => name)}
                  variant="filled"
                  placeholder="Pilih profesi"
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

                    form.data.job.profession = value;
                    form.setData("job", form.data.job);

                    if (errorMessage) {
                      form.setError(`job.profession`, errorMessage);
                    } else {
                      form.clearErrors(`job.profession`);
                    }
                  }}
                  error={form.errors[`job.profession`]}
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
                  value={form.data.job.income}
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
                      errorMessage = "Jumlah penghasilan tidak boleh kosong";
                    }

                    form.data.job.income = value;
                    form.setData("job", form.data.job);

                    if (errorMessage) {
                      form.setError(`job.income`, errorMessage);
                    } else {
                      form.clearErrors(`job.income`);
                    }
                  }}
                  error={form.errors[`job.income`]}
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
                  value={form.data.job.dependents}
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
                      errorMessage = "Jumlah tanggungan tidak boleh kosong";
                    }

                    form.data.job.dependents = value;
                    form.setData("job", form.data.job);

                    if (errorMessage) {
                      form.setError(`job.dependents`, errorMessage);
                    } else {
                      form.clearErrors(`job.dependents`);
                    }
                  }}
                  error={form.errors[`job.dependents`]}
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
                  value={form.data.job.workplace}
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
                      errorMessage = "Tempat kerja tidak boleh kosong";
                    }

                    form.data.job.workplace = value;
                    form.setData("job", form.data.job);

                    if (errorMessage) {
                      form.setError(`job.workplace`, errorMessage);
                    } else {
                      form.clearErrors(`job.workplace`);
                    }
                  }}
                  error={form.errors[`job.workplace`]}
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
                  value={form.data.job.field}
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
                      errorMessage = "Bidang pekerjaan tidak boleh kosong";
                    }

                    form.data.job.field = value;
                    form.setData("job", form.data.job);

                    if (errorMessage) {
                      form.setError(`job.field`, errorMessage);
                    } else {
                      form.clearErrors(`job.field`);
                    }
                  }}
                  error={form.errors[`job.field`]}
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
                  value={form.data.job.scale}
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
                      errorMessage = "Skala pekerjaan tidak boleh kosong";
                    }

                    form.data.job.scale = value;
                    form.setData("job", form.data.job);

                    if (errorMessage) {
                      form.setError(`job.scale`, errorMessage);
                    } else {
                      form.clearErrors(`job.scale`);
                    }
                  }}
                  error={form.errors[`job.scale`]}
                />
              </Grid.Col>

              <Grid.Col span={12}>
                <Textarea
                  label="Deskripsi Pekerjaan"
                  autoFocus
                  autosize
                  resize="vertical"
                  value={form.data.job.description}
                  radius={8}
                  variant="filled"
                  placeholder="Masukkan deskripsi pekerjaan"
                  styles={{
                    input: {
                      padding: "8px 20px",
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
                      errorMessage = "Deskripsi pekerjaan tidak boleh kosong";
                    }

                    form.data.job.description = value;
                    form.setData("job", form.data.job);

                    if (errorMessage) {
                      form.setError(`job.description`, errorMessage);
                    } else {
                      form.clearErrors(`job.description`);
                    }
                  }}
                  error={form.errors[`job.description`]}
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
                hidePickedOptions
                label="Harian"
                checkIconPosition="right"
                radius={8}
                nothingFoundMessage="Tidak ada konsumsi"
                searchable
                clearable
                defaultValue={form.data.consumptions
                  .filter((consumption) => consumption.time_period === "Harian").map(({values}) => values)[0]}
                variant="filled"
                placeholder="Pilih konsumsi"
                data={consumptions
                  .map(({ name }) => name)
                  .filter(
                    (value) =>
                      !form.data.consumptions.some(
                        (consumption) => consumption.value === value,
                      ),
                  )}
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
                onChange={(values) => addConsumption(values, "Harian")}
                error={form.errors[`consumptions.Harian`]}
              />

              <MultiSelect
                label="Pekanan"
                defaultValue={form.data.consumptions
                  .filter((consumption) => consumption.time_period === "Pekanan").map(({values}) => values)[0]}
                hidePickedOptions
                checkIconPosition="right"
                radius={8}
                nothingFoundMessage="Tidak ada konsumsi"
                searchable
                clearable
                variant="filled"
                placeholder="Pilih konsumsi"
                data={consumptions
                  .map(({ name }) => name)
                  .filter(
                    (value) =>
                      !form.data.consumptions.some(
                        (consumption) => consumption.value === value,
                      ),
                  )}
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
                onChange={(values) => addConsumption(values, "Pekanan")}
                error={form.errors[`consumptions.Pekanan`]}
              />

              <MultiSelect
                label="Bulanan"
                hidePickedOptions
                checkIconPosition="right"
                radius={8}
                nothingFoundMessage="Tidak ada konsumsi"
                searchable
                clearable
                defaultValue={form.data.consumptions
                  .filter(
                    (consumption) => consumption.time_period === "Bulanan",
                  )
                  .map(({ values }) => values)[0]}
                variant="filled"
                placeholder="Pilih konsumsi"
                data={consumptions
                  .map(({ name }) => name)
                  .filter(
                    (value) =>
                      !form.data.consumptions.some(
                        (consumption) => consumption.value === value,
                      ),
                  )}
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
                onChange={(values) => addConsumption(values, "Bulanan")}
                error={form.errors[`consumptions.Bulanan`]}
              />

              <MultiSelect
                label="Tahunan"
                hidePickedOptions
                checkIconPosition="right"
                radius={8}
                defaultValue={form.data.consumptions
                  .filter(
                    (consumption) => consumption.time_period === "Tahunan",
                  )
                  .map(({ values }) => values)[0]}
                nothingFoundMessage="Tidak ada konsumsi"
                searchable
                clearable
                variant="filled"
                placeholder="Pilih konsumsi"
                data={consumptions
                  .map(({ name }) => name)
                  .filter(
                    (value) =>
                      !form.data.consumptions.some(
                        (consumption) => consumption.value === value,
                      ),
                  )}
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
                onChange={(values) => addConsumption(values, "Tahunan")}
                error={form.errors[`consumptions.Tahunan`]}
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
                    checkIconPosition="right"
                    radius={8}
                    nothingFoundMessage="Tidak ada opsi"
                    searchable
                    clearable
                    defaultValue={
                      form.data.prayers.find(({ name }) => name === prayer.name)
                        .choice
                    }
                    variant="filled"
                    placeholder="Pilih opsi"
                    data={prayer.choices.map(({ name }) => name)}
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
                    onChange={(value) => addPrayer(value, prayer.name)}
                    error={form.errors[`prayers.${prayer.id}`]}
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
              hidePickedOptions
              checkIconPosition="right"
              radius={8}
              nothingFoundMessage="Tidak ada aplikasi"
              searchable
              clearable
              defaultValue={form.data.social_medias}
              variant="filled"
              placeholder="Pilih aplikasi"
              data={socialMedias.map(({ name }) => name)}
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
              onChange={(values) => {
                let errorMessage = "";

                if (!values || values.length === 0) {
                  errorMessage = "Aplikasi tidak boleh kosong";
                }

                form.data.social_medias = values;
                form.setData("social_medias", form.data.social_medias);

                if (errorMessage) {
                  form.setError(`social_medias`, errorMessage);
                } else {
                  form.clearErrors(`social_medias`);
                }
              }}
              error={form.errors[`social_medias`]}
            /> 
          </Fieldset>
        </Stack>

        <Flex
          justify="flex-end"
          direction={{
            base: "column",
            xs: "row",
          }}
          gap={8}
        >
          <Button
            disabled={form.hasErrors}
            loading={form.processing}
            loaderProps={{ type: "dots" }}
            type="submit"
            h={40}
            px={20}
            ius={8}
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
