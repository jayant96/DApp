const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const Moralis = require("moralis").default;
const cors = require("cors");
// for our server's method of setting a user session
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");
const sdk = require('api')('@nftport/v0#1900g1olewpx69w');
const sdk1 = require('api')('@opensea/v1.0#10fy4ug30l7qohm4q');
const app = express();
let secret = "";

const TSB_ABI = [
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'id', type: 'uint256' },
      { internalType: 'uint256', name: 'value', type: 'uint256' },
      { internalType: 'uint256', name: 'data', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'uint256', name: 'id', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

const sportsyachtOwner = '0x149BAaAe8a1B705291A2EF234a86aFD647e50498';

//Accept all types of request body format
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const getSecret = async () => {
  const secret_name = "prod/moralis";

const client = new SecretsManagerClient({
  region: "us-east-1",
});

let response;

try {
  response = await client.send(
    new GetSecretValueCommand({
      SecretId: secret_name,
      VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
    })
  );
} catch (error) {
  // For a list of exceptions thrown, see
  // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
  throw error;
}

 secret = response.SecretString;

console.log(secret);
}

//getSecret();

// allow access to React app domain
app.use(cors({
  origin: ['https://localhost:3000', 'https://apeharbour.com', 'https://beta.apeharbour.com', 'https://main.d2clhd270spzjd.amplifyapp.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Headers', 'Access-Control-Allow-Methods'],
  credentials: true,
  maxAge: 86400
}));


//Start Moralis
const startMoralis = async () => {
  await Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
  });
};

startMoralis();

//Function to extract Speed and Range values
const extractSpeedAndRange = (attributes) => {
  let speed, range;

  attributes.forEach(attr => {
    if (attr.trait_type === "Speed") {
      speed = attr.value;
    } else if (attr.trait_type === "Range") {
      range = attr.value;
    }
  });

  return { speed, range };
};

const config = {
  domain: process.env.APP_DOMAIN,
  statement: 'Please sign this message to confirm your identity.',
  uri: process.env.REACT_URL,
  timeout: 60,
};

app.post('/request-message', async (req, res) => {
  const { address, chain} = req.body;

  try {
    const message = await Moralis.Auth.requestMessage({
      address,
      chain,
      ...config,
    });
    
    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error(error);
  }
});

app.post('/verify', async (req, res) => {
  try {
    const { message, signature } = req.body;

    const { address, profileId } = (
      await Moralis.Auth.verify({
        message,
        signature,
        networkType: 'evm',
      })
    ).raw;

    const user = { address, profileId, signature };

    // create JWT token
    const token = jwt.sign(user, process.env.AUTH_SECRET);

    // set JWT cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error(error);
  }
});

app.get('/authenticate', async (req, res) => {
  const token = req.cookies.jwt;
  if (!token) return res.sendStatus(403); // if the user did not send a jwt token, they are unauthorized

  try {
    const data = jwt.verify(token, process.env.AUTH_SECRET);
    res.json(data);
    console.log('DATA authenticate: ', data);
    userAddress = data.address;
  } catch {
    return res.sendStatus(403);
  }
});

app.get('/logout', async (req, res) => {
  try {
    res.clearCookie('jwt', { sameSite: 'None', secure: true });
    return res.sendStatus(200);
  } catch {
    return res.sendStatus(403);
  }
});



app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.get("/getNativeBalance", async (req, res, next) => {
  try {
    // Get native balance
    const nativeBalance = await Moralis.EvmApi.balance.getNativeBalance({
      address: req.query.address,
      chain: req.query.chain,
    });

    // Format the native balance formatted in ether via the .ether getter
    const nativeBalanceEther = nativeBalance.result.balance.ether;

    res.status(200);
    res.send(nativeBalanceEther);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500);
    res.json({ error: error.message });
  }
});

app.get("/getWalletNfts", async (req, res, next) => {
  try {
    // Get wallet NFTs
    const nfts1 = await Moralis.EvmApi.nft.getWalletNFTs({
      address: req.query.address,
      chain: req.query.chain,
      limit: 100,
    });

    const nfts = nfts1.result.map((nft) => ({
      amount: nft.result.amount,
      metadata: nft.result.metadata,
    }));

    res.status(200);
    res.json(nfts);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500);
    res.json({ error: error.message });
  }
});


