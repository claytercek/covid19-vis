<script>
  import {tooltipPosition, showTooltip, tooltipData} from "./Store.js"
  let width;

  $: left = ($tooltipPosition[0] + 20 > width - 160) ? $tooltipPosition[0] - 160 - 20 : $tooltipPosition[0] + 20;

</script>

<svelte:window bind:innerWidth={width}/>

<div class="tooltip {$showTooltip && "active"}" style="top:{$tooltipPosition[1]}px;left:{left}px">
  <h2>{$tooltipData.title}</h2>
  {#if $tooltipData.dat.length > 0}
    <table>
      {#each $tooltipData.dat as item}
      <tr>
        <td>{item.key}</td>
        <td>{item.val}</td>
      </tr>
      {/each}
    </table>
  {:else}
    <p>no data for this county</p>
  {/if}
</div>

<style>
  .tooltip {
    background-color: white;
    position: fixed;
    pointer-events: none;
    opacity: 0;
    width: 160px;
    padding: 16px;
    box-sizing: border-box;
  }

  .tooltip * {
    margin: 0;
  }

  .tooltip.active {
    opacity: 1;
  }

  h2 {
    font-size: 1rem;
  }

  td {
    border-top: 1px solid grey;
  }
</style>