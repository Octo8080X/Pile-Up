import { JSX } from "preact";

export interface AppHeaderProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  showBuildingShortCut?: boolean;
}

type ModelInfo = {
  title: string;
  url: string;
  image: string;
};

export function Models({ modelInfos }: { modelInfos: ModelInfo[] }) {
  return (
    <div class="flex flex-wrap gap-4 justify-center">
      {modelInfos.map((modelInfo) => (
        <a href={modelInfo.url}>
          <div class="bg-neutral-content p-4 rounded-lg shadow-md text-base-100 min-w-[108px] max-w-[208px]">
            <img
              class="rounded-lg"
              src={modelInfo.image}
              alt={modelInfo.title}
            />
            <p class="text-xl truncate font-semibold">{modelInfo.title}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
