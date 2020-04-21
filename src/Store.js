import { geoAlbersUsa, geoPath } from "d3-geo";
import { extent } from "d3-array";
import { csvParse } from "d3-dsv";
import { csv, descending, max, min } from 'd3';
import { nest } from 'd3-collection';
import { feature, mesh } from "topojson";
import Feature from "./Feature.svelte";
import { onMount } from "svelte";
import { writable, derived } from 'svelte/store';


export const fetchData = () => {
  csv('https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv', (d) => {
    return {
      date: d.date,
      county: d.county,
      state: d.state,
      fips: d.fips,
      cases: +d.cases,
      deaths: +d.deaths
    }
  }).then(function(d) {
    d.map((entry) => {
      if (entry.county === "New York City") {
        entry.fips = "98765";
      }
      return entry;
    })
    let entries = nest()
      .key(function(d) { return d.fips; })
      .key(function(d) { return d.date; })
      .rollup(function(v) { return v[0]; })
      .object(d);

      console.log(entries["98765"])

    let ranges = nest()
      .key(function(d) { return d.date; })
      .rollup(function(v) {
        return {
          deaths: extent(v, function(d) { return d.deaths; }),
          cases: extent(v, function(d) { return d.cases; }),
        }
      })
      .object(d)

    data.set({
      entries,
      ranges
    })

    latest.set(d[d.length - 1].date);
    date.set(d[d.length - 1].date);
  });
};

// ALL DATA
export const data = writable({
  entries: {
  },
  ranges: {
    "": {
      "deaths": [0, 0],
      "cases": [0, 0]
    }
  },
});

export const latest = writable(""); // latest date

// current vars
export const date = writable("");
export const type = writable("cases");
