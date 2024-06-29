import { Head } from "$fresh/runtime.ts";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>
      <div class="pt-4 mx-auto my-auto">
        <div class="hero-content text-center text-neutral-content">
          <div class="max-w-md">
            <h1 class="text-4xl font-bold">404 - Page not found</h1>
            <p class="my-4">
              The page you were looking for doesn't exist.
            </p>
            <a href="/" class="underline py-[100px]">Go back Home</a>
          </div>
        </div>
      </div>
    </>
  );
}
