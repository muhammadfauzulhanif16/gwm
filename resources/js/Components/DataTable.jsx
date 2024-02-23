import { MantineReactTable, useMantineReactTable } from "mantine-react-table";

export const DataTable = (props) => (
  <MantineReactTable
    table={useMantineReactTable({
      ...props,
      positionActionsColumn: "last",
      displayColumnDefOptions: {
        "mrt-row-actions": {
          header: "Aksi",
        },
      },
      enableRowNumbers: true,
      // enableRowActions: true,
      enableStickyHeader: true,
      enableStickyFooter: true,
      mantinePaperProps: {
        style: {
          borderRadius: 8,
          minHeight: "100vh",
          // flexGrow: 1,
          flexDirection: "column",
          display: "flex",
          backgroundColor: "#F8F9FA",
          boxShadow: "none",
        },
      },
      mantineTopToolbarProps: {
        style: {
          backgroundColor: "transparent",
        },
      },
      mantineTableContainerProps: {
        style: {
          backgroundColor: "transparent",
          flexGrow: 1,
          // maxHeight: "500px",
          // overflow: "scroll",
        },
      },
      mantineBottomToolbarProps: {
        style: {
          backgroundColor: "transparent",
        },
      },
      // renderRowActions: (row) => {
      //   console.log(row);
      // },
    })}
  />
);
