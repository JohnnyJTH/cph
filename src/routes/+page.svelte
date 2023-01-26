<script lang="ts">
	import { Badge, Card, Indicator, Li, List, P, Spinner, TabItem, Tabs } from 'flowbite-svelte';
	import { getDepartures } from '../services/departures';
	import { statusToData } from '../services/constants';
	import type { Departure } from '../services/interfaces';

    let width = 0;

	let departuresLoading: boolean = true;
	let departures: Departure[] = [];

	getDepartures().then((data) => {
		departures = data;
		departuresLoading = false;
	});
</script>

<svelte:window bind:innerWidth={width} />

<Tabs>
	<TabItem title="Departures" open>
		{#if departuresLoading}
			<Spinner />
		{:else if departures.length === 0}
			<P>No departures found</P>
		{:else}
			<List list="none" ulClass="w-full">
				{#each departures as departure}
					{@const status = statusToData[departure.StatusClass]}
					<Li class="pb-3 sm:pb-4">
						<div class="bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-lg border align-baseline border-gray-200 dark:border-gray-700 shadow-md flex flex-row space-x-8 items-center p-4 sm:p-6">
							{#if departure.Delayed}
								<div>
									<P size="lg" class="line-through">{departure.Time}</P>
									<P size="lg" weight="bold">{departure.ExpectedTime}</P>
								</div>
							{:else}
								<P size="lg" weight="bold">{departure.Time}</P>
							{/if}
                            {#if width > 566}
							<div class="flex-1">
								<P size="lg" weight="bold">{departure.DestinationName}</P>
								<P>{departure.Iata}</P>
							</div>
							<P size="lg" class="inline-flex items-center">{departure.Airline}</P>
                            {:else}
                            <div class="flex-1">
								<P weight="bold">{departure.Destination}</P>
								<P size="sm">{departure.Iata}</P>
								<P>{departure.AirlineMobile}</P>
							</div>
                            {/if}
                            <Badge large color={status["color"]} rounded class="px-2.5 py-0.5"><Indicator color={status["color"]} size="xs" class="mr-1"/>{status["name"]}</Badge>
                        </div>
					</Li>
				{/each}
			</List>
		{/if}
	</TabItem>
	<TabItem title="Arrivals">
		<P>This feature is </P><Badge large color="blue" weight="bold">coming soon</Badge>
	</TabItem>
</Tabs>
