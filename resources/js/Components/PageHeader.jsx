import { Box, Group, Text, Title } from "@mantine/core";

export const PageHeader = ({ title, description, actions }) => {
  return (
    <Group justify="space-between">
      {/*{props.breadcrumbs && <Breadcrumbs items={props.breadcrumbs} />}*/}

      <Box>
        <Title c="gray.9" size={32}>
          {title}
        </Title>

        <Text fw={500} c="gray.7">
          {description}
        </Text>
      </Box>

      {actions}
      {/*<Divider my={32} />*/}
    </Group>
  );
};
