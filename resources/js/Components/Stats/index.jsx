import {
  Box,
  Button,
  Grid,
  Group,
  NumberFormatter,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { StatList } from "@/Components/Stats/StatList.jsx";
import { GridCol } from "@/Components/Stats/styled/GridCol.js";
import { router } from "@inertiajs/react";

export const Stats = ({ data }) => {
  return (
    <Grid
      grow
      gutter={0}
      bg="gray.0"
      style={{
        borderRadius: 8,
      }}
    >
      {StatList(data).map(({ label, icon, totalData, color, route: r }, id) => (
        <GridCol
          id={id}
          length={StatList.length}
          key={id}
          radius={8}
          span={{ base: 12, xs: 6, sm: 4, md: 3, lg: 2 }}
        >
          <Group style={{ flexGrow: 1 }} p={20} gap={20}>
            <ThemeIcon size={40} radius={8} variant="light" color={color}>
              {icon}
            </ThemeIcon>

            <Box>
              <Text fw={500} c="gray.6">
                Total {label}
              </Text>

              <Text fz={24} c="gray.8" fw={700}>
                <NumberFormatter value={totalData} thousandSeparator />
              </Text>
            </Box>
          </Group>

          <Button
            color={color}
            variant="subtle"
            radius={8}
            h={40}
            onClick={() => router.get(route(r))}
          >
            Lihat Semua
          </Button>
        </GridCol>
      ))}
    </Grid>
  );
};
