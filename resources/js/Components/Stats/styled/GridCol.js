import styled from "styled-components";
import { Grid } from "@mantine/core";

export const GridCol = styled(Grid.Col)`
    display: flex;
    flex-direction: column;
    border-right: ${(props) =>
        props.id !== props.length - 1 ? "1px solid #ddd !important" : "none"};
    border-bottom: 1px solid #ddd !important;

    @media (max-width: 576px) {
        /* targeting base (12 columns) */
        border-right: none !important;
        border-bottom: 1px solid #ddd !important;
    }

    @media (min-width: 577px) and (max-width: 768px) {
        /* targeting xs (6 columns) */
        border-right: ${(props) =>
            props.id % 2 !== 0 ? "1px solid #ddd !important" : "none"};
        border-bottom: 1px solid #ddd !important;
    }

    @media (min-width: 769px) and (max-width: 992px) {
        /* targeting sm (4 columns) */
        border-right: ${(props) =>
            props.id % 3 !== 0 ? "1px solid #ddd !important" : "none"};
        border-bottom: 1px solid #ddd !important;
    }

    @media (min-width: 993px) and (max-width: 1200px) {
        /* targeting md (3 columns) */
        border-right: ${(props) =>
            props.id % 3 !== 0 ? "1px solid #ddd !important" : "none"};
        border-bottom: 1px solid #ddd !important;
    }

    @media (min-width: 1201px) {
        /* targeting lg (2 columns) */
        border-right: ${(props) =>
            props.id !== props.length - 1
                ? "1px solid #ddd !important"
                : "none"};
        border-bottom: none !important;
    }
`;
