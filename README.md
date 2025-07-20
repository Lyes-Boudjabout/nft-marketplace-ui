# NFT Marketplace UI

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Environment Variables

Make sure that your .env.local (or any environment file) includes the following variables in order to run this project locally:
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: you can get one from [WalletConnect Cloud](https://cloud.walletconnect.com/)
CIRCLE_API_KEY: you can get one from [Circle Developer Portal](https://console.circle.com/api-keys)
ENABLE_COMPLIANCE_CHECK: set it to true to allow compliance check

## Setup

```bash
git clone https://github.com/Lyes-Boudjabout/nft-marketplace-ui
cd nft-marketplace-ui
npm install
npm run anvil
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Add Anvil to your metamask

Add the following network to your metamask:
- Name: Anvil
- RPC URL: http://127.0.0.1:8545
- Chain ID: 31337
- Currency Symbol: ETH


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
