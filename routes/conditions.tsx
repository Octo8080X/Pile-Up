import { defineRoute } from "$fresh/server.ts";

export default defineRoute(() => {
  return (
    <>
      <div class="px-4 pt-4 flex flex-col items-center justify-center mx-auto w-full">
        <div class="">
          <h2 class="text-xl">Conditions</h2>
        </div>
        <div>
          <ul class="list-inside list-disc">
            <li>
              No application or post-application report is required prior to
              use.
            </li>
            <li>
              Please refrain from registering any personally identifiable
              information.
            </li>
            <li>
              Prohibitions
              <div class="mx-4">
                The following acts are prohibited when using this service.
                <ol class="list-inside list-decimal">
                  <li>
                    Actions that cause or may cause annoyance, disadvantage, or
                    damage to other users, third parties, or us.
                  </li>
                  <li>
                    Acts that infringe or may infringe copyrights, trademarks,
                    patents, other intellectual property rights, portrait
                    rights, personal rights, privacy rights, publicity rights,
                    or other rights of third parties
                  </li>
                  <li>
                    Acts that are or may be offensive to public order and morals
                    or otherwise violate laws and regulations
                  </li>
                  <li>
                    Acts that use the Content obtained through the Service
                    outside the scope of private use by the user or purchaser.
                  </li>
                  <li>
                    Acts of reproducing, selling, publishing, distributing, or
                    making public the Content obtained through the Service via
                    other users or third parties other than other users, and
                    similar acts.
                  </li>
                  <li>
                    Interfering with the operation of the Service or other
                    services provided by us.
                  </li>
                  <li>
                    Actions that we reasonably deem inappropriate, such as
                    damaging or destroying our credibility
                  </li>
                  <li>
                    Other acts that we deem inappropriate.
                  </li>
                  <li>
                    If any inappropriate behavior is confirmed, we may take
                    action such as deletion.
                  </li>
                </ol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
});
