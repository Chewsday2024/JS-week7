const ticketName = document.querySelector('.js-ticketName');

const imgAddress = document.querySelector('.js-imgAddress');

const viewLocation = document.querySelector('.js-viewLocation');

const ticketCost = document.querySelector('.js-ticketCost');

const ticketQuantity = document.querySelector('.js-ticketQuantity');

const ticketStars = document.querySelector('.js-ticketStars');

const ticketDescribe = document.querySelector('.js-ticketDescribe');

const addTicketBtn = document.querySelector('.js-addTicketBtn');

const ticketForm = document.querySelector(".addTicket-form");

const search = document.querySelector('.js-search');


// const ticketData = [{
//   ticketName: '綠島自由行套裝行程',
//   imgAddress: 'https://github.com/hexschool/2022-web-layout-training/blob/main/js_week5/travel_1.png?raw=true',
//   viewLocation: '高雄',
//   ticketCost: 1400,
//   ticketQuantity: 87,
//   ticketStars: 10,
//   ticketDescribe: '嚴選超高CP值綠島自由行套裝行程，多種綠島套裝組合。'
// },{
//   ticketName: '清境高空觀景步道',
//   imgAddress: 'https://github.com/hexschool/2022-web-layout-training/blob/main/js_week5/travel_4.png?raw=true',
//   viewLocation: '台北',
//   ticketCost: 240,
//   ticketQuantity: 99,
//   ticketStars: 2,
//   ticketDescribe: '清境農場青青草原數十公頃碧草，這些景觀豐沛了清境觀景步道的風格，也涵養它無可取代的特色。'
// },{
//   ticketName: '山林悠遊套票',
//   imgAddress: 'https://github.com/hexschool/2022-web-layout-training/blob/main/js_week5/travel_3.png?raw=true',
//   viewLocation: '台中',
//   ticketCost: 1765,
//   ticketQuantity: 20,
//   ticketStars: 7,
//   ticketDescribe: '山林悠遊套票，結合南投清境高空步道、雙龍瀑布七彩吊橋、瑞龍瀑布園區之熱門景點。'
// }];





axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelAPI-lv1.json')
  .then((response) => {
    ticketData = response.data;

    show();

    donut();
  });



  


 



function addTicket () {
  let ticket = {};

  
    ticket = {
      id: ticketData.length,
      name: ticketName.value,
      imgUrl: imgAddress.value,
      area: viewLocation.value,
      description: ticketDescribe.value,
      group: Number(ticketQuantity.value),
      price: Number(ticketCost.value),
      rate: Number(ticketStars.value)
      };

    ticketData.push(ticket);
    ticketForm.reset();

    show(ticketData.filter(value => value.area === ticket.area));

    search.value = ticket.area;

    donut();
};

function checkValue () {
  const allValue = [
    ticketName.value,
    imgAddress.value,
    viewLocation.value,
    ticketCost.value,
    ticketQuantity.value,
    ticketStars.value,
    ticketDescribe.value
  ]


  if (allValue.every(value => value !== '')) addTicket();
};


addTicketBtn.addEventListener('click',() => {
  checkValue();
});



let ticketContent = '';

const ticketBox = document.querySelector('.js-ticketBox');

const searchResult = document.querySelector('.js-searchResult');

function show (dog) {
  let ticketHtml = '';

  const bag = dog || ticketData;

  
  bag.forEach(value => {
    ticketHtml += `
      <li class="ticketCard">
        <div class="ticketCard-img">
          <a href="#">
            <img src="${value.imgUrl}" alt="">
          </a>
          <div class="ticketCard-region">${value.area}</div>
          <div class="ticketCard-rank">${value.rate}</div>
        </div>
        <div class="ticketCard-content">
          <div>
            <h3>
              <a href="#" class="ticketCard-name">${value.name}</a>
            </h3>
            <p class="ticketCard-description">
              ${value.description}
            </p>
          </div>
          <div class="ticketCard-info">
            <div class="ticketCard-num">
              <p>
                <span><i class="fas fa-exclamation-circle"></i></span>
                剩下最後 <span id="ticketCard-num"> ${value.group} </span> 組
              </p>
            </div>
            <p class="ticketCard-price">
              TWD <span id="ticketCard-price">$${value.price}</span>
            </p>
          </div>
        </div>
      </li>
    `;

    ticketContent = ticketHtml;

    ticketBox.innerHTML = ticketContent;

    searchResult.innerHTML = `本次搜尋共 ${bag.length} 筆資料`;
  });
};


  search.addEventListener('change',(e) => {
      
    const left = ticketData.filter((value) => e.target.value === value.area);

    const none = document.querySelector('.cantFind-area');

    
    
    
    if (search.value === '') {
      none.classList.remove('d-b');
      ticketBox.classList.remove('d-n');
      show();
    } else if (!left[0]) {
      ticketBox.classList.add('d-n');
      none.classList.add('d-b');
      searchResult.innerHTML = `本次搜尋共 0 筆資料`;

    } else {
      none.classList.remove('d-b');
      ticketBox.classList.remove('d-n');
      show(left);
    }
  });






  function them (who) {
    const team = ticketData.filter(value => value.area === who);

    return team.length;
  }


  function donut () {
    const chart = c3.generate({



      bindto: '.js-chart',
      data: {
        columns: [
          ['台北', `${them('台北')}`],
          ['台中', `${them('台中')}`],
          ['高雄', `${them('高雄')}`]
        ],
        type : 'donut'
      },
      donut: {
        title: "套票地區比重",
        width: 50
      }
    });
  }


  