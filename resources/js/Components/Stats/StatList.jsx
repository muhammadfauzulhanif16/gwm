import {
  IconApps,
  IconBriefcase2,
  IconPackages,
  IconPray,
  IconUsers,
} from "@tabler/icons-react";

export const StatList = (data) => [
  {
    label: "Warga",
    icon: <IconUsers />,
    totalData: data && data["citizens"],
    route: "citizens.index",
  },
  {
    label: "Pekerjaan",
    icon: <IconBriefcase2 />,
    totalData: data && data["jobs"],
    route: "jobs.index",
  },
  {
    label: "Konsumsi",
    icon: <IconPackages />,
    totalData: data && data["consumptions"],
    route: "consumptions.index",
  },
  {
    label: "Ibadah",
    icon: <IconPray />,
    totalData: data && data["prayers"],
    route: "prayers.index",
  },
  {
    label: "Media Sosial",
    icon: <IconApps />,
    totalData: data && data["socialMedias"],
    route: "social-medias.index",
  },
];
