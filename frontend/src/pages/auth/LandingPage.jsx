// <!doctype html>
// <html lang="en">
// <head>
// 	<meta charset="UTF-8">
// 	<meta name="viewport" content="width=device-width, initial-scale=1.0">
// 	<meta name="description" content="EKA connects every document, decision and discovery into one intelligent space.">
// 	<title>EKA. | Enterprise knowledge, alive.</title>

// 	<!-- Google Fonts: Manrope, used as the site's sans-serif family. -->
// 	<link rel="preconnect" href="https://fonts.googleapis.com">
// 	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
// 	<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">

// 	<!-- Tailwind (CDN build) plus theme extensions: brand colors, custom shadows, and font family. -->
// 	<script src="https://cdn.tailwindcss.com"></script>
// 	<script>
// 		tailwind.config = {
// 			theme: {
// 				extend: {
// 					colors: {
// 						ink: '#102b3d',
// 						teal: '#0e9d92',
// 						paper: '#f4f9fb',
// 						muted: '#6f8390'
// 					},
// 					boxShadow: {
// 						button: '0 11px 22px rgba(12, 151, 140, 0.21)',
// 						soft: '0 12px 26px rgba(87, 147, 158, 0.12)'
// 					},
// 					fontFamily: {
// 						sans: ['Manrope', 'sans-serif']
// 					}
// 				}
// 			}
// 		}
// 	</script>

// 	<!-- Custom CSS for effects Tailwind can't express (glows, illustration, etc). -->
// 	<link rel="stylesheet" href="css/landing.css">
// </head>

// <body class="min-h-screen overflow-x-hidden bg-paper font-sans text-ink">

// 	<!-- Decorative background glows stay behind the page content. -->
// 	<div class="page-glow page-glow--mint" aria-hidden="true"></div>
// 	<div class="page-glow page-glow--lavender" aria-hidden="true"></div>

// 	<!-- Header combines the EKA brand, primary navigation, and account actions. -->
// 	<header class="relative z-10 mx-auto flex h-[70px] w-[calc(100%-36px)] items-center justify-between md:h-[88px] md:w-[min(1170px,calc(100%-64px))]">

// 		<!-- Brand mark + wordmark, linking home. -->
//    		<a class="inline-flex items-center gap-2.5 text-[21px] font-extrabold tracking-[-0.8px]" href="index.html" aria-label="EKA home">
//     		<img src="images/logoleft_top.jpeg" alt="EKA logo" class="h-9 w-9 object-contain rounded-md">
//     		<span>EKA<span class="text-teal">.</span></span>
// 		</a>

// 		<!-- Desktop navigation links. -->
// 		<nav class="ml-[78px] hidden gap-9 text-xs font-bold text-[#677b87] md:flex" aria-label="Main navigation">
// 			<a class="transition-colors hover:text-teal" href="#features">Features</a>
// 			<a class="transition-colors hover:text-teal" href="#how-it-works">How it works</a>
// 			<a class="transition-colors hover:text-teal" href="#security">Security</a>
// 		</nav>

// 		<!-- Account actions remain compact on small screens. -->
// 		<div class="flex items-center gap-4 text-xs font-extrabold md:gap-7">
// 			<a class="hidden transition-colors hover:text-teal md:inline" href="login.html">Log in</a>
// 			<a class="button inline-flex min-h-10 items-center justify-center gap-4 rounded-xl bg-teal px-3 text-[10px] font-extrabold text-white shadow-button transition hover:-translate-y-0.5 hover:bg-[#087f78] md:min-h-[45px] md:px-[19px] md:text-xs" href="register.html">
// 				Get started <span class="text-xl font-normal leading-none" aria-hidden="true">&#8594;</span>
// 			</a>
// 		</div>

// 	</header>

// 	<!-- Hero pairs the product message with the knowledge-layer illustration. -->
// 	<main class="relative z-10 mx-auto block w-[calc(100%-36px)] pt-[70px] md:grid md:min-h-[650px] md:w-[min(1170px,calc(100%-64px))] md:grid-cols-[51%_49%] md:items-center md:pt-[33px]" id="features">

// 		<!-- Left side: headline, explanation, calls to action, and trust signal. -->
// 		<section class="pb-0 md:pb-[34px]">

