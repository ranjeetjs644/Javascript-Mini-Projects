const searchInput = document.getElementById("search");
const searchButton = document.querySelector(".search-btn");
const errorBlock = document.getElementById("error");
const userImg = document.getElementById("userImg");
const name = document.getElementById("name");
const username = document.getElementById("username");
const aboutDesc = document.getElementById("about");
const follower = document.getElementById("follower-count");
const following = document.getElementById("following-count");
const profileBtn = document.getElementById("profileBtn");
const aboutCard = document.getElementById("userInfo-card");
let profileUrl;
let userName = "";

async function getUser() {
  try {
    const response = await fetch(`https://api.github.com/users/${userName}`);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      renderData(data);
    } else {
      // Handle the case when the user enters a wrong username
      errorBlock.innerText = `Error: User not dound`;
      aboutCard.style.display = "none";
    }
  } catch (err) {
    console.log(err);
  }
}

function renderData(data) {
  if (data) {
    name.innerText = data?.name;
    username.innerText = `@${data?.login}`;
    userImg.src = data?.avatar_url;
    aboutDesc.innerText = data?.bio;
    follower.innerText = data?.followers;
    following.innerText = data?.following;
    profileUrl = data?.html_url;
    aboutCard.style.display = "flex";
    aboutCard.classList.add("show");
  } else {
    aboutCard.style.display = "none";
    errorBlock.innerHTML = "Invalid username";
  }
}

searchButton.addEventListener("click", () => {
  userName = searchInput.value.trim();
  if (userName) {
    getUser();
  } else {
    errorBlock.innerText = "username is empty   ";
  }
});

profileBtn.addEventListener("click", () => {
  if (profileUrl) {
    window.open(profileUrl, "_blank");
  }
});
