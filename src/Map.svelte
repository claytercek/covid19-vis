<script>
  import { geoAlbersUsa, geoPath } from "d3-geo";
  import { scaleLinear } from "d3-scale";
  import { extent } from "d3-array";
  import { onMount } from "svelte";
  import { feature, mesh } from "topojson";
  import Feature from "./Feature.svelte";
  import json from "./counties.js";

  const width = "960";
  const height = "500";
  const path = geoPath();

  let colorScale = () => {};

  const data = feature(json, json.objects.counties);
  const states = mesh(json, json.objects.states, (a, b) => a !== b);
  console.log(states);
  const namesExtent = extent(data.features, d => d.properties.name.length);
  colorScale = scaleLinear()
    .domain(namesExtent)
    .range(["#feedde", "#fd8d3c"]);

</script>

<style>
  /* svg {
    width: 960px;
    height: 620px;
    background-color: "#eeeeee";
  } */
</style>

<svg width="960" height="620">
  <g>
    {#each data.features as feature}
      <path 
        d={path(feature)} 
        fill={colorScale(feature.properties.name.length)} />
    {/each}
  </g>
  <path 
    d={path(states)} 
    fill="none"
    stroke="white"
    stroke-linejoin="round"
    stroke-width="2" />
</svg>
