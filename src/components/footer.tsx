export default function Footer() {
  const menu = {
    title: "Randoms links",
    children: [
      { name: "EDC", href: "https://edc.barab.live" },
      { name: "EDC - old", href: "https://barab.ovh" },
      { name: "CO2 internship", href: "https://data.barab.live" },
      { name: "Mail", href: "mailto:contact@barab.live?subject=Contact" },
    ],
  };
  return (
    <div class="bg-[#fbffee] flex flex-col md:flex-row w-full max-w-screen gap-8 md:gap-16 px-8 text-sm pt-8">
      <div class="flex-1">
        <div class="flex items-center gap-1">
          <img
            src="./barab_logo_simple.png"
            class=" h-6"
            alt="the barab logo"
          />
        </div>
        <div class="text-gray-500 mb-2 select-all">
          Learning developer
        </div>
        <img
          src="https://wakatime.com/badge/user/45f0ba86-46c8-41e2-8b47-b13184fb2b11/project/9335871f-f383-4abe-acf3-65e6092ebdd3.svg"
          alt="wakatime"
          class="h-6"
        />
        <a href="https://fresh.deno.dev">
          <img
            src="https://fresh.deno.dev/fresh-badge.svg"
            alt="Made with Fresh"
            class="mt-2 h-6"
          >
          </img>
        </a>
      </div>

      <div class="mb-4">
        <div class="font-bold">{menu.title}</div>
        <ul class="mt-2">
          {menu.children.map((child) => (
            <li class="mt-2" key={child.name}>
              <a
                class="text-gray-500 hover:text-[#008080]"
                href={child.href}
              >
                {child.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div class="text-gray-500 space-y-2">
        <div class="text-xs">
          Copyright © 2024 barab<br />
          All right reserved.
        </div>

        <div class='flex items-center justify-start'><a
          href="https://github.com/Baraban511"
          class="inline-block hover:text-[#008080]"
          aria-label="GitHub"
        ></a><iframe src="https://github.com/sponsors/Baraban511/button" title="Sponsor barab" height="32" width="114" class="ml-3 rounded-md"></iframe></div>

      </div>
      <div class="text-gray-500 space-y-2">
      </div>
    </div>
  );
}
