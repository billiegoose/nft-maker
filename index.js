import { NftMaker } from './NftMaker.js';

const nftMaker = new NftMaker();

nftMaker.init({
  "1": {
    contract: "0xceabC60d96944DE03566c007f9749aBe61Fd3381",
    openSeaURL: "https://opensea.io/collection/nfts-4-all-v2"
  },
  "4": {
    contract: "0xB2e1cE762c8994DC1134A16b8A61e14f16c867E2",
    openSeaURL: "https://testnets.opensea.io/collection/nft4all-alpha-rinkeby"
  },
  "5": {
    contract: "0x7E124C4444C6A7c996fbC18D44B594A472b2DB89",
    openSeaURL: "https://testnets.opensea.io/collection/nft4all-alpha"
  }
});

const $ = document.getElementById.bind(document);

$('connect-wallet-button').onclick = async () => {
  console.log('connectWallet')
  const {
    networkName,
    contractAddress,
    contractName,
    openSeaURL,
    ownerAddress
  } = await nftMaker.connectWallet();

  $('owner-pre').innerText = ownerAddress;
  $('contract-name-pre').innerText = contractName;

  $('opensea-url-a').innerText = contractName + ' Collection';
  $('opensea-url-a').href = openSeaURL;

  $('network-name-pre').innerText = networkName;
  $('network-name-figcaption').innerText = `The minted NFT will be on the ${networkName} Ethereum network.`;
  $('connect-wallet-reveal').classList.remove('d-none');

  $('connect-wallet-next').removeAttribute('disabled');
};

$('connect-wallet-next').onclick = () => {
  $('connect-wallet-section').classList.add('d-none');
  $('design-section').classList.remove('d-none');
};

$('design-prev').onclick = () => {
  $('connect-wallet-section').classList.remove('d-none');
  $('design-section').classList.add('d-none');
};

$('image-upload-input').oninput = (e) => {
  if (e.target.files) {
    const url = URL.createObjectURL(e.currentTarget.files[0]);
    $('image-upload-preview').src = url;
  } else {
    $('image-upload-preview').src = '';
  }
};

let metadataFetchComplete = false;
let imageFetchComplete = false;
let tokenBytes32;

$('design-form').onsubmit = async (e) => {
  e.preventDefault();
  metadataFetchComplete = false;
  imageFetchComplete = false;
  const data = new FormData($("design-form"));
  const name = data.get("name");
  const description = data.get("description");
  const imageFile = data.get("image");

  if (!imageFile) return;

  try {
    const { tokenURI, imageURL, bytes32 } = await nftMaker.createNFTonIPFS(
      name,
      description,
      imageFile
    );

    $('preview-tokenURI-a').href = tokenURI;
    $('preview-tokenURI-pre').innerText = tokenURI;

    $('preview-image-a').href = imageURL;
    $('preview-image-img').onload = () => {
      imageFetchComplete = true;
      if (metadataFetchComplete) {
        $('mint-button').removeAttribute('disabled');
      }
    }
    $('preview-image-img').onerror = () => {
      imageFetchComplete = false;
    }
    $('preview-image-img').src = imageURL;

    $('image-cid').innerText = imageURL.replace("https://ipfs.io/ipfs/", "");
    $('token-cid').innerText = tokenURI.replace("https://ipfs.io/ipfs/", "");
    
    tokenBytes32 = bytes32;

    $('design-section').classList.add('d-none');
    $('preview-section').classList.remove('d-none');

    const res = await fetch(tokenURI);
    if (res.status !== 200) {
      metadataFetchComplete = false;
    } else {
      $('preview-token-metadata').innerText = await res.text();
      metadataFetchComplete = true;
      if (imageFetchComplete) {
        $('mint-button').removeAttribute('disabled');
      }
    }
  } catch (e) {
    window.alert(e.message);
  }
};

$('preview-prev').onclick = () => {
  $('design-section').classList.remove('d-none');
  $('preview-section').classList.add('d-none');
};

$('mint-button').onclick = async () => {
  try {
    const { tx, etherscanURL, tokenIdPromise } = await nftMaker.mint(tokenBytes32);
    $('preview-section').classList.add('d-none');
    $('minting-section').classList.remove('d-none');
    $('minting-tx-url-a').href = etherscanURL
    $('minting-tx-url-pre').innerText = etherscanURL;

    const tokenId = await tokenIdPromise;

    $('minting-section').classList.add('d-none');
    $('minted-section').classList.remove('d-none');

    $('minted-tx-url-a').href = etherscanURL
    $('minted-tx-url-pre').innerText = etherscanURL;

    $('minted-contract-address').value = nftMaker.contractAddress;
    $('minted-nft-token-id').value = tokenId;

    const openSeaURL = `${nftMaker.openSeaAssetUrl}/${tokenId}`;
    $('minted-opensea-url-a').href = openSeaURL;
    $('minted-opensea-url-a').innerText = openSeaURL;
  } catch (e) {
    window.alert(e.message);
  }
};

$('about-close').onclick = () => {
  $('about').classList.add('d-none');
};