//Get Genesis Yachts collection
app.get("/getGenesisNfts", async (req, res, next) => {
  try {
  
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      "chain": "0x1",
      "format": "decimal",
      "tokenAddresses": [
        "0x24d0cbD0D5D7b50212251c5dc7cb810E7aF71F6a"
      ],
      "mediaItems": false,
      "address": req.query.address
    });

    const nfts = response.raw.result.map((nft) => ({
      amount: nft.amount,
      tokenId: nft.token_id,
      metadata: JSON.parse(nft.metadata),
    }));
  
    res.status(200);
    res.json(nfts);
  } catch (e) {
    console.error(e);
    res.status(500);
    res.json({ error: error.message });
  }  
});

//Get Genesis Yachts collection specifics for battle royale
app.get("/getGenesisNftsforBattleRoyale", async (req, res, next) => {
  try {
    const { tokenId, address } = req.query;
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      "chain": "0x1",
      "format": "decimal",
      "tokenAddresses": [
        "0x24d0cbD0D5D7b50212251c5dc7cb810E7aF71F6a"
      ],
      "mediaItems": false,
      "address": address
    });

    const nft = response.raw.result.find(item => item.token_id === tokenId);
    if (!nft) {
      return res.status(404).json({ error: "NFT with specified tokenId not found" });
    }

    const { speed, range } = extractSpeedAndRange(JSON.parse(nft.metadata).attributes);

    res.status(200);
    res.json({
      tokenId: nft.token_id,
      speed: speed,
      range: range
    });
  } catch (e) {
    console.error(e);
    res.status(500);
    res.json({ error: error.message });
  }  
});

//Get Genesis for claim and superyacht name change
app.get("/getGenesisNftsClaimName", async (req, res, next) => {
  try {
  
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      "chain": "0x1",
      "format": "decimal",
      "tokenAddresses": [
        "0x24d0cbD0D5D7b50212251c5dc7cb810E7aF71F6a"
      ],
      "mediaItems": false,
      "address": req.query.address
    });

  
    res.status(200);
    res.json(response.raw);
  } catch (e) {
    console.error(e);
    res.status(500);
    res.json({ error: error.message });
  }  
});

app.post("/getRemainingSportsyacht", async (req, res, next) => {
  
  try {  
    const response = await Moralis.EvmApi.utils.runContractFunction({
      "chain": "0x1",
      "functionName": "balanceOf",
      "address": "0xa342f5D851E866E18ff98F351f2c6637f4478dB5",
      "abi": TSB_ABI,
      "params": {
        owner: sportsyachtOwner,
        id: req.body.id
      },
    });
  
    console.log(response.raw);
    res.status(200);
    res.json(response.raw);
  } catch (e) {
    console.error(e);
    res.status(500);
    res.json({ error: error.message });
  }
});

//  app.get("/getGenesisNftsOwners", async (req, res, next) => {
//    try {

//     const address = '0x24d0cbD0D5D7b50212251c5dc7cb810E7aF71F6a';
//     const chain = '0x1';
  
//     const response = await Moralis.EvmApi.nft.getNFTOwners({
//       address,
//       chain,
//     });

//      const nfts = response.raw.result.map((nft) => ({
//        tokenId: nft.token_id,
//      }));
  
//      res.status(200);
//      res.json(response);
    
//    } catch (e) {
//      console.error(e);
//      res.status(500);
//      res.json({ error: error.message });
//    }
//  });


//Get Superyachts Collection
app.get("/getSuperyachtNfts", async (req, res, next) => {
  try {
  
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      "chain": "0x1",
      "format": "decimal",
      "tokenAddresses": [
        "0xe8076b98Cd6E4E1018A7208c05e8a8443B0Dd35B"
      ],
      "mediaItems": false,
      "address": req.query.address
    });

    const nfts = response.raw.result.map((nft) => ({
      amount: nft.amount,
      tokenId: nft.token_id,
      metadata: JSON.parse(nft.metadata),
    }));
  
    res.status(200);
    res.json(nfts);
  } catch (e) {
    console.error(e);
    res.status(500);
    res.json({ error: error.message });
  }  
});


