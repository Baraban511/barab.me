type Props = {
  active: string;
};

export default function Header({ active }: Props) {
  const menus = [
    { name: "Home", href: "/" },
    { name: "About me", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <div class="bg-[#fbffee] w-full py-6 px-8 flex flex-row justify-between flex-wrap gap-6 relative top-0 z-50">
      <div class="shrink-0 h-6">
        <a href="/">
          <img src="./barab_logo_simple.png" class="shrink-0 h-6" alt="barab logo"/>
        </a>
      </div>
        <ul class="flex items-center group gap-6">
          {menus.map((menu) => (
            <li>
              <a
                href={menu.href}
                class={"text-gray-500 hover:text-gray-700 py-1 border-gray-500" +
                  (menu.href === active ? " font-bold border-b-2" : "")}
              >
                {menu.name}
              </a>
            </li>
          ))}
        </ul>
    </div>
  );
}
