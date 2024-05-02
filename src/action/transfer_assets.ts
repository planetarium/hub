// import { Buffer } from "buffer";
// import { BencodexDictionary } from "@planetarium/bencodex";
// import { useMemo, useState } from "react";
// import { v4 as uuidv4 } from "uuid";
// import { useStageTransactionMutation } from "@/generated/graphql";
// import { Address } from "@planetarium/account";

// function createTransferAssetsAction(
//   avatarAddress: Address
// ): BencodexDictionary {
//   const id = uuidv4();
//   return new BencodexDictionary([
//     ["type_id", "daily_reward7"],
//     [
//       "values",
//       new BencodexDictionary([
//         ["id", uuidv4ToBuffer(id)],
//         ["a", avatarAddress.toBytes()],
//       ]),
//     ],
//   ]);
// }
