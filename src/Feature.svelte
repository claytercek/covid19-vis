<script>
  import { tweened } from "svelte/motion";
  import { interpolateLab } from "d3-interpolate";
  import { rgb } from "d3-color";
  export let featurePath;
  export let initialColor;

  const color = tweened(initialColor, {
    duration: 100,
    interpolate: interpolateLab
  });
</script>


<path
  d={featurePath}
  class="feature"
  fill={$color}
  on:mouseover={() => {
    color.set(rgb(initialColor).brighter(0.3));
  }}
  on:mouseout={() => {
    color.set(initialColor);
  }} 
/>