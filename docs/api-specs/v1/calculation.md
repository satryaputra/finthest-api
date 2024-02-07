# Calculation API Spec

## Calculation API

Endpoint : [POST]() `/calculation`

Headers :

- Authorization : Bearer _token_

Request Body :

```json
{
  "salary": 5000000,
  "loan": 15000000, // nullable
  "interest": 10, // percent per month, nullable
  "interestType": "year",
  "paidOff": 12, // month, nullable
  "savings": 10000000, // nullable
  "travelling": false,
  "wishlist": "Liburan ke Jepang", // nullable
  "wishlistTarget": 6, // nullable,
  "wishlistBudget": 15000000 // nullable
}
```

Response Body Success `200` :

```json
{
  "message": "Berhasil melakukan kalkulasi"
}
```