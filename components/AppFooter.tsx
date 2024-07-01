export function AppFooter() {
  return (
    <footer class="footer mt-4 p-10 bg-neutral text-neutral-content static bottom-0">
      <aside class="items-center">
        <p class="text-3xl">Pile-Up</p>
        <p>Copyright © 2024 - Octo 3.6</p>
      </aside>

      <nav>
        <h6 class="footer-title">Menu</h6>
        <a class="link link-hover" href="/new">Building</a>
        <a class="link link-hover" href="/conditions">Conditions</a>
      </nav>
      <nav>
        <h6 class="footer-title">Reference</h6>
        <a
          class="link link-hover"
          target="_brank"
          rel="noopener"
          href="https://fresh.deno.dev/"
        >
          Fresh
        </a>
        <a
          class="link link-hover"
          target="_brank"
          rel="noopener"
          href="https://hono.dev/"
        >
          Hono
        </a>
        <a
          class="link link-hover"
          target="_brank"
          rel="noopener"
          href="https://www.babylonjs.com/"
        >
          Babylon.js
        </a>
        <a
          class="link link-hover"
          target="_brank"
          rel="noopener"
          href="https://deno.com/"
        >
          Deno
        </a>
        <a
          class="link link-hover"
          target="_brank"
          rel="noopener"
          href="https://github.com/Octo8080X/Pile-Up"
        >
          Octo8080X/pile-up
        </a>
      </nav>
    </footer>
  );
}
