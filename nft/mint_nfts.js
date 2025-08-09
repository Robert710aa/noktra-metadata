import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { createV1, mplTokenMetadata, TokenStandard } from '@metaplex-foundation/mpl-token-metadata';
import { keypairIdentity, publicKey } from '@metaplex-foundation/umi';
import fs from 'fs';

const RPC = 'https://api.mainnet-beta.solana.com';
const KEYPAIR = process.env.NOKTRA_KEYPAIR; // set path to your keypair file
if (!KEYPAIR) throw new Error('Set NOKTRA_KEYPAIR env var to your keypair path');

const NFTS = [
  { name: 'Noktra Genesis #1', symbol: 'NOKNFT', uri: 'https://raw.githubusercontent.com/Robert710aa/noktra-metadata/main/nft/noktra-genesis-1.json' },
  { name: 'Noktra Genesis #2', symbol: 'NOKNFT', uri: 'https://raw.githubusercontent.com/Robert710aa/noktra-metadata/main/nft/noktra-genesis-2.json' },
  { name: 'Noktra Genesis #3', symbol: 'NOKNFT', uri: 'https://raw.githubusercontent.com/Robert710aa/noktra-metadata/main/nft/noktra-genesis-3.json' },
];
const RECIPIENT = publicKey('2KBBbBiVRqqxoBgz9m4C7A2By21N8ZBp2ZVpMCm2uwR3');

(async () => {
  const umi = createUmi(RPC);
  const secret = JSON.parse(fs.readFileSync(KEYPAIR));
  const kp = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(secret));
  umi.use(keypairIdentity(kp)).use(mplTokenMetadata());

  for (const meta of NFTS) {
    const tx = await createV1(umi, {
      mint: undefined, // auto-generate new mint
      authority: umi.identity,
      payer: umi.identity,
      updateAuthority: umi.identity,
      name: meta.name,
      symbol: meta.symbol,
      uri: meta.uri,
      sellerFeeBasisPoints: 500,
      tokenStandard: TokenStandard.NonFungible,
      tokenOwner: RECIPIENT,
    }).sendAndConfirm(umi);
    console.log(Minted: \\ -> tx:, tx.signature);
  }
})();