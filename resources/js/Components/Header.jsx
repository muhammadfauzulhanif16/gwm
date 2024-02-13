import {
  ActionIcon,
  Avatar,
  Button,
  Flex,
  Image,
  Menu,
  SimpleGrid,
} from "@mantine/core";
import {
  IconChevronDown,
  IconLogin2,
  IconMenu2,
  IconSettings2,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { Drawer } from "@/Components/Drawer/index.jsx";
import { router } from "@inertiajs/react";

export const Header = ({ title, auth }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <SimpleGrid
      pos="sticky"
      top={0}
      cols={3}
      bg="gray.0"
      px={{
        base: 16,
        sm: 24,
        md: 32,
        lg: 40,
      }}
      py={20}
      spacing={0}
      styles={{
        root: {
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        },
      }}
      style={{
        zIndex: 4,
      }}
    >
      <Flex>
        <Drawer opened={opened} close={close} title={title} />

        <ActionIcon size={40} variant="subtle" c="gray.9" onClick={open}>
          <IconMenu2 />
        </ActionIcon>
      </Flex>

      <Flex justify="center">
        <Image
          h={40}
          w={40}
          radius={8}
          src="https://upload.wikimedia.org/wikipedia/commons/4/44/Logo_Muhammadiyah.svg"
        />
      </Flex>

      <Flex justify="flex-end">
        {auth.user ? (
          <Menu position="bottom-end">
            <Menu.Target>
              <Button px={20} h={40} c="gray.9" variant="subtle">
                <Avatar size={28} radius={8}>
                  A
                </Avatar>

                <IconChevronDown />
              </Button>
            </Menu.Target>

            <Menu.Dropdown
              style={{
                padding: 8,
              }}
            >
              <Menu.Label>Akun</Menu.Label>
              <Menu.Item leftSection={<IconSettings2 />} h={40} px={20}>
                Pengaturan
              </Menu.Item>
              <Menu.Item
                leftSection={<IconLogin2 />}
                color="red"
                h={40}
                px={20}
                onClick={() => router.post(route("logout"))}
              >
                Keluar
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : (
          <>
            <Button
              display={{
                base: "none",
                sm: "block",
              }}
              px={20}
              h={40}
              c="gray.9"
              variant="outline"
              leftSection={<IconLogin2 />}
              onClick={() => router.get(route("login"))}
            >
              Masuk
            </Button>

            <ActionIcon
              display={{
                base: "block",
                sm: "none",
              }}
              size={40}
              variant="outline"
              c="gray.9"
              onClick={() => router.get(route("login"))}
            >
              <IconLogin2 />
            </ActionIcon>
          </>
        )}
      </Flex>
    </SimpleGrid>
  );
};