//Get Sandbox Assets Collection
app.get("/getSandboxassetsNfts", async (req, res, next) => {
  try {
  
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      "chain": "0x1",
      "format": "decimal",
      "tokenAddresses": [
        "0xa342f5D851E866E18ff98F351f2c6637f4478dB5"
      ],
      "mediaItems": false,
      "address": req.query.address
    });

     const nfts = response.raw.result.map((nft) => ({
      amount: nft.amount,
      tokenId: nft.token_id,
      metadata: JSON.parse(nft.metadata),
    }));
  
    res.status(200);
    res.json(nfts);
  } catch (e) {
    console.error(e);
    res.status(500);
    res.json({ error: error.message });
  }  
});


//Get Dinghies/Surfboards collection
app.get("/getDinghiesNfts", async (req, res, next) => {
  try {
  
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      "chain": "0x1",
      "format": "decimal",
      "tokenAddresses": [
        "0xD4B61ef46aD352eA6B8846180C4fdd59f36056a1"
      ],
      "mediaItems": false,
      "address": req.query.address
    });

    const nfts = response.raw.result.map((nft) => ({
      amount: nft.amount,
      tokenId: nft.token_id,
      metadata: JSON.parse(nft.metadata),
    }));
  
    res.status(200);
    res.json(nfts);
  } catch (e) {
    console.error(e);
    res.status(500);
    res.json({ error: error.message });
  }  
});


//Get Hoodies Collection
app.get("/getHoodiesNfts", async (req, res, next) => {
  try {
  
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      "chain": "0x89",
      "format": "decimal",
      "tokenAddresses": [
        "0xd64CF72C458A7BFa351FAeE0067B4274ecBBe07e"
      ],
      "mediaItems": false,
      "address": req.query.address
    });

    const nfts = response.raw.result.map((nft) => ({
      amount: nft.amount,
      tokenId: nft.token_id,
      metadata: JSON.parse(nft.metadata),
    }));
  
    res.status(200);
    res.json(nfts);
  } catch (e) {
    console.error(e);
    res.status(500);
    res.json({ error: error.message });
  }  
});


//Get DCLHoodies Collection
app.get("/getDclHoodiesNfts", async (req, res, next) => {
  try {
  
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      "chain": "0x89",
      "format": "decimal",
      "tokenAddresses": [
        "0xCF97C3b8db98733C69B9d6560A27a734c49177Fb"
      ],
      "mediaItems": false,
      "address": req.query.address
    });

    const nfts = response.raw.result.map((nft) => ({
      amount: nft.amount,
      tokenId: nft.token_id,
      metadata: JSON.parse(nft.metadata),
    }));
  
    res.status(200);
    res.json(nfts);
  } catch (e) {
    console.error(e);
    res.status(500);
    res.json({ error: error.message });
  }  
});

//Get NFT maketplace values
app.get("/getMarketValue", async (req, res, next) => {
  try {
  
    sdk.auth('0bcf9025-2c5a-4360-bfd6-df82d58b51dc');
    const response = await sdk.retrieveContractSalesStatistics({
      chain: 'ethereum',
      contract_address: req.query.address
    });
      //  .then(({ data }) => console.log(data))
      //  .catch(err => console.error(err));
  
    res.status(200);
    res.json(response.data.statistics);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({ error: error.message });
  }    
});


//Get NFT OpenSeaMarket values
app.get("/getOpenSeaMarketValue", async (req, res, next) => {
  try {
  
    const response =  sdk1.retrievingCollectionStats({
      collection_slug: 'ape-harbour-yachts',
      'x-api-key': '48a29a91054b4c5fb0f3611c1f54423e'
    });
      //  .then(({ data }) => console.log(data))
      //  .catch(err => console.error(err));
  
    res.status(200);
    res.json(response);
  } catch (e) {
    console.error(e);
    res.status(500);
    res.json({ error: error.message });
  }    
});

app.get("/getCollectionStats", async (req, res, next) => {
  try {
    sdk1.auth('48a29a91054b4c5fb0f3611c1f54423e');
    const response = await sdk1.retrievingCollectionStats({
      collection_slug: 'ape-harbour-yachts',
      'x-api-key': '48a29a91054b4c5fb0f3611c1f54423e'
    });

    res.status(200).json(response);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }    
});



app.get("/path", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
