curl --request POST \
  --url https://api.circle.com/v1/w3s/compliance/screening/addresses \
  --header 'Content-Type: application/json' \
  --header 'authorization: Bearer TEST_API_KEY:288ed0c89884d852425a540d7ad039e3:0edc015e4e3d292c3ef9405c49e57674' \
  --data '
{
  "idempotencyKey": "1bed08c0-f2de-4789-9422-0d1c8a31cda5",
  "address": "0x7B00e187dAA82e74D7Cb906d69045A1aAcd0bd40",
  "chain": "ETH-SEPOLIA"
}
'