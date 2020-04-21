<script>
  import { onMount } from "svelte";
  import { geoPath } from "d3-geo";
  import { feature, mesh } from "topojson";
  import Feature from "./Feature.svelte";
  import json from "./counties.js";
  import {data, date, type, fetchData} from "./Store.js"

  const path = geoPath();
  const counties = feature(json, json.objects.counties);
  const states = mesh(json, json.objects.states, (a, b) => a !== b);

  onMount(() => {
    fetchData();
  })


</script>

<style>
  svg {
    width: 100%;
  }
</style>

<h1>test {$data.ranges[$date].deaths}</h1>

<svg width="960" height="auto" viewBox="0 0 975 610">
  <g>
    {#each counties.features as feature (feature.id)}
      <Feature 
        featurePath={path(feature)} 
        title={feature.properties.name}
        id={feature.id} />
    {/each}
  </g>
  <path 
    d={path(states)} 
    fill="none"
    style="pointer-events:none;"
    stroke="white"
    stroke-linejoin="round"
    stroke-width="1px" />
</svg>