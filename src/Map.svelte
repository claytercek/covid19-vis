<script>
  import { onMount } from "svelte";
  import { geoPath } from "d3-geo";
  import { feature, mesh } from "topojson";
  import Feature from "./Feature.svelte";
  import json from "./counties.js";
  import { scalePow } from "d3-scale";
  import {data, date, type, fetchData} from "./Store.js"

  const defaultColor = "#EEEEEE"
  const path = geoPath();
  const counties = feature(json, json.objects.counties);
  const states = mesh(json, json.objects.states, (a, b) => a !== b);

  onMount(() => {
    fetchData();
  })

  $: colorScale = (id) => {
    if ($data.entries[id] == null || $data.entries[id][$date] == null) {
      return defaultColor;
    }
    let scale = scalePow()
      .exponent(0.3)
      .domain($data.ranges[$date][$type])
      .range(["#feedde", "#fd8d3c"])
    return scale($data.entries[id][$date][$type]);
  }

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
        initialColor={colorScale(feature.id)}/>
    {/each}
  </g>
  <path 
    d={path(states)} 
    fill="none"
    stroke="white"
    stroke-linejoin="round"
    stroke-width="2" />
</svg>
