<script>
	import CpcButtonLink from '$lib/components/CpcButtonLink.svelte';
	import CpcH2 from '$lib/components/CpcH2.svelte';
	import CpcParagraph from '$lib/components/CpcParagraph.svelte';
</script>

<svelte:head>
	<title>Collegium Pedale Cantorum - Der Fahrradchor</title>
	<meta
		name="description"
		content="Collegium Pedale Cantorum: Ein Fahrradchor mit vier- bis achtstimmiger Musik von Renaissance bis Jazz, unterwegs vor allem in Brandenburg, Mecklenburg-Vorpommern und Sachsen-Anhalt."
	/>
</svelte:head>

<div class="-mt-20 mb-8 h-[88vh] w-full bg-choir bg-cover bg-center">
	<div class="flex h-full w-full flex-col justify-center p-8 lg:items-center">
		<h1 class="mb-4 text-6xl font-bold text-cpc-500">Collegium Pedale Cantorum</h1>
		<CpcButtonLink href="/konzerte/biesenthal-2025"
			>Zu unserem Winterkonzert am 1. Februar 2025</CpcButtonLink
		>
	</div>
</div>

<div class="flex max-w-6xl flex-col gap-8 px-4 sm:px-6 md:px-8">
	<CpcH2>Der Fahrradchor mit vielseitigem Programm</CpcH2>
	<div>
		<img
			class="rounded-sm object-contain md:float-right md:ml-8 md:w-2/5"
			src="/img/tents.webp"
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
			<img
				class="rounded object-cover md:h-80 md:w-1/2"
				src="/img/friedemann.webp"
				alt="Friedemann Lessing beim Dirigieren"
			/>
			<div
				class="mt-4 rounded md:absolute md:bottom-1/4 md:ml-[40%] md:mt-0 md:bg-white md:p-8 md:pl-16 md:drop-shadow-xl"
			>
				<CpcParagraph>
					Kreiskantor Friedemann Lessing aus Osterburg hat das Ensemble 1986 ins Leben gerufen und
					ist seitdem Leiter des Collegium Pedale Cantorums.
				</CpcParagraph>
			</div>
		</div>
	</div>

	<div>
		<h3 class="mb-4 text-3xl">Die Konzertreise</h3>
		<div>
			<CpcParagraph>Mit neuem Programm geht es jedes Jahr durch Ostdeutschland.</CpcParagraph>

			<div class="gap-6 md:flex md:flex-row-reverse">
				<div class="md:float-right md:max-w-96 md:overflow-hidden">
					<img
						class="max-h-full min-w-full rounded md:min-h-full md:object-cover md:object-right"
						src="/img/seb.webp"
						alt="Ein Fahrrad fahrendes CPC-Mitglied auf einem ländlichen Radweg von hinten"
					/>
				</div>
				<div class="mt-4 h-fit grid-flow-row grid-cols-2 gap-4 md:flex-1 lg:grid">
					<div>
						<h4 class="mb-2 text-xl">Die Route</h4>
						<CpcParagraph>
							2025 touren wir vom 27. Juli bis 02. August voraussichtlich in der Altmark – die
							genauen Orte reichen wir nach. 2024 führte uns die Reise von Jänschwalde über
							Storkow/Mark und andere bis nach Kolkwitz.
						</CpcParagraph>
					</div>

					<div>
						<h4 class="mb-2 text-xl">Das Programm</h4>
						<CpcParagraph>
							Im Gepäck haben wir ein jährlich angepasstes Programm, unter anderem mit Motetten von
							Heinrich Schütz, Henry Purcell, Albert Becker, Ola Gjeilo, Melissa Dunphy, Burkhart M.
							Schürmann sowie alten und neuen Volksliedsätzen.
						</CpcParagraph>
					</div>

					<div>
						<h4 class="mb-2 text-xl">Der Rahmen</h4>
						<CpcParagraph>
							Der Eintritt zu den Konzerten ist frei. Am Ausgang wird um eine Spende für German
							Doctors gebeten.
						</CpcParagraph>
					</div>

					<div>
						<h4 class="mb-2 text-xl">Die Termine</h4>
						<CpcParagraph
							>Die einzelnen Daten der Konzerte sind in unserem Kalender zu finden.</CpcParagraph
						>
						<CpcButtonLink href="/konzerte">Zum Kalender</CpcButtonLink>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
