// === QUERY DOCUMENT FOR ELEMENTS ===
const form = document.querySelector(".form");
const messageHeading = document.querySelector(".message-heading");
const getMessageButton = document.querySelector(".get-message-button");

// === CONTRACT ABI ===
const abi = [
  {
    constant: false,
    inputs: [
      {
        name: "x",
        type: "string",
      },
    ],
    name: "setMessage",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getMessage",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

// === ACCOUNT CONSTANTS ===
const metamaskAcc1 = "0x54ae96c25754a09ee46bb4ef3f45b54004a79422";
const contractAddress = "0x9FD9bfE97262c6D9e015A57E62304688343A2Da9";

// === CONNECT WITH INFURA ===
const web3 = new Web3(
  "https://ropsten.infura.io/v3/8c4b75144ab6441cb40eafa094b3e4e1"
);

// === CREATE CONTRACT FROM ABI & CONTRACT ADDRESS ===
const myMessage = new web3.eth.Contract(abi, contractAddress);

// Tricky part! Set the provider of contract to the window.ethereum (injected by Metamask?)
myMessage.setProvider(window.ethereum);

// === FUNCTIONS ===
// Read Message using getMessage function on myMessage Contract
const updateMessage = () => {
  myMessage.methods
    .getMessage()
    .call()
    .then((result) => {
      messageHeading.innerText = result;
    });
};

// === EVENT LISTENERS ===
// Submit new message to myMessage Contract
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = e.target.message.value;
  myMessage.methods
    .setMessage(value)
    .send({ from: metamaskAcc1 })
    .then(console.log);
});

// Get new Message and update UI
getMessageButton.addEventListener("click", (e) => {
  e.preventDefault();
  updateMessage();
});
