import {
  ActionIcon,
  Avatar,
  Button,
  Flex,
  Image,
  SimpleGrid,
} from "@mantine/core";
import { IconChevronDown, IconLogin2, IconMenu2 } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { Drawer } from "@/Components/Drawer/index.jsx";
import { router } from "@inertiajs/react";

export const Header = ({ title,auth }) => {
  console.log(auth, 'Header')
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
          borderRadius: 8,
        },
      }}
      style={{
        zIndex: 4,
      }}
    >
      <Flex>
        <Drawer opened={opened} close={close} title={title} />

        <ActionIcon
          size={40}
          radius={8}
          variant="subtle"
          c="gray.9"
          // color={themeColor}
          onClick={open}
        >
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
        <Button
          px={20}
          h={40}   
          c="gray.9" 
          radius={8}
          leftSection={!auth.user && <IconLogin2 />}
          variant={!auth.user ? "outline" :"subtle"}
          // color={themeColor} 
          onClick={!auth.user && (() => router.get(route('login')))}
        >

          {!auth.user ? "Masuk Akun" : (<>  <Avatar size={28} />

<IconChevronDown /></>)}
        
        </Button>
      </Flex>
    </SimpleGrid>
  );
};
