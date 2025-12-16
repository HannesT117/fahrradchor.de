<script lang="ts">
	import CpcButtonLink from '$lib/components/CpcButtonLink.svelte';
	import CpcH2 from '$lib/components/CpcH2.svelte';
	import CpcParagraph from '$lib/components/CpcParagraph.svelte';
	import CpcAudio from '$lib/components/CpcAudio.svelte';
	import BgImage from '$lib/img/cpc_konzert_small.webp';
	import FriedemannImage from '$lib/img/friedemann.webp?enhanced';
	import SebImage from '$lib/img/seb.webp?enhanced';
	import TentsImage from '$lib/img/tents.webp?enhanced';

	const imageFiles = import.meta.glob('$lib/img/gallery/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}', {
		eager: true,
		query: {
			enhanced: true
		}
	});
	const imageModules = Object.entries(imageFiles).map(([, module]) => module.default as any);
	const chunkSize = 7;
	const imageGroups = imageModules.flatMap((x, i) =>
		i % chunkSize === 0 ? [imageModules.slice(i, i + chunkSize)] : []
	);
</script>

<svelte:head>
	<title>Collegium Pedale Cantorum - Der Fahrradchor</title>
	<meta
		name="description"
		content="Collegium Pedale Cantorum: Ein Fahrradchor mit vier- bis achtstimmiger Musik von Renaissance bis Jazz, unterwegs vor allem in Brandenburg, Mecklenburg-Vorpommern und Sachsen-Anhalt."
	/>
	<link rel="preload" fetchpriority="high" as="image" href={BgImage} type="image/webp" />
</svelte:head>

<div class="bg-choir -mt-20 mb-8 h-[88vh] w-full bg-cover bg-center">
	<h1 class="hidden">Collegium Pedale Cantorum</h1>
</div>

