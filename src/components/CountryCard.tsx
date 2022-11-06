import { Card, CardMedia, CardContent, useTheme } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ICountry } from "../types";

interface Props {
  country: ICountry;
}

const StyledCard = styled.article`
  .country-info {
    display: flex;
    gap: 1rem;

    &__title {
      font-weight: bold;
    }

    &__value {
      font-weight: 300;
    }
    margin-bottom: 1rem;
  }
`;

const CountryCard: React.FC<Props> = ({ country }: Props) => {
  const theme = useTheme();

  return (
    <StyledCard>
      <Link
        className="country-link"
        key={country.alpha2Code}
        to={`/${country.name}`}
      >
        <Card
          sx={{
            height: "100%",
            "& .MuiCardContent-root": {
              paddingTop: 0,
            },
            maxWidth: 270,
            color: "theme.palette.text.primary,",
          }}
        >
          <CardMedia
            component="img"
            image={country.flag}
            alt={`${country.name} flag`}
            sx={{
              boxShadow:
                "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12);",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          />
          <CardContent>
            <h2>{country.name}</h2>
            <div className="country-info">
              <div className="country-info__title">Population</div>
              <div className="country-info__value">{country.population}</div>
            </div>
            <div className="country-info">
              <div className="country-info__title">Region</div>
              <div className="country-info__value">{country.region}</div>
            </div>
            <div className="country-info">
              <div className="country-info__title">Capital</div>
              <div className="country-info__value">{country.capital}</div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </StyledCard>
  );
};

export default CountryCard;
