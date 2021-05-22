<script>
 export let pos, turn, opacity = 1;
</script>

<circle
    r=0.45 stroke="none"
    cx="{pos.x}"
    cy="{pos.y}"
    fill="{turn}"
    {opacity}
/>
