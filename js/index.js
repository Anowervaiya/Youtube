const allBtn = document.getElementById('allBtn');
const videoContainer = document.getElementById('videoContainer');
const url1 = `https://openapi.programming-hero.com/api/videos/categories`;

//  all button shows

fetch(url1)
  .then(res => res.json())
  .then(({ data }) => {
    data.forEach(element => {
      const newBtn = document.createElement('button');
      newBtn.classList.add('btn', 'btnBg');
      newBtn.innerText = element.category;

      allBtn.appendChild(newBtn);
      newBtn.addEventListener('click', () => {
        const btnBg = document.getElementsByClassName('btnBg');
        for (const btn of btnBg) {
          btn.classList.remove('bg-red-500');
        }
        newBtn.classList.add('bg-red-500');
        showCardByClicked(element.category_id);
      });
    });
  });
let sortview = false;
let catagoryId = 1000;
const sortView = () => {
  sortview = true;
  showCardByClicked(catagoryId, sortview);
};

// all cards show

const showCardByClicked = (id, sortview) => {
  catagoryId = id;
  // console.log('clicked');
// console.log(sortview);
  const url2 = ` https://openapi.programming-hero.com/api/videos/category/${id}`;
  fetch(url2)
    .then(res => res.json())
    .then(({ data }) => {
      if (sortview) {
        
        data.sort((a, b) => {
          console.log(a, b);
          const firstValue = a.others?.views;
          const secondValue = b.others?.views;
          const firstValueFloat = parseFloat(firstValue.replace('k', '')) || 0;
          const secondValueFloat =
            parseFloat(secondValue.replace('k', '')) || 0;
          return secondValueFloat - firstValueFloat;
        });
      } else {
        console.log('not shorting');
      }

      const nothing = document.getElementById('nothing');
      if (data.length === 0) {
        nothing.classList.remove('hidden');
      } else {
        nothing.classList.add('hidden');
      }
      // console.log(data);
      videoContainer.innerHTML = '';
      data.forEach(element => {
        // console.log(element);

        let varifiedBadge = '';
        if (element.authors[0].verified) {
          varifiedBadge = `<img src="verified.png" alt=""></img>`;
        }
        const card = document.createElement('div');
        card.innerHTML = `
         <div class="card card-compact  h-[300px] bg-base-100 shadow-xl">
        <figure><img class="w-full" src="${element.thumbnail}" alt="Shoes" /></figure>
        <div class="flex p-4">
          <div>
            <img src="${element.authors[0].profile_picture}}" alt="" class="w-[50px] rounded-full">
          </div>
          <div class="ml-4">
            <h2 class="card-title">${element.title}</h2>
            <div class="flex">
              <h4>${element.authors[0].profile_name}</h4>
           
              ${varifiedBadge}

            </div>
            <h5>${element.others.views}</h5>
          </div>

        </div>
      </div>
        `;
        videoContainer.appendChild(card);
      });
    });
};

showCardByClicked(catagoryId, sortview);
