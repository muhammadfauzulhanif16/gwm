import "./bootstrap";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "mantine-react-table/styles.css";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { GetRandomColors } from "@/Utilities/GetRandomColors.js";
import { ModalsProvider } from "@mantine/modals";

const appName = import.meta.env.VITE_APP_NAME || "Geolokasi Warga Muhammadiyah";

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob("./Pages/**/*.jsx"),
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <MantineProvider
        theme={{
          autoContrast: true,
          defaultRadius: 8,
          primaryColor: GetRandomColors(1)[0],
        }}
      >
        <Notifications position="top-center" />

        <ModalsProvider>
          <App {...props} />
        </ModalsProvider>
      </MantineProvider>,
    );
  },
  progress: {
    color: "#4B5563",
  },
});
