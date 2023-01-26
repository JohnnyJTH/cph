<script lang="ts">
	import { Badge, Card, Indicator, Li, List, P, Spinner, TabItem, Tabs } from 'flowbite-svelte';
	import { getDepartures } from '../services/departures';
	import { statusToData } from '../services/constants';
	import type { Departure } from '../services/interfaces';

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
			<List list="none" ulClass="w-full">
				{#each departures as departure}
					{@const status = statusToData[departure.StatusClass]}
					<Li class="pb-3 sm:pb-4">
						<div class="bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-lg border align-baseline border-gray-200 dark:border-gray-700 shadow-md flex flex-row space-x-8 items-center p-4 sm:p-6">
							<div>
								<div>
									{departure.Time}
								</div>

								<div>
									{departure.ExpectedTime}
								</div>
							</div>
							<div class="flex-1">
								{departure.Destination}
							</div>
							<div class="inline-flex items-center">
								{departure.Airline}
							</div>
							<!-- <Badge color={status["color"]} rounded class="px-2.5 py-0.5"><Indicator color={status["color"]} size="xs" class="mr-1"/>{status["name"]}</Badge> -->
						</div>
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

<style>
	.custom-grid {
		grid-template-rows: 1fr 2fr;
	}
</style>
