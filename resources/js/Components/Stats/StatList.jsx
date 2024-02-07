import {
  IconApps,
  IconBriefcase2,
  IconPackages,
  IconPray,
  IconUsers,
} from "@tabler/icons-react";
import { GetRandomColors } from "@/Utilities/GetRandomColors.js";

const colors = GetRandomColors(5);

export const StatList = (data) => [
  {
    label: "Warga",
    icon: <IconUsers />,
    totalData: data["citizens"],
    color: colors[0],
    route: "citizens.index",
  },
  {
    label: "Pekerjaan",
    icon: <IconBriefcase2 />,
    totalData: data["jobs"],
    color: colors[1],
    route: "jobs.index",
  },
  {
    label: "Konsumsi",
    icon: <IconPackages />,
    totalData: data["consumptions"],
    color: colors[2],
    route: "consumptions.index",
  },
  {
    label: "Ibadah",
    icon: <IconPray />,
    totalData: data['prayers'],
    color: colors[3],
    route: "prayers.index",
  },
  {
    label: "Media Sosial",
    icon: <IconApps />,
    totalData: data["socialMedias"],
    color: colors[4],
    route: "social-medias.index",
  },
];
