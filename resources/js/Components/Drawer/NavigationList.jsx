import {
  IconApps,
  IconBriefcase2,
  IconHome2,
  IconPackages,
  IconPray,
  IconUsers,
} from "@tabler/icons-react";

export const NavigationList = [
  { label: "Beranda", route: "home", icon: <IconHome2 /> },
  { label: "Warga", route: "citizens.index", icon: <IconUsers /> },
  { label: "Pekerjaan", route: "jobs.index", icon: <IconBriefcase2 /> },
  { label: "Konsumsi", route: "consumptions.index", icon: <IconPackages /> },
  { label: "Ibadah", route: "prayers.index", icon: <IconPray /> },
  { label: "Media Sosial", route: "social-medias.index", icon: <IconApps /> },
];
