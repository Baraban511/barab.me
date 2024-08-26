import IconChevronRight from "https://deno.land/x/tabler_icons_tsx@0.0.6/tsx/chevron-right.tsx";
import IconBrandSvelte from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-svelte.tsx";
import IconBrandVite from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-vite.tsx";
import IconDatabase from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/database.tsx";
import IconCalendarCode from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/calendar-code.tsx";
import LemonIcon from "https://deno.land/x/tabler_icons_tsx@0.0.6/tsx/lemon-2.tsx";
import IconBrandReact from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-react.tsx";
import IconBrandVercel from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-vercel.tsx";
import IconBrandTailwind from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-tailwind.tsx";
import IconBrandNodejs from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-nodejs.tsx";
import IconBrandBulma from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-bulma.tsx";
import IconBrandGithubCopilot from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-github-copilot.tsx";
import IconBrandJavascript from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-javascript.tsx";
import IconBrandHtml5 from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-html5.tsx";
import IconBrandNpm from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-npm.tsx";
import IconBrandSpotify from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-spotify.tsx";
import IconBrandVscode from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-vscode.tsx";
import IconBrandTypescript from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-typescript.tsx";
import IconBrandDebian from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-debian.tsx";
import IconBrandDeno from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-deno.tsx";
import IconBrandTabler from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-tabler.tsx";
import IconBrandCloudflare from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-cloudflare.tsx";

export default function Projects() {
  const projects = [
    {
      icon: IconDatabase,
      title: "CO internship",
      description:
        "A small project made to discover React during an one week internship.",
      build: [
        IconBrandReact,
        IconBrandTailwind,
        IconBrandCloudflare,
        IconBrandGithubCopilot,
      ],
      link: "https://data.barab.live",
    },
    {
      icon: IconCalendarCode,
      title: "EDC",
      description:
        "A website to export your EcoleDirecte schedule to your calendar app with updates and more. <strong>New version available !</strong>",
      build: [
        IconBrandSvelte,
        IconBrandTailwind,
        IconBrandVite,
        IconBrandTabler,
        IconBrandVercel,
        IconBrandCloudflare,
      ],
      link: "https://edc.barab.live",
    },
    {
      icon: LemonIcon,
      title: "This site",
      description:
        "A simple portfolio coded by me, but with big lacks of design.",
      build: [
        LemonIcon,
        IconBrandTailwind,
        IconBrandTypescript,
        IconBrandTabler,
        IconBrandDeno,
        IconBrandGithubCopilot,
        IconBrandCloudflare,
      ],
    },
  ];
  return (
    <>
      <div class="flex flex-col md:flex-row gap-8 bg-[#fbffee] p-8">
        {projects.map((item) => {
          return (
            <div class=" flex-1 space-y-2 hover:shadow-md hover:shadow-[#008080] p-3 transition ease-in-out duration-300 rounded-md">
              <div class="flex items-center space-x-4">
                <div class="bg-[#008080] inline-block p-3 rounded-full text-white">
                  <item.icon class="w-10 h-10" aria-hidden="true" />
                </div>
                <h2 class="text-2xl font-bold">{item.title}</h2>
              </div>
              <p
                class="text-xl"
                dangerouslySetInnerHTML={{ __html: item.description }}
              >
              </p>
              {item.build
                ? <h3 class="text-lg font-semibold">Made using</h3>
                : null}
              {item.build && (
                <div class="flex flex-wrap">
                  {item.build.map((Icon, index) => (
                    <div key={index} style={{ margin: "10px" }}>
                      <Icon class="hover:text-[#008080]" />
                    </div>
                  ))}
                </div>
              )}
              {item.link &&
                (
                  <a class="block" href={item.link}>
                    <p class="text-gray-500 cursor-pointer hover:text-[#008080] inline-flex items-center group">
                      See
                      <IconChevronRight
                        class="inline-block w-5 h-5 transition group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </p>
                  </a>
                )}
            </div>
          );
        })}
      </div>
      <div class="text-center w-full">
        <p class="text-2xl font-bold px-2">
          I've also used or I'm still using:
        </p>
        <div class="flex flex-wrap items-center justify-center m-4 gap-4">
          <IconBrandHtml5 class="hover:text-[#008080]" />
          <IconBrandJavascript class="hover:text-[#008080]" />
          <IconBrandBulma class="hover:text-[#008080]" />
          <IconBrandNodejs class="hover:text-[#008080]" />
          <IconBrandNpm class="hover:text-[#008080]" />
          <IconBrandDebian class="hover:text-[#008080]" />
          <IconBrandVscode class="hover:text-[#008080]" />
          <IconBrandSpotify class="hover:text-[#008080]" />
        </div>
      </div>
    </>
  );
}
