import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import styled from "styled-components";
import { CountriesApi } from "../api/countries";
import CountriesList from "../components/CountriesList";
import { ICountry } from "../types";
import SearchIcon from "@mui/icons-material/Search";
import Loading from "../components/Loading";

const StyledApp = styled.div`
  margin-bottom: 4rem;

  .header {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding: 2rem 1rem;

    @media screen and (max-width: 800px) {
      flex-direction: column;
      gap: 1rem;
    }
  }

  .countries-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
    row-gap: 6.5rem;
    column-gap: 3rem;
    margin: auto;
    padding: 0 1rem;
    /* gap: 3rem; */

    @media screen and (max-width: 575px) {
      grid-template-columns: 270px;
      justify-content: center;
    }
  }

  h2 {
    font-size: 1.1rem;
    margin: 2rem 0;
  }

  .country-link {
    text-decoration: none;
  }
`;

const Countries = () => {
  const [regionFilter, setRegionFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");

  const theme = useTheme();

  const { isLoading, data } = useQuery({
    queryKey: ["countries", regionFilter, countryFilter],
    queryFn: () => CountriesApi.getCountries(regionFilter),
    select: (data) => CountriesApi.filterCountries(data, countryFilter),
    refetchOnWindowFocus: false,
  });

  const countries = data as ICountry[];

  const defaultColor = theme.palette.background.default;
  const textColor = theme.palette.text.primary;
  const inputColor = theme.palette.secondary.main;
  const smallScreenWidth = theme.breakpoints.down("md");

  return (
    <StyledApp
      className="App"
      style={{ backgroundColor: theme.palette.background.default }}
    >
      <div className="header container">
        <TextField
          type="search"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ color: inputColor }} />
              </InputAdornment>
            ),
            sx: {
              color: textColor,
              backgroundColor: defaultColor,
              boxShadow: "0 px 0 rgba(0,0,0, 0.5)",
              width: "100",

              paddingLeft: "1rem",
              [smallScreenWidth]: {
                width: "100%",
              },
            },
          }}
          sx={{
            alignSelf: "stretch",
          }}
          onChange={(e) => setCountryFilter(e.target.value)}
          value={countryFilter}
          placeholder="Search for a country..."
        />

        <FormControl sx={{ m: 1, minWidth: 250 }}>
          <InputLabel
            id="demo-simple-select-label"
            style={{ color: textColor }}
          >
            Filter by region
          </InputLabel>
          <Select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value ?? "")}
            inputProps={{ "aria-label": "filter countries by region" }}
            labelId="demo-simple-select-label"
          >
            <MenuItem key={-1} value="">
              None
            </MenuItem>
            {CountriesApi.regions.map((item) => (
              <MenuItem key={item.id} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <main>
        {!isLoading && <CountriesList countries={countries} />}{" "}
        {isLoading && <Loading />}
      </main>
    </StyledApp>
  );
};

export default Countries;
