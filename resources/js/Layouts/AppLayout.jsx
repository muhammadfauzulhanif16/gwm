import { Box } from "@mantine/core";
import { Head } from "@inertiajs/react";
import { Header } from "@/Components/Header.jsx";
import { useEffect } from "react";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

export const AppLayout = ({ children, title, meta, auth }) => {
  useEffect(() => {
    if (meta) {
      notifications.show({
        px: 20,
        title: meta.title,
        color: meta.status ? "green" : "red",
        withCloseButton: false,
        icon: meta.status ? <IconCheck /> : <IconX />,
      });
    }
  }, [meta]);

  return (
    <Box bg="gray.3" mih="100vh">
      <Head>
        <title>{title}</title>
        <link
          rel="icon"
          type="image/x-icon"
          href="https://upload.wikimedia.org/wikipedia/commons/4/44/Logo_Muhammadiyah.svg"
        />
      </Head>

      {title !== "Masuk Akun" && <Header title={title} auth={auth} />}

      <Box
        py={auth.user && 40}
        px={{
          base: 16,
          sm: 24,
          md: 32,
          lg: 40,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