<div class="flex max-w-6xl flex-col gap-8 px-4 sm:px-6 md:px-8">
	<CpcH2>Der Fahrradchor mit vielseitigem Programm</CpcH2>
	<div>
		<enhanced:img
			class="rounded-xs object-contain md:float-right md:ml-8 md:w-2/5"
			src={TentsImage}
			alt="Eine Wiese voll Zelten mit der Sonne im Hintergrund"
		/>
		<CpcParagraph>
			Jedes Jahr im Sommer geht das Ensemble „Collegium Pedale Cantorum“ mit dem Fahrrad auf
			Chorreise. Matte, Schlafsack und Zelte sind dabei unverzichtbare Ausrüstung.
		</CpcParagraph>
		<CpcParagraph>
			Durch eine lebendige Moderation spricht das „Collegium Pedale Cantorum“ das Publikum ganz
			direkt an und begeistert für die Musik. Aus der Freude am Musizieren und Zuhören soll auch
			Freude für andere erwachsen. Das Ensemble sammelt daher jedes Jahr für gemeinnützige Projekte
			und bittet am Ausgang herzlich um die Spenden der Konzertbesucher:innen.
		</CpcParagraph>
		<CpcParagraph>
			Zum musikalischem Programm gehört vier- bis achtstimmige Chormusik von der Renaissancezeit bis
			zum Jazz. Ebenso wird Instrumentalmusik aus verschiedenen Musikepochen für unterschiedliche
			Besetzungen dargeboten. Derzeit umfasst das Ensemble 20 bis 25 Sängerinnen und Sänger. Die
			Mitglieder des Chores haben professionell mit Musik zu tun oder betreiben sie als
			anspruchsvolles Hobby.
		</CpcParagraph>
	</div>

	<div>
		<h3 class="mb-4 text-3xl">Der Dirigent</h3>
		<div class="relative">
			<enhanced:img
				class="rounded-sm object-cover md:h-80 md:w-1/2"
				src={FriedemannImage}
				alt="Friedemann Lessing beim Dirigieren"
			/>
			<div class="mt-4 md:absolute md:top-0 md:mt-0 md:ml-[40%] md:flex md:h-full md:items-center">
				<div class="rounded-sm md:bg-white md:p-8 md:pl-16 md:drop-shadow-xl md:dark:text-black">
					<CpcParagraph>
						Kreiskantor Friedemann Lessing aus Osterburg hat das Ensemble 1986 ins Leben gerufen und
						ist seitdem Leiter des Collegium Pedale Cantorums.
					</CpcParagraph>
					<CpcParagraph>
						Im Podcast <a
							class="text-cpc-900 hover:text-cpcAnalog-500 hover:underline"
							target="_blank"
							href="https://www.deutschlandfunkkultur.de/per-fahrrad-auf-chorreise-das-bewegte-collegium-pedale-cantorum-100.html"
							>"Chormusik" (Deutschlandfunk)</a
						>
						spricht er über das Projekt.
					</CpcParagraph>

					<CpcAudio
						src="https://download.deutschlandfunk.de/file/dradio/2025/07/30/per_fahrrad_auf_chorreise_das_bewegte_collegium_pedale_drk_20250730_0005_c0b86b82.mp3#t=00:04:04"
					/>
				</div>
			</div>
		</div>
	</div>

	<div>
		<div>
			<h3 class="mb-4 text-3xl">Die Konzertreise</h3>
			<div>
				<CpcParagraph>Mit neuem Programm geht es jedes Jahr im Sommer auf Tour.</CpcParagraph>

				<div class="gap-6 md:flex md:flex-row-reverse">
					<div class="md:float-right md:max-w-96 md:overflow-hidden">
						<enhanced:img
							class="max-h-full min-w-full rounded-sm md:min-h-full md:object-cover md:object-right"
							src={SebImage}
							alt="Ein Fahrrad fahrendes CPC-Mitglied auf einem ländlichen Radweg von hinten"
						/>
					</div>
					<div class="mt-4 h-fit grid-flow-row grid-cols-2 gap-4 md:flex-1 lg:grid">
						<div>
							<h4 class="mb-2 text-xl">Die Route</h4>
							<CpcParagraph>
								Unsere Reise führt uns durch verschiedene Regionen Ostdeutschlands. Der Chor fährt
								die Strecke zwischen den Konzertorten mit dem Fahrrad, zwischen 20 bis 60 Kilometer
								pro Tag.
							</CpcParagraph>
						</div>

						<div>
							<h4 class="mb-2 text-xl">Das Programm</h4>
							<CpcParagraph>
								Jedes Jahr im Frühjahr trifft sich der Chor, über das Sommerprogramm abzustimmen.
								Auf unserer Tour singen wir ein buntes Programm, von Altmeistern der Rennaisance
								über Volkslieder und Gospels bis hin zu Popsongs.
							</CpcParagraph>
						</div>

						<div>
							<h4 class="mb-2 text-xl">Der Rahmen</h4>
							<CpcParagraph>
								Der Eintritt zu den Konzerten ist frei. Die Chormitglieder nehmen sich für die Tour
								Urlaub von ihrer Arbeit und finanzieren die Reise selbst. Für einen guten Zweck
								bitten wir am Ende des Konzerts um eine Spende für <a
									class="text-cpc-900 hover:text-cpcAnalog-500 hover:underline"
									target="_blank"
									href="https://www.german-doctors.de/">German Doctors</a
								>.
							</CpcParagraph>
						</div>

						<div>
							<h4 class="mb-2 text-xl">Die Termine</h4>
							<CpcParagraph
								>2025 tourten wir vom 26. Juli bis 2. August in der Altmark. Die einzelnen Daten der
								Konzerte sind in unserem Kalender zu finden.</CpcParagraph
							>
							<CpcButtonLink href="/konzerte">Zum Kalender</CpcButtonLink>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div>
		<h3 class="mb-4 text-3xl">Impressionen</h3>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
			{#each imageGroups as imageGroup}
				<div class="grid gap-4">
					{#each imageGroup as image}
						<enhanced:img class="h-auto rounded-lg object-cover" src={image} />
					{/each}
				</div>
			{/each}
		</div>
	</div>
</div>
