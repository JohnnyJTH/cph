<script lang="ts">
	import { Badge, Indicator, Li, List, P, Spinner, TabItem, Tabs } from "flowbite-svelte";
	import { getDepartures } from "../services/departures";
	import { statusToData } from "../services/constants";
	import type { Departure } from "../services/interfaces";

    let departuresLoading: boolean = true;
    let departures: Departure[] = [];

    getDepartures().then((data) => {
        departures = data;
        departuresLoading = false;
    });
</script>

<Tabs>
    <TabItem title="Departures" open>
        {#if departuresLoading}
            <Spinner />
        {:else if departures.length === 0}
            <P>No departures found</P>
        {:else}
            <List list="none">
                {#each departures as departure}
                    {@const status = statusToData[departure.StatusClass]}
                    <Li class="pb-3 sm:pb-4">
                        <Badge color={status["color"]} rounded class="px-2.5 py-0.5"><Indicator color={status["color"]} size="xs" class="mr-1"/>{status["name"]}</Badge>
                    </Li>
                {/each}
            </List>
        {/if}
    </TabItem>
    <TabItem title="Arrivals">
        <List>
            <Li>Arrival One</Li>
            <Li>Arrival Two</Li>
        </List>
    </TabItem>
</Tabs>