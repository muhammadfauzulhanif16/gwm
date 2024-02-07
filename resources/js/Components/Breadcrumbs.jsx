import { router } from "@inertiajs/react";
import { Button, Group, ThemeIcon } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

export const Breadcrumbs = ({ items }) => {
    const renderItems = (items) =>
        items.map(({ label, route: r, items: nestedItems }, index, array) => (
            <Group key={label} gap={0}>
                <Button
                    size="xs"
                    color="red.5"
                    radius="xl"
                    variant="subtle"
                    onClick={() => router.get(route(r))}
                >
                    {label}
                </Button>

                {index !== array.length - 1 && (
                    <ThemeIcon color="gray.2" c="gray.7" size="xs">
                        <IconChevronRight />
                    </ThemeIcon>
                )}

                {nestedItems && (
                    <Group gap={0}>{renderItems(nestedItems)}</Group>
                )}
            </Group>
        ));

    return <Group gap={0}>{renderItems(items)}</Group>;
};
