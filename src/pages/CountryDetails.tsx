import { Button, Grid, useTheme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { CountriesApi } from "../api/countries";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Loading from "../components/Loading";

const StyledMain = styled.main`
  .container {
    margin: 5rem auto;
    padding: 0 1rem;
  }

  .content {
    display: flex;
    align-items: center;
    margin-top: 4.5rem;
  }

  .flag-image-container {
    margin-right: 6.5rem;
  }

  .flag-image {
    display: block;
    /* width: auto; */
    height: auto;
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.5);
    max-width: 600px;
  }

  .country-details {
    flex: 1;
  }

  .flag-title {
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }

  .country-info {
    display: flex;
    align-items: flex-start;
    gap: 1rem;

    &__title {
      font-weight: bold;
    }

    &__value {
      font-weight: 300;
    }
    margin-bottom: 0.8rem;

    &--border-details {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .badges {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .border-country-badge {
    padding: 0.3rem 2rem;
    border-radius: 3px;
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.5);
  }

  @media screen and (max-width: 1275px) {
    .content {
      flex-direction: column;
      align-items: stretch;
      /* padding: 0 2rem; */
    }

    .flag-image-container {
      margin-bottom: 3rem;
      margin-right: 0;
      display: flex;
      justify-content: flex-start;
      align-self: stretch;
    }

    .culture-info {
      display: flex;
      flex-direction: column;
      /* align-items: flex-end; */
    }

    .flag-image {
      width: 80%;
      height: auto;
      max-width: 800px;
    }

    .flag-title {
      /* text-align: center; */
    }
  }

  @media screen and (max-width: 800px) {
    .flag-image {
      width: 100%;
      height: auto;
    }
  }

  @media screen and (max-width: 599px) {
    .content {
      padding: 0rem;
    }

    .country-details {
      align-self: flex-start;
    }

    .main-info {
      margin-bottom: 3.7rem;
    }

    .culture-info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .flag-title {
      text-align: left;
    }
  }
`;

const CountryDetails = () => {
  const { id } = useParams();

  const theme = useTheme();

  const textColor = theme.palette.text.primary;
  const paperColor = theme.palette.background.paper;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["country", id],
    queryFn: () => CountriesApi.getCountryByName(id || "algeria"),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <StyledMain
      style={{
        color: textColor,
        backgroundColor: "theme.palette.background.default",
        minHeight: "100vh",
      }}
    >
      <div className="container">
        <Link
          style={{
            backgroundColor: paperColor,
            color: textColor,
            // border: "1px solid black",
            borderRadius: "3px",
            boxShadow: "0px 0px 3px 0px rgba(0, 0, 0, 0.5)",
            padding: "0.5rem 3rem",
            textDecoration: "none",
          }}
          to="/"
        >
          Back
        </Link>
        {!isLoading && (
          <div className="content">
            <div className="flag-image-container">
              <img
                className="flag-image"
                alt={`${data?.name} flag`}
                src={data?.flag}
              />
            </div>
            <div className="country-details">
              <h2 className="flag-title">{data?.name}</h2>
              <Grid container style={{ marginBottom: "3.7rem" }} spacing={2}>
                <Grid item xs={12} sm={6} className="main-info">
                  <div className="country-info">
                    <p className="country-info__title">Native Name</p>
                    <p className="country-info__value">{data?.nativeName}</p>
                  </div>
                  <div className="country-info">
                    <p className="country-info__title">Population</p>
                    <p className="country-info__value">{data?.population}</p>
                  </div>
                  <div className="country-info">
                    <p className="country-info__title">Region</p>
                    <p className="country-info__value">{data?.region}</p>
                  </div>
                  <div className="country-info">
                    <p className="country-info__title">Sub Region</p>
                    <p className="country-info__value">{data?.subregion}</p>
                  </div>
                  <div className="country-info">
                    <p className="country-info__title">Captial</p>
                    <p className="country-info__value">{data?.capital}</p>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} className="culture-info">
                  <div className="country-info">
                    <p className="country-info__title">Top Level Domain</p>
                    <p className="country-info__value">
                      {data?.topLevelDomain}
                    </p>
                  </div>
                  <div className="country-info">
                    <p className="country-info__title">Currencies</p>
                    <p className="country-info__value">
                      {data?.currencies.join(", ")}
                    </p>
                  </div>
                  <div className="country-info">
                    <p className="country-info__title">Languages</p>
                    <p
                      className="country-info__value"
                      style={{ maxWidth: "200px" }}
                    >
                      {data?.languages.join(", ")}
                    </p>
                  </div>
                </Grid>
              </Grid>
              <div className="border-contries">
                <div className="country-info country-info--border-details">
                  <p className="country-info__title">Border Countries</p>
                  <div className="badges">
                    {data?.borderCountries.map((item) => (
                      <p
                        className="country-info__value border-country-badge"
                        key={item}
                        style={{
                          backgroundColor: paperColor,
                        }}
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </StyledMain>
  );
};

export default CountryDetails;
