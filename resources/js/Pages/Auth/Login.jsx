import { AppLayout } from "@/Layouts/AppLayout";
import { useForm } from "@inertiajs/react";
import {
  Box,
  Button,
  Center,
  Image,
  Kbd,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";

const Login = ({ title, auth, meta }) => {
  const form = useForm({
    username: "",
    password: "",
  });

  return (
    <AppLayout title={title} auth={auth} meta={meta}>
      <Center mih="100vh">
        <Box
          w={{
            base: "100%",
            sm: "75%",
            md: "50%",
            lg: "25%",
          }}
          bg="gray.0"
          p={{
            base: 16,
            sm: 24,
            md: 32,
            lg: 40,
          }}
          style={{
            borderRadius: 8,
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();

              form.post(route("login"));
            }}
          >
            <Stack spacing={20}>
              <Center>
                <Image
                  h={40}
                  w={40}
                  radius={8}
                  src="https://upload.wikimedia.org/wikipedia/commons/4/44/Logo_Muhammadiyah.svg"
                />
              </Center>
              <TextInput
                label="Nama Pengguna"
                autoFocus
                radius={8}
                variant="filled"
                placeholder="Masukkan nama pengguna"
                styles={{
                  input: {
                    padding: 20,
                    height: 40,
                  },
                  label: { marginBottom: 8 },
                }}
                style={{
                  flexGrow: 1,
                }}
                onChange={(e) => {
                  if (!e.target.value) {
                    form.setError(
                      "username",
                      "Nama pengguna tidak boleh kosong",
                    );
                  } else {
                    form.clearErrors("username");
                  }

                  form.setData("username", e.target.value);
                }}
                error={form.errors.username}
              />
              <PasswordInput
                label="Kata Sandi"
                autoFocus
                radius={8}
                variant="filled"
                placeholder="Masukkan kata sandi"
                styles={{
                  input: {
                    height: 40,
                  },
                  innerInput: {
                    paddingLeft: 20,
                    paddingRight: 40,
                  },
                  label: { marginBottom: 8 },
                }}
                style={{
                  flexGrow: 1,
                }}
                onChange={(e) => {
                  if (!e.target.value) {
                    form.setError("password", "Kata sandi tidak boleh kosong");
                  } else {
                    form.clearErrors("password");
                  }

                  form.setData("password", e.target.value);
                }}
                error={form.errors.password}
              />
              <Button
                type="submit"
                w="100%"
                px={20}
                h={40}
                disabled={
                  form.hasErrors ||
                  form.data.username === "" ||
                  form.data.password === ""
                }
                loading={form.processing}
                rightSection={<Kbd>Enter</Kbd>}
              >
                Masuk Akun
              </Button>
            </Stack>
          </form>
        </Box>
      </Center>
    </AppLayout>
  );
};

export default Login;
