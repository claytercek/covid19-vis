<script>
  import { tweened } from "svelte/motion";
  import { interpolateLab } from "d3-interpolate";
  import { hsl } from "d3-color";
  import { scalePow } from "d3-scale";
  import {tooltipPosition, showTooltip, tooltipData, data, date, type} from "./Store.js"
  export let featurePath;
  export let title;
  export let id;

  const defaultColor = "#EEEEEE"

  $: dat = ($data.entries[id] && $data.entries[id][$date]) ? $data.entries[id][$date] : null; 


  $: colorScale = (id) => {
    if (dat == null) {
      return defaultColor;
    }
    let scale = scalePow()
      .exponent(0.3)
      .domain($data.ranges[$date][$type])
      .range(["#feedde", "#fd8d3c"])
    return scale(dat[$type]);
  }

</script>


<path
  d={featurePath}
  class="feature"
  fill={colorScale(id)}
  on:mouseover={(e) => {
    showTooltip.set(true);
    tooltipPosition.set([e.clientX, e.clientY]);
    tooltipData.set({
      title: title,
      dat: dat !== null ? [
        {
          "key": "deaths",
          "val": dat.deaths
        },
        {
          "key": "cases",
          "val": dat.cases
        }
      ] : []
    })
  }}
  on:mousemove={(e) => {
    tooltipPosition.set([e.clientX, e.clientY]);
  }}
  on:mouseout={() => {
    showTooltip.set(false);
  }} 
/>

<style>
  path:hover {
    stroke: white;
    stroke-width: 2px;
  }
</style>