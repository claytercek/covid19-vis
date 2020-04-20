<script>
  import { geoAlbersUsa, geoPath } from "d3-geo";
  import { scaleLinear } from "d3-scale";
  import { extent } from "d3-array";
  import { onMount } from "svelte";
  import { feature, mesh } from "topojson";
  import Feature from "./Feature.svelte";
  import json from "./counties.js";

  const path = geoPath();


  const data = feature(json, json.objects.counties);
  const states = mesh(json, json.objects.states, (a, b) => a !== b);
  const namesExtent = extent(data.features, d => d.properties.name.length);
  const colorScale = scaleLinear()
    .domain(namesExtent)
    .range(["#feedde", "#fd8d3c"]);


</script>

<style>
  svg {
    width: 100%;
  }
</style>

<svg width="960" height="auto" viewBox="0 0 975 610">
  <g>
    {#each data.features as feature}
      <Feature 
        featurePath={path(feature)} 
        initialColor={colorScale(feature.properties.name.length)} />
    {/each}
  </g>
  <path 
    d={path(states)} 
    fill="none"
    stroke="white"
    stroke-linejoin="round"
    stroke-width="2" />
</svg>
