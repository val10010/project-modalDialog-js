(function() {
  let wrapper = document.querySelector('.wrapper');

  wrapper.addEventListener('click' , handleAction); 

  function handleAction(event) {
    let elem = event.target.dataset.action;
    const modal = document.querySelector('.modal');
    const bg = document.querySelector('.bg');

    if(elem !== 'open' && elem !== 'close' && elem !== 'uninstall') return;

      if(elem === 'open') {
        modal.classList.remove('hide'); 
        bg.classList.remove('hide');
      }

      if(elem === 'close') {
        modal.classList.add('hide');
        bg.classList.add('hide');
      }

      if(elem === 'uninstall') {
        modal.classList.add('hide');
        bg.classList.add('hide');
        setTimeout(function() {
          alert('DONE')
        }, 200)
       
      }
  }

})();