// 			<p class="mb-6 flex items-center gap-2.5 text-[11px] font-extrabold tracking-[1.35px] text-[#398b8e]">
// 				<span class="eyebrow-dot"></span>KNOWLEDGE IN MOTION
// 			</p>

// 			<h1 class="m-0 text-[clamp(42px,12vw,64px)] font-medium leading-[1.07] tracking-[-2.5px] md:text-[clamp(43px,5.2vw,72px)] md:tracking-[-4px]">
// 				Your company’s<br>
// 				<em class="font-bold not-italic text-teal">knowledge, alive.</em>
// 			</h1>

// 			<p class="my-[26px] max-w-[540px] text-sm leading-[1.7] text-muted md:mb-[30px] md:text-base md:leading-[1.85]">
// 				EKA connects every document, decision and discovery into one intelligent space — so your team can move with clarity.
// 			</p>

// 			<!-- Primary CTA + secondary "see it in action" link. -->
// 			<div class="flex flex-col items-start gap-[18px] md:flex-row md:items-center md:gap-6">
// 				<a class="inline-flex min-h-[46px] items-center justify-center gap-[19px] rounded-xl bg-teal px-[19px] text-xs font-extrabold text-white shadow-button transition hover:-translate-y-0.5 hover:bg-[#087f78]" href="register.html">
// 					Bring EKA to life <span class="text-xl font-normal leading-none" aria-hidden="true">&#8594;</span>
// 				</a>
// 				<a class="inline-flex items-center gap-3 text-xs font-extrabold text-[#4b6978]" href="#how-it-works">
// 					<span class="play-icon" aria-hidden="true">&#9656;</span>See the workspace
// 				</a>
// 			</div>

// 			<!-- Trust signal: overlapping avatars + supporting copy. -->
// 			<div class="mt-[34px] flex items-center gap-3 text-[9px] leading-[1.65] text-[#8b9ca5] md:mt-[53px]" aria-label="Trusted by curious teams across 12 countries">
// 				<div class="flex">
// 					<span class="avatar avatar--one">AM</span>
// 					<span class="avatar">JR</span>
// 					<span class="avatar avatar--three">SK</span>
// 					<span class="avatar avatar--four">+8</span>
// 				</div>
// 				<p class="m-0">Trusted by curious teams<br><strong class="text-[#4e6977]">across 12 countries</strong></p>
// 			</div>

// 		</section>

// 		<!-- Right side: illustration using custom CSS for orbit geometry and glass objects. -->
// 		<section class="hero-art relative mt-[22px] h-[390px] origin-top scale-[.7] md:mt-3 md:h-[510px] md:scale-100" id="how-it-works" aria-label="EKA intelligence layer visualization">

// 			<!-- Concentric orbit rings behind the central core. -->
// 			<div class="orbit orbit--one"></div>
// 			<div class="orbit orbit--two"></div>
// 			<div class="orbit orbit--three"></div>
// 			<div class="core-shadow"></div>

// 			<!-- Central "intelligence layer" card. -->
// 			<div class="core">
//     			<img src="images/logo_.jpeg" alt="EKA intelligence layer" class="core-gradient-img">
//     			<span class="core-label">EKA</span>
//     			<span class="core-subtitle">intelligence layer</span>
// 			</div>

// 			<!-- Floating glass cards referencing document context and Q&A. -->
// 			<div class="floating-card floating-card--docs">
// 				<span class="card-icon card-icon--mint" aria-hidden="true">&#9635;</span>
// 				<span><strong>42 documents</strong><small>all knowledge connected</small></span>
// 				<b>&#10003;</b>
// 			</div>
// 			<div class="floating-card floating-card--ask">
// 				<span class="card-icon card-icon--lilac" aria-hidden="true">&#9675;</span>
// 				<span><strong>Ask anything</strong><small>answers with context</small></span>
// 			</div>

// 		</section>

// 	</main>

// 	<!-- Small atmospheric accents echo the reference composition. -->
// 	<div class="ambient-dot ambient-dot--top" aria-hidden="true"></div>
// 	<div class="ambient-dot ambient-dot--middle" aria-hidden="true"></div>
// 	<div class="ambient-dot ambient-dot--bottom" aria-hidden="true"></div>

// 	<!-- Theme control remains available on larger screens. -->
// 	<button class="theme-toggle hidden md:block" type="button" aria-label="Toggle theme">&#9790;</button>

// </body>
// </html>