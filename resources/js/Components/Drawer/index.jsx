import {
  ActionIcon,
  Button,
  Drawer as DrawerMantine,
  Stack,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { NavigationList } from "@/Components/Drawer/NavigationList.jsx";
import { router } from "@inertiajs/react";

export const Drawer = ({ opened, close, title }) => {
  return (
    <DrawerMantine.Root opened={opened} onClose={close} size={320}>
      <DrawerMantine.Overlay />

      <DrawerMantine.Content
        bg="gray.0"
        style={{
          borderTopRightRadius: 8,
          borderBottomRightRadius: 8,
        }}
      >
        <DrawerMantine.Header
          bg="gray.0"
          py={20}
          px={{
            base: 16,
            sm: 24,
            md: 32,
            lg: 40,
          }}
        >
          <ActionIcon size={40} variant="subtle" c="gray.9" onClick={close}>
            <IconX />
          </ActionIcon>
        </DrawerMantine.Header>

        <DrawerMantine.Body
          py={20}
          px={{
            base: 16,
            sm: 24,
            md: 32,
            lg: 40,
          }}
        >
          <Stack gap={20}>
            {NavigationList.map(({ label, route: r, icon }, id) => (
              <Button
                key={id}
                px={20}
                h={40}
                w="100%"
                variant={title.includes(label) ? "light" : "subtle"}
                leftSection={icon}
                style={{ display: "flex" }}
                c={title.includes(label) ? "" : "gray.7"}
                onClick={() => router.get(route(r))}
              >
                {label}
              </Button>
            ))}
          </Stack>
        </DrawerMantine.Body>
      </DrawerMantine.Content>
    </DrawerMantine.Root>
  );
};
