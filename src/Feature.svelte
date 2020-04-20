<script>
  import { tweened } from "svelte/motion";
  import { interpolateLab } from "d3-interpolate";
  import { hsl } from "d3-color";
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
    let newColor = hsl(initialColor);
    newColor.l -= 0.2;
    color.set(newColor);
  }}
  on:mouseout={() => {
    color.set(initialColor);
  }} 
/>