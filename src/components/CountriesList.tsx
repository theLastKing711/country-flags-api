import { Card, CardMedia, CardContent } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ICountry } from "../types";
import CountryCard from "./CountryCard";

const StyledList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  row-gap: 6.5rem;
  column-gap: 3rem;
  margin: auto;
  padding: 0 1rem;

  @media screen and (max-width: 575px) {
    grid-template-columns: 270px;
    justify-content: center;
  }
`;

interface Props {
  countries: ICountry[];
}

const CountriesList: React.FC<Props> = ({ countries }: Props) => {
  return (
    <StyledList className="countries-list container">
      {countries.map((country) => (
        <CountryCard country={country} key={country.name} />
      ))}
    </StyledList>
  );
};

export default CountriesList;
