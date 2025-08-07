import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { createV1, mplTokenMetadata, TokenStandard } from "@metaplex-foundation/mpl-token-metadata";
import { keypairIdentity, percentAmount, publicKey } from "@metaplex-foundation/umi";
import fs from "fs";

const keypair = JSON.parse(fs.readFileSync("./keypair.json"));

(async () => {
  const umi = createUmi("https://api.mainnet-beta.solana.com")
    .use(keypairIdentity(umi.eddsa.createKeypairFromSecretKey(new Uint8Array(keypair))))
    .use(mplTokenMetadata());

  const mint = publicKey("6u5PLy9ePpuGEBK3kmQ9isVDFjqSurKpvmCFzheDgQke");
  const metadataUri = "https://raw.githubusercontent.com/Robert710aa/noktra-metadata/main/metadata.json";

  const tx = await createV1(umi, {
    mint,
    authority: umi.identity,
    payer: umi.identity,
    updateAuthority: umi.identity,
    name: "Noktra",
    symbol: "NOK",
    uri: metadataUri,
    sellerFeeBasisPoints: percentAmount(0),
    tokenStandard: TokenStandard.Fungible,
  }).sendAndConfirm(umi);

  console.log("Metadane opublikowane! Sygnatura transakcji:", tx.signature);
})();
