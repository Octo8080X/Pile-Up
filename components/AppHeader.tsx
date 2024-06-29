import { JSX } from "preact";

export interface AppHeaderProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  showBuildingShortCut?: boolean;
}

export function AppHeader(props: AppHeaderProps) {
  const showBuildingShortCut = props.showBuildingShortCut ?? true;

  return (
    <div className="navbar bg-base-content text-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-base-content"
          >
            <li>
              <a href="/search" class="">Search</a>
            </li>
            <li>
              <a href="/conditions" class="">conditions</a>
            </li>
          </ul>
        </div>
        <a class="btn btn-ghost text-xl" href="/">Pile-Up</a>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li>
            <a href="/search" class="link">Search</a>
          </li>
          <li>
            <a href="/conditions" class="link">Conditions</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {showBuildingShortCut &&
          <a className="btn btn-neutral" href="/new">Building</a>}
      </div>
    </div>
  );
}
