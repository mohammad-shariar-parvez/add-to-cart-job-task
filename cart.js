let cart = [];


function addtocart(id) {
	openSidebar();
	cart.push({
		id: id,
		itemAmount: 1,
	});
	displaycart();
	const addButton = document.getElementById(`myButton${id}`);
	disableButton(addButton);
}

function disableButton(button) {
	console.log("disable");
	button.disabled = true;
	button.classList.remove('bg-red-500', 'hover:bg-red-600');
	button.classList.add('bg-shadow', 'hover:bg-shadowDark');
}

function enableButton(button) {
	console.log("enable");
	button.disabled = false;
	button.classList.remove('bg-gray-400', 'cursor-not-allowed');
	button.classList.add('bg-red-500', 'hover:bg-red-600');
}


const handleDelete = (id) => {
	cart = cart.filter(item => item.id != id);
	displaycart();

	// Check if the cart is empty
	if (cart.length === 0) {
		document.getElementById("total").innerHTML = 0;
		document.getElementById("cartItem").innerHTML = "";
	}
	const addButton = document.getElementById(`myButton${id}`);
	enableButton(addButton);
};

const handleIncrement = (id) => {
	let search = cart.find((item) => item.id === id);
	search.itemAmount += 1;
	totalAmount();
	displaycart();

};

const handleDecrement = (id) => {
	let currentQuantity = parseInt(document.getElementById(`quantity${id}`).innerHTML);
	if (currentQuantity > 1) {
		let search = cart.find((item) => item.id === id);
		search.itemAmount -= 1;
		totalAmount();
		displaycart();
	}
	else return;
};

let totalAmount = () => {
	if (cart.length !== 0) {
		let amount = cart
			.map(({ itemAmount, id }) => {
				let search = products.find((y) => y.id === id) || [];
				return itemAmount * search.price;
			})
			.reduce((x, y) => x + y, 0);
		document.getElementById("total").innerHTML = amount;
	} else return;
};




// Add this code in  cart.js file
document.getElementById('openCartBtn').addEventListener('click', function () {
	toggleSidebar();
});


// Function to close the sidebar
const toggleSidebar = () => {
	// Add any actions you want to perform when closing the sidebar
	const cartSection = document.getElementById('cartSection');
	cartSection.classList.toggle('translate-x-full');
	cartSection.classList.toggle('translate-x-0');
};




// Add this code in  cart.js file
document.getElementById('closeCartBtn').addEventListener('click', function () {
	closeSidebar();
});

// Function to open the sidebar on add cart
const openSidebar = () => {
	console.log("yoyo folps");
	const cartSection = document.getElementById('cartSection');
	cartSection.classList.remove('translate-x-full');
	cartSection.classList.add('translate-x-0');
};
// Function to close the sidebar
const closeSidebar = () => {
	const cartSection = document.getElementById('cartSection');
	cartSection.classList.toggle('translate-x-full');
	cartSection.classList.toggle('translate-x-0');
};

//----------------------SIDE BAR--------------------------------
function displaycart() {
	document.getElementById("count1").innerText = cart.length;
	document.getElementById("count2").innerText = cart.length;

	const cartContainer = document.getElementById("cartItem");
	cartContainer.innerHTML = "";
	cart.forEach((item) => {
		let { id, itemAmount } = item;
		let search = products.find(item => item.id == id);
		let newList = document.createElement('div');
		newList.innerHTML =
			`
				<div class="flex  items-center p-3  ring-2 ring-white ring-inset rounded-lg space-x-4 relative">
					<img src=${search.image} alt="chicken-pasta" class=" w-20  md:h-28 object-cover  rounded-lg ">
				<div class="">
					<p class="leading-tight font-medium">${search.title}</p>
					<span class="text-xs block">${search.price}</span>
					<div class="text-black mt-2">
						<button id="btn-dec${id}" class="bg-shadowLight px-2 py-1 rounded-sm  "  onclick="handleDecrement(${id} )"> - </button>
						<span id="quantity${id}"  class="bg-white px-4 inline-block right-7 -m-1  ">${itemAmount}</span>
						<button  class="bg-shadowLight px-2 py-1 rounded-sm    -m-1" onclick="handleIncrement(${id})" > + </button>
					</div>
				</div>
				<p id="price${id}" class=" text-left font-medium absolute bottom-1 right-2"> ${search.price * itemAmount}$</p>
				<i
					class="fa-solid fa-trash absolute  px-2 py-1 bg-white text-tomato rounded-md text-xs -right-1 -top-2 cursor-pointer hover:text-tomatoDark " 
					onclick='handleDelete(${id})'>
				</i>
			</div>` ;
		cartContainer.appendChild(newList);
	});
	totalAmount();

}


//------------------------CARD----------------------------

document.getElementById('root').innerHTML = products.map((item) => {
	var { image, title, price, details, id, newProduct } = item;
	return (
		`
		<div class=' bg-shadowLight  rounded-md p-[14px]   space-y-4  relative   '>
			<img src=${image} alt="chicken-pasta" class=" w-full h-auto md:h-40 object-cover  ">
			<div>
				<h6 class="m-0 leading-none font-bold text-gray-700 ">${title}</h6>
				<span class="text-xs">${price}</span > <span class="text-xs">$/each</span>
				<p class="text-xs my-3 text-justify">${details}</p>
			</div>

			<div class="w-full space-y-2">
				 <button onclick='addtocart(${id})' id="myButton${id}" class="bg-tomato text-white w-full p-1 rounded-sm hover:bg-tomatoDark">Add to Order</button>
				<button
					class=" block ring-2 ring-tomato ring-inset  w-full p-1 rounded-sm text-tomato">Customize</button>
			</div>
			<button
				class="${newProduct ? "bg-tomato text-white font-semibold text-xs tracking-wide rounded-3xl py-1 px-4 absolute -top-[25px] -left-[25px]  -rotate-45 " : "hidden"}">
				NEW
			</button>
		</div>`
	);
}).join('');

