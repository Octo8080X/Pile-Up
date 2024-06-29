import { Head } from "$fresh/runtime.ts";
import { useEffect, useRef, useState } from "preact/hooks";

declare namespace globalThis {
  const hljs: {
    highlightAll: () => void;
  };
}

function Check() {
  return (
    <svg
      version="1.1"
      id="_x32_"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      style="width: 16px; height: 16px; opacity: 1;"
      xml:space="preserve"
    >
      <g>
        <polygon
          class="st0"
          points="440.469,73.413 218.357,295.525 71.531,148.709 0,220.229 146.826,367.055 218.357,438.587 
      		289.878,367.055 512,144.945 	"
          style="fill: rgb(58, 210, 79); --darkreader-inline-fill: #4cd65f;"
          data-darkreader-inline-fill=""
        >
        </polygon>
      </g>
    </svg>
  );
}

export default function SourceCode({ code }: { code: string }) {
  const sourceCodeRef = useRef<HTMLPreElement>(null);
  const [isCopy, setIsCopy] = useState(false);
  useEffect(() => {
    if (!globalThis.hljs) {
      return;
    }
    globalThis?.hljs?.highlightAll();
  }, []);

  function copyToClipboard() {
    if (sourceCodeRef.current) {
      const range = document.createRange();
      range.selectNode(sourceCodeRef.current);
      window!.getSelection()?.removeAllRanges();
      window!.getSelection()?.addRange(range);
      try {
        document.execCommand("copy");
        console.log("Source code copied to clipboard");
        setIsCopy(true);
      } catch (err) {
        console.log("Failed to copy text: ", err);
      }
      window!.getSelection()?.removeAllRanges();
    }
  }

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css"
        />
        <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js">
        </script>
      </Head>
      <div class="relative">
        <button
          class="absolute text-white bg-black p-1 right-0 w-24"
          onClick={copyToClipboard}
        >
          <div class="flex flex-row">
            <div class="mx-2">Copy</div>
            <div class="mt-1">{isCopy && <Check />}</div>
          </div>
        </button>
        <pre><code class="language-javascript" ref={sourceCodeRef}>
          {code}
        </code></pre>
      </div>
    </>
  );
}
