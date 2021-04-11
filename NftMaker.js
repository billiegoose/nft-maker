/** globals ethers, Ipfs */

const abi = [
  {
    inputs: [
      { internalType: "string", name: "_name", type: "string" },
      { internalType: "string", name: "_symbol", type: "string" },
      { internalType: "uint256[]", name: "_tokenCIDs", type: "uint256[]" }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "_approved",
        type: "address"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "_operator",
        type: "address"
      },
      {
        indexed: false,
        internalType: "bool",
        name: "_approved",
        type: "bool"
      }
    ],
    name: "ApprovalForAll",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "_to",
        type: "address"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    inputs: [
      { internalType: "address", name: "_approved", type: "address" },
      { internalType: "uint256", name: "_tokenId", type: "uint256" }
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_owner", type: "address" },
      { internalType: "address", name: "_operator", type: "address" }
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_tokenCID", type: "uint256" }],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "_tokenCIDs", type: "uint256[]" }
    ],
    name: "mintMultiple",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_from", type: "address" },
      { internalType: "address", name: "_to", type: "address" },
      { internalType: "uint256", name: "_tokenId", type: "uint256" }
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_from", type: "address" },
      { internalType: "address", name: "_to", type: "address" },
      { internalType: "uint256", name: "_tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" }
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_operator", type: "address" },
      { internalType: "bool", name: "_approved", type: "bool" }
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "bytes4", name: "_interfaceID", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_from", type: "address" },
      { internalType: "address", name: "_to", type: "address" },
      { internalType: "uint256", name: "_tokenId", type: "uint256" }
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

const networks = {
  "1": {
    name: "Mainnet",
    etherscanURL: "https://etherscan.io"
  },
  "4": {
    name: "Rinkeby",
    etherscanURL: "https://rinkeby.etherscan.io"
  },
  "5": {
    name: "Goerli",
    etherscanURL: "https://goerli.etherscan.io"
  }
};

export class NftMaker {
  constructor() {
    this._ipfs;
    this._provider;

    this._deployedContracts;
    this._contractName = "";
    this._networkId;

    this._initialized;
    this._confirmInitialized;
    
    this._initialized = new Promise((resolve) => {
      this._confirmInitialized = resolve;
    });
  }

  async init(deployedContracts) {
    if (!window.ethereum) {
      throw new Error("Failed to find the MetaMask browser extension");
    }
    if (this._provider) return;

    this._provider = new ethers.providers.Web3Provider(window.ethereum);
    // IPFS get upset if you create multiple instances at once,
    // which can happen during development due to hot-module reloading.
    // So we are using a global singleton.
    window.__IPFS_PROMISE = window.__IPFS_PROMISE || Ipfs.create();
    this._ipfs = await window.__IPFS_PROMISE;
    this._deployedContracts = deployedContracts;
    this._confirmInitialized();
  }

  async connectWallet() {
    await this._initialized;

    if (!window.ethereum) {
      throw new Error("Failed to find the MetaMask browser extension");
    }

    // Get chain id
    const network = await window.ethereum.request({
      method: "net_version"
    });
    if (!Object.keys(this._deployedContracts).includes(network)) {
      throw new Error(
        `Unrecognized Ethereum network id ${network}! There is no NFT contract deployed on this network.`
      );
    }
    this._networkId = network;

    // Get NFT contract details (name / symbol)
    const contract = new ethers.Contract(
      this.contractAddress,
      abi,
      this._provider
    );
    this._contractName = await contract.functions.name();

    // Get wallet id (not strictly necessary at this step
    // in the process but nice for UX. Can save wallet and email
    // address to database or something to register users.)
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });
    if (accounts.length !== 1) {
      throw new Error(
        "Metamask provided multiple wallet ids and I'm not sure which to use"
      );
    }
    const ownerAddress = accounts[0];

    return {
      networkName: this.networkName,
      contractAddress: this.contractAddress,
      contractName: this._contractName,
      openSeaURL: this.openSeaURL,
      ownerAddress
    };
  }

  get networkName() {
    return networks[this._networkId].name;
  }

  get etherscanURL() {
    return networks[this._networkId].etherscanURL;
  }

  get contractAddress() {
    return this._deployedContracts[this._networkId].contract;
  }

  get openSeaURL() {
    return this._deployedContracts[this._networkId].openSeaURL;
  }

  async createNFTonIPFS(name, description, imageFile) {
    await this._initialized;

    const [image] = await this._makeIPFS(imageFile);

    const json = { name, description, image };
    const metadata = JSON.stringify(json, null, 2);

    const [tokenURI, bytes32] = await this._makeIPFS(metadata);

    return {
      tokenURI,
      imageURL: image,
      bytes32
    };
  }

  async mint(bytes32) {
    await this._initialized;

    if (!bytes32) throw new Error("Missing argument to mint function");
    const signer = this._provider.getSigner();
    const contract = new ethers.Contract(this.contractAddress, abi, signer);
    const result = await contract.mint(bytes32);

    const tx = result.hash;

    const tokenIdPromise = new Promise(async (resolve, reject) => {
      const receipt = await result.wait();
      try {
        const tokenId = receipt.events[0].args[2].toString();
        resolve(tokenId);
      } catch (e) {
        reject(e);
      }
    });

    return {
      tx,
      etherscanURL: `${this.etherscanURL}/tx/${tx}`,
      tokenIdPromise
    };
  }

  async _makeIPFS(blob) {
    const result = await this._ipfs.add(blob, { cidVersion: 0 });
    if (result.cid.multibaseName !== "base58btc") {
      throw new Error(
        `Oh no! IPFS has changed their hashing algorithm to '${result.cid.multibaseName}'. This breaks this service, which assumes IPFS would continue to generate 'base58btc' hashes.`
      );
    }
    const bytes32 = result.cid.multihash.slice(2);
    return [`https://ipfs.io/ipfs/${result.path}`, bytes32];
  }
}
